// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import Rater from 'react-rater';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import { isInclusivelyBeforeDay } from 'react-dates';
import styled from 'styled-components';

// import LazyLoad from 'react-lazyload';

// Components
// -----------------------------------------------
import Meta from './meta';
import { StarContainer } from '../miscellaneous/';
import {
  MultiDatesGuests,
  MultiLocation,
  MultiNavbar,
  MultiOwner,
  MultiPropertyAmenities,
  MultiPropertyHeader,
//   DetailsMultiPropertyImages,
  MultiPropertyOverview,
  MultiPropertyRules,
  MultiUnitsList,
  ReviewList
} from './multi/';

// Styles
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

// -----------------------------------------------
// COMPONENT->MULTI ------------------------------
// -----------------------------------------------
class Multi extends React.Component {

  // Constructor
  // ---------------------------------------------
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

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.handleBrowserState();
    window.onpopstate = this.handleBrowserState;
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      const element = document.getElementById(id);
      element.scrollIntoView();
    }
  }

  // Handle Browser State
  // ---------------------------------------------
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
          // this.getAvailabilities();
          // this.getPricings();
        }
      }
    );
  };

  // Parse Query
  // ---------------------------------------------
  parseQuery = () => {
    const parsedQuery = queryString.parse(location.search);
    let queryInfo = {};

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

    if (parsedQuery['guests']) {
      queryInfo['guests'] = parsedQuery['guests'];
    }
    return queryInfo;
  };

  // Get Stringified Query String
  // ---------------------------------------------
  getStringifiedQueryString = () => {
    let queryInfo = {};

    if (this.state.checkIn && this.state.checkOut) {
      queryInfo['check-in'] = this.state.checkIn.format('DD-MM-YYYY');
      queryInfo['check-out'] = this.state.checkOut.format('DD-MM-YYYY');
    }

    if (this.state.guests) {
      queryInfo['guests'] = this.state.guests;
    }

    const stringifiedQueryString = '?' + queryString.stringify(queryInfo);
    return stringifiedQueryString;
  };

  // Update Query String
  // ---------------------------------------------
  updateQueryString = () => {
    const stringifiedQueryString = this.getStringifiedQueryString();
    history.pushState(null, null, stringifiedQueryString);
  };

  // Update Dates
  // ---------------------------------------------
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
            // this.getAvailabilities();
            // this.getPricings();
          }
        }
      );
    }
  };

  // Update Guests
  // ---------------------------------------------
  updateGuests = guests => {
    this.setState({ guests: guests }, () => {
      this.updateQueryString();
      // this.getAvailabilities();
      // this.getPricings();
    });
  };

  // Get Availabilities
  // ---------------------------------------------
  // getAvailabilities = () => {
  //   let availabilities = {};

  //   this.props.units.map(unit => {
  //     var p = this.getAvailability(unit.listing.id, unit.unit.id);
  //     p.then(data => {
  //       availabilities[unit.unit.id] = data;
  //       this.setState({ availabilities: availabilities });
  //     }).catch(err => {
  //       console.error(err);
  //     });
  //   });
  // };

  // Get Availability
  // ---------------------------------------------
  // getAvailability = (listingID, unitID) => {
  //   let getAvailability = new Promise((resolve, reject) => {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/api/details/multi/' + listingID + '/availability',
  //       context: this,
  //       data: {
  //         unit_id: unitID,
  //         booking_range: JSON.stringify(this.state.bookingRange),
  //         guests: this.state.guests
  //       }
  //     })
  //       .done(function(data) {
  //         resolve(data);
  //       })
  //       .fail(function(jqXhr) {
  //         reject(jqXhr);
  //       });
  //   });
  //   return getAvailability;
  // };

  // Get Pricings
  // ---------------------------------------------
  // getPricings = () => {
  //   let pricings = {};

  //   this.props.units.map(unit => {
  //     var p = this.getPricing(unit.listing.id);
  //     p.then(data => {
  //       pricings[unit.unit.id] = data;
  //       this.setState({ pricings: pricings });
  //     }).catch(err => {
  //       console.error(err);
  //     });
  //   });
  // };

  // Get Pricing
  // ---------------------------------------------
  // getPricing = listingID => {
  //   let getPricing = new Promise((resolve, reject) => {
  //     $.ajax({
  //       type: 'GET',
  //       url: '/api/details/multi/' + listingID + '/pricing',
  //       context: this,
  //       data: {
  //         booking_range: JSON.stringify(this.state.bookingRange),
  //         addon_fee_ids: this.state.addonFeeIds
  //       }
  //     })
  //       .done(function(data) {
  //         resolve(data);
  //       })
  //       .fail(function(jqXhr) {
  //         reject(jqXhr);
  //       });
  //   });
  //   return getPricing;
  // };

  // Render
  // ---------------------------------------------
  render() {

    return (
      <div className="details-multi">
        <Meta />
        {/* <DetailsMultiPropertyImages
          property_images={this.props.property_images}

        /> */}
        <section className="details-main">
          <figure className="details-content">
            <MultiNavbar />
            {this.props.listing.reviews.length > 0 && (
              <ReviewInfoContainer>
                <StarContainer>
                  <Rater
                    rating={parseFloat(this.props.listing.review_average)}
                    interactive={false}
                  />
                </StarContainer>
                <label>{this.props.listing.reviews.length} Reviews</label>
              </ReviewInfoContainer>
            )}
            <MultiPropertyHeader />
            <MultiPropertyOverview />
            {this.state.datesParsed ? (
              <MultiDatesGuests
                checkIn={this.state.checkIn}
                checkOut={this.state.checkOut}
                guests={this.state.guests}
                updateDates={this.updateDates}
                updateGuests={this.updateGuests}
              />
            ) : null}
            {/* <LazyLoad
              height={600}
              once
              offset={300}
            > */}
              {this.state.availabilities !== {} && this.state.pricings !== {} ? (
                <MultiUnitsList
                  availabilities={this.state.availabilities}
                  bookingRange={this.state.bookingRange}
                  addonFeeIds={this.state.addonFeeIds}
                  checkIn={this.state.checkIn}
                  checkOut={this.state.checkOut}
                  guests={this.state.guests}
                  pricings={this.state.pricings}
                />
              ) : null}
              <MultiPropertyAmenities />
              <MultiPropertyRules />
              {this.props.property_manager && (
                <MultiOwner />
              )}
              {this.props.listing.reviews.length > 0 && (
                <ReviewList />
              )}
              <MultiLocation />
          {/* </LazyLoad> */}
          </figure>
        </section>
      </div>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {},
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Multi);