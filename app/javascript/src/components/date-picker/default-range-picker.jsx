// Dependencies
// -----------------------------------------------
import React from 'react';
import { DateRangePicker } from 'react-dates';
// import { OrganizationContext } from 'adminContexts';
import get from 'lodash/get';

export default class DefaultRangePicker extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
      startDate: props.initialStartDate,
      endDate: props.initialEndDate
    };
  }

  componentWillReceiveProps(nextProps) {
    const { startDateOverride, endDateOverride } = nextProps;

    if (!startDateOverride || !endDateOverride) return null;

    this.setState({
      startDate: startDateOverride,
      endDate: endDateOverride
    });
  }

  onDatesChange = ({ startDate, endDate }) => {
    this.setState({ startDate, endDate });
  };

  onFocusChange = focusedInput => {
    this.setState({ focusedInput }, () => {
      if (
        this.state.startDate &&
        this.state.endDate &&
        !this.state.focusedInput
      ) {
        this.props.onDatesSet({
          startDate: this.state.startDate,
          endDate: this.state.endDate
        });
      }
    });
  };

  onDatesUnset = () => {
    const data = { startDate: null, endDate: null };

    this.setState(data, () => {
      this.props.onDatesSet(data);
    });
  };

  render() {
    if ( !this.state.startDate && this.props.initialStartDate ){
      this.state.startDate = this.props.initialStartDate;
      this.state.endDate = this.props.initialEndDate;
    }
    return (
      <figure style={this.props.styles} className={this.props.containerClass}>
        {this.props.label && (
          <label style={this.props.labelStyles}>{this.props.label}</label>
        )}
        <div className={'datepicker'}>
          <DateRangePicker
            startDatePlaceholderText={this.props.startPlaceholder}
            endDatePlaceholderText={this.props.endPlaceholder}
            onDatesChange={this.onDatesChange}
            onFocusChange={this.onFocusChange}
            focusedInput={this.state.focusedInput}
            numberOfMonths={this.props.numberOfMonths}
            startDate={this.state.startDate}
            startDateId={'default_range_picker_start_id'}
            endDate={this.state.endDate}
            endDateId={'default_range_picker_end_id'}
            minimumNights={Number.isInteger(this.props.minimumNightsOverride) ? this.props.minimumNightsOverride : this.props.minimumNights}
            isOutsideRange={this.props.isOutsideRange}
            isDayBlocked={this.props.isDayBlocked}
            renderCalendarDay={this.props.renderCalendarDay}
            hideKeyboardShortcutsPanel
            disabled={this.props.disabled}
            displayFormat={
              this.props.displayFormat ||
              get(this, 'context.dateFormat', () => {})()
            } // The only time displayFormat is passed in props is on the cx app. The admin app takes advantage of the OrganizationConext
            readOnly={this.props.readOnly}
          />
          {this.props.renderUnsetLink(this.onDatesUnset)}
        </div>
      </figure>
    );
  }
}

DefaultRangePicker.defaultProps = {
  onDatesSet: () => false,
  isOutsideRange: () => false,
  isDayBlocked: () => false,
  startPlaceholder: 'Start',
  endPlaceholder: 'End',
  numberOfMonths: 1,
  minimumNights: 1,
  renderUnsetLink: func => null,
  readOnly: false
};

// DefaultRangePicker.contextType = OrganizationContext;
