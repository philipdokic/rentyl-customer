// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import Scrollchor from 'react-scrollchor';

// -----------------------------------------------
// COMPONENT->MULTI-PROPERTY-HEADER --------------
// -----------------------------------------------
class MultiPropertyHeader extends React.Component {

  // Render Type
  // ---------------------------------------------
  renderType() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.property.property_type) {
      return (
        <li>
          <b>{translate('cx.global.amenities.property_type_label')}:</b>{' '}
          {translate(
            `global.property_type.${this.props.listing.property.property_type}`
          )}
        </li>
      );
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-header" id="details-overview">
        <main>
          <figure>
            <h1 className="font-heading">{this.props.listing.property.name}</h1>
            <h2 className="highlight">
              {this.props.listing.property.summary_headline}
            </h2>
            <figure className="details-header-location">
              <address>
                {this.props.listing.location.adr_city}, {this.props.listing.location.adr_state}
              </address>
              <Scrollchor to="details-map">
                {translate('cx.details.view_map')}
              </Scrollchor>
            </figure>
          </figure>
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
export default connect(mapStateToProps)(MultiPropertyHeader);