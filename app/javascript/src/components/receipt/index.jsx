// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import get from 'lodash/get';
import moment from 'moment';
import ReactI18n from "react-i18n";

// Components
// -----------------------------------------------
import Deposit from './deposit';
import Listing from './listing';
import Pricing from '../payment/pricing';
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
    const translate = ReactI18n.getIntlMessage;

    return (
      <main className="checkout-main receipt-main">
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
            nights={this.state.nights}
            pricing={this.state.pricing}
            currency={currency}
            translate={translate}
          />
         {this.state.securityDepositRequired &&
          this.state.securityDeposit && 
            <Deposit
              amount={this.state.securityDeposit.calculation_amount}
              currency={currency}
            />
          }
        </section>
      </main>
    );
  }
}
