// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import {connect} from 'react-redux'
import PropTypes from 'prop-types';
import 'react-dates/initialize'; // Needed for rendering any react-dates components
import moment from 'moment';
import queryString from 'query-string';
import { toast } from 'react-toastify';
import Script from 'react-load-script';
import { isInclusivelyBeforeDay } from 'react-dates';
import { get, times, filter, sortBy, isNull } from 'lodash';
// import { BookingService } from 'cxApi';

// Components
// -----------------------------------------------
import AddOns from './add-ons'
import FormPayment from '../forms/form-payment'
import Notification from '../notification';
import Spinner from '../spinner/spinner';
import ErrorsPaymentTransaction from '../errors/errors-payment-transaction';
import {
  InfoBooking,
  InfoListing,
  InfoPricing
} from './info';
import AddOnModal from '../modals/addons-modal';
import PortalModal from '../modals/portal-modal';
import LocationForm from '../forms/location-form';

class Checkout extends React.Component {
  static propTypes = {
    customer: PropTypes.object,
    listing: PropTypes.object,
    unit: PropTypes.object
  };

  constructor(props, _railsContext) {
    super(props);

    this.state = {
      loading: true,
      availabilityLoading: true,
      isStripeLoading: true,
      isStripeSuccessful: false,
      bookingType: null,
      checkInDate: null,
      checkOutDate: null,
      bookingDaysInclusive: null,
      bookingLength: 0,
      datesParsed: null,
      isAvailable: null,
      guests: 1,
      pricing: null,
      transactionError: null,
      addonFeeIds: [],
      brand: this.props.brand,
      brandCurrency: '',
      checkoutTotal: null,
      contractTermsAndConditions: null,
      deposits: [],
      featuredImage: {},
      fees: [],
      listing: {},
      obfuscatedAddress: '',
      property: {},
      rentalAgreement: {},
      requiredAge: null,
      slug: '',
      stripePublishableKey: '',
      unit: {},
      verifyAddress: null,
      verifyAge: null,
      verifyImage: null,
      verifyImageDescription: '',
      verifySignature: null,
      feeQuantities: [],
      quantity: 0,
      couponCode: '',
      allCouponCodes: null,
      badCode: false
    };
  }

  componentDidMount() {
    this.fetchBookingInfo(this.props);
    document.body.classList.add('checkout-view');
    document.body.classList.remove('listings-view');
    document.body.classList.remove('home-view');
    document.body.classList.remove('search-view');
  }

  updateQuantity = value => {
    this.setState({ quantity: value });
  };

  submitFees = (fee, closePortal) => {
    this.addFeeIds(fee.id, this.state.quantity);
    closePortal();
  };

  verifyCouponCode = closePortal => {
    if (isNull(this.state.allCouponCodes)) {
      this.setState({ badCode: true });
    } else if (this.state.allCouponCodes.includes(this.state.couponCode)) {
      this.addCouponCode(this.state.couponCode);
      closePortal();
    } else {
      this.setState({ badCode: true });
    }
  };

  fetchBookingInfo = props => {
    const parsedQuery = queryString.parse(location.search);
    const { couponCode, guests } = parsedQuery;
    const parsedDates = this.parseCheckInCheckOut()
    this.setState({ couponCode });
    axios.post(`/api/bookings/checkout/${this.props.match.params.id}`,
      {headers: {'Content-Type': 'application/json'},
        check_in: parsedDates.check_in,
        check_out: parsedDates.check_out,
        num_guests: guests}
    ).then(res => {
      const data = res.data
      this.setState(
        {
          brandCurrency: data.brand_currency,
          checkoutTotal: data.checkout_total,
          contractTermsAndConditions: data.contract_terms_and_conditions,
          deposits: data.deposits,
          featuredImage: data.featured_image,
          fees: data.fees,
          listing: data.listing,
          obfuscatedAddress: data.obfuscated_address,
          property: data.property,
          rentalAgreement: data.rental_agreement,
          requiredAge: data.required_age,
          slug: data.slug,
          stripePublishableKey: data.stripe_publishable_key,
          unit: data.unit,
          verifyAddress: data.verify_address,
          verifyAge: data.verify_age,
          verifyImage: data.verify_image,
          verifyImageDescription: data.verify_image_description,
          verifySignature: data.verify_signature,
          loading: false
        },
        () => this.parseUrl()
      );
    });
  };

