// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import { connect } from 'react-redux';
import moment from 'moment';
import queryString from 'query-string';
import 'react-dates/initialize';
import { isInclusivelyBeforeDay } from 'react-dates';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Meta from './meta';
import {
  Amenities,
  Availability,
  BookingAnchored,
  BookingToggle,
  Contact,
  Header,
  Images,
  Location,
  Navbar,
  Overview,
  Owner,
  ReviewList,
  Rules,
  Summary
} from './single/';

// -----------------------------------------------
// COMPONENT->SINGLE -----------------------------
// -----------------------------------------------
class Single extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      availability: null,
      bookingType: null,
      checkInDate: null,
      checkOutDate: null,
      bookingRange: null,
      bookingLength: 0,
      datesParsed: false,
      guests: 1,
      pricing: null,
      addonFeeIds: [],
      couponCode: '',
      review_average: this.props.listing.review_average || 0,
      reviews: this.props.listing.reviews.length || 0
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

  // Parse Query
  // ---------------------------------------------
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
        checkInDate: queryInfo.checkIn || null,
        checkOutDate: queryInfo.checkOut || null,
        guests: queryInfo.guests || 1,
        isDirty: true,
        datesParsed: true
      },
      () => {
        if (this.state.bookingRange) {
          this.checkAvailability();
        }
      }
    );
  };

  // Check Availability
  // ---------------------------------------------
  checkAvailability = () => {
    const queryInfo = this.parseQuery();

    axios.get(`https://staging.getdirect.io/api/v2/listings/single/${this.props.listing.id}/availability`, {
      headers: {'Content-Type': 'application/json'},
      context: this,
      params: {
        unit_id: this.props.listing.unit.id,
        booking_range: JSON.stringify(this.state.bookingRange),
        guests: queryInfo['guests']
      }
    })
    .then(response => {
      this.setState(
        {
          availability: response
        },
        () => {
          if (response.bookable) {
            this.checkPricing();
          }
        }
      );
    })
    .catch(error => {
      console.log(error);
    })
  };

  // Check Pricing
  // ---------------------------------------------
  checkPricing = () => {
    const queryInfo = this.parseQuery();

    axios.get(`https://staging.getdirect.io/api/v2/listings/single/${this.props.listing.id}/pricing`, {
      headers: {'Content-Type': 'application/json'},
      context: this,
      params: {
        booking_range: JSON.stringify(this.state.bookingRange),
        num_guests: queryInfo['guests'],
        addon_fee_ids: this.state.addonFeeIds,
        coupon_code: this.state.couponCode
      }
    })
    .then(response => {
      this.setState({ pricing: response });
    })
    .catch(error => {
      console.log(error);
    })
  };

  // Respond To Dates Change
  // ---------------------------------------------
  respondToDatesChange = (checkInDate, checkOutDate) => {
    if (isInclusivelyBeforeDay(checkInDate, checkOutDate)) {
      let bookingRange = [];
      let d = checkInDate.clone();
      while (isInclusivelyBeforeDay(d, checkOutDate)) {
        bookingRange.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      this.setState(
        {
          availability: null,
          bookingType: null,
          bookingRange: bookingRange,
          bookingLength: bookingRange.length - 1,
          datesParsed: true,
          pricing: null,
          checkInDate: checkInDate,
          checkOutDate: checkOutDate
        },
        () => {
          if (this.state.bookingRange) {
            this.updateQueryString();
            this.checkAvailability();
          }
        }
      );
    }
  };

  // Get Stringified Query String
  // ---------------------------------------------
  getStringifiedQueryString = () => {
    let queryInfo = {};

    if (this.state.checkInDate && this.state.checkOutDate) {
      queryInfo['check-in'] = this.state.checkInDate.format('DD-MM-YYYY');
      queryInfo['check-out'] = this.state.checkOutDate.format('DD-MM-YYYY');
    }

    if (this.state.guests) {
      queryInfo['guests'] = this.state.guests;
    }

    const stringifiedQueryString = '?' + queryString.stringify(queryInfo);
    return stringifiedQueryString;
  };

  // Respond To Guests Change
  // ---------------------------------------------
  respondToGuestsChange = guests => {
    this.setState(
      {
        availability: null,
        bookingType: null,
        pricing: null,
        guests: guests
      },
      () => {
        this.updateQueryString();
        this.checkAvailability();
      }
    );
  };

  // Update Query String
  // ---------------------------------------------
  updateQueryString = () => {
    const stringifiedQueryString = this.getStringifiedQueryString();

    history.pushState(null, null, stringifiedQueryString);
  };

  // Update Fees
  // ---------------------------------------------
  updateFees = feeId => {
    let newArray = [];

    if (this.state.addonFeeIds.includes(feeId)) {
      newArray = this.state.addonFeeIds.filter(id => id !== feeId);
    } else {
      newArray = this.state.addonFeeIds.concat(feeId);
    }

    this.setState({ addonFeeIds: newArray }, this.checkPricing);
  };

  // Add Coupon Code
  // ---------------------------------------------
  addCouponCode = code => {
    this.setState({ couponCode: code }, () => this.checkPricing());
  };

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <div>
        <Meta />
        {/* <Images
          property_images={this.props.property_images}
          unit_images={this.props.unit_images}
          translate={translate}
        /> */}

        <section className="details-main">
          <BookingAnchored
            addonFeeIds={this.state.addonFeeIds}
            availability={this.state.availability}
            checkInDate={this.state.checkInDate}
            checkOutDate={this.state.checkOutDate}
            datesParsed={this.state.datesParsed}
            guests={this.state.guests}
            pricing={this.state.pricing}
            respondToDatesChange={this.respondToDatesChange}
            respondToGuestsChange={this.respondToGuestsChange}
            updateFees={this.updateFees}
            updateQuantityFee={this.updateQuantityFees}
            addCouponCode={this.addCouponCode}
          />
          <BookingToggle
            addonFeeIds={this.state.addonFeeIds}
            availability={this.state.availability}
            checkInDate={this.state.checkInDate}
            checkOutDate={this.state.checkOutDate}
            datesParsed={this.state.datesParsed}
            guests={this.state.guests}
            pricing={this.state.pricing}
            respondToDatesChange={this.respondToDatesChange}
            respondToGuestsChange={this.respondToGuestsChange}
            updateFees={this.updateFees}
            updateQuantityFees={this.updateQuantityFees}
          />
          <figure className="details-content">
            <Navbar />
            <Header />
            <Overview />
            {/* <Amenities /> */}
            <Summary />
            {/* <Rules pricing={this.state.pricing} /> */}
            <div id='review-section'/>
            {this.props.property_manager && (
              <Owner />
            )}
            {this.props.listing.reviews && this.props.listing.reviews.length > 0 ? (
              <ReviewList
                displayFormat={this.props.brand.date_format}
              />
            ) : null}
            <Availability />
            <Location />
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
export default connect(mapStateToProps)(Single);