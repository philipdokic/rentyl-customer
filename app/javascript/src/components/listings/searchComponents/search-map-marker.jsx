// Dependencies
// -----------------------------------------------
import React from 'react';
import Link from '../resources/link';

// -----------------------------------------------
// COMPONENT->SEARCH-MAP-MARKER ------------------
// -----------------------------------------------
export default class SearchMapMarker extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
    this.state = {
      isExpanded: false
    };
  }

  toggleExpanded = e => {
    e.preventDefault();
    this.setState({
      isExpanded: !this.state.isExpanded
    });
  };

  renderExpandedInfo = () => {
    const translate = this.props.translate;
    const currency = this.props.result.currency;
    if (this.props.result.property.multi_unit) {
      return (
        <ul>
          <li>
            {translate(
              `global.property_type.${this.props.result.property.property_type}`
            )}
          </li>
          <li>
            {translate(`cx.search.num_sleep`, {
              num: this.props.result.listings.length,
              s: this.props.result.listings.length > 1 ? 's' : ''
            })}
          </li>
        </ul>
      );
    } else {
      return (
        <ul>
          <li>
            {translate(
              `global.unit_type.${this.props.result.listings[0].unit.unit_type}`
            )}
          </li>
          <li>
            {translate(`cx.search.num_sleep`, {
              num: this.props.result.listings[0].unit.num_sleep,
              s: this.props.result.listings[0].unit.num_sleep > 1 ? 's' : ''
            })}
          </li>
          {this.props.result.listings[0].unit.num_bedrooms ? (
            <li>
              {translate(`cx.search.num_bedrooms`, {
                num: this.props.result.listings[0].unit.num_bedrooms,
                s: this.props.result.listings[0].unit.num_bedrooms > 1 ? 's' : ''
              })}
            </li>
          ) : null}
          {this.props.result.listings[0].unit.num_bathrooms ? (
            <li>
              {translate(`cx.search.num_bathrooms`, {
                num: this.props.result.listings[0].unit.num_bathrooms,
                s: this.props.result.listings[0].unit.num_bathrooms > 1 ? 's' : ''
              })}
            </li>
          ) : null}
        </ul>
      );
    }
  };

  render() {
    const translate = this.props.translate;
    const currency = this.props.result.currency;
    if (this.state.isExpanded) {
      return (
        <div className="search-map-marker map-marker map-marker-expanded">
          <div className={'search-map-close-link-wrapper'}>
            <a
              href="#"
              className="close-link adjust-for-map"
              onClick={e => this.toggleExpanded(e)}
            >
              Close <i className={'fas fa-times'}></i>
            </a>
          </div>
          <Link
            to={`/listings/${this.props.result.slug +
              this.props.getStringifiedQueryString()}`}
            target="_blank"
          >
            <b>
              {translate(`global.parsers.currency.${currency}`, {
                value: Math.round(this.props.result.bookable_nightly_price)
              })}{' '}
              |{' '}
            </b>
            <span>{this.props.result.property.name}</span>
          </Link>
          {this.renderExpandedInfo()}
        </div>
      );
    } else {
      return (
        <div
          className="search-map-marker map-marker"
          onClick={e => this.toggleExpanded(e)}
        >
          {translate(`global.parsers.currency.${currency}`, {
            value: Math.round(this.props.result.bookable_nightly_price)
          })}
        </div>
      );
    }
  }
}
