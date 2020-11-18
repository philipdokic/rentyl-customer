// Dependencies
// -----------------------------------------------
import React from 'react';
import get from 'lodash/get';
import moment from 'moment';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->STAY(PAYMENT) ----------------------
// -----------------------------------------------
export default class Stay extends React.Component {

  // Render Confirmed Header
  // ---------------------------------------------
  renderConfirmedHeader() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.booking.cancelled) {
      return (
        <header className="booking-status-header booking-unconfirmed">
          <h3>{translate(`cx.receipt.booking_status.canceled`)}</h3>
        </header>
      );
    } else {
      return (
        <header className="booking-status-header booking-confirmed">
          <h3>Your Booking Payments are up to date</h3>
        </header>
      );
    }
  }

  // Render Check In
  // ---------------------------------------------
  renderCheckIn() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.checkIn) {
      return (
        <tr>
          <td>{translate(`cx.receipt.check_in`)}</td>
          <td>
            <div>
              {this.props.checkIn.format(
                get(this, 'props.displayFormat') === 'DD/MM/YYYY'
                  ? 'D MMMM, YYYY'
                  : 'MMMM D, YYYY'
              )}
            </div>
            <div>
              {this.props.checkInTime !== 'Invalid date'
                ? this.props.checkInTime
                : null}
            </div>
          </td>
        </tr>
      );
    }
    return null;
  }

  // Render Check Out
  // ---------------------------------------------
  renderCheckOut() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.checkOut) {
      return (
        <tr>
          <td>{translate(`cx.receipt.check_out`)}</td>
          <td>
            <div>
              {this.props.checkOut.format(
                get(this, 'props.displayFormat') === 'DD/MM/YYYY'
                  ? 'D MMMM, YYYY'
                  : 'MMMM D, YYYY'
              )}
            </div>
            <div>
              {this.props.checkOutTime !== 'Invalid date'
                ? this.props.checkOutTime
                : null}
            </div>
          </td>
        </tr>
      );
    }
    return null;
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="receipt-info-section receipt-info-stay">
        {this.renderConfirmedHeader()}
        <div className="receipt-info-subsection">
          <table>
            <tbody>
              <tr>
                <td>{translate(`cx.receipt.booking.short`)}</td>
                <td>{this.props.booking.booking_code}</td>
              </tr>
              <tr>
                <td>{translate(`cx.receipt.booked`)}</td>
                <td>
                  {moment(this.props.booking.created_at).format(
                    get(this, 'props.displayFormat') === 'DD/MM/YYYY'
                      ? 'D MMMM, YYYY'
                      : 'MMMM D, YYYY'
                  )}
                </td>
              </tr>
              {this.renderCheckIn()}
              {this.renderCheckOut()}
              <tr>
                <td>{translate(`cx.receipt.nights`)}</td>
                <td>{this.props.bookingLength}</td>
              </tr>
              <tr>
                <td>{translate(`cx.receipt.guests`)}</td>
                <td>{this.props.guests}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="receipt-info-subsection">
          <h3>{translate(`cx.global.customer_information`)}</h3>
          <ul className="tablify">
            <li>{this.props.customer.name}</li>
            <li>
              <Link to={`mailto:${this.props.customer.email}`}>
                {this.props.customer.email}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
