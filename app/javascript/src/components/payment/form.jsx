// Dependencies
// -----------------------------------------------
import React from 'react';
import MaskedInput from 'react-maskedinput';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
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
import PaymentCard from '../errors/payment-card';
import PaymentCustomer from '../errors/payment-customer';

// -----------------------------------------------
// COMPONENT->FORM(RECEIPT) ----------------------
// -----------------------------------------------
export default class Form extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      cardNumber: '',
      cardExpiry: '',
      cardCvv: '',
      cardTypeMask: '1111 1111 1111 1111',
      customerEmail: this.props.customerEmail || '',
      customerName: this.props.customerName || '',
      customerPostalCode: this.props.customerPostalCode || '',
      customerTelephone: this.props.customerTelephone || '',
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

  // On Change
  // ---------------------------------------------
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
  };

  // On Blur
  // ---------------------------------------------
  onBlur = e => {
    this.checkValidity(e.target.name, e.target.value);
  };

  // Check Validity
  // ---------------------------------------------
  checkValidity = (type, val) => {
    let validity = false;
    let error = null;

    switch (type) {
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

  // Handle Submit
  // ---------------------------------------------
  handleSubmit = e => {
    this.submitBtn.setAttribute('disabled', 'disabled');
    e.preventDefault();

    this.props.processSecurityDeposit(
      this.state.cardNumber,
      this.state.cardExpiry,
      this.state.cardCvv,
      this.state.customerEmail,
      this.state.customerName,
      this.state.customerPostalCode,
      this.state.customerTelephone
    );
  };

  // Has Invalid Fields
  // ---------------------------------------------
  hasInvalidFields = () => {
    return !(
      this.state.cardNumberValid &&
      this.state.cardExpiryValid &&
      this.state.cardCvvValid &&
      this.state.customerEmailValid &&
      this.state.customerNameValid &&
      this.state.customerPostalCodeValid &&
      this.state.customerTelephoneValid
    );
  };

  // Build Field Status
  // ---------------------------------------------
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

  // Build Section Status
  // ---------------------------------------------
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

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <div>
        <form noValidate className="form-payment">
          <section className={`fields-cc ${this.buildSectionStatus('cc')}`}>
            <header>Payment Information</header>
            <PaymentCard
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
                mask="11/1111"
                name="cardExpiry"
                placeholder="MM/YYYY"
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
            <PaymentCustomer
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
                }
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
          </section>
          <button
            ref={submitBtn => {
              this.submitBtn = submitBtn;
            }}
            disabled={this.hasInvalidFields()}
            onClick={this.handleSubmit}
          >
            Process Authorization
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
