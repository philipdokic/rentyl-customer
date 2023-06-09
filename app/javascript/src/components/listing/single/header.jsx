// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import Scrollchor from 'react-scrollchor';
import styled from 'styled-components';

// Styles
// -----------------------------------------------
const ListItem = styled.li`
  display: flex;
  padding-top: 0.5em;
  padding-right: 1em;
`;

// -----------------------------------------------
// COMPONENT->HEADER -----------------------------
// -----------------------------------------------
class Header extends React.Component {

  // Render Bathrooms
  // ---------------------------------------------
  renderBathrooms() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.unit.num_bathrooms) {
      return (
        <ListItem>
          <i className={`feature-icon sink-icon`} />{' '}
          {translate(
            `global.parsers.num_bathrooms.${
            this.props.listing.unit.num_bathrooms > 1 ? 'plural' : 'single'
            }`,
            {num: this.props.listing.unit.num_bathrooms}
          ).replace('+', '')}
        </ListItem>
      );
    }
  }

  // Render Bedrooms
  // ---------------------------------------------
  renderBedrooms() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.unit.num_bedrooms) {
      return (
        <ListItem>
          <i className={`feature-icon open-door-icon`} />{' '}
          {translate(
            `global.parsers.num_bedrooms.${
            this.props.listing.unit.num_bedrooms > 1 ? 'plural' : 'single'
            }`,
            {num: this.props.listing.unit.num_bedrooms}
          ).replace('+', '')}
        </ListItem>
      );
    }
  }

  // Render Sleeps
  // ---------------------------------------------
  renderSleeps() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.unit.num_sleeps) {
      return (
        <ListItem>
          <i className={`feature-icon guest-icon`} />{' '}
          {translate(
            `global.parsers.num_guests.${
              this.props.listing.unit.num_sleep > 1 ? 'plural' : 'single'
            }`,
            { num: this.props.listing.unit.num_sleep }
          ).replace('+', '')}
        </ListItem>
      );
    }
  }

  // Render Type
  // ---------------------------------------------
  renderType() {
    const translate = ReactI18n.getIntlMessage;

    if (this.props.listing.unit.unit_type) {
      return (
        <ListItem>
          <i className={`feature-icon house-icon`} />{' '}
          {translate(
            `global.property_type.${this.props.listing.property.property_type}`
          )}
        </ListItem>
      );
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    const { adr_city, adr_state } = this.props.listing.location;
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-header" id="details-overview">
        <main>
          <figure>
            <h1 className="font-heading">{this.props.listing.room_type_name || this.props.listing.property.name}</h1>
            <h2 className="highlight">
              {this.props.listing.property.summary_headline}
            </h2>
            {this.props.listing.room_type_name && <figure>{this.props.listing.property.name}</figure>}
            <figure className="details-header-location">
              <address>
                {adr_city}, {adr_state}
              </address>
              <Scrollchor to="details-map">
                {translate('cx.details.view_map')}
              </Scrollchor>
            </figure>
            {this.props.listing.featured ? (
              <figure className="featured-listing-banner">
                <i>★</i>
                <span>{translate(`cx.global.listing.featured.single`)}</span>
              </figure>
            ) : null}
          </figure>
          <figure>
            <ul style={{ display: 'flex' }}>
              {this.renderType()}
              {this.renderBedrooms()}
              {this.renderBathrooms()}
              {this.renderSleeps()}
            </ul>
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
export default connect(mapStateToProps)(Header);
