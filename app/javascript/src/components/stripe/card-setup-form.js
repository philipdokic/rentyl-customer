// Dependencies
// -----------------------------------------------
import React from 'react';
import axios from 'axios';
import { ElementsConsumer, CardElement } from '@stripe/react-stripe-js';
import { isNull } from 'lodash';
import ReactI18n from 'react-i18n';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import CardSection from './card-section';
import {
  cardTypeMask,
  checkErrorsGuests,
  checkErrorsCustomerEmail,
  checkErrorsCustomerName,
  checkErrorsCustomerPostalCode,
  checkErrorsCustomerTelephone,
  validateGuests,
  validateCustomerEmail,
  validateCustomerName,
  validateCustomerPostalCode,
  validateCustomerTelephone
} from '../credit-card';
import ErrorsPaymentCustomer from '../errors/payment-customer';
import Indicator from '../toggle/indicator';
import Link from '../links/link';

// Styles
// -----------------------------------------------
const ErrorLabel = styled.span`
  color: red;
  font-size: 12px;
  line-height: 24px;
`;

const FormGroup = styled.fieldset`
  display: block;
  width: 100%;

  &.width-25 {
    width: 23%;
  }

  &.width-50 {
    width: 48%;
  }

  &.width-75 {
    width: 73%;
  }
`;

