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
        <title>Title | Site Name</title>
        <link rel="canonical" href={this.props.brand.canonical} />
        <meta name="description" content="custom..." />
        <meta itemprop="name" content={this.props.brand.name} />
        <meta itemprop="description" content="custom..." />
        <meta itemprop="image" content="https://example.com/image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={this.props.brand.brand_info.social.social_twitter} />
        <meta name="twitter:url" content={this.props.brand.canonical} />
        <meta name="twitter:title" content="Title | Site Name" />
        <meta name="twitter:description" content="custom..." />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:site_name" content={this.props.brand.name} />
        <meta property="og:title" content="Title | Site Name" />
        <meta property="og:description" content="custom..." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={this.props.brand.canonical} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:street-address" content={this.props.brand.home.location.adr_street} />
        <meta property="og:locality" content={this.props.brand.home.location.adr_city} />
        <meta property="og:region" content={this.props.brand.home.location.adr_state} />
        <meta property="og:postal-code" content={this.props.brand.home.location.adr_postal_code} />
        <meta property="og:country-name" content={this.props.brand.home.location.adr_country} />
        <meta property="og:email" content={this.props.brand.contact.email} />
        <meta property="og:phone_number" content={this.props.brand.contact.phone_primary.number} />
        {/* JSON/LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org",
            "@type": "LodgingBusiness",
            "name": "${this.props.brand.name}",
            "url": "${this.props.brand.canonical}",
            "telephone": "${this.props.brand.contact.phone_primary.number}",
            "image": "${this.props.brand.logo_image.url}",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${this.props.brand.home.location.adr_street}",
              "addressLocality": "${this.props.brand.home.location.adr_city}",
              "addressRegion": "${this.props.brand.home.location.adr_state}",
              "postalCode": "${this.props.brand.home.location.adr_postal_code}",
              "addressCountry": "${this.props.brand.home.location.adr_country}"
            }
          }
        `}</script>
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