// Dependencies
// -----------------------------------------------
import React from 'react';

// import moment from 'moment';
// import 'react-dates/initialize'; // Needed for rendering any react-dates components

// import queryString from 'query-string';
// import ReactI18n from 'react-i18n';

// // Components
// // -----------------------------------------------
// import {
//   DetailsReviewList,
//   DetailsSingleAmenities,
//   DetailsSingleAvailability,
//   DetailsSingleBookingAnchored,
//   DetailsSingleBookingToggle,
//   DetailsSingleContact,
//   DetailsSingleHeader,
//   DetailsSingleImages,
//   DetailsSingleLocation,
//   DetailsSingleNavbar,
//   DetailsSingleOverview,
//   DetailsSingleOwner,
//   DetailsSingleRules,
//   DetailsSingleSummary
// } from '../molecules/single';
// import { Helmet } from 'react-helmet';
// import { isInclusivelyBeforeDay } from 'react-dates';

// export default class DetailsSingle extends React.Component {
//   static propTypes = {};

//   parseQuery = () => {
//     const parsedQuery = queryString.parse(location.search);
//     let queryInfo = {};
//     //Dates
//     if (parsedQuery['check-in'] && parsedQuery['check-out']) {
//       queryInfo['checkIn'] = moment(parsedQuery['check-in'], 'DD-MM-YYYY');
//       queryInfo['checkOut'] = moment(parsedQuery['check-out'], 'DD-MM-YYYY');

//       let bookingRange = [];
//       let d = queryInfo['checkIn'].clone();
//       while (isInclusivelyBeforeDay(d, queryInfo['checkOut'])) {
//         bookingRange.push({
//           key: d.format('DD-MM-YYYY'),
//           day: d.day()
//         });
//         d.add(1, 'days');
//       }
//       queryInfo['bookingRange'] = bookingRange;
//     }

//     //Num Guests
//     if (parsedQuery['guests']) {
//       queryInfo['guests'] = parsedQuery['guests'];
//     }
//     return queryInfo;
//   };
//   handleBrowserState = () => {
//     const queryInfo = this.parseQuery();
//     this.setState(
//       {
//         bookingRange: queryInfo.bookingRange || null,
//         bookingLength: queryInfo.bookingRange
//           ? queryInfo.bookingRange.length - 1
//           : 0,
//         checkInDate: queryInfo.checkIn || null,
//         checkOutDate: queryInfo.checkOut || null,
//         guests: queryInfo.guests || 1,
//         isDirty: true,
//         datesParsed: true
//       },
//       () => {
//         if (this.state.bookingRange) {
//           this.checkAvailability();
//         }
//       }
//     );
//   };

//   checkAvailability = () => {
//     const queryInfo = this.parseQuery();
//     $.ajax({
//       type: 'GET',
//       url: '/api/details/single/' + this.props.listing.id + '/availability',
//       context: this,
//       data: {
//         unit_id: this.props.unit.id,
//         booking_range: JSON.stringify(this.state.bookingRange),
//         guests: queryInfo['guests']
//       }
//     })
//       .done(function(data) {
//         this.setState(
//           {
//             availability: data
//           },
//           () => {
//             if (data.bookable) {
//               this.checkPricing();
//             }
//           }
//         );
//       })
//       .fail(function(jqXhr) {
//         console.warn(jqXhr);
//       });
//   };

//   checkPricing = () => {
//     const queryInfo = this.parseQuery();
//     $.ajax({
//       type: 'GET',
//       url: '/api/details/single/' + this.props.listing.id + '/pricing',
//       context: this,
//       data: {
//         booking_range: JSON.stringify(this.state.bookingRange),
//         num_guests: queryInfo['guests'],
//         addon_fee_ids: this.state.addonFeeIds,
//         coupon_code: this.state.couponCode
//       }
//     })
//       .done(function(data) {
//         this.setState({ pricing: data });
//       })
//       .fail(function(jqXhr) {
//         console.warn(jqXhr);
//       });
//   };

//   respondToDatesChange = (checkInDate, checkOutDate) => {
//     if (isInclusivelyBeforeDay(checkInDate, checkOutDate)) {
//       let bookingRange = [];
//       let d = checkInDate.clone();
//       while (isInclusivelyBeforeDay(d, checkOutDate)) {
//         bookingRange.push({
//           key: d.format('DD-MM-YYYY'),
//           day: d.day()
//         });
//         d.add(1, 'days');
//       }
//       this.setState(
//         {
//           availability: null,
//           bookingType: null,
//           bookingRange: bookingRange,
//           bookingLength: bookingRange.length - 1,
//           datesParsed: true,
//           pricing: null,
//           checkInDate: checkInDate,
//           checkOutDate: checkOutDate
//         },
//         () => {
//           if (this.state.bookingRange) {
//             this.updateQueryString();
//             this.checkAvailability();
//           }
//         }
//       );
//     }
//   };