// -----------------------------------------------
// COMPONENT->CARD-SETUP-FORM --------------------
// -----------------------------------------------
class CardSetupForm extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      toggleFill: false,
      guests: this.props.guests || 1,
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardTypeMask: '1111 1111 1111 1111',
      customerEmail: this.props.customerEmail || '',
      customerName: this.props.customerName || '',
      customerPostalCode: this.props.customerPostalCode || '',
      customerTelephone: this.props.customerTelephone || '',
      guestsValid: true,
      cardNumberValid: false,
      cardExpiryValid: false,
      cardCvvValid: false,
      customerEmailValid: false,
      customerNameValid: false,
      customerPostalCodeValid: false,
      customerTelephoneValid: false,
      cardNumberError: null,
      cardExpiryError: null,
      cardCvvError: null,
      customerEmailError: null,
      customerNameError: null,
      customerPostalCodeError: null,
      customerTelephoneError: null,
      errors: {}
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.checkValidity('guests', this.state.guests);
    this.checkValidity('customerEmail', this.state.customerEmail);
    this.checkValidity('customerName', this.state.customerName);
    this.checkValidity('customerPostalCode', this.state.customerPostalCode);
    this.checkValidity('customerTelephone', this.state.customerTelephone);
  }

  // On Change
  // ---------------------------------------------
  onChange = e => {
    e.preventDefault();
    const stateChange = {};
    stateChange[e.target.name] = e.target.value;
    if (e.target.classList.contains('invalid')) {
      this.checkValidity(e.target.name, e.target.value);
    }
    this.setState(stateChange);
    if (e.target.name === 'cardNumber') {
      this.setState({ cardTypeMask: cardTypeMask(e.target.value) });
    }
    if (e.target.name === 'guests') {
      this.props.updateGuests(e.target.value);
    }
  };

  // On Blur
  // ---------------------------------------------
  onBlur = e => {
    this.checkValidity(e.target.name, e.target.value);
    const stateChange = {};
    stateChange[e.target.name] = e.target.value;
    if (e.target.classList.contains('invalid')) {
      this.checkValidity(e.target.name, e.target.value);
    }
    this.setState(stateChange);
    if (e.target.name === 'cardNumber') {
      this.setState({ cardTypeMask: cardTypeMask(e.target.value) });
    }
    if (e.target.name === 'guests') {
      this.props.updateGuests(e.target.value);
    }
  };

  // Check Validity
  // ---------------------------------------------
  checkValidity = (type, val) => {
    let validity = false;
    let error = null;
    switch (type) {
      case 'guests':
        validity = validateGuests(val);
        error = checkErrorsGuests(val);
        break;
      case 'customerEmail':
        validity = validateCustomerEmail(val);
        error = checkErrorsCustomerEmail(val);
        break;
      case 'customerName':
        validity = validateCustomerName(val);
        error = checkErrorsCustomerName(val);
        break;
      case 'customerPostalCode':
        validity = validateCustomerPostalCode(val);
        error = checkErrorsCustomerPostalCode(val);
        break;
      case 'customerTelephone':
        validity = validateCustomerTelephone(val);
        error = checkErrorsCustomerTelephone(val);
        break;
    }

    const validityChange = {};
    const errorChange = {};
    validityChange[`${type}Valid`] = validity;
    errorChange[`${type}Error`] = error;
    this.setState(validityChange);
    this.setState(errorChange);
  };

  // Handle Validation
  // ---------------------------------------------
  handleValidation() {
    const errors = {};
    let formIsValid = true;

    if (!this.state.customerName) {
      formIsValid = false;
      errors.name = 'Name is required.';
    }
    if (!this.state.customerEmail) {
      formIsValid = false;
      errors.email = 'Email is required.';
    }
    if (!this.state.customerTelephone) {
      formIsValid = false;
      errors.phone = 'Phone is required.';
    }
    if (!this.state.customerPostalCode) {
      formIsValid = false;
      errors.postal = 'Postal code is required.';
    }

    this.setState({ errors });
    return formIsValid;
  }

  // Build Field Status
  // ---------------------------------------------
  buildFieldStatus = type => {
    const typeError = this.state[`${type}Error`];
    const typeValidity = this.state[`${type}Valid`];
    if (typeValidity === true) {
      return 'valid';
    } else if (typeError === 'empty' || typeError === null) {
      return '';
    }
    return 'invalid';
  };

  // Setup Guests
  // ---------------------------------------------
  setupGuests = () => {
    const guestsArray = [];
    for (let i = 1; i <= this.props.max_guests; i++) {
      guestsArray.push(i);
    }
    return guestsArray;
  };

  // Fill From Contact
  // ---------------------------------------------
  fillFromContact = () => {
    this.setState({
      customerEmail: this.props.customerEmail || '',
      customerName: this.props.customerName || '',
      customerPostalCode: this.props.customerPostalCode || '',
      customerTelephone: this.props.customerTelephone || '',
      toggleFill: true
    });
    if (this.props.customerEmail) {
      this.checkValidity('customerEmail', this.props.customerEmail);
    }
    if (this.props.customerName) {
      this.checkValidity('customerName', this.props.customerName);
    }
    if (this.props.customerPostalCode) {
      this.checkValidity('customerPostalCode', this.props.customerPostalCode);
    }
    if (this.props.customerTelephone) {
      this.checkValidity('customerTelephone', this.props.customerTelephone);
    }
  };

  // Handle Submit
  // ---------------------------------------------
  handleSubmit = async event => {
    event.preventDefault();

    const { stripe, elements } = this.props;

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      console.log("ERROR STRIPE!");
      return;
    }

    const result = await stripe.confirmCardSetup(
      `${this.props.stripeIntentId}`,
      {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: this.state.customerName,
            email: this.state.customerEmail,
            phone: this.state.customerTelephone,
            address: {
              postal_code: this.state.customerPostalCode
            }
          }
        }
      }
    );

    if (result.error) {
      console.log(result.error);
    } else if (this.handleValidation()) {
      this.submitBtn.setAttribute('disabled', 'disabled');
      if (this.props.chargeAmount > 0) {
        axios.post(`${process.env.DIRECT_URL}/api/v2/listings/${this.props.listing.id}/process_payment`, {
          context: this,
          params: {
            charge_amount: parseFloat(this.props.chargeAmount),
            booking_id: this.props.booking.id,
            customer_email: this.state.customerEmail,
            customer_name: this.state.customerName,
            customer_telephone: this.state.customerTelephone,
            stripe_token: this.props.stripeCustomerId
          }
        })
        .then(() => {
          window.location = window.location;
        })
        .catch(data => {
          console.log(data);
          alert(data.responseJSON.error);
          window.location = window.location;
        })
      } else {
        axios.post(`${process.env.DIRECT_URL}/api/v2/checkout_booking/${this.props.listing.id}`,{
          headers: {'Content-Type': 'application/json'},
          skip_quote_creation: !!this.props.quoteId,
          quote_id: this.props.quoteId,
          unit_id: this.props.unit.id,
          booking_range: JSON.stringify(this.props.bookingDaysInclusive),
          check_in: this.props.checkInDate.format('DD-MM-YYYY'),
          check_out: this.props.checkOutDate.format('DD-MM-YYYY'),
          num_guests: this.state.guests,
          customer_email: this.props.customerEmail,
          customer_name: this.props.customerName,
          customer_telephone: this.props.customerTelephone,
          adr_street: this.state.adrStreet,
          adr_city: this.state.adrCity,
          adr_state: this.state.adrState,
          adr_country: this.state.adrCountry,
          adr_zip: this.state.adrPostalCode,
          addon_fee_ids: this.props.addonFeeIds,
          stripe_customer_id: this.props.stripeCustomerId,
          coupon_code: this.props.couponCode,
          room_type_booking: !isNull(this.props.unit.room_type_id)
        })
        .then(response => {
          const data = response.data
          if (this.props.brand_info.google_events) {
            gtag('event', 'purchase', {
              transaction_id: data.booking_code,
              affiliation: 'Direct',
              value: this.props.pricing.total,
              currency: 'USD',
              tax: this.props.pricing.taxes,
              shipping: 0
            });
          }
          if (this.props.brand_info.facebook_pixel) {
            fbq('track', 'Purchase', {
              currency: 'USD',
              value: this.props.pricing.total
            });
          }
          if (
            this.props.verifyImage ||
            this.props.verifySignature ||
            this.props.verifyAge ||
            this.props.verifyAddress
          ) {
            window.location = '/my-bookings/verification/' + data.booking_code;
          } else {
            window.location = '/my-bookings/receipt/' + data.booking_code;
          }
        })
        .catch(data => {
          console.log(data);
          alert(data.responseJSON.error);
          window.location = window.location;
        })
      }
    } else {
      console.log(this.state.errors);
    }
  };

  render() {
    const translate = ReactI18n.getIntlMessage;
    const guestsArray = this.setupGuests();

    return (
      <form onSubmit={this.handleSubmit}>
        {this.props.chargeAmount > 0 &&
          <figure className="field-customer-name">
            <label htmlFor="chargeAmount">
              <span>Charge Amount</span>
            </label>
            <input
              name="chargeAmount"
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="$0.00"
              pattern="\d*"
              disabled="disabled"
              value={this.props.chargeAmount}
              required
            />
          </figure>
        }
        <CardSection />
        <section className="fields-customer">
          <header>Billing Information</header>
          {this.props.chargeAmount === undefined &&
            <Indicator
              toggleStatus={this.state.toggleFill}
              toggleFalseLabel="Fill from Contact Info"
              toggleTrueLabel="Fill from Contact Info"
              toggleAction={
                this.state.toggleFill
                  ? () =>
                      this.setState({
                        toggleFill: false,
                        customerEmail: '',
                        customerName: '',
                        customerPostalCode: '',
                        customerTelephone: '',
                        customerEmailValid: false,
                        customerNameValid: false,
                        customerPostalCodeValid: false,
                        customerTelephoneValid: false,
                        customerEmailError: 'empty',
                        customerNameError: 'empty',
                        customerPostalCodeError: 'empty',
                        customerTelephoneError: 'empty'
                      })
                  : () => this.fillFromContact()
              }
            />
          }
          <ErrorsPaymentCustomer
            errors={[
              { param: 'customerName', code: this.state.customerNameError },
              { param: 'customerEmail', code: this.state.customerEmailError },
              {
                param: 'customerTelephone',
                code: this.state.customerTelephoneError
              },
              {
                param: 'customerPostalCode',
                code: this.state.customerPostalCodeError
              },
              { param: 'guests', code: this.state.guestsError }
            ]}
            translate={this.props.translate}
          />
          <figure className="field-customer-name">
            <label htmlFor="customerName">
              <span>Full name</span>
            </label>
            <input
              autoComplete="name"
              type="text"
              name="customerName"
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="Jane Smith"
              value={this.state.customerName}
              className={this.buildFieldStatus('customerName')}
              required
            />
            <ErrorLabel>{this.state.errors.name}</ErrorLabel>
          </figure>

          <FormGroup className="width-50">
            <label htmlFor="customerEmail">
              <span>Email</span>
            </label>
            <input
              autoComplete="email"
              type="email"
              name="customerEmail"
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="name@email.com"
              value={this.state.customerEmail}
              className={this.buildFieldStatus('customerEmail')}
              required
            />
            <ErrorLabel>{this.state.errors.email}</ErrorLabel>
          </FormGroup>
          <FormGroup className="width-50">
            <label htmlFor="customerTelephone">
              <span>Phone</span>
            </label>
            <input
              autoComplete="tel"
              type="tel"
              name="customerTelephone"
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="+1 (123) 123-1234"
              maxLength={20}
              value={this.state.customerTelephone}
              className={this.buildFieldStatus('customerTelephone')}
              required
            />
            <ErrorLabel>{this.state.errors.phone}</ErrorLabel>
          </FormGroup>
          <FormGroup>
            <label htmlFor="customerPostalCode">
              <span>Postal code</span>
            </label>
            <input
              autoComplete="postal-code"
              type="text"
              name="customerPostalCode"
              onChange={this.onChange}
              onBlur={this.onBlur}
              placeholder="12345"
              maxLength={15}
              value={this.state.customerPostalCode}
              className={this.buildFieldStatus('customerPostalCode')}
              required
            />
            <ErrorLabel>{this.state.errors.postal}</ErrorLabel>
          </FormGroup>
          {this.props.chargeAmount === undefined || this.props.chargeAmount === '' &&
            <figure className="field-customer-guests select-wrapper">
              <label htmlFor="guests">
                <span>Number of Guests</span>
              </label>
              <select
                className={this.buildFieldStatus('guests')}
                name="guests"
                onBlur={this.onBlur}
                onChange={this.onChange}
                value={this.state.guests}
                required
              >
                {guestsArray.map(guest => (
                  <option value={guest} key={guest}>
                    {translate(
                      `global.parsers.num_guests.${
                        guest > 1 ? 'plural' : 'single'
                      }`,
                      { num: guest }
                    )}
                  </option>
                ))}
              </select>
            </figure>
          }
        </section>
        {this.props.chargeAmount > 0 ?
          <button
            ref={submitBtn => {
              this.submitBtn = submitBtn;
            }}
            onClick={this.handleSubmit}
          >
            Process Payment
          </button>
        :
          <button
            id="card-button"
            ref={submitBtn => {
              this.submitBtn = submitBtn;
            }}
            onClick={this.handleSubmit.bind(this)}
          >
            {this.props.availability.instant_booking
              ? translate(`cx.global.book.long`)
              : translate(`cx.global.book_inquiry.long`)}
          </button>
        }
        <small
          className="ancillary"
          dangerouslySetInnerHTML={{
            __html: translate(`cx.global.book_confirm.rules`, {
              property_url: `/listings/${this.props.slug}`
            })
          }}
        />
        {this.props.rental_agreement ? (
          <small className="ancillary">
            <span>{translate(`cx.global.book_confirm.contract`)}</span>
            <Link to={this.props.rental_agreement.short_url} target="_blank">
              {translate(`cx.global.book_confirm.contract_link`)}
            </Link>
            .
          </small>
        ) : null}
      </form>
    );
  }
}

