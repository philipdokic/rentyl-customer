// Dependencies
// -----------------------------------------------
import React from 'react';
import get from 'lodash/get';
import moment from 'moment';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->PRICING(PAYMENT) -------------------
// -----------------------------------------------
export default class Pricing extends React.Component {

  // Render Charge
  // ---------------------------------------------
  renderCharge(charge) {
    const translate = ReactI18n.getIntlMessage;
    const amount_charged = parseFloat(charge.amount_charged).toFixed(2);

    if (charge.status == 'charged') {
      return (
        <tr key={charge.id}>
          <td>
            <div>
              {moment(charge.created_at).format(
                get(this, 'props.displayFormat') === 'DD/MM/YYYY'
                  ? 'D MMMM, YYYY'
                  : 'MMMM D, YYYY'
              )}
            </div>
            <small>
              {translate(`cx.receipt.cc_info`, {
                brand: charge.cc_brand,
                last_4: charge.cc_last_4
              })}
            </small>
          </td>
          <td>
            -{' '}
            {translate(`global.parsers.currency.${charge.currency}`, {
              value: amount_charged
            })}
          </td>
        </tr>
      );
    } else {
      return null;
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const total = (Math.floor(parseFloat(this.props.booking.price_total) * 100)/100).toFixed(2);
    const paid = (Math.floor(parseFloat(this.props.booking.price_paid) * 100)/100).toFixed(2);
    let remaining = (total - paid).toFixed(2);

    if (remaining < 0) {
      remaining = (0).toFixed(2);
    }

    return (
      <section className="receipt-info-section">
        <div className="receipt-info-subsection">
          <h3>{translate(`cx.global.payment_information`)}</h3>
          <table className="receipt-pricing-breakdown">
            <tbody>
              <tr className="total">
                <td>{translate(`cx.global.total`)}</td>
                <td>
                  {translate(`global.parsers.currency.${this.props.currency}`, {
                    value: total
                  })}
                </td>
              </tr>
              {this.props.charges.map(charge => this.renderCharge(charge))}
              <tr className="remaining">
                <td>{translate(`cx.global.remaining`)}</td>
                <td>
                  {translate(`global.parsers.currency.${this.props.currency}`, {
                    value: remaining
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }
}
