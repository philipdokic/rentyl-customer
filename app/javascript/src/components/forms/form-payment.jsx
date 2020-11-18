// Dependencies
// -----------------------------------------------
import React from 'react';
import MaskedInput from 'react-maskedinput';
import ReactI18n from 'react-i18n'

// Components
// -----------------------------------------------
import Link from '../links/link';
import Indicator from '../toggle/indicator';

// import CustomerVerification from './customer-verification';
import {
  cardTypeMask,
  checkErrorsGuests,
  checkErrorsCardNumber,
  checkErrorsCardExpiry,
  checkErrorsCardCvv,
  checkErrorsCustomerEmail,
  checkErrorsCustomerName,
  checkErrorsCustomerPostalCode,
  checkErrorsCustomerTelephone,
  validateGuests,
  validateCardNumber,
  validateCardExpiry,
  validateCardCvv,
  validateCustomerEmail,
  validateCustomerName,
  validateCustomerPostalCode,
  validateCustomerTelephone
} from '../credit-card';

import ErrorsPaymentCard from '../errors/payment-card'
import ErrorsPaymentCustomer from '../errors/payment-customer';

export default class FormPayment extends React.Component {
  constructor(props, _railsContext) {
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
      customerTelephoneError: null
    };
  }

  componentDidMount() {
    this.checkValidity('guests', this.state.guests);
    this.checkValidity('cardNumber', this.state.cardNumber);
    this.checkValidity('cardExpiry', this.state.cardExpiry);
    this.checkValidity('cardCvv', this.state.cardCvv);
    this.checkValidity('customerEmail', this.state.customerEmail);
    this.checkValidity('customerName', this.state.customerName);
    this.checkValidity('customerPostalCode', this.state.customerPostalCode);
    this.checkValidity('customerTelephone', this.state.customerTelephone);
  }

  onChange = e => {
    e.preventDefault();
    let stateChange = {};
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

  onBlur = e => {
    this.checkValidity(e.target.name, e.target.value);
    let stateChange = {};
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

  checkValidity = (type, val) => {
    let validity = false;
    let error = null;
    switch (type) {
      case 'guests':
        validity = validateGuests(val);
        error = checkErrorsGuests(val);
        break;
      case 'cardCvv':
        validity = validateCardCvv(val);
        error = checkErrorsCardCvv(val);
        break;
      case 'cardExpiry':
        validity = validateCardExpiry(val);
        error = checkErrorsCardExpiry(val);
        break;
      case 'cardNumber':
        validity = validateCardNumber(val);
        error = checkErrorsCardNumber(val);
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

    let validityChange = {};
    let errorChange = {};
    validityChange[type + 'Valid'] = validity;
    errorChange[type + 'Error'] = error;
    this.setState(validityChange);
    this.setState(errorChange);
  };

  handleSubmit = e => {
    this.submitBtn.setAttribute('disabled', 'disabled');
    e.preventDefault();
    this.props.bookProperty(
      this.state.guests,
      this.state.cardNumber,
      this.state.cardExpiry,
      this.state.cardCvv,
      this.state.customerEmail,
      this.state.customerName,
      this.state.customerPostalCode,
      this.state.customerTelephone
    );
    // Use this in future if we start handling bad cards here.
    // currently even on card fail, we go to verification page
    // window.setTimeout(() => {
    // this.submitBtn.removeAttribute('disabled');
    // }, 3000);
  };

  hasInvalidFields = () => {
    return !(
      this.state.guestsValid &&
      this.state.cardNumberValid &&
      this.state.cardExpiryValid &&
      this.state.cardCvvValid &&
      this.state.customerEmailValid &&
      this.state.customerNameValid &&
      this.state.customerPostalCodeValid &&
      this.state.customerTelephoneValid
    );
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

  buildSectionStatus = type => {
    if (type === 'cc') {
      if (
        this.state['cardNumberValid'] &&
        this.state['cardExpiryValid'] &&
        this.state['cardCvvValid']
      ) {
        return 'valid';
      } else if (
        (this.state['cardNumberError'] &&
          this.state['cardNumberError'] !== 'empty') ||
        (this.state['cardExpiryError'] &&
          this.state['cardExpiryError'] !== 'empty') ||
        (this.state['cardCvvError'] && this.state['cardCvvError'] !== 'empty')
      ) {
        return 'invalid';
      } else {
        return '';
      }
    }
  };

  setupGuests = () => {
    let guestsArray = [];
    for (let i = 1; i <= this.props.max_guests; i++) {
      guestsArray.push(i);
    }
    return guestsArray;
  };

  checkCardValidity = () => {
    const {
      cardCvv,
      cardExpiry,
      cardNumber,
      cardCvvValid,
      cardExpiryValid,
      cardNumberValid
    } = this.state;
    if (
      cardCvv &&
      cardExpiry &&
      cardNumber &&
      !(cardCvvValid && cardExpiryValid && cardNumberValid)
    ) {
      // to avoid problems with autofilled forms, this should run when each field in payment has been filled out, but not marked as valid
      this.checkValidity('cardNumber', cardNumber);
      this.checkValidity('cardCvv', cardCvv);
      this.checkValidity('cardExpiry', cardExpiry);
    }
  };

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

  render() {
    const translate = ReactI18n.getIntlMessage;
    const guestsArray = this.setupGuests();
    return (
      <div>
        <form noValidate className="form-payment">
          <section className={`fields-cc ${this.buildSectionStatus('cc')}`}>
            <header>Payment Information</header>
            <ErrorsPaymentCard
              errors={[
                { param: 'cardNumber', code: this.state.cardNumberError },
                { param: 'cardExpiry', code: this.state.cardExpiryError },
                { param: 'cardCvv', code: this.state.cardCvvError }
              ]}
              translate={translate}
            />
            <figure className="field-cc-number">
              <label htmlFor="cardNumber">
                <span>Credit card number</span>
              </label>
              <MaskedInput
                autoComplete="cc-number"
                type="tel"
                mask={this.state.cardTypeMask}
                name="cardNumber"
                size={20}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder="XXXX XXXX XXXX XXXX"
                placeholderChar=" "
                pattern="\d*"
                value={this.state.cardNumber}
                className={`font-mono ${this.buildFieldStatus('cardNumber')}`}
                required
              />
            </figure>
            <figure className="field-cc-exp">
              <label htmlFor="cardExpiry">
                <span>Expiration</span>
              </label>
              <MaskedInput
                autoComplete="cc-exp"
                type="tel"
                mask="11/11"
                name="cardExpiry"
                placeholder="MM/YY"
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholderChar=" "
                pattern="\d*"
                value={this.state.cardExpiry}
                className={`font-mono ${this.buildFieldStatus('cardExpiry')}`}
                required
              />
            </figure>

            <figure className="field-cc-cvv">
              <label htmlFor="cardCvv">
                <span>CVV</span>
              </label>
              <MaskedInput
                autoComplete="cc-csc"
                type="tel"
                mask="1111"
                name="cardCvv"
                size={4}
                onChange={this.onChange}
                onBlur={this.onBlur}
                placeholder="XXX"
                placeholderChar=" "
                pattern="\d*"
                value={this.state.cardCvv}
                className={`font-mono ${this.buildFieldStatus('cardCvv')}`}
                required
              />
            </figure>
          </section>

          <section className="fields-customer">
            <header>Billing Information</header>
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
              translate={translate}
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
            </figure>

            <figure className="field-customer-email">
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
            </figure>

            <figure className="field-customer-telephone">
              <label htmlFor="customerTelephone">
                <span>Telephone number</span>
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
            </figure>

            <figure className="field-customer-postal-code">
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
            </figure>
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
          </section>
          <button
            ref={submitBtn => {
              this.submitBtn = submitBtn;
            }}
            disabled={this.hasInvalidFields()}
            onClick={this.handleSubmit}
          >
            {this.props.availability.instant_booking
              ? translate(`cx.global.book.long`)
              : translate(`cx.global.book_inquiry.long`)}
          </button>
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
              <Link to={this.props.rental_agreement.pdf.url} target={`_blank`}>
                {translate(`cx.global.book_confirm.contract_link`)}
              </Link>
              .
            </small>
          ) : null}
        </form>
      </div>
    );
  }
}
