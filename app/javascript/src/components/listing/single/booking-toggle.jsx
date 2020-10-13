// Dependencies
// -----------------------------------------------
import React from 'react';
import MediaQuery from 'react-responsive';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import BookingBreakdown from './booking-breakdown';
import BookingDatePicker from './booking-date-picker';
import BookingNumGuests from './booking-num-guests';

// -----------------------------------------------
// COMPONENT->SINGLE-BOOKING-TOGGLE --------------
// -----------------------------------------------
export default class SingleBookingToggle extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  // Toggle Booking Module
  // ---------------------------------------------
  toggleBookingModule = e => {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <MediaQuery query="(max-width: 959px)">
        {this.state.toggled ? (
          <section className="details-booking toggled">
            <a
              className="close-link"
              onClick={e => this.toggleBookingModule(e)}
            >
              ×
            </a>
            {this.props.datesParsed ? (
              <BookingDatePicker
                checkInDate={this.props.checkInDate}
                checkOutDate={this.props.checkOutDate}
                respondToDatesChange={this.props.respondToDatesChange}
              />
            ) : null}
            <BookingNumGuests
              guests={this.props.guests}
              respondToGuestsChange={this.props.respondToGuestsChange}
            />
            <BookingBreakdown
              addonFeeIds={this.props.addonFeeIds}
              checkInDate={this.props.checkInDate}
              checkOutDate={this.props.checkOutDate}
              guests={this.props.guests}
              updateFees={this.props.updateFees}
              updateQuantityFee={this.props.updateQuantityFees}
            />
          </section>
        ) : null}
        <div className="details-booking-toggle">
          <a className="button" onClick={e => this.toggleBookingModule(e)}>
            {translate(`cx.global.book.long`)}
          </a>
        </div>
      </MediaQuery>
    );
  }
}