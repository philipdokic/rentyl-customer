// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->FEATURED-LISTINGS-CONTAINER --------
// -----------------------------------------------
class FeaturedListingsContainer extends React.Component {

  // Listing Image
  // ---------------------------------------------
  listingImage = listing => {
    if (listing.image && listing.image.image.small) {
      return listing.image.image.small.url;
    } else if (listing.image && listing.image.image) {
      return listing.image.image.url;
    } else {
      return '';
    }
  };

  // Listing Address
  // ---------------------------------------------
  listingAddress = listing => {
    return (
      <address>
        {listing.location.adr_city}, {listing.location.adr_country}
      </address>
    );
  };

  // Listing Info
  // ---------------------------------------------
  listingInfo = listing => {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section>
        <ul>
          <li>{translate(`global.unit_type.${listing.unit_type}`)}</li>
          <li>{translate(`cx.search.num_sleep`, { num: listing.guests })}</li>
          {listing.bedrooms ? (
            <li>
              {translate(`cx.search.num_bedrooms`, { num: listing.bedrooms })}
            </li>
          ) : null}
          {listing.bathrooms ? (
            <li>
              {translate(`cx.search.num_bathrooms`, { num: listing.bathrooms })}
            </li>
          ) : null}
        </ul>
      </section>
    );
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="home-section">
        <h2 className="text-center">
          {translate(`cx.global.listing.featured.plural`)}
        </h2>

        <div className="featured-tiles">
          {this.props.brand.home.featured_listings.map(listing => (
            <figure className="featured-tile">
              <Link to={`/listings/${listing.slug}`} target="_blank">
                <div
                  className="featured-image"
                  style={{
                    backgroundImage: `url(${this.listingImage(listing)})`
                  }}
                >
                  <figure className="featured-listing-banner">
                    <i>★</i>
                    <span>
                      {translate(`cx.global.listing.featured.single`)}
                    </span>
                  </figure>
                </div>
                <section>
                  <h3>
                    {listing.multi_unit ? (
                      <span>
                        {listing.property_name} | {listing.unit_name}
                      </span>
                    ) : (
                      <span>{listing.property_name}</span>
                    )}
                  </h3>
                  {this.listingAddress(listing)}
                </section>
                {this.listingInfo(listing)}
              </Link>
            </figure>
          ))}
        </div>
      </section>
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
export default connect(mapStateToProps)(FeaturedListingsContainer);
