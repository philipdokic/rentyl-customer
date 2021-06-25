// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import { Link } from 'react-router-dom';

const Deposit = ({ currency, amount, bookingCode }) => {

    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="receipt-info-section">
        <div className="receipt-info-subsection">
          <h3>{translate(`cx.global.payment_information`)}</h3>
          <table className="receipt-pricing-breakdown">
            <tbody>
              <tr className="total">
                <td>Security Deposit Amount</td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: parseFloat(amount).toFixed(2)
                  })}
                </td>
              </tr>
              <tr>
                <Link to={`/my-bookings/payment/${bookingCode}`}>
                  <button className="button">Pay Now</button>
                </Link>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    );
  }

export default Deposit