  parseCheckInCheckOut = () => {
    const parsedQuery = queryString.parse(location.search);
    const parsedCheckInDate = moment(
      parsedQuery['check-in'],
      'DD-MM-YYYY'
    ).format('DD-MM-YYYY');
    const parsedCheckOutDate = moment(
      parsedQuery['check-out'],
      'DD-MM-YYYY'
    ).format('DD-MM-YYYY');

    return { check_in: parsedCheckInDate, check_out: parsedCheckOutDate };
  };

  parseUrl = (cb = () => {}) => {
    const parsedQuery = queryString.parse(location.search);
    if (parsedQuery['check-in'] && parsedQuery['check-out']) {
      const parsedCheckInDate = moment(parsedQuery['check-in'], 'DD-MM-YYYY');
      const parsedCheckOutDate = moment(parsedQuery['check-out'], 'DD-MM-YYYY');
      let guests = parsedQuery['guests'];
      if (isNaN(guests) || guests < 1) {
        guests = 1;
      } else if (guests > this.state.unit.num_sleep) {
        guests = this.state.unit.num_sleep;
      }
      let bookingDaysInclusive = [];
      let d = parsedCheckInDate.clone();
      while (isInclusivelyBeforeDay(d, parsedCheckOutDate)) {
        bookingDaysInclusive.push({
          key: d.format('DD-MM-YYYY'),
          day: d.day()
        });
        d.add(1, 'days');
      }
      const addonFeeIds = [];
      if (
        parsedQuery['addonFeeIds'] !== undefined &&
        parsedQuery['addonFeeIds'].split(',')[0] !== ''
      ) {
        parsedQuery['addonFeeIds'].split(',').map(num => {
          addonFeeIds.push(parseInt(num));
        });
      }
      const quoteId = parsedQuery['quote_id'];
      this.setState(
        {
          checkInDate: moment(parsedCheckInDate),
          checkOutDate: moment(parsedCheckOutDate),
          bookingDaysInclusive: bookingDaysInclusive,
          bookingLength: bookingDaysInclusive.length - 1,
          guests: guests,
          datesParsed: true,
          addonFeeIds: addonFeeIds,
          quoteId: quoteId
        },
        () => {
          this.checkAvailability();
          cb();
        }
      );
    } else {
      this.setState({
        datesParsed: false,
        isAvailable: false
      });
    }
  };

  checkAvailability = () => {
    if (isNull(this.state.unit.room_type_id)) {
      $.ajax({
        type: 'GET',
        url: '/api/checkout/' + this.state.listing.id + '/availability',
        context: this,
        data: {
          unit_id: this.state.unit.id,
          booking_range: JSON.stringify(this.state.bookingDaysInclusive),
          guests: this.state.guests
        }
      })
        .done(function(data) {
          this.setState(
            {
              availability: data
            },
            () => {
              if (data.bookable) {
                this.fetchCouponCodes();
                this.verifyCouponCode();
                this.checkPricing();
              }
            }
          );
        })
        .fail(function(jqXhr) {
          console.warn(jqXhr);
        });
    } else {
      $.ajax({
        type: 'GET',
        url:
          '/api/details/room/' +
          this.state.listing.id +
          '/room_type_availability',
        context: this,
        data: {
          unit_id: this.state.unit.id,
          booking_range: JSON.stringify(this.state.bookingDaysInclusive),
          guests: this.state.guests
        }
      })
        .done(function(data) {
          this.setState(
            {
              availability: data
            },
            () => {
              if (data.bookable) {
                this.fetchCouponCodes();
                this.verifyCouponCode();
                this.checkPricing();
              }
            }
          );
        })
        .fail(function(jqXhr) {
          console.warn(jqXhr);
        });
    }
  };

  updateGuests = val => {
    this.setState({ guests: val });
  };

  updateFees = feeId => {
    let newArray = [];
    if (this.state.addonFeeIds.includes(feeId)) {
      newArray = this.state.addonFeeIds.filter(id => id !== feeId);
    } else {
      newArray = this.state.addonFeeIds.concat(feeId);
    }
    this.setState({ addonFeeIds: newArray }, this.checkPricing);
  };

