// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import AmenitiesList from '../amenities-list';

// -----------------------------------------------
// COMPONENT->MULTI-PROPOERTY-AMENITIES ----------
// -----------------------------------------------
class MultiPropertyAmenities extends React.Component {

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    $(e.target).remove();
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

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
            <AmenitiesList
              features={this.props.listing.property.features_adventure}
              features_label="features_adventure"
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
          </div>
          <a href="#" className="expand-link" onClick={e => this.unTruncate(e)}>
            {translate(`global.actions.expand`)}
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
export default connect(mapStateToProps)(MultiPropertyAmenities);