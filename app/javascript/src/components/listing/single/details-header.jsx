// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Scrollchor from 'react-scrollchor';

const liStyle = {
  paddingRight: '1em',
  paddingTop: '0.5em',
  display: 'flex'
};

export default class DetailsSingleHeader extends React.Component {
  constructor(props) {
    super(props);
  }

  renderBathrooms() {
    const translate = this.props.translate;
    if (this.props.unit.num_bathrooms) {
      return (
        <li style={liStyle}>
          <i className={`feature-icon sink-icon`} />{' '}
          {translate(
            `global.parsers.num_bathrooms.${
            this.props.unit.num_bathrooms > 1 ? 'plural' : 'single'
            }`,
            {num: this.props.unit.num_bathrooms}
          ).replace('+', '')}
        </li>
      );
    }
  }

  renderBedrooms() {
    const translate = this.props.translate;
    if (this.props.unit.num_bedrooms) {
      return (
        <li style={liStyle}>
          <i className={`feature-icon open-door-icon`} />{' '}
          {translate(
            `global.parsers.num_bedrooms.${
            this.props.unit.num_bedrooms > 1 ? 'plural' : 'single'
            }`,
            {num: this.props.unit.num_bedrooms}
          ).replace('+', '')}
        </li>
      );
    }
  }

  renderSleeps() {
    const translate = this.props.translate;
    if (this.props.unit.num_sleeps) {
      return (
        <li style={liStyle}>
          <i className={`feature-icon guest-icon`} />{' '}
          {translate(
            `global.parsers.num_guests.${
              this.props.unit.num_sleep > 1 ? 'plural' : 'single'
            }`,
            { num: this.props.unit.num_sleep }
          ).replace('+', '')}
        </li>
      );
    }
  }

  renderType() {
    const translate = this.props.translate;
    if (this.props.unit.unit_type) {
      return (
        <li style={liStyle}>
          <i className={`feature-icon house-icon`} />{' '}
          {translate(
            `global.property_type.${this.props.property.property_type}`
          )}
        </li>
      );
    }
  }

  render() {
    const { adr_city, adr_state } = this.props.location; 
    const translate = this.props.translate;
    return (
      <section className="details-header" id="details-overview">
        <main>
          <figure>
            <h1 className="font-heading">{this.props.property.name}</h1>
            <h2 className="highlight">
              {this.props.property.summary_headline}
            </h2>
            <figure className="details-header-location">
              <address>
                {adr_city}, {adr_state}
              </address>
              <Scrollchor to="details-map">
                {translate('cx.details.view_map')}
              </Scrollchor>
            </figure>
            {this.props.featured ? (
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
