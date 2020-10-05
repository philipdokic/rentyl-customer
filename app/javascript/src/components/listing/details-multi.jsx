// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import 'react-dates/initialize'; // Needed for rendering any react-dates components

import moment from 'moment';
import queryString from 'query-string';
import ReactI18n from 'react-i18n';
import { isInclusivelyBeforeDay } from 'react-dates';
import Rater from 'react-rater';
import styled from 'styled-components';
import LazyLoad from 'react-lazyload';

// Components
// -----------------------------------------------
import { StarContainer } from 'cxThemeComponents';
import {
  DetailsMultiDatesGuests,
  DetailsMultiLocation,
  DetailsMultiNavbar,
  DetailsMultiOwner,
  DetailsMultiPropertyAmenities,
  DetailsMultiPropertyHeader,
  DetailsMultiPropertyImages,
  DetailsMultiPropertyOverview,
  DetailsMultiPropertyRules,
  DetailsMultiUnitsList,
  DetailsReviewList
} from '../molecules/multi';

// Styled Components
// -----------------------------------------------
const ReviewInfoContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 8px 0;
  margin: 0;
  position: absolute;
  right: 16px;
  top: 12px;
  z-index: 12;

  label {
    margin-left: 8px;
    font-size: 12px;
  }
`;

export default class DetailsMulti extends React.Component {
  static propTypes = {};

  constructor(props, _railsContext) {
    super(props);
    this.state = {
      checkIn: null,
      checkOut: null,
      bookingLength: 0,
      bookingRange: null,
      datesParsed: false,
      guests: 1,
      pricing: null,
      addonFeeIds: [],
      availabilities: {},
      pricings: {}
    };
  }

  componentDidMount() {
    this.handleBrowserState();
    window.onpopstate = this.handleBrowserState;
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      element.scrollIntoView();
    }
  }

  handleBrowserState = () => {
    const queryInfo = this.parseQuery();
    this.setState(
      {
        bookingRange: queryInfo.bookingRange || null,
        bookingLength: queryInfo.bookingRange
          ? queryInfo.bookingRange.length - 1
          : 0,
        checkIn: queryInfo.checkIn || null,
        checkOut: queryInfo.checkOut || null,
        guests: queryInfo.guests || 1,
        isDirty: true,
        datesParsed: true
      },
      () => {
        if (this.state.bookingRange) {
          this.getAvailabilities();
          this.getPricings();
        }
      }
    );
  };

  parseQuery = () => {
    const parsedQuery = queryString.parse(location.search);
    let queryInfo = {};
    //Dates
    if (parsedQuery['check-in'] && parsedQuery['check-out']) {
      queryInfo['checkIn'] = moment(parsedQuery['check-in'], 'DD-MM-YYYY');
      queryInfo['checkOut'] = moment(parsedQuery['check-out'], 'DD-MM-YYYY');

      let bookingRange = [];
      let d = queryInfo['checkIn'].clone();
      while (isInclusivelyBeforeDay(d, queryInfo['checkOut'])) {
        bookingRange.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      queryInfo['bookingRange'] = bookingRange;
    }

    //Num Guests
    if (parsedQuery['guests']) {
      queryInfo['guests'] = parsedQuery['guests'];
    }
    return queryInfo;
  };

  getStringifiedQueryString = () => {
    let queryInfo = {};
    //Dates
    if (this.state.checkIn && this.state.checkOut) {
      queryInfo['check-in'] = this.state.checkIn.format('DD-MM-YYYY');
      queryInfo['check-out'] = this.state.checkOut.format('DD-MM-YYYY');
    }

    //Guests
    if (this.state.guests) {
      queryInfo['guests'] = this.state.guests;
    }
    const stringifiedQueryString = '?' + queryString.stringify(queryInfo);
    return stringifiedQueryString;
  };

  updateQueryString = () => {
    const stringifiedQueryString = this.getStringifiedQueryString();
    history.pushState(null, null, stringifiedQueryString);
  };

  updateDates = (checkIn, checkOut) => {
    if (isInclusivelyBeforeDay(checkIn, checkOut)) {
      let bookingRange = [];
      let d = checkIn.clone();
      while (isInclusivelyBeforeDay(d, checkOut)) {
        bookingRange.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      this.setState(
        {
          bookingRange: bookingRange,
          bookingLength: bookingRange.length - 1,
          datesParsed: true,
          checkIn: checkIn,
          checkOut: checkOut
        },
        () => {
          if (this.state.bookingRange) {
            this.updateQueryString();
            this.getAvailabilities();
            this.getPricings();
          }
        }
      );
    }
  };

  updateGuests = guests => {
    this.setState({ guests: guests }, () => {
      this.updateQueryString();
      this.getAvailabilities();
      this.getPricings();
    });
  };

  getAvailabilities = () => {
    let availabilities = {};
    this.props.units.map(unit => {
      var p = this.getAvailability(unit.listing.id, unit.unit.id);
      p.then(data => {
        availabilities[unit.unit.id] = data;
        this.setState({ availabilities: availabilities });
      }).catch(err => {
        console.error(err);
      });
    });
  };

  getAvailability = (listingID, unitID) => {
    let getAvailability = new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/api/details/multi/' + listingID + '/availability',
        context: this,
        data: {
          unit_id: unitID,
          booking_range: JSON.stringify(this.state.bookingRange),
          guests: this.state.guests
        }
      })
        .done(function(data) {
          resolve(data);
        })
        .fail(function(jqXhr) {
          reject(jqXhr);
        });
    });
    return getAvailability;
  };

  getPricings = () => {
    let pricings = {};
    this.props.units.map(unit => {
      var p = this.getPricing(unit.listing.id);
      p.then(data => {
        pricings[unit.unit.id] = data;
        this.setState({ pricings: pricings });
      }).catch(err => {
        console.error(err);
      });
    });
  };

  getPricing = listingID => {
    let getPricing = new Promise((resolve, reject) => {
      $.ajax({
        type: 'GET',
        url: '/api/details/multi/' + listingID + '/pricing',
        context: this,
        data: {
          booking_range: JSON.stringify(this.state.bookingRange),
          addon_fee_ids: this.state.addonFeeIds
        }
      })
        .done(function(data) {
          resolve(data);
        })
        .fail(function(jqXhr) {
          reject(jqXhr);
        });
    });
    return getPricing;
  };

  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <div className="details-multi">
        <DetailsMultiPropertyImages
          property_images={this.props.property_images}
          translate={translate}
        />
        <section className="details-main">
          <figure className="details-content">
            <DetailsMultiNavbar translate={translate} />

            {this.props.reviews.length > 0 && (
              <ReviewInfoContainer>
                <StarContainer>
                  <Rater
                    rating={parseFloat(this.props.review_average)}
                    interactive={false}
                  />
                </StarContainer>
                <label>{this.props.reviews.length} Reviews</label>
              </ReviewInfoContainer>
            )}

            <DetailsMultiPropertyHeader
              location={this.props.location_place}
              property={this.props.property}
              units={this.props.units}
              translate={translate}
            />

            <DetailsMultiPropertyOverview
              property={this.props.property}
              translate={translate}
            />

            {this.state.datesParsed ? (
              <DetailsMultiDatesGuests
                checkIn={this.state.checkIn}
                checkOut={this.state.checkOut}
                guests={this.state.guests}
                updateDates={this.updateDates}
                updateGuests={this.updateGuests}
                translate={translate}
                displayFormat={this.props.brand.date_format}
              />
            ) : null}
            <LazyLoad
              height={600}
              once
              offset={300}
            >
            {this.state.availabilities !== {} && this.state.pricings !== {} ? (
                <DetailsMultiUnitsList
                  availabilities={this.state.availabilities}
                  bookingRange={this.state.bookingRange}
                  addonFeeIds={this.state.addonFeeIds}
                  checkIn={this.state.checkIn}
                  checkOut={this.state.checkOut}
                  guests={this.state.guests}
                  pricings={this.state.pricings}
                  translate={translate}
                  units={this.props.units}
                />
                ) : null}

            <DetailsMultiPropertyAmenities
              features_adventure={this.props.features_adventure}
              features_attractions={this.props.features_attractions}
              features_car={this.props.features_car}
              features_leisure={this.props.features_leisure}
              features_local={this.props.features_local}
              features_location={this.props.features_location}
              translate={translate}
              />

            <DetailsMultiPropertyRules
              property={this.props.property}
              translate={translate}
              />

            {this.props.property_manager && (
              <DetailsMultiOwner
              property_manager={this.props.property_manager}
              translate={translate}
              />
              )}

            {this.props.reviews.length > 0 && (
              <DetailsReviewList
              reviews={this.props.reviews}
              average={this.props.review_average}
              displayFormat={this.props.brand.date_format}
              />
              )}

            <DetailsMultiLocation
              google_maps_api_key={this.props.google_maps_api_key}
              locationPlace={this.props.location_place}
              translate={translate}
              />
          </LazyLoad>
          </figure>
        </section>
      </div>
    );
  }
}
