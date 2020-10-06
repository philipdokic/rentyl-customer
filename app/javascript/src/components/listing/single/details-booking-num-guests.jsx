// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import { range } from 'lodash';

export default class DetailsBookingNumGuests extends React.Component {
  constructor(props) {
    super(props);
  }

  handleChange = e => {
    e.preventDefault();
    this.props.respondToGuestsChange(e.target.value);
  };

  render() {
    const translate = this.props.translate;
    const sleepArr = range(2, this.props.numSleep + 1);
    return (
      <figure className="details-booking-num-guests">
        <select value={this.props.guests} onChange={this.handleChange}>
          <option value={1}>
            {translate(`global.parsers.num_guests.single`, { num: 1 })}
          </option>
          {sleepArr.map(num => (
            <option value={num}>
              {translate(`global.parsers.num_guests.plural`, { num })}
            </option>
          ))}
        </select>
      </figure>
    );
  }
}
