// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Styled Components
// -----------------------------------------------
const CurrencyText = styled.p`
  font-weight: 600;
`;

// -----------------------------------------------
// COMPONENT->BOOKING-HEADER ---------------------
// -----------------------------------------------
class BookingHeader extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props, _railsContext) {
    super(props);
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
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
    } else if (this.props.listing.average_default_nightly_price) {
      return (
        <header className="details-booking-header invert">
          <CurrencyText>
            {translate(`global.parsers.currency.${currency}`, {
              value: Math.round(this.props.listing.average_default_nightly_price)
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

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(BookingHeader);