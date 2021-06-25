// Dependencies
// -----------------------------------------------
import React from "react";
import axios from "axios";
import "react-dates/initialize"; // Needed for rendering any react-dates components
import get from "lodash/get";
import moment from "moment";
import ReactI18n from "react-i18n";
import Script from 'react-load-script';
import { toast } from 'react-toastify';

// Components
// -----------------------------------------------
import Listing from "./listing";
import Pricing from "./pricing";
import PaymentTransaction from "../errors/payment-transaction";
import StripeForm from "../stripe/index";
import Form from './form';
import Deposit from '../receipt/deposit';

// -----------------------------------------------
// COMPONENT->PAYMENT ----------------------------
// -----------------------------------------------
export default class Payment extends React.Component {
  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      isStripeSuccessful: false,
      listing: {},
      transactionError: null,
      availability: {},
      booking: {},
      bookingPaymentDueToday: null,
      bookingPaymentBalanceDueDate: "",
      charges: [],
      nights: 0,
      pricing: null,
      customer: {},
      featured_image: {},
      location: {},
      property: {},
      property_manager: {},
      slug: "",
      unit: {},
      bookingPaid: null,
      securityDeposit: {},
      securityDepositRequired: null,
      verified: null,
      loading: true,
      stripe_publishable_key: "",
      stripe_account_id: "",
      chargeAmount: 0,
    };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount = () => {
    this.fetchData(this.props);
  };

  // Fetch Data
  // ---------------------------------------------
  fetchData = (props) => {
    this.setState({ loading: true }, () => {
      axios
        .post(
          `${process.env.DIRECT_URL}/api/v2/my-bookings/payment/${props.match.params.booking_code}`
        )
        .then((response) => {
          console.log(response.data);
          this.setState({ loading: false, ...response.data });
        })
        .catch((error) => {
          console.error(error);
        });
    });
  };

  // Parse Time
  // ---------------------------------------------
  parseTime = (time) => {
    const t = moment(time, "hh:mm");
    if (t !== "Invalid date") {
      return t.format("h:mm a");
    }
    return null;
  };

  // Get Charge Amount
  // ---------------------------------------------
  getChargeAmount = () => {
    return Math.max(0, this.state.bookingPaymentDueToday).toFixed(2);
  };

  // More Charges Needed
  // ---------------------------------------------
  moreChargesNeeded = () => {
    const { isStripeSuccessful, securityDepositRequired, booking, charges } = this.state;
    if (!isStripeSuccessful) {
      return false;
    }
    if (booking.cancelled) {
      return false;
    }
    if (
      securityDepositRequired &&
      charges.length > 0 &&
      moment() > moment(booking.check_in).subtract(4, "days")
    ) {
      return charges.findIndex((c) => c.is_security_deposit === true) === -1;
    }
    return charges.length === 0;
  };

  // Process Security Deposit
  // ---------------------------------------------
  processSecurityDeposit = (
    cardNumber,
    cardExpiry,
    cardCvv,
    customerEmail,
    customerName,
    customerPostalCode,
    customerTelephone
  ) => {
    this.setState(
      {
        cardNumber: cardNumber.replace(" ", ""),
        cardExpiry,
        cardCvv: cardCvv.replace(" ", ""),
        customerEmail,
        customerName,
        customerPostalCode,
        customerTelephone,
      },
      () => {
        this.createStripeToken();
      }
    );
  };

  // Create Stripe Token
  // ---------------------------------------------
  createStripeToken = () => {
    Stripe.card.createToken(
      {
        number: this.state.cardNumber,
        cvc: this.state.cardCvv,
        name: this.state.customerName,
        exp: this.state.cardExpiry,
        address_zip: this.state.customerPostalCode || "invalid",
      },
      this.handleStripeCallback
    );
  };

    // Handle Stripe Script Error
  // ---------------------------------------------
  handleStripeScriptError = () => {
    this.setState({
      isStripeSuccessful: false,
    });
  };

  // Handle Stripe Script Load
  // ---------------------------------------------
  handleStripeScriptLoad = () => {
    Stripe.setPublishableKey(this.state.stripePublishableKey);
    this.setState({
      isStripeSuccessful: true,
    });
    this.render();
    console.log('Stripe:',Stripe);
  };


  // Charge Security Deposit
  // ---------------------------------------------
  chargeSecurityDeposit = token => {
    axios.post(`${process.env.DIRECT_URL}/api/v2/listings/${this.state.listing.id}/process_security_deposit`, {
        booking_id: this.state.booking.id,
        customer_email: this.state.customerEmail,
        customer_name: this.state.customerName,
        customer_telephone: this.state.customerTelephone,
        stripe_token: token
    })
    .then(response => {
      this.setState({charges:[...this.state.charges, {is_security_deposit: true}]})
      window.location = window.location;
    })
    .catch(error => {
      console.warn(error);
    })
  };

  // Handle Stripe Failure
  // ---------------------------------------------
  handleStripeFailure = ({ error }) => {
    console.error(error);
    this.setState({ transactionError: error });
  };

  // Handle Stripe Callback
  // ---------------------------------------------
  handleStripeCallback = (statusCode, json) => {
    if (statusCode === 200) {
      this.handleStripeSuccess(json);
    } else {
      this.handleStripeFailure(json);
    }
  };

  // Create Stripe Success
  // ---------------------------------------------
  handleStripeSuccess = json => {
    const token = json.id;
    const chargeAmount = parseFloat(this.state.booking.price_total) - parseFloat(this.state.booking.price_paid)

    if (chargeAmount > 0) {
      axios.post(`${process.env.DIRECT_URL}/api/v2/listings/${this.state.listing.id}/process_payment`, {
          charge_amount: chargeAmount,
          booking_id: this.state.booking.id,
          customer_email: this.state.customerEmail,
          customer_name: this.state.customerName,
          customer_telephone: this.state.customerTelephone,
          stripe_customer_id: this.state.booking.stripeCustomerId,
          stripe_token: token
      })
        .then(() => {
          this.setState({charges:[...this.state.charges, {is_security_deposit: false}]})
          this.state.securityDepositRequired ? this.chargeSecurityDeposit(null) : window.location = window.location;
        })
        .catch(error => {
          toast.error(error);
          window.location = window.location;
        });
    }else{
      this.chargeSecurityDeposit(token)
    }
  }

  // Process Security Deposit
  // ---------------------------------------------
  processSecurityDeposit = (
    cardNumber,
    cardExpiry,
    cardCvv,
    customerEmail,
    customerName,
    customerPostalCode,
    customerTelephone,
  ) => {
    this.setState(
      {
        cardNumber: cardNumber.replace(' ', ''),
        cardExpiry,
        cardCvv: cardCvv.replace(' ', ''),
        customerEmail,
        customerName,
        customerPostalCode,
        customerTelephone,
      },
      () => {
        this.createStripeToken();
      },
    );
  };

  // Render
  // ---------------------------------------------
  render() {
    if (this.state.loading) return null;
    const bookingLength = this.state.booking.booking_range.length - 1;
    const checkIn = moment(this.state.booking.check_in, "YYYY-MM-DD");
    const checkOut = moment(this.state.booking.check_out, "YYYY-MM-DD");
    const checkInTime = this.parseTime(
      this.state.availability.default_time_check_in
    );
    const checkOutTime = this.parseTime(
      this.state.availability.default_time_check_out
    );
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;
    const translate = ReactI18n.getIntlMessage;

    return (
      <main className="checkout-main receipt-main">
        <Script
          url="https://js.stripe.com/v2/"
          onError={this.handleStripeScriptError}
          onLoad={this.handleStripeScriptLoad}
        />
        {this.getChargeAmount() === (0).toFixed(2) ? (
          <section className="payment">
          <Listing
            checkInDate={checkIn}
            checkOutDate={checkOut}
            featured_image={this.state.featured_image}
            guests={guests}
            listing={this.state.listing}
            location={this.state.location}
            property={this.state.property}
            slug={this.state.slug}
            unit={this.state.unit}
          />
          <Pricing
            booking={this.state.booking}
            charges={this.state.charges}
            nights={this.state.nights}
            pricing={this.state.pricing}
            currency={currency}
            translate={translate}
          />
         {this.state.isStripeSuccessful &&
          this.state.securityDepositRequired &&
          this.state.securityDeposit && 
            <Deposit
              amount={this.state.securityDeposit.calculation_amount}
              currency={currency}
            />
          }
        </section>
        ) : (
          <section className="payment">
            <p>
              In order to complete your reservation, please enter your payment
              details below
            </p>
            {this.state.bookingPaymentBalanceDueDate &&
            this.state.bookingPaymentBalanceDueDate.length > 0 ? (
              <p>
                Your final payment {this.state.bookingPaymentBalanceDueDate}
              </p>
            ) : (
              <span />
            )}
            <StripeForm
              availability={this.state.availability}
              booking={this.state.booking}
              brand_info={this.props.brand_info}
              chargeAmount={this.getChargeAmount()}
              listing={this.state.listing}
              slug={this.state.slug}
              stripeCustomerId={this.state.stripe_customer_id}
              stripeIntentId={this.state.stripe_intent_id}
              stripePublishableKey={this.state.stripe_publishable_key}
              stripeAccountID={this.state.stripe_account_id}
              translate={translate}
              unit={this.state.unit}
            />
            <PaymentTransaction errors={[this.state.transactionError]} />
          </section>
        )}
        <section className="payement">
          {this.moreChargesNeeded() && (
            <section className="payment">
              {this.state.securityDepositRequired ? (
                <p>
                  Please enter your billing details below so we can process your
                  damage deposit authorization. This authorization works exactly
                  the same way as when you check-in to a hotel, and your card
                  will not be charged this amount unless there is damage to the
                  property.
                </p>
              ) : (
                <p>
                  Please enter your billing details below so we can process your
                  reservation.
                </p>
              )}
              <Form
                processSecurityDeposit={this.processSecurityDeposit}
                slug={this.state.slug}
                rental_agreement={this.state.rental_agreement}
              />
              <PaymentTransaction errors={[this.state.transactionError]} />
            </section>
          )}
        </section>
      </main>
    );
  }
}
