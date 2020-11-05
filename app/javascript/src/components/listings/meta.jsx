// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

// -----------------------------------------------
// COMPONENT->META -------------------------------
// -----------------------------------------------
class Meta extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    return (
      <Helmet>
        <title>{`Search | ${this.props.brand.name}`}</title>
        <link rel="canonical" href={`${this.props.brand.canonical}/listings/search`} />
        <meta name="description" content={`Search, filter, and book vacation rentals by ${this.props.brand.name}.`} />
        <meta itemprop="name" content={this.props.brand.name} />
        <meta itemprop="description" content={`Search, filter, and book vacation rentals by ${this.props.brand.name}.`} />
        <meta itemprop="image" content="https://example.com/image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        {/* <meta name="twitter:site" content={this.props.brand.brand_info.social.social_twitter} /> */}
        <meta name="twitter:url" content={`${this.props.brand.canonical}/listings/search`} />
        <meta name="twitter:title" content={`Search | ${this.props.brand.name}`} />
        <meta name="twitter:description" content={`Search, filter, and book vacation rentals by ${this.props.brand.name}.`} />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:site_name" content={this.props.brand.name} />
        <meta property="og:title" content={`Search | ${this.props.brand.name}`} />
        <meta property="og:description" content={`Search, filter, and book vacation rentals by ${this.props.brand.name}.`} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${this.props.brand.canonical}/listings/search`} />
        <meta property="og:locale" content="en_US" />
        {/* JSON/LD */}
      </Helmet>
    );
  }
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Meta);