export default function InjectedCardSetupForm(props) {
  return (
    <ElementsConsumer>
      {({ stripe, elements }) => (
        <CardSetupForm
          stripe={stripe}
          elements={elements}
          addonFeeIds={props.addonFeeIds}
          availability={props.availability}
          booking={props.booking}
          bookingDaysInclusive={props.bookingDaysInclusive}
          brand_info={props.brand_info}
          chargeAmount={props.chargeAmount}
          checkInDate={props.checkInDate}
          checkOutDate={props.checkOutDate}
          couponCode={props.couponCode}
          customerEmail={props.customerEmail}
          customerName={props.customerName}
          customerPostalCode={props.customerPostalCode}
          customerTelephone={props.customerTelephone}
          guests={props.guests}
          listing={props.listing}
          max_guests={props.max_guests}
          pricing={props.pricing}
          quoteId={props.quoteId}
          rental_agreement={props.rental_agreement}
          slug={props.slug}
          stripeCustomerId={props.stripeCustomerId}
          stripeIntentId={props.stripeIntentId}
          translate={props.translate}
          unit={props.unit}
          updateGuests={props.updateGuests}
          verifyImage={props.verifyImage}
          verifySignature={props.verifySignature}
          verifyAge={props.verifyAge}
          verifyAddress={props.verifyAddress}
        />
      )}
    </ElementsConsumer>
  );
}
