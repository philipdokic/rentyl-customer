// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import { DetailsAmenitiesList } from '../../atoms';
import FeaturedAmenities from './featured-amenities';

export default class DetailsSingleAmenities extends React.Component {
  constructor(props) {
    super(props);
  }

  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $('.amenities-expand-link').addClass('hidden');
    $('.amenities-minimize-link').removeClass('hidden');
  };

  truncate = e => {
    e.preventDefault();
    $(this.truncated).addClass('truncated');
    $('.amenities-minimize-link').addClass('hidden');
    $('.amenities-expand-link').removeClass('hidden');
  };

  render() {
    const translate = this.props.translate;
    return (
      <section className="details-amenities">
        <header>
          <AmenitiesHeader>
            {translate(`cx.details.headers.amenities`)}
          </AmenitiesHeader>
        </header>
        <main>
          <FeaturedAmenities
            featuresAmenities={this.props.features_amenities}
            featuresDining={this.props.features_dining}
            featuresEntertainment={this.props.features_entertainment}
            featuresSpa={this.props.features_spa}
            featuresOutdoor={this.props.features_outdoor}
            translate={translate}
          />
          <div
            className="truncated"
            ref={node => {
              this.truncated = node;
            }}
          >
            <DetailsAmenitiesList
              features={this.props.features_accommodations}
              features_label="features_accommodations"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_adventure}
              features_label="features_adventure"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_amenities}
              features_label="features_amenities"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_attractions}
              features_label="features_attractions"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_car}
              features_label="features_car"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_dining}
              features_label="features_dining"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_entertainment}
              features_label="features_entertainment"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_leisure}
              features_label="features_leisure"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_local}
              features_label="features_local"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_location}
              features_label="features_location"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_outdoor}
              features_label="features_outdoor"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_spa}
              features_label="features_spa"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_suitability}
              features_label="features_suitability"
              translate={this.props.translate}
            />
            <DetailsAmenitiesList
              features={this.props.features_themes}
              features_label="features_themes"
              translate={this.props.translate}
            />
          </div>
          <a
            href="#"
            className="amenities-expand-link"
            onClick={e => this.unTruncate(e)}
          >
            {translate(`global.actions.expand`)}
          </a>
          <a
            href="#"
            className="amenities-minimize-link hidden"
            onClick={e => this.truncate(e)}
          >
            {translate('global.actions.collapse')}
          </a>
        </main>
      </section>
    );
  }
}

const AmenitiesHeader = styled.p`
  font-size: 22px;
`;
