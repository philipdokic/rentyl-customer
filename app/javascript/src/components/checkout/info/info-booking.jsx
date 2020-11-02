// Dependencies
// -----------------------------------------------
import React from 'react';
import get from 'lodash/get';
import ReactI18n from 'react-i18n'

const InfoBooking = (props) => {

  const translate = ReactI18n.getIntlMessage

  buildBookingInfo = () => {
    if (
      props.checkInDate &&
      props.checkOutDate &&
      props.guests &&
      props.nights
    ) {
      const stringifiedBooking = {
        __html: translate(`cx.checkout.booking_info_html`, {
          checkIn: props.checkInDate.format(
            get(this, 'props.displayFormat') === 'DD/MM/YYYY'
              ? 'Do MMMM, YYYY'
              : 'MMMM Do, YYYY'
          ),
          checkOut: props.checkOutDate.format(
            get(this, 'props.displayFormat') === 'DD/MM/YYYY'
              ? 'Do MMMM, YYYY'
              : 'MMMM Do, YYYY'
          ),
          guests: translate(
            `global.parsers.num_guests.${
            props.guests > 1 ? 'plural' : 'single'
            }`,
            { num: props.guests }
          ),
          nights: translate(
            `global.parsers.num_nights.${
            props.nights > 1 ? 'plural' : 'single'
            }`,
            { nights: props.nights }
          )
        })
      };
      return <span dangerouslySetInnerHTML={stringifiedBooking} />;
    }
    return null;
  }

  return (
    <section className="checkout-info-booking">
      <div className="checkout-info-subsection">
        {buildBookingInfo()}
      </div>
    </section>
  );
}


export default InfoBooking