  addFeeIds = (feeId, quantity) => {
    const addonIds = this.state.addonFeeIds.filter(id => id !== feeId);
    times(quantity, () => addonIds.push(feeId));
    this.setState({ addonFeeIds: addonIds }, () => this.checkPricing());
    this.setState({
      feeQuantities: [
        ...this.state.feeQuantities.filter(fee => fee.id !== feeId),
        {
          id: feeId,
          quantity
        }
      ],
      quantity: 0
    });
  };

  checkPricing = () => {
    const parsedQuery = queryString.parse(location.search);
    const guests = parsedQuery.guests;
    $.ajax({
      type: 'GET',
      url: '/api/checkout/' + this.state.listing.id + '/pricing',
      context: this,
      data: {
        booking_range: JSON.stringify(this.state.bookingDaysInclusive),
        addon_fee_ids: this.state.addonFeeIds,
        num_guests: guests,
        coupon_code: this.state.couponCode
      }
    })
      .done(function(data) {
        this.setState({
          fees: data.fees,
          pricing: data,
          availabilityLoading: false,
          checkoutTotal: data.total
        });
      })
      .fail(function(jqXhr) {
        console.warn(jqXhr);
      });
  };

  handleStripeScriptError = () => {
    this.setState({
      isStripeLoading: false,
      isStripeSuccessful: false
    });
  };

  handleStripeScriptLoad = () => {
    Stripe.setPublishableKey(this.state.stripePublishableKey);
    this.setState({
      isStripeLoading: false,
      isStripeSuccessful: true
    });
  };

  createStripeToken = () => {
    Stripe.card.createToken(
      {
        number: this.state.cardNumber,
        cvc: this.state.cardCvv,
        name: this.state.customerName,
        exp: this.state.cardExpiry,
        address_zip: this.state.customerPostalCode || 'invalid'
      },
      this.handleStripeCallback
    );
  };

  handleStripeCallback = (statusCode, json) => {
    if (statusCode === 200) {
      this.handleStripeSuccess(json);
    } else {
      this.handleStripeFailure(json);
    }
  };

  handleStripeSuccess = json => {
    const token = json.id;
    $.ajax({
      type: 'POST',
      url:
        '/api/checkout/' +
        this.state.listing.id +
        '/book_listing_from_checkout',
      context: this,
      data: {
        skip_quote_creation: !!this.state.quoteId,
        quote_id: this.state.quoteId,
        unit_id: this.state.unit.id,
        booking_range: JSON.stringify(this.state.bookingDaysInclusive),
        check_in: this.state.checkInDate.format('DD-MM-YYYY'),
        check_out: this.state.checkOutDate.format('DD-MM-YYYY'),
        num_guests: this.state.guests,
        customer_email: this.state.customerEmail,
        customer_name: this.state.customerName,
        customer_telephone: this.state.customerTelephone,
        adr_street: this.state.adrStreet,
        adr_city: this.state.adrCity,
        adr_state: this.state.adrState,
        adr_country: this.state.adrCountry,
        adr_zip: this.state.adrPostalCode,
        addon_fee_ids: this.state.addonFeeIds,
        stripe_token: token,
        coupon_code: this.state.couponCode,
        room_type_booking: isNull(this.state.unit.room_type_id) ? false : true
      }
    })
      .done(data => {
        if (this.props.brand_info.google_events) {
          gtag('event', 'purchase', {
            transaction_id: data.booking_code,
            affiliation: 'Direct',
            value: this.state.pricing.total,
            currency: 'USD',
            tax: this.state.pricing.taxes,
            shipping: 0
          });
        }
        if (this.props.brand_info.facebook_pixel) {
          fbq('track', 'Purchase', {
            currency: 'USD',
            value: this.state.pricing.total
          });
        }
        if (
          this.state.verifyImage ||
          this.state.verifySignature ||
          this.state.verifyAge ||
          this.state.verifyAddress
        ) {
          window.location = '/my-bookings/verification/' + data.booking_code;
        } else {
          window.location = '/my-bookings/receipt/' + data.booking_code;
        }
      })
      .fail(response => toast.error(response.responseJSON.error));
  };

  handleStripeFailure = ({ error }) => {
    console.error(error);
    this.setState({ transactionError: error });
  };

