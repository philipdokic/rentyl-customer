// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// -----------------------------------------------
// COMPONENT->DEPOSIT ----------------------------
// -----------------------------------------------
export default class Deposit extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
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
                  {translate(`global.parsers.currency.${this.props.currency}`, {
                    value: parseFloat( this.props.amount ).toFixed(2)
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
