// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import AmenitiesList from '../amenities-list';
import FeaturedAmenities from './featured-amenities';

// Styles
// -----------------------------------------------
const AmenitiesHeader = styled.p`
  font-size: 22px;
`;

// -----------------------------------------------
// COMPONENT->AMENITIES --------------------------
// -----------------------------------------------
class Amenities extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      amenities_expand_link: '',
      amenities_minimize_link: 'hidden',
      truncate: 'truncated'
    };
  }

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    this.setState({
      amenities_expand_link: 'hidden',
      amenities_minimize_link: '',
      truncate: ''
    });
  };

  // Truncate
  // ---------------------------------------------
  truncate = e => {
    e.preventDefault();
    this.setState({
      amenities_expand_link: '',
      amenities_minimize_link: 'hidden',
      truncate: 'truncated'
    });
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="details-amenities">
        <header>
          <AmenitiesHeader>
            {translate(`cx.details.headers.amenities`)}
          </AmenitiesHeader>
        </header>
        <main>
          <FeaturedAmenities />
          <div
            className={`${this.state.truncate}`}
            ref={node => {
              this.truncated = node;
            }}
          >
            <AmenitiesList
              features={this.props.listing.unit.features_accommodations}
              features_label="features_accommodations"
            />
            <AmenitiesList
              features={this.props.listing.property.features_adventure}
              features_label="features_adventure"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_amenities}
              features_label="features_amenities"
            />
            <AmenitiesList
              features={this.props.listing.property.features_attractions}
              features_label="features_attractions"
            />
            <AmenitiesList
              features={this.props.listing.property.features_car}
              features_label="features_car"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_dining}
              features_label="features_dining"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_entertainment}
              features_label="features_entertainment"
            />
            <AmenitiesList
              features={this.props.listing.property.features_leisure}
              features_label="features_leisure"
            />
            <AmenitiesList
              features={this.props.listing.property.features_local}
              features_label="features_local"
            />
            <AmenitiesList
              features={this.props.listing.property.features_location}
              features_label="features_location"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_outdoor}
              features_label="features_outdoor"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_spa}
              features_label="features_spa"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_suitability}
              features_label="features_suitability"
            />
            <AmenitiesList
              features={this.props.listing.unit.features_themes}
              features_label="features_themes"
            />
          </div>
          <a
            href="#"
            className={`amenities-expand-link ${this.state.amenities_expand_link}`}
            onClick={e => this.unTruncate(e)}
          >
            {translate(`global.actions.expand`)}
          </a>
          <a
            href="#"
            className={`amenities-minimize-link ${this.state.amenities_minimize_link}`}
            onClick={e => this.truncate(e)}
          >
            {translate('global.actions.collapse')}
          </a>
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
export default connect(mapStateToProps)(Amenities);