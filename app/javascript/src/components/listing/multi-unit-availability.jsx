// Dependencies
// -----------------------------------------------
import React from 'react';
import { Calendar } from 'react-calendar';
import moment from 'moment';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->MULTI-UNIT-AVAILABILITY ------------
// -----------------------------------------------
export default class MultiUnitAvailability extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $(e.target).remove();
  };

  // Create Unavailable Dates
  // ---------------------------------------------
  createUnavailableDates = () => {
    const startDate = moment();
    const endDate = moment().add(23, 'months');
    let iterator = startDate.clone();
    let mods = [
      {
        date: moment(),
        classNames: ['current'],
        component: ['day']
      }
    ];

    while (isInclusivelyBeforeDay(iterator, endDate)) {
      const dailyAvailability = this.getDailyAvailability(iterator);

      if (dailyAvailability === false) {
        mods.push({
          date: iterator.clone(),
          component: ['day'],
          classNames: ['unavailable']
        });
      } else if (dailyAvailability === 'check_in') {
        mods.push({
          date: iterator.clone(),
          component: ['day'],
          classNames: ['check_in']
        });
      } else if (dailyAvailability === 'check_out') {
        mods.push({
          date: iterator.clone(),
          component: ['day'],
          classNames: ['check_out']
        });
      }
      iterator.add(1, 'days');
    }
    return mods;
  };

  // Get Daily Availability
  // ---------------------------------------------
  getDailyAvailability = day => {
    const dayOfWeek = day.day();
    const key = day.format('DD-MM-YYYY');

    if (this.props.booking_calendar.hasOwnProperty(key)) {
      const keyDate = this.props.booking_calendar[key];

      if (keyDate['status'] === undefined || keyDate['status'] === 'blocked') {
        return false;
      } else if (keyDate['status'] === 'check_in') {
        return 'check_in';
      } else if (keyDate['status'] === 'check_out') {
        return 'check_out';
      } else {
        return true;
      }
    } else {
      let availability = '';

      if (this.props.availability_calendar.hasOwnProperty(key)) {
        availability = this.props.availability_calendar[key].availability;
      } else {
        availability = this.props.default_availability[dayOfWeek].availability;
      }
      return availability === 'available' || availability === 'inquiry'
        ? true
        : false;
    }
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-availability" id="details-availability">
        <header>
          <h3>{translate(`cx.details.headers.availability`)}</h3>
        </header>
        <main>
          <div
            className="calendar truncated"
            ref={node => {
              this.truncated = node;
            }}
          >
            <Calendar
              startDate={moment()}
              endDate={moment().add(23, 'months')}
              mods={this.createUnavailableDates()}
            />
          </div>
          <a href="#" className="expand-link" onClick={e => this.unTruncate(e)}>
            {translate(`global.actions.expand`)}
          </a>
        </main>
      </section>
    );
  }
}
