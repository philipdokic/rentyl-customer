// Dependencies
// -----------------------------------------------
import React from 'react';
import { Calendar } from 'react-calendar';
import { connect } from 'react-redux';
import { isInclusivelyAfterDay, isInclusivelyBeforeDay } from 'react-dates';
import moment from 'moment';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->AVAILABILITY -----------------------
// -----------------------------------------------
class SingleAvailability extends React.Component {

  // UnTruncate
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

    if (this.props.listing.booking_calendar.hasOwnProperty(key)) {
      const keyDate = this.props.listing.booking_calendar[key];

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

      if (this.props.listing.availability_calendar.hasOwnProperty(key)) {
        availability = this.props.listing.availability_calendar[key].availability;
      } else {
        availability = this.props.listing.default_availability[dayOfWeek].availability;
      }
      return availability === 'available' || availability === 'inquiry'
        ? true
        : false;
    }
  };

  // Render
  // ---------------------------------------------
  render() {
    // Updates to the react-dates library have messed up this calendar
    // Leaving off the page until we get it fixed
    return null;
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

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(SingleAvailability);
