// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import WidgetDatePicker from 'sharedComponents/WidgetDatePicker';

export default class DetailsBookingDatePicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.checkInDate || null,
      endDate: this.props.checkOutDate || null
    };
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.props.respondToDatesChange(this.state.startDate, this.state.endDate);
    });
  }

  isOutsideRange = day => {
    const today = moment();
    const limitEnd = moment().add(3, 'years');
    const isBeforeToday = !isInclusivelyAfterDay(day, today);
    const isAfterLimitEnd = !isInclusivelyBeforeDay(day, limitEnd);
    return isBeforeToday || isAfterLimitEnd;
  };

  render() {
    const translate = this.props.translate;
    return (
      <div style={{ textAlign: 'center' }}>
        <WidgetDatePicker
          bookingCalendar={this.props.availability_calendar}
          organizationID={this.props.organizationID}
          unitID={this.props.unitID}
          onDatesChange={this.onDatesChange}
          initialStartDate={this.state.startDate}
          initialEndDate={this.state.endDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
          isOutsideRange={this.isOutsideRange}
          displayFormat={this.props.displayFormat}
          readOnly
        />
      </div>
    );
  }
}
