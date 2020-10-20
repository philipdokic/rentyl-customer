// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import ReactI18n from 'react-i18n';
import Sticky from 'react-stickynode';

// Components
// -----------------------------------------------
import DefaultRangePicker from '../../date-picker/default-range-picker';

// -----------------------------------------------
// COMPONENT->MULTI-DATES-GUESTS -----------------
// -----------------------------------------------
class MultiDatesGuests extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      startDate: this.props.checkIn,
      endDate: this.props.checkOut
    };
    this.onDatesChange = this.onDatesChange.bind(this);
  }

  // On Dates Change
  // ---------------------------------------------
  onDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate }, () => {
      this.props.updateDates(this.state.startDate, this.state.endDate);
    });
  }

  // Is Outside Range
  // ---------------------------------------------
  isOutsideRange = day => {
    const today = moment();
    const limitEnd = moment().add(3, 'years');
    const isBeforeToday = !isInclusivelyAfterDay(day, today);
    const isAfterLimitEnd = !isInclusivelyBeforeDay(day, limitEnd);
    return isBeforeToday || isAfterLimitEnd;
  };

  // On Guests Change
  // ---------------------------------------------
  onGuestsChange = e => {
    e.preventDefault();
    this.props.updateGuests(e.target.value);
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const { focusedInput, startDate, endDate } = this.state;

    return (
      <Sticky top={50}>
        <section className="details-multi-dates-guests-container">
          <div className="details-multi-dates-guests">
            <div className="details-multi-dates">
              <label>
                <span>{translate(`cx.search.filter.dates`)}</span>
              </label>
              <DefaultRangePicker
                startPlaceholder={translate(`cx.global.check_in`)}
                endPlaceholder={translate(`cx.global.check_out`)}
                onDatesSet={this.onDatesChange}
                isOutsideRange={this.isOutsideRange}
                displayFormat={this.props.brand.displayFormat}
                readOnly
              />
            </div>
            <div className="details-multi-guests">
              <label>
                <span>{translate(`cx.search.filter.num_guests`)}</span>
              </label>
              <figure className="details-booking-num-guests">
                <select
                  value={this.props.guests}
                  onChange={this.onGuestsChange}
                >
                  <option value={1}>
                    {translate(`global.parsers.num_guests.single`, { num: 1 })}
                  </option>
                  <option value={2}>
                    {translate(`global.parsers.num_guests.plural`, { num: 2 })}
                  </option>
                  <option value={3}>
                    {translate(`global.parsers.num_guests.plural`, { num: 3 })}
                  </option>
                  <option value={4}>
                    {translate(`global.parsers.num_guests.plural`, { num: 4 })}
                  </option>
                  <option value={5}>
                    {translate(`global.parsers.num_guests.plural`, { num: 5 })}
                  </option>
                  <option value={6}>
                    {translate(`global.parsers.num_guests.plural`, { num: 6 })}
                  </option>
                  <option value={7}>
                    {translate(`global.parsers.num_guests.plural`, { num: 7 })}
                  </option>
                  <option value={8}>
                    {translate(`global.parsers.num_guests.plural`, { num: 8 })}
                  </option>
                  <option value={9}>
                    {translate(`global.parsers.num_guests.plural`, { num: 9 })}
                  </option>
                  <option value={10}>
                    {translate(`global.parsers.num_guests.plural`, { num: 10 })}
                  </option>
                  <option value={11}>
                    {translate(`global.parsers.num_guests.plural`, { num: 11 })}
                  </option>
                  <option value={12}>
                    {translate(`global.parsers.num_guests.plural`, { num: 12 })}
                  </option>
                  <option value={13}>
                    {translate(`global.parsers.num_guests.plural`, { num: 13 })}
                  </option>
                  <option value={14}>
                    {translate(`global.parsers.num_guests.plural`, { num: 14 })}
                  </option>
                  <option value={15}>
                    {translate(`global.parsers.num_guests.plural`, { num: 15 })}
                  </option>
                  <option value={16}>
                    {translate(`global.parsers.num_guests.plural`, { num: 16 })}
                  </option>
                  <option value={17}>
                    {translate(`global.parsers.num_guests.plural`, { num: 17 })}
                  </option>
                  <option value={18}>
                    {translate(`global.parsers.num_guests.plural`, { num: 18 })}
                  </option>
                  <option value={19}>
                    {translate(`global.parsers.num_guests.plural`, { num: 19 })}
                  </option>
                  <option value={20}>
                    {translate(`global.parsers.num_guests.plural`, { num: 20 })}
                  </option>
                  <option value={21}>
                    {translate(`global.parsers.num_guests.plural`, { num: 21 })}
                  </option>
                  <option value={22}>
                    {translate(`global.parsers.num_guests.plural`, { num: 22 })}
                  </option>
                  <option value={23}>
                    {translate(`global.parsers.num_guests.plural`, { num: 23 })}
                  </option>
                  <option value={24}>
                    {translate(`global.parsers.num_guests.plural`, { num: 24 })}
                  </option>
                </select>
              </figure>
            </div>
          </div>
        </section>
      </Sticky>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(MultiDatesGuests);