  bookProperty = (
    guests,
    cardNumber,
    cardExpiry,
    cardCvv,
    customerEmail,
    customerName,
    customerPostalCode,
    customerTelephone,
    signatureId,
    idPhotoId
  ) => {
    this.setState(
      {
        guests: guests,
        cardNumber: cardNumber.replace(' ', ''),
        cardExpiry: cardExpiry,
        cardCvv: cardCvv.replace(' ', ''),
        customerEmail: customerEmail,
        customerName: customerName,
        customerPostalCode: customerPostalCode,
        customerTelephone: customerTelephone,
        signatureId: signatureId,
        idPhotoId: idPhotoId
      },
      () => {
        this.createStripeToken();
      }
    );
  };

  fetchCouponCodes = () => {
    $.ajax({
      type: 'GET',
      url:
        '/api/details/single/' + this.state.listing.id + '/fetch_coupon_codes',
      context: this
    })
      .done(data => {
        this.setState({
          allCouponCodes: data
        });
      })
      .fail(jqXhr => {
        console.warn(jqXhr);
      });
  };

  updateCouponCode = couponCode => {
    this.setState({ couponCode, badCode: false });
  };

  addCouponCode = code => {
    this.setState({ couponCode: code }, () => this.checkPricing());
  };

  buildFieldStatus = type => {
    const typeError = this.state[type + 'Error'];
    const typeValidity = this.state[type + 'Valid'];
    if (typeValidity === true) {
      return 'valid';
    } else if (typeError === 'empty' || typeError === null) {
      return '';
    }
    return 'invalid';
  };

  onChange = (name, value) => {
    this.setState({ [name]: value });
  };

  setLocationAttributes = l => {
    this.setState({ ...this.state, ...l });
  };

