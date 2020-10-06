// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

// Components
// -----------------------------------------------
import DetailsAmenitiesList from './details-amenities-list';

export default class DetailsMultiUnitAmenities extends React.Component {
  constructor(props) {
    super(props);
  }

  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $(e.target).remove();
  };

  render() {
    const translate = this.props.translate;
    return (
      <section className="details-amenities">
        <header>
          <h3>{translate(`cx.details.headers.amenities`)}</h3>
        </header>
        <main>
          <div
            className="truncated"
            ref={node => {
              this.truncated = node;
            }}
          >
            <DetailsAmenitiesList
              features={this.props.unit.features_accommodations}
              features_label="features_accommodations"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_amenities}
              features_label="features_amenities"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_dining}
              features_label="features_dining"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_entertainment}
              features_label="features_entertainment"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_outdoor}
              features_label="features_outdoor"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_spa}
              features_label="features_spa"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_suitability}
              features_label="features_suitability"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.unit.features_themes}
              features_label="features_themes"
              translate={this.props.translate}
            />
          </div>
          <a href="#" className="expand-link" onClick={e => this.unTruncate(e)}>
            {translate(`global.actions.expand`)}
          </a>
        </main>
      </section>
    );
  }
}
