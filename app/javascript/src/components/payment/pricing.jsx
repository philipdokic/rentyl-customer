// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import get from 'lodash/get';

const RenderDiscount = (discount, translate, currency) => {
  return (
    <tr>
      <td>
        {translate(`global.parsers.discount.${discount[0]}`, {
          value: discount[1]
        })}
      </td>
      <td>
        <b className="discount">
          -
          {translate(`global.parsers.currency.${currency}`, {
            value: parseFloat(discount[2]).toFixed(2)
          })}
        </b>
      </td>
    </tr>
  );
};

const RenderLineItems = (pricing, nights, currency, translate) => {
  return (
    <>
      <tr className="line-item">
        <td>
          {translate(`global.parsers.currency_avg.${currency}`, {
            value: pricing.average_nightly_price
          })}{' '}
          ×{' '}
          {translate(
            `global.parsers.num_nights.${nights > 1 ? 'plural' : 'single'}`,
            { nights: nights }
          )}
        </td>
        <td>
          {translate(`global.parsers.currency.${currency}`, {
            value: pricing.room_rate
          })}
        </td>
      </tr>
      {pricing.discount[0] &&
        pricing.discount[1] > 0 &&
        RenderDiscount(pricing.discount, translate, currency)}
      {pricing.fees.map(
        fee =>
          fee.total_cents > 0 && RenderFeeLineItem(fee, translate, currency)
      )}
      {pricing.taxes > 0 && <tr className="line-item">
        <td>{translate(`cx.global.taxes`)}</td>
        <td>
          {translate(`global.parsers.currency.${currency}`, {
            value: pricing.taxes
          })}
        </td>
      </tr>}
    </>
  );
};

const RenderFeeLineItem = (fee, translate, currency) => {
  if (fee.additional_data.included_in_base_rent) {
    return null
  } else {
    return (
      <tr className="line-item">
        <td>{fee.name}</td>
        <td>
          {translate(`global.parsers.currency.${currency}`, {
            value: (fee.total_cents/100).toFixed(2)
          })}
        </td>
      </tr>
    );
  }
};

const RenderCharge = (charge, refunded_amount, translate) => {
  const amount_charged = parseFloat(charge.amount_charged).toFixed(2);
  if (charge.status == 'charged' || charge.status == 'partially_refunded' && refunded_amount > 0 ) {
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
          {charge.charge_type.includes('card') ? translate(`cx.receipt.cc_info`, {
              brand: charge.cc_brand,
              last_4: charge.cc_last_4
            }) : translate(`cx.receipt.payment_info`, { payment_method: charge.charge_type })
            }
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
};

const RenderRefund = (refunded_amount, currency, translate) => {
  if (refunded_amount > 0 ) {
    return (
      <tr className="refund">
        <td>
          <div>
            Refund
          </div>
        </td>
        <td>
          -{' '}
          {translate(`global.parsers.currency.${currency}`, {
            value: refunded_amount
          })}
        </td>
      </tr>
    );
  } else {
    return null;
  }
};

const InfoPricing = ({
  translate,
  booking,
  nights,
  currency,
  charges,
  pricing,
  refunds
}) => {
  const total = (
    Math.floor(parseFloat(booking.price_total) * 100) / 100
  ).toFixed(2);
  const paid = (Math.floor(parseFloat(booking.price_paid) * 100) / 100).toFixed(
    2
  );
  const refunded_amount = parseFloat(refunds).toFixed(2);
  let remaining = (total - paid).toFixed(2);
  if (remaining < 0) {
    remaining = (0).toFixed(2);
  }
  return (
    <>
      <section className="receipt-info-section">
        <div className="receipt-info-subsection">
          <h3>{translate(`cx.global.payment_information`)}</h3>
          <table className="receipt-pricing-breakdown">
            <tbody>
              {RenderLineItems(pricing, nights, currency, translate)}

              <tr className="total">
                <td>{translate(`cx.global.total`)}</td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: total
                  })}
                </td>
              </tr>
              {charges.map(charge => RenderCharge(charge, refunded_amount, translate))}
              {RenderRefund(refunded_amount, currency, translate)}
              <tr className="remaining">
                <td>{translate(`cx.global.remaining`)}</td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: remaining
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>
    </>
  );
};

export default InfoPricing;
