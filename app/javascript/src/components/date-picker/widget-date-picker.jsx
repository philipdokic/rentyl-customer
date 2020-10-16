// @flow
// Dependencies
// -----------------------------------------------
import React from 'react';
import get from 'lodash/get';
import moment from 'moment';

// Components
// -----------------------------------------------
import WidgetDatePickerContainer from './widget-date-picker-container';

// Props
// -----------------------------------------------
type Props = {
  organizationID: number,
  unitID: number,
  onDatesChange: () => void,
  startDate: ?Date,
  endDate: ?Date,
  initialStartDate: ?Date,
  initialEndDate: ?Date,
  isOutsideRange: (date: moment) => boolean
};

// State
// -----------------------------------------------
type State = {
  bookingCalendar: {}
};

// -----------------------------------------------
// COMPONENT->WIDGET-DATE-PICKER -----------------
// -----------------------------------------------
export default class WidgetDatePicker extends React.Component<Props, State> {

  // Constructor
  // ---------------------------------------------
  constructor(props: Props) {
    super(props);

    this.state = {
      bookingCalendar: props.bookingCalendar || {}
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    if (this.state.bookingCalendar !== {}) return null;

    axios.get(`https://staging.getdirect.io/api/v2/units/booking_calendars`, {
      headers: {'Content-Type': 'application/json'},
      context: this,
      params: {
        unit_id: unitID
      }
    })
    .then(response => {
      this.setState({ bookingCalendar: response.booking_calendar });
    })
    .catch(error => {
      console.log(error);
    })
  }

  // Calendar Day Status
  // ---------------------------------------------
  calendarDayStatus = (day: moment) => {
    const key = day.format('DD-MM-YYYY');
    const keyDate = this.state.bookingCalendar[key];

    let status = get(
      keyDate,
      'status',
      get(keyDate, 'availability', 'available')
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
  isDayBlocked = (day: moment) => {
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