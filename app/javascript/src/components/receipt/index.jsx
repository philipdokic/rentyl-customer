// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import moment from 'moment';
import Script from 'react-load-script';

// Components
// -----------------------------------------------
import Deposit from './deposit';
import Form from './form';
import Listing from './listing';
import PaymentTransaction from '../errors/payment-transaction';
import Pricing from './pricing';
import PropertyManager from './property-manager';
import Stay from './stay';

// -----------------------------------------------
// COMPONENT->RECEIPT ----------------------------
// -----------------------------------------------
export default class Receipt extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      isStripeSuccessful: false,
      listing: {},
      transactionError: null,
      availability: {},
      booking: {},
      charges: [],
      customer: {},
      featured_image: {},
      location: {},
      property: {},
      property_manager: {},
      slug: '',
      unit: {},
      securityDeposit: {},
      securityDepositRequired: null,
      verified: null,
      loading: true,
      stripePublishableKey: '',
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount = () => {
    this.fetchData(this.props);
  };

  // Fetch Data
  // ---------------------------------------------
  fetchData = props => {
    this.setState({ loading: true }, () => {
      axios.post(`${process.env.DIRECT_URL}/api/v2/my-bookings/receipt/${props.match.params.booking_code}`)
      .then(response => {
        this.setState({ loading: false, ...response.data })
      })
      .catch(error => {
        console.error(error);
      })
    });
  };

  // Parse Time
  // ---------------------------------------------
  parseTime = time => {
    const t = moment(time, 'hh:mm');
    if (t !== 'Invalid date') {
      return t.format('h:mm a');
    }
    return null;
  };

  // Handle Stripe Script Error
  // ---------------------------------------------
  handleStripeScriptError = () => {
    this.setState({
      isStripeSuccessful: false,
    });
  };

  // Handle Stripe Script Load
  // ---------------------------------------------
  handleStripeScriptLoad = () => {
    Stripe.setPublishableKey(this.state.stripePublishableKey);
    this.setState({
      isStripeSuccessful: true,
    });
    this.render();
    console.log('Stripe:',Stripe);
  };

  // Create Stripe Token
  // ---------------------------------------------
  createStripeToken = () => {
    Stripe.card.createToken(
      {
        number: this.state.cardNumber,
        cvc: this.state.cardCvv,
        name: this.state.customerName,
        exp: this.state.cardExpiry,
        address_zip: this.state.customerPostalCode || 'invalid',
      },
      this.handleStripeCallback,
    );
  };

  // Handle Stripe Callback
  // ---------------------------------------------
  handleStripeCallback = (statusCode, json) => {
    if (statusCode === 200) {
      this.handleStripeSuccess(json);
    } else {
      this.handleStripeFailure(json);
    }
  };

  // Create Stripe Success
  // ---------------------------------------------
  handleStripeSuccess = json => {
    const token = json.id;

    axios.post(`/api/checkout/${this.state.listing.id}/process_security_deposit`, {
      context: this,
      params: {
        booking_id: this.state.booking.id,
        customer_email: this.state.customerEmail,
        customer_name: this.state.customerName,
        customer_telephone: this.state.customerTelephone,
        stripe_token: token
      }
    })
    .then(response => {
      window.location = window.location;
    })
    .catch(error => {
      console.warn(error);
    })
  };

  // Handle Stripe Failure
  // ---------------------------------------------
  handleStripeFailure = ({ error }) => {
    console.error(error);
    this.setState({ transactionError: error });
  };

  // Process Security Deposit
  // ---------------------------------------------
  processSecurityDeposit = (
    cardNumber,
    cardExpiry,
    cardCvv,
    customerEmail,
    customerName,
    customerPostalCode,
    customerTelephone,
  ) => {
    this.setState(
      {
        cardNumber: cardNumber.replace(' ', ''),
        cardExpiry,
        cardCvv: cardCvv.replace(' ', ''),
        customerEmail,
        customerName,
        customerPostalCode,
        customerTelephone,
      },
      () => {
        this.createStripeToken();
      },
    );
  };

  // Render
  // ---------------------------------------------
  render() {
    if (this.state.loading) return null;
    const bookingLength = this.state.booking.booking_range.length - 1;
    const checkIn = moment(this.state.booking.check_in, 'YYYY-MM-DD');
    const checkOut = moment(this.state.booking.check_out, 'YYYY-MM-DD');
    const checkInTime = this.parseTime(
      this.state.availability.default_time_check_in,
    );
    const checkOutTime = this.parseTime(
      this.state.availability.default_time_check_out,
    );
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;

    const { isStripeSuccessful, securityDepositRequired } = this.state;
    const { booking } = this.state;

    return (
      <main className="checkout-main receipt-main">
        <Script
          url="https://js.stripe.com/v2/"
          onError={this.handleStripeScriptError}
          onLoad={this.handleStripeScriptLoad}
        />
        <section className="payment">
          <Stay
            booking={this.state.booking}
            bookingLength={bookingLength}
            checkIn={checkIn}
            checkInTime={checkInTime}
            checkOut={checkOut}
            checkOutTime={checkOutTime}
            customer={this.state.customer}
            guests={guests}
            verified={this.state.verified}
            displayFormat={get(this, 'props.brand.date_format', 'MM/DD/YYYY')}
          />
          {this.state.property_manager && (
            <PropertyManager
              property_manager={this.state.property_manager}
            />
          )}
        </section>
        {isStripeSuccessful && securityDepositRequired && !booking.cancelled && checkIn.isBetween(moment(), moment().add(3, 'days')) ? (
          <section className="payment">
            <p>
              Please enter your billing details below so we can process your
              damage deposit authorization. This authorization works exactly the
              same way as when you check-in to a hotel, and your card will not
              be charged this amount unless there is damage to the property.
            </p>
            <Form
              processSecurityDeposit={this.processSecurityDeposit}
              slug={this.state.slug}
              rental_agreement={this.state.rental_agreement}
            />
            <PaymentTransaction errors={[this.state.transactionError]} />
          </section>
        ) : null}
        <section className="information">
          <Listing
            checkInDate={checkIn}
            checkOutDate={checkOut}
            featured_image={this.state.featured_image}
            guests={guests}
            listing={this.state.listing}
            location={this.state.location}
            property={this.state.property}
            slug={this.state.slug}
            unit={this.state.unit}
          />
          {this.state.isStripeSuccessful &&
          this.state.securityDepositRequired &&
          this.state.securityDeposit != null ? (
            <Deposit
              amount={this.state.securityDeposit.calculation_amount}
              currency={currency}
            />
          ) : (
            <Pricing
              booking={this.state.booking}
              charges={this.state.charges}
              currency={currency}
            />
          )}
          { this.state.standardContractUrl && (
            <div>
              <a href={this.state.standardContractUrl} className="button">Review your Terms and Conditions</a>
            </div>
          )}
        </section>
      </main>
    );
  }
}
