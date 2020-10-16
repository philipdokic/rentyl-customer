// Dependencies
// -----------------------------------------------
import styled from 'styled-components';

// Styles
// -----------------------------------------------
const WidgetCalendarDay = styled.td`
  ${props =>
    props.status === 'check_in' &&
    `
    td.CalendarDay:not(.CalendarDay__blocked_out_of_range) {
      background: -moz-linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, #cacccd 50%);
      background: -webkit-linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, #cacccd 50%);
      background: linear-gradient(45deg, rgba(0, 0, 0, 0) 50%, #cacccd 50%);

      border-right-color: #cacccd;
      border-top-color: #cacccd;
    }
  `}

  ${props =>
    props.status === 'check_out' &&
    `
    td.CalendarDay:not(.CalendarDay__blocked_out_of_range) {
      background: -moz-linear-gradient(45deg, #cacccd 50%, rgba(0, 0, 0, 0) 50%);
      background: -webkit-linear-gradient(45deg, #cacccd 50%, rgba(0, 0, 0, 0) 50%);
      background: linear-gradient(45deg, #cacccd 50%, rgba(0, 0, 0, 0) 50%);

      border-left-color: #cacccd;
      border-bottom-color: #cacccd;
    }
  `}

  ${props =>
    props.status === 'check_in_with_previous_check_out' &&
    `
    td.CalendarDay:not(.CalendarDay__blocked_out_of_range) {
      background: -moz-linear-gradient(45deg, #cacccd 50%, #5284ca 50%);
      background: -webkit-linear-gradient(45deg, #cacccd 50%, #5284ca 50%);
      background: linear-gradient(45deg, #cacccd 50%, #5284ca 50%);

      border-left-color: #cacccd;
      border-bottom-color: #cacccd;
    }
  `}

  ${props =>
    props.status === 'check_out_with_previous_check_in' &&
    `
    td.CalendarDay:not(.CalendarDay__blocked_out_of_range) {
      background: -moz-linear-gradient(45deg, #5284ca 50%, #cacccd 50%);
      background: -webkit-linear-gradient(45deg, #5284ca 50%, #cacccd 50%);
      background: linear-gradient(45deg, #5284ca 50%, #cacccd 50%);

      border-right-color: #cacccd;
      border-top-color: #cacccd;
    }
  `}
`;

// Export
// -----------------------------------------------
export { WidgetCalendarDay };