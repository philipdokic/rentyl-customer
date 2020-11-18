// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import Link from '../../links/link';
import { every, some } from 'lodash';

const InfoListing = (props) => {

  const buildDetaisLink = () => {
    let link = '/listings/' + props.slug + '?';
    if (props.checkInDate) {
      link += '&check-in=' + props.checkInDate.format('DD-MM-YYYY');
    }
    if (props.checkOutDate) {
      link += '&check-out=' + props.checkOutDate.format('DD-MM-YYYY');
    }
    if (props.guests) {
      link += '&guests=' + props.guests;
    }
    return link;
  }

  const getDepositRefundPolicy = () => {
    const deposits = props.pricing.deposits;
    if (every(deposits, ['refundable', true])) {
      return 'full';
    } else if (some(deposits, ['refundable', true])) {
      return 'deposit_partial';
    } else {
      return 'no_refund';
    }
  }

  const translate = ReactI18n.getIntlMessage;

  return (
    <section className="checkout-info-listing">
      {props.featured_image ? (
        <div
          className="featured-image"
          style={{
            backgroundImage: `url(${props.featured_image.image.small.url})`
          }}
        />
      ) : null}
      <div className="checkout-info-subsection checkout-info-listing-header">
        {props.property.multi_unit ? (
          <h2>
            {props.property.name} | {props.unit.name}
          </h2>
        ) : (
            <h2>{props.property.name}</h2>
          )}
        <address>{props.obfuscated_address}</address>
        <Link to={buildDetaisLink()} target="_blank">
          {translate(`cx.global.see_details.long`)}
        </Link>
      </div>
      <div className="checkout-info-subsection">
        <table>
          <tbody>
            {props.unit.num_sleep ? (
              <tr>
                <td>{translate('cx.global.amenities.sleeps')}</td>
                <td>{props.unit.num_sleep}</td>
              </tr>
            ) : null}
            {props.unit.num_bedrooms ? (
              <tr>
                <td>{translate('cx.global.amenities.bedrooms')}</td>
                <td>{props.unit.num_bedrooms}</td>
              </tr>
            ) : null}
            {props.unit.num_bathrooms ? (
              <tr>
                <td>{translate('cx.global.amenities.bathrooms')}</td>
                <td>{props.unit.num_bathrooms}</td>
              </tr>
            ) : null}
            {props.listing.refund_policy ? (
              <tr>
                <td>{translate('cx.checkout.cancel_policy')}</td>
                <td>
                  {translate(
                    `global.refund_policy.${props.listing.refund_policy}.label`
                  )}
                  {props.listing.refund_policy === 'custom' ? (
                    <figure className="line-item-description">
                      <i />
                      <span>{props.listing.refund_policy_custom}</span>
                    </figure>
                  ) : (
                      <figure className="line-item-description">
                        <i />
                        <span>
                          {translate(
                            `global.refund_policy.${props.listing.refund_policy}.details`
                          )}
                        </span>
                      </figure>
                    )}
                </td>
              </tr>
            ) : null}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default InfoListing
