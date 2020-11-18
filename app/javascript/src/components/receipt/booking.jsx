// Dependencies
// -----------------------------------------------
import React from 'react';
import get from 'lodash/get';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->BOOKING ----------------------------
// -----------------------------------------------
export default class Booking extends React.Component {

  // Build Booking Info
  // ---------------------------------------------
  buildBookingInfo() {
    const translate = ReactI18n.getIntlMessage;

    if (
      this.props.checkInDate &&
      this.props.checkOutDate &&
      this.props.guests &&
      this.props.nights
    ) {
      const stringifiedBooking = {
        __html: translate(`cx.checkout.booking_info_html`, {
          checkIn: this.props.checkInDate.format(
            get(this, 'props.displayFormat') === 'DD/MM/YYYY'
              ? 'Do MMMM, YYYY'
              : 'MMMM Do, YYYY'
          ),
          checkOut: this.props.checkOutDate.format('MMMM Do, YYYY'),
          guests: translate(
            `global.parsers.num_guests.${
              this.props.guests > 1 ? 'plural' : 'single'
            }`,
            { num: this.props.guests }
          ),
          nights: translate(
            `global.parsers.num_nights.${
              this.props.nights > 1 ? 'plural' : 'single'
            }`,
            { nights: this.props.nights }
          )
        })
      };
      return <span dangerouslySetInnerHTML={stringifiedBooking} />;
    }
    return null;
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <section className="receipt-info-section receipt-info-booking">
        <div className="receipt-info-subsection">{this.buildBookingInfo()}</div>
      </section>
    );
  }
}