  render() {
    const addonFees = filter(this.state.fees, ['is_addon', 'true']);
    const currency = this.state.brandCurrency;
    const sortedAddonFees = sortBy(
      addonFees,
      fee => !this.state.addonFeeIds.includes(fee.id)
    );
    return (
      !this.state.loading && (
        <main className="checkout-main">
          <Script
            url="https://js.stripe.com/v2/"
            onError={this.handleStripeScriptError.bind(this)}
            onLoad={this.handleStripeScriptLoad.bind(this)}
          />
          <Notification />
          {this.state.isStripeSuccessful &&
          this.state.availability &&
          this.state.availability.bookable &&
          this.state.pricing ? (
            <section className="payment">
              {addonFees.length > 0 && (
                <div className="addons-title">Extra Add-Ons</div>
              )}
              {sortedAddonFees.map((fee, index) =>
                fee.fee_account.quantity_fee ? (
                  <PortalModal
                    header={`${fee.name}`}
                    openByClickOn={openPortal => (
                      <div className="addons-wrapper">
                        <div className="addons-item" onClick={openPortal}>
                          <div
                            className="addons-image"
                            style={
                              fee.fee_account
                                ? {
                                    backgroundImage: `url(${
                                      fee.fee_account.fee_image
                                    })`
                                  }
                                : {
                                    backgroundImage: `url('https://via.placeholder.com/360x240')`
                                  }
                            }
                          />
                          <div className="addons-info">
                            <span>Add {fee.name}</span>
                          </div>
                        </div>
                      </div>
                    )}
                    disableCloseOnOutsideClick
                    modalStyles={{ width: '30%', height: '80%' }}
                    submitAction={closePortal => (
                      <div style={{ textAlign: 'center', marginTop: '5%' }}>
                        <a
                          className={'button'}
                          onClick={() => this.submitFees(fee, closePortal)}
                        >
                          Submit
                        </a>
                      </div>
                    )}
                    closeOnSubmit
                  >
                    <AddOnModal
                      addonImages={this.props.brand.organization.add_on_images}
                      fee={fee}
                      renderDescriptionPopover={this.renderDescriptionPopover}
                      currency={currency}
                      addonFeeIds={this.state.addonFeeIds}
                      checkPricing={this.checkPricing}
                      addFeeIds={this.addFeeIds}
                      quantity={this.state.quantity}
                      updateQuantity={this.updateQuantity}
                      feeQuantities={this.state.feeQuantities}
                    />
                  </PortalModal>
                ) : null
              )}
              {this.props.brand.organization.add_on_images ? (
                <AddOns
                  availability={this.state.availability}
                  currency={this.state.brandCurrency}
                  updateFees={this.updateFees}
                  temp_fees={this.state.fees}
                  addonFeeIds={this.state.addonFeeIds}
                />
              ) : null}
              <figure className="field-customer-name">
                <header>Contact Information</header>
                <label htmlFor="customerName">
                  <span>Full name</span>
                </label>
                <input
                  autoComplete="name"
                  type="text"
                  name="customerName"
                  onChange={e => this.onChange(e.target.name, e.target.value)}
                  onBlur={this.onBlur}
                  placeholder="Jane Smith"
                  value={this.state.customerName}
                  required
                />
              </figure>

              <figure className="field-customer-email">
                <label htmlFor="customerEmail">
                  <span>Email</span>
                </label>
                <input
                  autoComplete="email"
                  type="email"
                  name="customerEmail"
                  onChange={e => this.onChange(e.target.name, e.target.value)}
                  onBlur={this.onBlur}
                  placeholder="name@email.com"
                  value={this.state.customerEmail}
                  required
                />
              </figure>

              <figure className="field-customer-telephone">
                <label htmlFor="customerTelephone">
                  <span>Telephone number</span>
                </label>
                <input
                  autoComplete="tel"
                  type="tel"
                  name="customerTelephone"
                  onChange={e => this.onChange(e.target.name, e.target.value)}
                  onBlur={this.onBlur}
                  placeholder="+1 (123) 123-1234"
                  maxLength={20}
                  value={this.state.customerTelephone}
                  required
                />
              </figure>
              <LocationForm
                setLocationAttributes={l => this.setLocationAttributes(l)}
              />
              <FormPayment
                availability={this.state.availability}
                bookProperty={this.bookProperty}
                guests={this.state.guests}
                max_guests={this.state.unit.num_sleep}
                updateGuests={this.updateGuests}
                slug={this.state.slug}
                rental_agreement={this.state.rentalAgreement}
                organizationId={this.state.property.organization_id}
                verify_signature={this.state.verifySignature}
                verify_image={this.state.verifyImage}
                verify_image_description={this.state.verifyImageDescription}
                customerEmail={this.state.customerEmail}
                customerName={this.state.customerName}
                customerPostalCode={this.state.adrPostalCode}
                customerTelephone={this.state.customerTelephone}
              />
              <ErrorsPaymentTransaction
                errors={[this.state.transactionError]}
              />
            </section>
          ) : (
            <section className="payment">
              {this.state.isStripeSuccessful ? null : (
                <section className="fields-cc">
                  <Spinner />
                </section>
              )}
            </section>
          )}
          <section className="information">
            <InfoListing
              checkInDate={this.state.checkInDate}
              checkOutDate={this.state.checkOutDate}
              featured_image={this.state.featuredImage}
              guests={this.state.guests}
              listing={this.state.listing}
              obfuscated_address={this.state.obfuscatedAddress}
              pricing={this.state.pricing}
              property={this.state.property}
              slug={this.state.slug}
              unit={this.state.unit}
            />
            <InfoBooking
              nights={this.state.bookingLength}
              checkInDate={this.state.checkInDate}
              checkOutDate={this.state.checkOutDate}
              guests={this.state.guests}
            />
            <InfoPricing
              availability={this.state.availability}
              currency={this.state.brandCurrency}
              nights={this.state.bookingLength}
              pricing={this.state.pricing}
              updateFees={this.updateFees}
              temp_fees={this.state.fees}
              addonFeeIds={this.state.addonFeeIds}
              checkInDate={this.state.checkInDate}
              checkoutTotal={this.state.checkoutTotal}
              addonImages={this.props.brand.organization.add_on_images}
              checkPricing={this.checkPricing}
              addFeeIds={this.addFeeIds}
              feeQuantities={this.state.feeQuantities}
              availabilityLoading={this.state.availabilityLoading}
              addCouponCode={this.addCouponCode}
              organizationId={this.props.brand.organization.id}
              allCouponCodes={this.state.allCouponCodes}
            />
          </section>
        </main>
      )
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Checkout)