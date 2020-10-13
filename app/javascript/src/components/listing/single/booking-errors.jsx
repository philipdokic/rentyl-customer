// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->BOOKING-ERRORS ---------------------
// -----------------------------------------------
class BookingErrors extends React.Component {

  // Render Errors
  // ---------------------------------------------
  renderErrors = () => {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.availability.available === 'unavailable') {
      return <li>{translate(`cx.errors.listing_unavailable`)}</li>;
    } else if (this.props.listing.availability.booked) {
      return <li>{translate(`cx.errors.listing_booked`)}</li>;
    } else if (!this.props.listing.availability.can_fit_guests) {
      return <li>{translate(`cx.errors.listing_guests_unmatched`)}</li>;
    } else if (!this.props.listing.availability.can_stay) {
      return <li>{translate(`cx.errors.listing_los_unmatched`)}</li>;
    } else if (
      this.props.listing.availability.changeover[0] === 'none' ||
      this.props.listing.availability.changeover[0] === 'check_out' ||
      this.props.listing.availability.changeover[1] === 'none' ||
      this.props.listing.availability.changeover[1] === 'check_in'
    ) {
      return (
        <li>
          {translate(`cx.errors.listing_changeover_unmatched`, {
            checkInChangeover: translate(
              `cx.global.changeover.${this.props.listing.availability.changeover[0]}`
            ),
            checkOutChangeover: translate(
              `cx.global.changeover.${this.props.listing.availability.changeover[1]}`
            )
          })}
        </li>
      );
    } else {
      return <li>{translate(`cx.errors.listing_generic`)}</li>;
    }
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.availability && !this.props.listing.availability.bookable) {
      return (
        <div className="details-booking-errors">
          <ul>{this.renderErrors()}</ul>
          <a
            href="#"
            onClick={e => e.preventDefault()}
            className="button disabled"
          >
            {translate(`cx.global.book.long`)}
          </a>
        </div>
      );
    } else {
      return null;
    }
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(BookingErrors);