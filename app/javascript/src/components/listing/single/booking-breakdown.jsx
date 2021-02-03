// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios'
import ReactI18n from 'react-i18n';
import { reject, filter, sortBy, isNull } from 'lodash';

// Components
// -----------------------------------------------
import BookingErrors from './booking-errors';
import CouponModal from './coupon-modal';
import Link from '../../links/link';
import PortalModal from '../../modals/portal';

// -----------------------------------------------
// COMPONENT->BOOKING-BREAKDOWN ------------------
// -----------------------------------------------
export default class BookingBreakdown extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      numFees: 1,
      couponCode: null,
      allCouponCodes: null,
      badCode: false,
      listing: null,
      roomType: false
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount = () => {
    this.fetchCouponCodes();
    this.findListingAndRoomType();
  };

  // Build Go To Checkout URL
  // ---------------------------------------------
  buildGoToCheckoutUrl = () => {
    const checkInDateFormatted = this.props.checkInDate.format('DD-MM-YYYY');
    const checkOutDateFormatted = this.props.checkOutDate.format('DD-MM-YYYY');
    const addonFeeIds = this.props.addonFeeIds
      ? this.props.addonFeeIds.join(',')
      : [];
    const listingId = this.state.roomType
      ? this.state.listing.id
      : this.props.listing.id;
    const goToCheckoutUrl =
      '/checkout/' +
      listingId +
      '?check-in=' +
      checkInDateFormatted +
      '&check-out=' +
      checkOutDateFormatted +
      '&guests=' +
      this.props.guests +
      '&addonFeeIds=' +
      addonFeeIds +
      '&couponCode=' +
      this.state.couponCode;
    return goToCheckoutUrl;
  };

  // Find Listing And Room Type
  // ---------------------------------------------
  findListingAndRoomType = () => {
    const brandId = this.props.listing.brand_id
    const unitId = this.props.unitId

    if (unitId === undefined) {
      this.setState({ roomType: false });
    } else {
      axios.get(`${process.env.DIRECT_URL}/api/v2/listings/single/find_listing/${brandId}/${unitId}`, {
        headers: {'Content-Type': 'application/json'},
        context: this
      })
      .then(response => {
        this.setState({
          listing: response.data,
          roomType: true
        });
      })
      .catch(error => {
        console.log(error);
      })
    }
  };

  // Render Description Popover
  // ---------------------------------------------
  renderDescriptionPopover(description) {
    return (
      <figure className="line-item-description">
        <i />
        <span>{description}</span>
      </figure>
    );
  }

  // Render Discount
  // ---------------------------------------------
  renderDiscount(discount) {
    const translate = ReactI18n.getIntlMessage;
    const currency = this.props.listing.currency;

    return (
      <tr>
        <td>
          {translate(`global.parsers.discount.${discount[0]}`, {
            value: discount[1]
          })}
        </td>
        <td>
          <b className="discount">
            -
            {translate(`global.parsers.currency.${currency}`, {
              value: discount[2]
            })}
          </b>
        </td>
      </tr>
    );
  }

  // Render Pricing
  // ---------------------------------------------
  renderPricing() {
    const translate = ReactI18n.getIntlMessage;
    const currency = this.props.listing.currency;
    const mandatoryFees = reject(
      this.props.pricing.fees,
      fee => fee.is_addon === 'true' || fee.value === 0
    );
    const addonFees = filter(this.props.pricing.fees, ['is_addon', 'true']) || [];
    const sortedAddonFees = sortBy(
      addonFees,
      fee => !this.props.addonFeeIds.includes(fee.id)
    );

    return (
      <table style={{ tableLayout: 'fixed' }}>
        <thead className="screenreader">
          <tr>
            <td>{translate(`cx.global.label`)}</td>
            <td>{translate(`cx.global.price`)}</td>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <p
                style={
                  this.props.pricing.average_nightly_promotional_price <
                  this.props.pricing.average_nightly_price
                    ? { textDecoration: 'line-through', color: 'red' }
                    : {}
                }
              >
                {translate(`global.parsers.currency_avg.${currency}`, {
                  value: Math.round(this.props.pricing.average_nightly_price)
                })}{' '}
                ×{' '}
                {translate(
                  `global.parsers.num_nights.${
                    this.props.availability.length_of_stay > 1
                      ? 'plural'
                      : 'single'
                  }`,
                  { nights: this.props.availability.length_of_stay }
                )}
              </p>
            </td>
            <td>
              <>
                <p
                  style={
                    this.props.pricing.promotional_subtotal <
                    this.props.pricing.subtotal
                      ? { textDecoration: 'line-through', color: 'red' }
                      : {}
                  }
                >
                  {translate(`global.parsers.currency.${currency}`, {
                    value: this.props.pricing.subtotal.toFixed(2)
                  })}
                </p>
              </>
            </td>
          </tr>
          {this.props.pricing.promotional_subtotal <
            this.props.pricing.subtotal && (
            <tr>
              <td>
                <p>
                  {translate(`global.parsers.currency_avg.${currency}`, {
                    value: Math.round(
                      this.props.pricing.average_nightly_promotional_price
                    )
                  })}{' '}
                  ×{' '}
                  {translate(
                    `global.parsers.num_nights.${
                      this.props.availability.length_of_stay > 1
                        ? 'plural'
                        : 'single'
                    }`,
                    { nights: this.props.availability.length_of_stay }
                  )}
                </p>
              </td>
              <td>
                <>
                  <p>
                    {translate(`global.parsers.currency.${currency}`, {
                      value: this.props.pricing.promotional_subtotal.toFixed(2)
                    })}
                  </p>
                </>
              </td>
            </tr>
          )}

          {this.props.pricing.los_discount[0] &&
          this.props.pricing.los_discount[1] > 0
            ? this.renderDiscount(this.props.pricing.los_discount)
            : null}
          {mandatoryFees &&
            mandatoryFees.map((fee, index) => (
              <tr key={fee.id}>
                <td>
                  {fee.name}
                  {fee.description
                    ? this.renderDescriptionPopover(fee.description)
                    : null}
                </td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: parseFloat(fee.value).toFixed(2)
                  })}
                </td>
              </tr>
            ))
          }
          <tr>
            <td>{translate(`cx.global.taxes`)}</td>
            <td>
              {translate(`global.parsers.currency.${currency}`, {
                value: this.props.pricing.taxes.toFixed(2)
              })}
            </td>
          </tr>
          {this.props.pricing.gameday_pricing > 0 && (
            <tr>
              <td>Processing Fee</td>
              <td>
                {translate(`global.parsers.currency.${currency}`, {
                  value: this.props.pricing.gameday_pricing.toFixed(2)
                })}
              </td>
            </tr>
          )}
          <tr>
            <td>{translate(`cx.global.total`)}</td>
            <td>
              {translate(`global.parsers.currency.${currency}`, {
                value:
                  this.props.pricing.promotional_total <
                  this.props.pricing.total
                    ? this.props.pricing.promotional_total.toFixed(2)
                    : this.props.pricing.total.toFixed(2)
              })}
            </td>
          </tr>
        </tbody>
      </table>
    );
  }

  // Fetch Coupon Codes
  // ---------------------------------------------
  fetchCouponCodes = () => {
    axios.get(`${process.env.DIRECT_URL}/api/v2/listings/single/${this.props.listing.id}/fetch_coupon_codes`, {
      headers: {'Content-Type': 'application/json'},
      context: this
    })
    .then(response => {
      this.setState({ allCouponCodes: response.data });
    })
    .catch(error => {
      console.log(error);
    })
  };

  // Update Coupon Code
  // ---------------------------------------------
  updateCouponCode = couponCode => {
    this.setState({ couponCode, badCode: false });
  };

  // Verify Coupon Code
  // ---------------------------------------------
  verifyCouponCode = closePortal => {
    if (isNull(this.state.allCouponCodes)) {
      this.setState({ badCode: true });
    } else if (
      this.state.allCouponCodes.includes(this.state.couponCode.toLowerCase())
    ) {
      this.props.addCouponCode(this.state.couponCode);
      closePortal();
    } else {
      this.setState({ badCode: true });
    }
  };

  // Render Submit Action
  // ---------------------------------------------
  renderSubmitAction = closePortal => (
    <a
      className={'button positive'}
      onClick={() => this.verifyCouponCode(closePortal)}
    >
      Submit
    </a>
  );

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;
    const currency = this.props.currency;

    if (this.props.availability && this.props.pricing) {
      return (
        <div className="details-booking-breakdown">
          {this.renderPricing()}
          <PortalModal
            openByClickOn={openPortal => (
              <a onClick={openPortal}>
                {translate(`cx.details.apply_coupon`)}
              </a>
            )}
            header="Apply your coupon code"
            submitAction={this.renderSubmitAction}
            closeOnSubmit
            hideCancelAction
            modalStyles={{ height: '35%' }}
            actionStyles={{ marginRight: '90%' }}
          >
            <CouponModal
              badCode={this.state.badCode}
              updateCouponCode={this.updateCouponCode}
            />
          </PortalModal>
          {this.props.availability.instant_booking ? (
            <Link to={this.buildGoToCheckoutUrl()} className="button">
              {translate(`cx.global.book.long`)}
            </Link>
          ) : (
            <Link to={this.buildGoToCheckoutUrl()} className="button">
              {translate(`cx.global.book_inquiry.long`)}
            </Link>
          )}
          <small>{translate(`cx.details.no_charge`)}</small>
        </div>
      );
    } else {
      return (
        <BookingErrors
          availability={this.props.availability}
          checkInDate={this.props.checkInDate}
          checkOutDate={this.props.checkOutDate}
        />
      );
    }
  }
}