//   getStringifiedQueryString = () => {
//     let queryInfo = {};
//     //Dates
//     if (this.state.checkInDate && this.state.checkOutDate) {
//       queryInfo['check-in'] = this.state.checkInDate.format('DD-MM-YYYY');
//       queryInfo['check-out'] = this.state.checkOutDate.format('DD-MM-YYYY');
//     }

//     //Guests
//     if (this.state.guests) {
//       queryInfo['guests'] = this.state.guests;
//     }
//     const stringifiedQueryString = '?' + queryString.stringify(queryInfo);
//     return stringifiedQueryString;
//   };

//   respondToGuestsChange = guests => {
//     this.setState(
//       {
//         availability: null,
//         bookingType: null,
//         pricing: null,
//         guests: guests
//       },
//       () => {
//         this.updateQueryString();
//         this.checkAvailability();
//       }
//     );
//   };

//   constructor(props, _railsContext) {
//     super(props);
//     this.state = {
//       availability: null,
//       bookingType: null,
//       checkInDate: null,
//       checkOutDate: null,
//       bookingRange: null,
//       bookingLength: 0,
//       datesParsed: false,
//       guests: 1,
//       pricing: null,
//       addonFeeIds: [],
//       couponCode: '',
//       review_average: this.props.review_average || 0,
//       reviews: this.props.reviews.length || 0
//     };
//   }

//   componentDidMount() {
//     this.handleBrowserState();
//     window.onpopstate = this.handleBrowserState;
//     if (window.location.hash) {
//       const id = window.location.hash.replace('#', '');
//       const element = document.getElementById(id);
//       element.scrollIntoView();
//     }
//   }

//   updateQueryString = () => {
//     const stringifiedQueryString = this.getStringifiedQueryString();
//     history.pushState(null, null, stringifiedQueryString);
//   };

//   updateFees = feeId => {
//     let newArray = [];
//     if (this.state.addonFeeIds.includes(feeId)) {
//       newArray = this.state.addonFeeIds.filter(id => id !== feeId);
//     } else {
//       newArray = this.state.addonFeeIds.concat(feeId);
//     }
//     this.setState({ addonFeeIds: newArray }, this.checkPricing);
//   };

//   addCouponCode = code => {
//     this.setState({ couponCode: code }, () => this.checkPricing());
//   };

//   render() {
//     const translate = ReactI18n.getIntlMessage;

