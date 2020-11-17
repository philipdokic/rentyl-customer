// Dependencies
// -----------------------------------------------
import React from 'react';
import { get } from 'lodash';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->LISTING(RECEIPT) -------------------
// -----------------------------------------------
export default class Listing extends React.Component {

  // Build Details Link
  // ---------------------------------------------
  buildDetailsLink() {
    let link = '/listings/' + this.props.slug;
    return link;
  }

  // Build Address
  // ---------------------------------------------
  buildAddress() {
    const loc = this.props.location;
    let address = [];
    if (loc.adr_street) {
      address.push(loc.adr_street);
    }
    if (loc.adr_unit) {
      address.push(loc.adr_unit);
    }
    if (loc.adr_city) {
      address.push(loc.adr_city);
    }
    if (loc.adr_state) {
      address.push(loc.adr_state);
    }
    if (loc.adr_country) {
      address.push(loc.adr_country);
    }
    if (loc.adr_postal_code) {
      address.push(loc.adr_postal_code);
    }
    return address.join(', ');
  }

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const address = this.buildAddress();

    return (
      <section className="receipt-info-section receipt-info-listing">
        {this.props.featured_image ? (
          <div
            className="featured-image print-hide"
            style={{
              backgroundImage: `url(${get(this, 'props.featured_image.image.small.url')})`
            }}
          />
        ) : null}
        <div className="receipt-info-subsection receipt-info-listing-header">
          {this.props.property.multi_unit ? (
            <h2>
              {this.props.property.name} | {this.props.unit.name}
            </h2>
          ) : (
              <h2>{this.props.property.name}</h2>
            )}
          <address>{address}</address>
          <ul>
            <li>
              <Link to={this.buildDetailsLink()} target="_blank">
                {translate(`cx.global.see_details.long`)}
              </Link>
            </li>
            <li>
              <Link
                to={`https://www.google.com/maps/@${
                  this.props.location.geo_latitude
                  },${
                  this.props.location.geo_longitude
                  },17z?q=${encodeURIComponent(address)}`}
                target="_blank"
              >
                {translate(`cx.receipt.view_map`)}
              </Link>
            </li>
          </ul>
        </div>
      </section>
    );
  }
}
