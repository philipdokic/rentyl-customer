// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';

// -----------------------------------------------
// COMPONENT->META -------------------------------
// -----------------------------------------------
class Meta extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <Helmet>
        <title>{this.props.page.meta_title}</title>
        <link rel="canonical" href={`/pages/${this.props.page.slug}`} />
        <meta name="description" content={this.props.page.meta_description} />
        <meta itemprop="name" content={this.props.brand.name} />
        <meta itemprop="description" content={this.props.page.meta_description} />
        <meta itemprop="image" content="https://example.com/image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={this.props.brand.brand_info.social.social_twitter} />
        <meta name="twitter:url" content={`${this.props.brand.canonical}/pages/${this.props.page.slug}`} />
        <meta name="twitter:title" content={this.props.page.meta_title} />
        <meta name="twitter:description" content={this.props.page.meta_description} />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:site_name" content={this.props.brand.name} />
        <meta property="og:title" content={this.props.page.meta_title} />
        <meta property="og:description" content={this.props.page.meta_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${this.props.brand.canonical}/pages/${this.props.page.slug}`} />
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