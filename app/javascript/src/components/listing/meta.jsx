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
    this.state = {
      review_average: this.props.listing.review_average || 0,
      reviews: this.props.listing.reviews.length || 0
    };
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <Helmet>
        <title>{`${this.props.listing.property.name} | ${this.props.brand.name}`}</title>
        <link rel="canonical" href={`${this.props.listing.slug}`} />
        <meta name="description" content={this.props.listing.property.summary_description} />
        <meta itemprop="name" content={this.props.listing.property.name} />
        <meta itemprop="description" content={this.props.listing.property.summary_description} />
        <meta itemprop="image" content="https://example.com/image.jpg" />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content={this.props.brand.brand_info.social.social_twitter} />
        <meta name="twitter:url" content={`${this.props.brand.canonical}/listings/${this.props.listing.slug}`} />
        <meta name="twitter:title" content={`${this.props.listing.property.name} | ${this.props.brand.name}`} />
        <meta name="twitter:description" content={this.props.listing.property.summary_description} />
        <meta name="twitter:image" content="https://example.com/image.jpg" />
        {/* Facebook */}
        <meta property="og:image" content="http://example.com/image.jpg" />
        <meta property="og:site_name" content={this.props.brand.name} />
        <meta property="og:title" content={`${this.props.listing.property.name} | ${this.props.brand.name}`} />
        <meta property="og:description" content={this.props.listing.property.summary_description} />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={`${this.props.brand.canonical}/listings/${this.props.listing.slug}`} />
        <meta property="og:locale" content="en_US" />
        <meta property="og:street-address" content={this.props.listing.location.adr_street} />
        <meta property="og:locality" content={this.props.listing.location.adr_city} />
        <meta property="og:region" content={this.props.listing.location.adr_state} />
        <meta property="og:postal-code" content={this.props.listing.location.adr_postal_code} />
        <meta property="og:country-name" content={this.props.listing.location.adr_country} />
        <meta property="og:email" content={this.props.brand.contact.email} />
        <meta property="og:phone_number" content={this.props.brand.contact.phone_primary.number} />
        {/* JSON/LD */}
        <script type="application/ld+json">{`
          {
            "@context": "https://schema.org/",
            "@type": "LodgingBusiness",
            "name": "${this.props.listing.property.name}",
            "brand": "${this.props.brand.name}",
            "description": "${this.props.listing.property.summary_description}",
            ${ this.state.reviews > 0 ? `
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "${this.state.review_average}",
                "ratingCount": "${this.state.reviews}"
              },` : '' }
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "${this.props.listing.location.adr_street}",
              "addressLocality": "${this.props.listing.location.adr_city}",
              "addressRegion": "${this.props.listing.location.adr_state}",
              "postalCode": "${this.props.listing.location.adr_postal_code}",
              "addressCountry": "${this.props.listing.location.adr_country}"
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
    brand: state.brand ? state.brand : {},
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Meta);