// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import { get } from 'lodash'

// Components
// -----------------------------------------------
import SearchForm from './search-form';

// Styles
// -----------------------------------------------
const searchStyle = {
  position: 'absolute',
  marginLeft: 'auto',
  marginRight: 'auto',
  left: 0,
  right: 0,
  top: '10em'
};

// -----------------------------------------------
// COMPONENT->JUMBOTRON --------------------------
// -----------------------------------------------
class Jumbotron extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      error: false
    };
  }

  // Set Error
  // ---------------------------------------------
  setError = val => this.setState({ error: val });

  // Generate Hero Image
  // ---------------------------------------------
  generateHeroImage() {
    if (this.props.brand.home.hero_image) {
      return this.props.brand.home.hero_image;
    } else {
      return '';
    }
  }

  // Render
  // ---------------------------------------------
  render() {
    const heroImage = this.generateHeroImage();
    const custom_hero_html = get(this, 'props.brand.brand_info.custom_hero_html');

    return (
      <div>
        {custom_hero_html ? (
          <div className={'custom-hero-html-wrapper'}>
            <div className="custom-search-form" style={searchStyle}>
              <SearchForm
                error={this.state.error}
                setError={this.setError}
              />
            </div>
            <div
              dangerouslySetInnerHTML={{
                __html: custom_hero_html
              }}
            />
          </div>
        ) : (
          <header
            className={`homepage-jumbotron`}
            className={`homepage-jumbotron background-${
              this.props.brand.home.options.header_background
            }`}
            style={{ backgroundImage: `url(${heroImage})` }}
          >
            <div className="homepage-jumbotron-container">
              {this.props.brand.home.payload.header ? (
                <h1 className="font-heading">{this.props.brand.home.payload.header}</h1>
              ) : null}
              {this.props.brand.home.payload.subheader ? <h2>{this.props.brand.home.payload.subheader}</h2> : null}
              <SearchForm
                error={this.state.error}
                setError={this.setError}
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

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand.id ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Jumbotron)
