// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import moment from 'moment';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import Listing from './listing';
import Pricing from './pricing';
import PaymentTransaction from '../errors/payment-transaction';
import Stay from './stay';
import StripeForm from '../stripe/index';

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
      stripe_publishable_key: '',
      stripe_account_id: '',
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
      axios.post(`${process.env.DIRECT_URL}/api/v2/my-bookings/payment/${props.match.params.booking_code}`)
      .then(response => {
        console.log(response.data);
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

  // Get Charge Amount
  // ---------------------------------------------
  getChargeAmount = () => {
    return Math.max(
      0,
      this.state.bookingPaymentDueToday
    ).toFixed(2);
  };

  // Render
  // ---------------------------------------------
  render() {
    if (this.state.loading) return null;
    const bookingLength = this.state.booking.booking_range.length - 1;
    const checkIn = moment(this.state.booking.check_in, 'YYYY-MM-DD');
    const checkOut = moment(this.state.booking.check_out, 'YYYY-MM-DD');
    const checkInTime = this.parseTime(this.state.availability.default_time_check_in);
    const checkOutTime = this.parseTime(this.state.availability.default_time_check_out);
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;
    const translate = ReactI18n.getIntlMessage;

    return (
      <main className="checkout-main receipt-main">
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
            <StripeForm
              availability={this.state.availability}
              booking={this.state.booking}
              brand_info={this.props.brand_info}
              chargeAmount={this.getChargeAmount()}
              listing={this.state.listing}
              slug={this.state.slug}
              stripeCustomerId={this.state.stripe_customer_id}
              stripeIntentId={this.state.stripe_intent_id}
              stripePublishableKey={this.state.stripe_publishable_key}
              stripeAccountID={this.state.stripe_account_id}
              translate={translate}
              unit={this.state.unit}
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