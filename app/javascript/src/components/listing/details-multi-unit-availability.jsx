// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import { Calendar } from 'react-calendar';

export default class DetailsMultiUnitAvailability extends React.Component {
  constructor(props) {
    super(props);
  }

  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $(e.target).remove();
  };

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

  render() {
    const translate = this.props.translate;
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
