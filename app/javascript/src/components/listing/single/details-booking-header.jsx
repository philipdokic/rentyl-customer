// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

export default class DetailsBookingHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = this.props.translate;
    const currency = this.props.listing.currency;
    if (this.props.pricing && this.props.pricing.average_nightly_price) {
      return (
        <header className="details-booking-header invert">
          <CurrencyText>
            {translate(`global.parsers.currency.${currency}`, {
              value: Math.round(this.props.pricing.average_nightly_price)
            })}{' '}
            {translate(`cx.global.pricing.per_night`)}
          </CurrencyText>
        </header>
      );
    } else if (this.props.average_default_nightly_price) {
      return (
        <header className="details-booking-header invert">
          <CurrencyText>
            {translate(`global.parsers.currency.${currency}`, {
              value: Math.round(this.props.average_default_nightly_price)
            })}{' '}
            {translate(`cx.global.pricing.avg_per_night`)}
          </CurrencyText>
        </header>
      );
    } else {
      return null;
    }
  }
}

const CurrencyText = styled.p`
  font-weight: 600;
`;
