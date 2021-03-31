// Dependencies
// -----------------------------------------------
import React from 'react';
import { get } from 'lodash';
import Link from '../resources/link';
import styled from 'styled-components'
import Rater from 'react-rater';

// Components
// -----------------------------------------------
import StarContainer from '../resources/star-container';

// Styled Components
// -----------------------------------------------
const RatingContainer = styled(StarContainer)`
  display: flex;
  align-items: center;

  .react-rater {
    margin-left: 8px;
  }
`;

const HeaderWithRating = styled.h3`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const BoltCircle = styled.div`
  background-color: white;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  position: absolute;
  right: 8px;
  top: 8px;
  display: flex;
  align-items: center;
  justify-content: center;

  .bolt-icon {
    width: 12px;
    height: 20px;
  }
`;

const PropertyType = styled.div`
  font-size: 14px;
  margin: 8px 0 0;
`;

// -----------------------------------------------
// COMPONENT->SEARCH-TILE ------------------------
// -----------------------------------------------
const SearchTile = props => {
  const translate = props.translate;

  const renderPrice = () => {
    const { currency, bookable_nightly_price } = { ...props.result };

    if (props.result && props.result.listings) {
      return props.result.listings[0]['bookable_nightly_price'] <
        props.result.listings[0]['bookable_nightly_price_before_promotion'] ? (
        <>
          <div>
            <b style={{ textDecoration: 'line-through', color: 'red' }}>
              {translate(`global.parsers.currency.${currency}`, {
                value: Math.round(
                  props.result.listings[0][
                    'bookable_nightly_price_before_promotion'
                  ]
                )
              })}{' '}
            </b>
          </div>
          <b>
            {translate(`global.parsers.currency.${currency}`, {
              value: Math.round(
                props.result.listings[0]['bookable_nightly_price']
              )
            })}{' '}
            |{' '}
          </b>
        </>
      ) : (
        <b>
          {translate(`global.parsers.currency.${currency}`, {
            value: Math.round(
              props.result.listings[0]['bookable_nightly_price']
            )
          })}{' '}
          |{' '}
        </b>
      );
    } else {
      return (
        <b>
          {translate(`global.parsers.currency.${currency}`, {
            value: Math.round(bookable_nightly_price)
          })}{' '}
          |{' '}
        </b>
      );
    }
  };

  const renderAddress = () => {
    const location = props.result.location;
    return (
      <address>
        {location.adr_city}, {location.adr_state}, {location.adr_country}
      </address>
    );
  };

  const renderInstantBooking = instantBooking => {
    return (
      instantBooking &&
      props.datesSet && (
        <BoltCircle>
          <i className="bolt-icon" />
        </BoltCircle>
      )
    );
  };

  const renderInfo = () => {
    const { property, listings } = { ...props.result };
    const listing = listings[0];
    if (property.multi_unit && props.theme == 'default') {
      return (
        <section>
          <ul>
            <li>
              {translate(`global.property_type.${property.property_type}`)}
            </li>
            <li>
              {translate(`cx.search.num_units`, {
                num: listings.length
              })}
            </li>
          </ul>
        </section>
      );
    } else {
      const unit = listing.unit;
      return (
        <section>
          <PropertyType>{translate(`global.unit_type.${unit.unit_type}`)}</PropertyType>
          <ul>
            <li>
              {translate(`cx.search.num_sleep`, {
                num: unit.num_sleep
              })}
            </li>
            {unit.num_bedrooms && (
              <li>
                {translate(`cx.search.num_bedrooms`, {
                  num: unit.num_bedrooms
                })}
              </li>
            )}
            {unit.num_bathrooms && (
              <li>
                {translate(`cx.search.num_bathrooms`, {
                  num: unit.num_bathrooms
                })}
              </li>
            )}
          </ul>
        </section>
      );
    }
  };

  const getImageUrl = () => {
    const featuredImage = props.result.featured_image;
    const image = featuredImage && featuredImage.image;
    if (image) {
      if (
        !featuredImage.image_processing &&
        image.small &&
        image.small.url !== ''
      ) {
        return image.small.url;
      } else {
        return image.url;
      }
    } else {
      return '';
    }
  };

  const {
    slug,
    featured,
    name,
    review_count,
    review_average,
    instant_booking
  } = {
    ...props.result
  };

  return (
    <figure className="search-tile">
      <Link
        href={ get(props, 'result.room_type_property') ? `/listings/${slug}/unit/${get(props, 'result.default_unit_id') + props.getStringifiedQueryString()}` : `/listings/${slug + props.getStringifiedQueryString()}` }
        target="_blank"
      >
        <div
          className="featured-image"
          style={{ backgroundImage: `url(${getImageUrl()})` }}
        >
          {featured ? (
            <figure className="featured-listing-banner">
              <i>★</i>
              <span>{translate(`cx.global.listing.featured.single`)}</span>
            </figure>
          ) : null}
          {renderInstantBooking(instant_booking)}
        </div>
        <section>
          <HeaderWithRating>
            <span>
              {renderPrice()}
              <span>{name}</span>
            </span>
            {review_count > 0 && (
              <RatingContainer>
                <label>{review_count} Reviews</label>
                <Rater
                  rating={parseFloat(review_average)}
                  interactive={false}
                />
              </RatingContainer>
            )}
          </HeaderWithRating>

          {renderAddress()}
        </section>
        {renderInfo()}
      </Link>
    </figure>
  );
};

export default SearchTile;
