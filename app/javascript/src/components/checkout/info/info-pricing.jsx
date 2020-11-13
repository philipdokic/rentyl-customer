// Dependencies
// -----------------------------------------------
import React from 'react';
import moment from 'moment';
import { reject, filter, includes, sortBy, findIndex, find, isNull } from 'lodash';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import { CurrencyDisplay }from '../../miscellaneous/currency-display';
import PortalModal from '../../modals/portal-modal';
import CouponModal from '../../modals/coupon-modal';
import IndicatorToggle from '../../toggle/indicator-toggle';
import Spinner from '../../spinner/spinner'

export default class InfoPricing extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      quantity: 0,
      badCode: false,
      couponCode: ''
    };
  }

  renderDescriptionPopover(description) {
    return (
      <figure className="line-item-description" style={{ marginLeft: '5px' }}>
        <i />
        <span>{description}</span>
      </figure>
    );
  }

  renderDiscount(discount) {
    const translate = ReactI18n.getIntlMessage;
    const currency = this.props.currency;
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
              value: parseFloat(discount[2]).toFixed(2)
            })}
          </b>
        </td>
      </tr>
    );
  }

  calculateDeposits(bookingDeposit) {
    let total = 0;

    if (this.bookingOutsideRemainingBalanceDueDate(bookingDeposit)) {
      total = bookingDeposit.value;
    } else {
      total =
        this.props.pricing.promotional_total < this.props.checkoutTotal
          ? this.props.pricing.promotional_total
          : this.props.checkoutTotal;
    }

    return total;
  }

  submitFees = (fee, closePortal) => {
    this.props.addFeeIds(fee.id, this.state.quantity);
    closePortal();
  };

  updateQuantity = value => {
    this.setState({ quantity: value });
  };

  renderFeeQuantity = feeId => {
    return this.props.feeQuantities.find(feeQ => feeQ.id === feeId);
  };

  verifyCouponCode = closePortal => {
    if (isNull(this.props.allCouponCodes)) {
      this.setState({ badCode: true });
    } else if (
      this.props.allCouponCodes.includes(this.state.couponCode.toLowerCase())
    ) {
      this.props.addCouponCode(this.state.couponCode);
      closePortal();
    } else {
      this.setState({ badCode: true });
    }
  };

  updateCouponCode = couponCode => {
    this.setState({ couponCode, badCode: false });
  };

  renderSubmitAction = closePortal => (
    <a
      className={'button positive'}
      onClick={() => this.verifyCouponCode(closePortal)}
    >
      Submit
    </a>
  );

  renderPricing() {
    const translate = ReactI18n.getIntlMessage
    const currency = this.props.currency;
    const mandatoryFees = reject(this.props.temp_fees, ['is_addon', 'true']);
    const addonFees = filter(this.props.temp_fees, ['is_addon', 'true']);
    const sortedAddonFees = sortBy(
      addonFees,
      fee => !this.props.addonFeeIds.includes(fee.id)
    );
    return (
      <figure>
        <div className="checkout-info-subsection">
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
                      value: this.props.pricing.average_nightly_price.toFixed(2)
                    })}{' '}
                    ×{' '}
                    {translate(
                      `global.parsers.num_nights.${
                        this.props.nights > 1 ? 'plural' : 'single'
                      }`,
                      { nights: this.props.nights }
                    )}
                  </p>
                </td>
                <td>
                  <p
                    style={
                      this.props.pricing.average_nightly_promotional_price <
                      this.props.pricing.average_nightly_price
                        ? { textDecoration: 'line-through', color: 'red' }
                        : {}
                    }
                  >
                    {translate(`global.parsers.currency.${currency}`, {
                      value: this.props.pricing.subtotal.toFixed(2)
                    })}
                  </p>
                </td>
              </tr>
              {this.props.pricing.promotional_subtotal <
                this.props.pricing.subtotal && (
                <tr>
                  <td>
                    {translate(`global.parsers.currency_avg.${currency}`, {
                      value: this.props.pricing.average_nightly_promotional_price.toFixed(
                        2
                      )
                    })}{' '}
                    ×{' '}
                    {translate(
                      `global.parsers.num_nights.${
                        this.props.nights > 1 ? 'plural' : 'single'
                      }`,
                      { nights: this.props.nights }
                    )}
                  </td>
                  <td>
                    {translate(`global.parsers.currency.${currency}`, {
                      value: this.props.pricing.promotional_subtotal.toFixed(2)
                    })}
                  </td>
                </tr>
              )}
              {this.props.pricing.los_discount[0] &&
              this.props.pricing.los_discount[1] > 0
                ? this.renderDiscount(this.props.pricing.los_discount)
                : null}
              {mandatoryFees.length > 0 &&
                mandatoryFees.map(fee => (
                  <tr key={fee.id}>
                    {[
                      <td>
                        {fee.name}
                        {fee.calculation_type === 'percent' &&
                          ` (${parseFloat(fee.calculation_amount).toFixed(
                            0
                          )}%)`}
                        {fee.description
                          ? this.renderDescriptionPopover(fee.description)
                          : null}
                      </td>,
                      <td>
                        {translate(`global.parsers.currency.${currency}`, {
                          value: parseFloat(fee.value).toFixed(2)
                        })}
                      </td>
                    ]}
                  </tr>
                ))}
              <tr>
                <td>{translate(`cx.global.taxes`)}</td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: this.props.pricing.taxes.toFixed(2)
                  })}
                </td>
              </tr>
              {addonFees.length > 0 && (
                <tr>
                  <td
                    style={{
                      textAlign: 'left',
                      fontWeight: 'bold',
                      padding: '10px 0 4px 0'
                    }}
                  >
                    Extra Add-Ons
                  </td>
                  <td />
                </tr>
              )}
              {sortedAddonFees.map((fee, index) => (
                <tr style={{ border: '0' }} key={fee.id}>
                  {fee.fee_account.quantity_fee ? (
                    <>
                      {this.renderFeeQuantity(fee.id) && (
                        <>
                          {this.renderFeeQuantity(fee.id).quantity > 0 && (
                            <>
                              <td
                                style={{ display: 'flex', minWidth: '204px' }}
                              >
                                {fee.name}
                                {fee.description
                                  ? this.renderDescriptionPopover(
                                      fee.description
                                    )
                                  : null}{' '}
                                × {this.renderFeeQuantity(fee.id).quantity}
                              </td>
                              <td
                                style={{
                                  minWidth: '84px',
                                  verticalAlign: 'middle'
                                }}
                              >
                                {translate(
                                  `global.parsers.currency.${currency}`,
                                  {
                                    value: (
                                      parseFloat(fee.value).toFixed(2) *
                                      (this.renderFeeQuantity(fee.id)
                                        ? this.renderFeeQuantity(fee.id)
                                            .quantity
                                        : 0)
                                    ).toFixed(2)
                                  }
                                )}
                              </td>
                            </>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <>
                      <td style={{ display: 'flex', minWidth: '204px' }}>
                        <IndicatorToggle
                          toggleAction={this.props.updateFees}
                          toggleStatus={this.props.addonFeeIds.includes(fee.id)}
                          toggleItemId={fee.id}
                          toggleFalseLabel=""
                          toggleTrueLabel=""
                        />
                        {fee.name}
                        {fee.description
                          ? this.renderDescriptionPopover(fee.description)
                          : null}
                      </td>
                      <td style={{ minWidth: '84px', verticalAlign: 'middle' }}>
                        {translate(`global.parsers.currency.${currency}`, {
                          value: parseFloat(fee.value).toFixed(2)
                        })}
                      </td>
                    </>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div>
          <PortalModal
            openByClickOn={openPortal => (
              <a onClick={openPortal} style={{ marginLeft: '10%' }}>
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
              addCouponCode={this.props.addCouponCode}
              updateCouponCode={this.updateCouponCode}
              organizationId={this.props.organizationId}
              translate={this.props.translate}
            />
          </PortalModal>
        </div>
        {this.renderTotalAndImmediatePayment()}
      </figure>
    );
  }

  calculateBalanceDueDate = () => {
    const dueDates = [];
    if (this.props.pricing.booking_deposits) {
      dueDates.push(
        this.props.pricing.booking_deposits.remaining_balance_due_date
      );
    }

    const availableDueDates = [
      'day60',
      'day30',
      'day15',
      'day7',
      'check_in_date',
      'manual'
    ];
    if (dueDates.length > 0) {
      return find(availableDueDates, date => includes(dueDates, date));
    } else {
      return availableDueDates[0];
    }
  };

  renderBalanceDueText = () => {
    const dueDateOptions = [
      { value: 'day60', label: '60 days prior to check-in' },
      { value: 'day30', label: '30 days prior to check-in' },
      { value: 'day15', label: '15 days prior to check-in' },
      { value: 'day7', label: '7 days prior to check-in' },
      { value: 'check_in_date', label: 'on the check-in date' },
      { value: 'manual', label: 'before check-in' }
    ];
    const dueDate = this.calculateBalanceDueDate();
    const index = findIndex(dueDateOptions, option => option.value === dueDate);
    return dueDateOptions[index].label;
  };

  bookingOutsideRemainingBalanceDueDate = bookingDeposit => {
    if (!bookingDeposit || bookingDeposit.length == 0) {
      return false;
    }

    let timeNow = new Date();
    let outsideRemainingBalanceDueDate = true;
    let remainingBalanceOption = bookingDeposit.remaining_balance_due_date;
    let checkIn = this.props.checkInDate;

    if (['manual', 'check_in_date'].indexOf(remainingBalanceOption) > -1) {
      return true;
    }

    let dayOption = parseInt(remainingBalanceOption.replace('day', ''));
    let balanceDueDate = moment(timeNow.setDate(timeNow.getDate() + dayOption));

    return balanceDueDate.isBefore(checkIn);
  };

  renderTotalAndImmediatePayment = () => {
    const translate = ReactI18n.getIntlMessage
    const currency = this.props.currency;
    const isInstantBooking = this.props.availability.instant_booking;
    const price_total =
      this.props.pricing.promotional_total < this.props.checkoutTotal
        ? this.props.pricing.promotional_total.toFixed(2)
        : this.props.checkoutTotal.toFixed(2);

    return (
      <span>
        <div
          className="checkout-info-subsection"
          style={{ borderTop: '1px solid rgba(0,0,0,.15)' }}
        >
          <table>
            <tbody>
              <tr>
                <td>{translate(`cx.global.total`)}</td>
                <td>
                  {translate(`global.parsers.currency.${currency}`, {
                    value: price_total
                  })}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="checkout-info-subsection">
          <table>
            <tbody>
              <tr style={{ width: '289px', height: '59px' }}>
                <td style={{ verticalAlign: 'top' }}>
                  {isInstantBooking
                    ? translate(`cx.global.immediate_payment`)
                    : 'Amount due at booking confirmation:'}
                </td>
                <td style={{ fontSize: '28px', textAlign: 'right' }}>
                  {this.props.pricing.booking_deposits
                    ? translate(`global.parsers.currency.${currency}`, {
                        value: this.calculateDeposits(
                          this.props.pricing.booking_deposits
                        ).toFixed(2)
                      })
                    : translate(`global.parsers.currency.${currency}`, {
                        value: price_total
                      })}
                </td>
              </tr>
              {this.props.pricing.booking_deposits &&
              this.bookingOutsideRemainingBalanceDueDate(
                this.props.pricing.booking_deposits
              ) ? (
                <tr
                  style={{
                    margin: 'auto',
                    padding: '5.656px',
                    textAlign: 'right',
                    borderTop: '0'
                  }}
                >
                  <td colSpan="2" style={{ minWidth: '300px' }}>
                    Pay the rest {this.renderBalanceDueText()}
                    <span>
                      <figure className="line-item-description">
                        <i />
                        <span>
                          A booking deposit of{' '}
                          <CurrencyDisplay
                            currencyValue={this.props.currency}
                          />
                          {this.calculateDeposits(
                            this.props.pricing.booking_deposits
                          ).toFixed(2)}{' '}
                          is all you need to pay up-front; the rest of your
                          payment is due {this.renderBalanceDueText()}. Your
                          card will not be charged until the owner confirms your
                          booking.
                        </span>
                      </figure>
                    </span>
                  </td>
                </tr>
              ) : null}
              {this.props.pricing.security_deposits.value > 0 && (
                <tr
                  style={{
                    borderTop: '0',
                    margin: 'auto',
                    padding: '5.656px',
                    textAlign: 'right'
                  }}
                >
                  <td colSpan="2" style={{ minWidth: '300px' }}>
                    A Refundable Security Deposit of{' '}
                    {translate(`global.parsers.currency.${currency}`, {
                      value: this.props.pricing.security_deposits.value.toFixed(
                        2
                      )
                    })}{' '}
                    is due 2 days prior to check-in.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </span>
    );
  };

  render() {
    const translate = this.props.translate;
    return (
      <section className="checkout-info-pricing">
        {!this.props.availabilityLoading ? (
          <div>
            {this.props.availability.bookable && this.props.pricing ? (
              <div>{this.renderPricing()}</div>
            ) : (
              <div className="checkout-info-subsection checkout-error">
                {translate(`cx.errors.listing_generic`)}
              </div>
            )}
          </div>
        ) : (
          <div className="checkout-info-subsection">
            <Spinner />
          </div>
        )}
      </section>
    );
  }
}
