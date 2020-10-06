// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import MediaQuery from 'react-responsive';

// Components
// -----------------------------------------------
import DetailsBookingBreakdown from './details-booking-breakdown';
import DetailsBookingDatePicker from './details-booking-date-picker';
import DetailsBookingNumGuests from './details-booking-num-guests';

export default class DetailsSingleBookingToggle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toggled: false
    };
  }

  toggleBookingModule = e => {
    e.preventDefault();
    this.setState({
      toggled: !this.state.toggled
    });
  };

  render() {
    const translate = this.props.translate;
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
              <DetailsBookingDatePicker
                availability_calendar={this.props.availability_calendar}
                booking_calendar={this.props.booking_calendar}
                default_availability={this.props.default_availability}
                checkInDate={this.props.checkInDate}
                checkOutDate={this.props.checkOutDate}
                listing={this.props.listing}
                pricing={this.props.pricing}
                respondToDatesChange={this.props.respondToDatesChange}
                unit_availability={this.props.unit_availability}
                translate={translate}
                organizationID={this.props.organizationID}
                unitID={this.props.unitID}
              />
            ) : null}
            <DetailsBookingNumGuests
              guests={this.props.guests}
              respondToGuestsChange={this.props.respondToGuestsChange}
              translate={translate}
              numSleep={this.props.numSleep}
            />
            <DetailsBookingBreakdown
              addonFeeIds={this.props.addonFeeIds}
              availability={this.props.availability}
              checkInDate={this.props.checkInDate}
              checkOutDate={this.props.checkOutDate}
              guests={this.props.guests}
              listing={this.props.listing}
              pricing={this.props.pricing}
              translate={translate}
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
