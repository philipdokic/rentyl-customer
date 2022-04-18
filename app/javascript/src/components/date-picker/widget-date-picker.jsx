// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import { isUndefined, get } from 'lodash';
import moment from 'moment';

// Components
// -----------------------------------------------
import WidgetDatePickerContainer from './widget-date-picker-container';

// -----------------------------------------------
// COMPONENT->WIDGET-DATE-PICKER -----------------
// -----------------------------------------------
export default class WidgetDatePicker extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      bookingCalendar: this.props.bookingCalendar || {}
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    if (Object.keys(this.state.bookingCalendar).length > 0) return null;

    axios.get(`${process.env.DIRECT_URL}/api/v2/units/booking_calendars`, {
      headers: {'Content-Type': 'application/json'},
      context: this,
      params: {
        unit_id: this.props.unitID
      }
    })
    .then(response => {
      this.setState({ bookingCalendar: response.data.booking_calendar });
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Calendar Day Status
  // ---------------------------------------------
  calendarDayStatus = (day = moment()) => {
    const key = day.format('DD-MM-YYYY');
    const keyDate = this.state.bookingCalendar[key];
    let status;
    if (this.props.defaultAvailability) {
      // check default availability
      const numDayOfWeek = day.day();
      const defaultAvailabilityForDay = this.props.defaultAvailability[numDayOfWeek]['availability'];
      if (!isUndefined(defaultAvailabilityForDay))
        status = defaultAvailabilityForDay;
    }

    status = get(
      keyDate,
      'status',
      get(keyDate, 'availability', status)
    );

    if (
      this.props.initialStartDate &&
      this.props.initialEndDate &&
      (day.isSame(this.props.initialStartDate, 'day') ||
        day.isSame(this.props.initialEndDate, 'day'))
    ) {
      status = 'available';
    }

    return status;
  };

  // Is Day Blocked
  // ---------------------------------------------
  isDayBlocked = (day = moment()) => {
    const status = this.calendarDayStatus(day);

    let blocked =
      status === 'blocked' ||
      status === 'check_in_out' ||
      status === 'unavailable';

    if (
      this.props.initialStartDate &&
      this.props.initialEndDate &&
      day.isBetween(this.props.initialStartDate, this.props.initialEndDate)
    ) {
      blocked = false;
    }

    return blocked;
  };

  // Render
  // ---------------------------------------------
  render() {
    return (
      <WidgetDatePickerContainer
        {...this.props}
        isDayBlocked={this.isDayBlocked}
        calendarDayStatus={this.calendarDayStatus}
        readOnly={this.props.readOnly}
      />
    );
  }
}
