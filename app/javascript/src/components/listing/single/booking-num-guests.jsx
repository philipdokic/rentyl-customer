// Dependencies
// -----------------------------------------------
import React from 'react';
import { range } from 'lodash';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->BOOKING-NUM-GUESTS -----------------
// -----------------------------------------------
export default class BookingNumGuests extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Handle Change
  // ---------------------------------------------
  handleChange = e => {
    e.preventDefault();
    this.props.respondToGuestsChange(e.target.value);
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const sleepArr = range(2, this.props.numSleep + 1);

    return (
      <figure className="details-booking-num-guests">
        <select value={this.props.guests} onChange={this.handleChange}>
          <option value={1}>
            {translate(`global.parsers.num_guests.single`, { num: 1 })}
          </option>
          {sleepArr.map(num => (
            <option key={num} value={num}>
              {translate(`global.parsers.num_guests.plural`, { num })}
            </option>
          ))}
        </select>
      </figure>
    );
  }
}