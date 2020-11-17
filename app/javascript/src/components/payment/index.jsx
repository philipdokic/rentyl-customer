// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import ReactI18n from 'react-i18n';
import Script from 'react-load-script';
import get from 'lodash/get';
import 'react-dates/initialize'; // Needed for rendering any react-dates components

// Components
// -----------------------------------------------
import { BookingService } from 'cxApi';
import {
  InfoListing,
  InfoPricing,
  InfoStay,
  InfoSecDep,
  FormPayment
} from '../molecules';

import { ErrorsPaymentTransaction } from '../../Checkout/atoms';

export default class Payment extends React.Component {
  static propTypes = {};

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

  componentDidMount = () => {
    this.fetchData(this.props);
  };

  fetchData = props => {
    this.setState({ loading: true }, () => {
      BookingService.payment(props.match.params.booking_code)
        .then(res => this.setState({ loading: false, ...res }))
        .catch(err => console.error(err));
    });
  };

  parseTime = time => {
    const t = moment(time, 'hh:mm');
    if (t !== 'Invalid date') {
      return t.format('h:mm a');
    }
    return null;
  };

  handleStripeScriptError = () => {
    this.setState({
      isStripeSuccessful: false
    });
  };

  handleStripeScriptLoad = () => {
    Stripe.setPublishableKey(this.state.stripePublishableKey);
    this.setState({
      isStripeSuccessful: true
    });
    this.render();
    console.log('Stripe:', Stripe);
  };

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

  handleStripeCallback = (statusCode, json) => {
    if (statusCode === 200) {
      this.handleStripeSuccess(json);
    } else {
      this.handleStripeFailure(json);
    }
  };

  handleStripeSuccess = json => {
    const token = json.id;
    $.ajax({
      type: 'POST',
      url: `/api/checkout/${this.state.listing.id}/process_payment`,
      context: this,
      data: {
        charge_amount: parseFloat(this.state.chargeAmount),
        booking_id: this.state.booking.id,
        customer_email: this.state.customerEmail,
        customer_name: this.state.customerName,
        customer_telephone: this.state.customerTelephone,
        stripe_token: token
      }
    })
      .done(() => {
        window.location = window.location;
        // Get rid of the card form and replace with success message
      })
      .fail(jqXhr => {
        console.warn(jqXhr);
        alert('Payment Failed' + jqXhr.error.responseText);
        window.location = window.location;
      });
  };

  handleStripeFailure = ({ error }) => {
    console.error(error);
    this.setState({ transactionError: error });
  };

  getChargeAmount = () => {
    return Math.max(
      0,
      this.state.bookingPaymentDueToday
    ).toFixed(2);
  };

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

  render() {
    if (this.state.loading) return null;
    const translate = ReactI18n.getIntlMessage;
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
            <InfoStay
              booking={this.state.booking}
              bookingLength={bookingLength}
              checkIn={checkIn}
              checkInTime={checkInTime}
              checkOut={checkOut}
              checkOutTime={checkOutTime}
              customer={this.state.customer}
              guests={guests}
              translate={translate}
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
            <FormPayment
              chargeAmount={this.getChargeAmount()}
              processSecurityDeposit={this.processSecurityDeposit}
              slug={this.state.slug}
              translate={translate}
            />
            <ErrorsPaymentTransaction errors={[this.state.transactionError]} />
          </section>
        )}
        <section className="information">
          <InfoListing
            checkInDate={checkIn}
            checkOutDate={checkOut}
            featured_image={this.state.featured_image}
            guests={guests}
            listing={this.state.listing}
            location={this.state.location}
            property={this.state.property}
            slug={this.state.slug}
            unit={this.state.unit}
            translate={translate}
          />
          <InfoPricing
            booking={this.state.booking}
            charges={this.state.charges}
            currency={currency}
            translate={translate}
          />
        </section>
      </main>
    );
  }
}
