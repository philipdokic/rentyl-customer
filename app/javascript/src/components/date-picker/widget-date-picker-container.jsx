// Dependencies
// -----------------------------------------------
import React from 'react';
import { CalendarDay } from 'react-dates';
import moment from 'moment';

// Components
// -----------------------------------------------
import DefaultRangePicker from './default-range-picker';
import { WidgetCalendarDay } from './widget-date-picker-styles';

// Props
// -----------------------------------------------
// type Props = {
//   startDate: ?Date,
//   endDate: ?Date,
//   onDatesChange: () => void,
//   isDayBlocked: (day: moment) => boolean,
//   calendarDayStatus: (day: moment) => string,
//   isOutsideRange: (day: moment) => boolean,
//   label: ?string
// };

// Custom Calendar Day
// -----------------------------------------------
const CustomCalendarDay = (props, calendarDayStatus) => {
  if (!props || !props.day) return <CalendarDay {...props} />;

  const modifiers = props.modifiers;

  let status = calendarDayStatus(props.day);

  if (modifiers && modifiers.has('selected-start') && status === 'check_out') {
    status = 'check_in_with_previous_check_out';
  } else if (
    modifiers &&
    modifiers.has('selected-end') &&
    status === 'check_in'
  ) {
    status = 'check_out_with_previous_check_in';
  }

  return (
    <WidgetCalendarDay status={status}>
      <CalendarDay {...props} />
    </WidgetCalendarDay>
  );
};

// Widget Date Picker Container
// -----------------------------------------------
const WidgetDatePickerContainer = (props) => {
  const calendarDayStatus = props.calendarDayStatus;
  return (
    <DefaultRangePicker
      label={props.label}
      startPlaceholder="Check in"
      endPlaceholder="Check out"
      onDatesSet={props.onDatesChange}
      isDayBlocked={props.isDayBlocked}
      initialStartDate={props.startDate}
      initialEndDate={props.endDate}
      isOutsideRange={props.isOutsideRange}
      renderCalendarDay={props => CustomCalendarDay(props, calendarDayStatus)}
      disabled={props.disabled}
      displayFormat={props.displayFormat}
      readOnly={props.readOnly}
    />
  );
};

// Export
// -----------------------------------------------
export default WidgetDatePickerContainer;
