// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

// Components
// -----------------------------------------------
import SearchForm from './search-form';

export default class Jumbotron extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  setError = val => this.setState({ error: val });

  generateHeroImage() {
    if (this.props.hero_image && this.props.hero_image.image) {
      return this.props.hero_image.image.url;
    } else {
      return '';
    }
  }

  render() {
    const translate = this.props.translate;
    const heroImage = this.generateHeroImage();
    return (
      <div>
        {this.props.custom_hero_html ? (
          <>
            <div className="custom-search-form" style={searchStyle}>
              <SearchForm
                translate={translate}
                slug={this.props.slug}
                options={this.props.options}
                google_maps_api_key={this.props.google_maps_api_key}
                organization_id={this.props.organization_id}
                cities={this.props.cities}
                displayFormat={this.props.displayFormat}
                error={this.state.error}
                setError={this.setError}
                maxGuests={this.props.maxGuests}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.custom_hero_html
              }}
            />
          </>
        ) : (
          <header
            className={`homepage-jumbotron background-${
              this.props.options.header_background
            }`}
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="homepage-jumbotron-container">
              {this.props.heading ? (
                <h1 className="font-heading">{this.props.heading}</h1>
              ) : null}
              {this.props.subheading ? <h2>{this.props.subheading}</h2> : null}
              <SearchForm
                translate={translate}
                slug={this.props.slug}
                options={this.props.options}
                google_maps_api_key={this.props.google_maps_api_key}
                organization_id={this.props.organization_id}
                cities={this.props.cities}
                displayFormat={this.props.displayFormat}
                error={this.state.error}
                setError={this.setError}
                maxGuests={this.props.maxGuests}
              />
              {this.state.error ? (
                <p className="search-error">Location required to search</p>
              ) : null}
            </div>
          </header>
        )}
      </div>
    );
  }
}

const searchStyle = {
  position: 'absolute',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  top: '10em'
};
