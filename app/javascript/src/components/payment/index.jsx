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
import Form from './form';
import Listing from './listing';
import Pricing from './pricing';
import PaymentTransaction from '../errors/payment-transaction';
import Stay from './stay';

// -----------------------------------------------
// COMPONENT->PAYMENT ----------------------------
// -----------------------------------------------
export default class Payment extends React.Component {

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
      bookingPaymentDueToday: null,
      bookingPaymentBalanceDueDate: '',
      charges: [],
      customer: {},
      featured_image: {},
      location: {},
      property: {},
      property_manager: {},
      slug: '',
      unit: {},
      bookingPaid: null,
      securityDeposit: {},
      securityDepositRequired: null,
      verified: null,
      loading: true,
      stripePublishableKey: '',
      chargeAmount: 0
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
      axios.post(`/bookings/payment/${props.match.params.booking_code}`)
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
      isStripeSuccessful: false
    });
  };

  // Handle Stripe Script Load
  // ---------------------------------------------
  handleStripeScriptLoad = () => {
    Stripe.setPublishableKey(this.state.stripePublishableKey);
    this.setState({
      isStripeSuccessful: true
    });
    this.render();
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
        address_zip: this.state.customerPostalCode || 'invalid'
      },
      this.handleStripeCallback
    );
  };

  // Create Stripe Callback
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

    axios.post(`/api/checkout/${this.state.listing.id}/process_payment`, {
      context: this,
      params: {
        charge_amount: parseFloat(this.state.chargeAmount),
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
      alert('Payment Failed' + error.responseText);
      window.location = window.location;
    })
  };

  // Handle Stripe Failure
  // ---------------------------------------------
  handleStripeFailure = ({ error }) => {
    console.error(error);
    this.setState({ transactionError: error });
  };

  // Get Charge Amount
  // ---------------------------------------------
  getChargeAmount = () => {
    return Math.max(
      0,
      this.state.bookingPaymentDueToday
    ).toFixed(2);
  };

  // Process Security Deposit
  // ---------------------------------------------
  processSecurityDeposit = (
    chargeAmount,
    cardNumber,
    cardExpiry,
    cardCvv,
    customerEmail,
    customerName,
    customerPostalCode,
    customerTelephone
  ) => {
    this.setState(
      {
        chargeAmount,
        cardNumber: cardNumber.replace(' ', ''),
        cardExpiry,
        cardCvv: cardCvv.replace(' ', ''),
        customerEmail,
        customerName,
        customerPostalCode,
        customerTelephone
      },
      () => {
        this.createStripeToken();
      }
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
      this.state.availability.default_time_check_in
    );
    const checkOutTime = this.parseTime(
      this.state.availability.default_time_check_out
    );
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;

    return (
      <main className="checkout-main receipt-main">
        <Script
          url="https://js.stripe.com/v2/"
          onError={this.handleStripeScriptError}
          onLoad={this.handleStripeScriptLoad}
        />
        {this.getChargeAmount() === (0).toFixed(2) ? (
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
          </section>
        ) : (
          <section className="payment">
            <p>
              In order to complete your reservation, please enter your payment
              details below
            </p>
            {this.state.bookingPaymentBalanceDueDate && this.state.bookingPaymentBalanceDueDate.length > 0 ? (
              <p>
                Your final payment {this.state.bookingPaymentBalanceDueDate}
              </p>
            ) : (
              <span />
            )}
            <Form
              chargeAmount={this.getChargeAmount()}
              processSecurityDeposit={this.processSecurityDeposit}
              slug={this.state.slug}
            />
            <PaymentTransaction errors={[this.state.transactionError]} />
          </section>
        )}
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
          <Pricing
            booking={this.state.booking}
            charges={this.state.charges}
            currency={currency}
          />
        </section>
      </main>
    );
  }
}