//     return (
//       <div>
//         <Helmet>
//           <script type="application/ld+json">{`
//             {
//               "@context": "https://schema.org/",
//               "@type": "LodgingBusiness",
//               "name": "${this.props.property.name}",
//               "description": "${this.props.property.summary_description}",
//               "brand": "${this.props.brand.name}",
//               "telephone": "${this.props.brand_info.contact.phone_primary.number}",
//               "image": "${this.props.property_images[0].image.medium.url}",
//               ${ this.state.reviews > 0 ? `
//                 "aggregateRating": {
//                   "@type": "AggregateRating",
//                   "ratingValue": "${this.state.review_average}",
//                   "ratingCount": "${this.state.reviews}"
//                 },` : '' }
//               "address": {
//                 "@type": "PostalAddress",
//                 "streetAddress": "${this.props.org_location.adr_street}",
//                 "addressLocality": "${this.props.org_location.adr_city}",
//                 "addressRegion": "${this.props.org_location.adr_state}",
//                 "postalCode": "${this.props.org_location.adr_postal_code}",
//                 "addressCountry": "${this.props.org_location.adr_country}"
//               }
//             }
//           `}</script>
//         </Helmet>
//         <DetailsSingleImages
//           property_images={this.props.property_images}
//           unit_images={this.props.unit_images}
//           translate={translate}
//         />
//         <section className="details-main">
//           <DetailsSingleBookingAnchored
//             addonFeeIds={this.state.addonFeeIds}
//             average_default_nightly_price={
//               this.props.average_default_nightly_price
//             }
//             availability_calendar={this.props.availability_calendar}
//             booking_calendar={this.props.booking_calendar}
//             default_availability={this.props.default_availability_changeover}
//             availability={this.state.availability}
//             checkInDate={this.state.checkInDate}
//             checkOutDate={this.state.checkOutDate}
//             datesParsed={this.state.datesParsed}
//             guests={this.state.guests}
//             listing={this.props.listing}
//             organizationId={this.props.property.organization_id}
//             pricing={this.state.pricing}
//             propertyId={this.props.property.id}
//             propertyManager={this.props.property_manager}
//             respondToDatesChange={this.respondToDatesChange}
//             respondToGuestsChange={this.respondToGuestsChange}
//             unit_availability={this.props.unit_availability}
//             translate={translate}
//             updateFees={this.updateFees}
//             reviewCount={this.props.reviews ? this.props.reviews.length : 0}
//             reviewAverage={parseFloat(this.props.review_average)}
//             unit={this.props.unit}
//             displayFormat={this.props.brand.date_format}
//             numSleep={this.props.num_sleep}
//             updateQuantityFee={this.updateQuantityFees}
//             addCouponCode={this.addCouponCode}
//           />
//           <DetailsSingleBookingToggle
//             addonFeeIds={this.state.addonFeeIds}
//             average_default_nightly_price={
//               this.props.average_default_nightly_price
//             }
//             availability_calendar={this.props.availability_calendar}
//             default_availability={this.props.default_availability_changeover}
//             booking_calendar={this.props.booking_calendar}
//             availability={this.state.availability}
//             checkInDate={this.state.checkInDate}
//             checkOutDate={this.state.checkOutDate}
//             guests={this.state.guests}
//             datesParsed={this.state.datesParsed}
//             listing={this.props.listing}
//             pricing={this.state.pricing}
//             respondToDatesChange={this.respondToDatesChange}
//             respondToGuestsChange={this.respondToGuestsChange}
//             unit_availability={this.props.unit_availability}
//             translate={translate}
//             updateFees={this.updateFees}
//             unitID={this.props.unit.id}
//             organizationID={this.props.property.organization_id}
//             numSleep={this.props.num_sleep}
//             updateQuantityFees={this.updateQuantityFees}
//           />
//           <figure className="details-content">
//             <DetailsSingleNavbar translate={translate} reviews={this.props.reviews.length > 0}/>

//             <DetailsSingleHeader
//               featured={this.props.listing.featured}
//               location={this.props.location_place}
//               property={this.props.property}
//               unit={this.props.unit}
//               translate={translate}
//             />
//             <DetailsSingleOverview
//               property={this.props.property}
//               unit={this.props.unit}
//               translate={translate}
//             />
//             <DetailsSingleAmenities
//               features_accommodations={this.props.features_accommodations}
//               features_adventure={this.props.features_adventure}
//               features_amenities={this.props.features_amenities}
//               features_attractions={this.props.features_attractions}
//               features_car={this.props.features_car}
//               features_leisure={this.props.features_leisure}
//               features_local={this.props.features_local}
//               features_location={this.props.features_location}
//               features_dining={this.props.features_dining}
//               features_entertainment={this.props.features_entertainment}
//               features_outdoor={this.props.features_outdoor}
//               features_spa={this.props.features_spa}
//               features_suitability={this.props.features_suitability}
//               features_themes={this.props.features_themes}
//               translate={translate}
//             />
//             <DetailsSingleSummary
//               bathrooms={this.props.bathrooms}
//               bedrooms={this.props.bedrooms}
//               property={this.props.property}
//               unit={this.props.unit}
//               translate={translate}
//             />
//             <DetailsSingleRules
//               listing={this.props.listing}
//               property={this.props.property}
//               unit={this.props.unit}
//               unit_availability={this.props.unit_availability}
//               pricing={this.state.pricing}
//               translate={translate}
//             />
//             <div id='review-section'/>
//             {this.props.property_manager && (
//               <DetailsSingleOwner
//                 property_manager={this.props.property_manager}
//                 translate={translate}
//               />
//             )}
//             {this.props.reviews && this.props.reviews.length > 0 ? (
//               <DetailsReviewList
//                 reviews={this.props.reviews}
//                 average={this.props.review_average}
//                 displayFormat={this.props.brand.date_format}
//               />
//             ) : null}
//             <DetailsSingleAvailability
//               availability_calendar={this.props.availability_calendar}
//               default_availability={this.props.default_availability_changeover}
//               booking_calendar={this.props.booking_calendar}
//               translate={translate}
//             />
//             <DetailsSingleLocation
//               google_maps_api_key={this.props.google_maps_api_key}
//               locationPlace={this.props.location_place}
//               translate={translate}
//             />
//           </figure>
//         </section>
//       </div>
//     );
//   }
// }

export default class Single extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    return(
      <div>
        <h1>This is a listing</h1>
      </div>
    )
  }
}