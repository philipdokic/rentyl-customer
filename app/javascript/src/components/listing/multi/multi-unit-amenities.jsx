// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import AmenitiesList from '../amenities-list';

// -----------------------------------------------
// COMPONENT->MULTI-UNIT-AMENITIES ---------------
// -----------------------------------------------
export default class MultiUnitAmenities extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      hideMoreLink: false
    }
  }

  // Untruncate
  // ---------------------------------------------
  unTruncate = e => {
    e.preventDefault();
    $(this.truncated).removeClass('truncated');
    this.setState({hideMoreLink: true});
  };

  truncate = e => {
    e.preventDefault();
    $(this.truncated).addClass('truncated');
    this.setState({hideMoreLink: false});
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
              features={this.props.unit.features_accommodations}
              features_label="features_accommodations"
            />
            <AmenitiesList
              features={this.props.unit.features_amenities}
              features_label="features_amenities"
            />
            <AmenitiesList
              features={this.props.unit.features_dining}
              features_label="features_dining"
            />
            <AmenitiesList
              features={this.props.unit.features_entertainment}
              features_label="features_entertainment"
            />
            <AmenitiesList
              features={this.props.unit.features_outdoor}
              features_label="features_outdoor"
            />
            <AmenitiesList
              features={this.props.unit.features_spa}
              features_label="features_spa"
            />
            <AmenitiesList
              features={this.props.unit.features_suitability}
              features_label="features_suitability"
            />
            <AmenitiesList
              features={this.props.unit.features_themes}
              features_label="features_themes"
            />
          </div>
          {this.state.hideMoreLink ? (
            <a href="#" className="expand-link" onClick={e => this.truncate(e)}>
              {translate(`global.actions.collapse`)}
            </a>
          ) : (
            <a href="#" className="expand-link" onClick={e => this.unTruncate(e)}>
              {translate(`global.actions.expand`)}
            </a>
          )}
        </main>
      </section>
    );
  }
}
