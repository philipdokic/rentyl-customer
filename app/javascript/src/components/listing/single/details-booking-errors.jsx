// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';

export default class DetailsBookingErrors extends React.Component {
  constructor(props) {
    super(props);
  }

  renderErrors = () => {
    const translate = this.props.translate;
    if (this.props.availability.available === 'unavailable') {
      return <li>{translate(`cx.errors.listing_unavailable`)}</li>;
    } else if (this.props.availability.booked) {
      return <li>{translate(`cx.errors.listing_booked`)}</li>;
    } else if (!this.props.availability.can_fit_guests) {
      return <li>{translate(`cx.errors.listing_guests_unmatched`)}</li>;
    } else if (!this.props.availability.can_stay) {
      return <li>{translate(`cx.errors.listing_los_unmatched`)}</li>;
    } else if (
      this.props.availability.changeover[0] === 'none' ||
      this.props.availability.changeover[0] === 'check_out' ||
      this.props.availability.changeover[1] === 'none' ||
      this.props.availability.changeover[1] === 'check_in'
    ) {
      return (
        <li>
          {translate(`cx.errors.listing_changeover_unmatched`, {
            checkInChangeover: translate(
              `cx.global.changeover.${this.props.availability.changeover[0]}`
            ),
            checkOutChangeover: translate(
              `cx.global.changeover.${this.props.availability.changeover[1]}`
            )
          })}
        </li>
      );
    } else {
      return <li>{translate(`cx.errors.listing_generic`)}</li>;
    }
  };

  render() {
    const translate = this.props.translate;
    if (this.props.availability && !this.props.availability.bookable) {
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
