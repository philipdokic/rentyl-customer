// Dependencies
// -----------------------------------------------
import React from "react";
import axios from "axios";
import "react-dates/initialize"; // Needed for rendering any react-dates components
import get from "lodash/get";
import moment from "moment";
import ReactI18n from "react-i18n";
import Script from "react-load-script";
import { toast } from "react-toastify";
import { Redirect } from 'react-router-dom';

// Components
// -----------------------------------------------
import Listing from "./listing";
import Pricing from "./pricing";
import PaymentTransaction from "../errors/payment-transaction";
import StripeForm from "../stripe/index";
import Form from "./form";
import Deposit from "../receipt/deposit";

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
      isSubmitted: false
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
        .then((response) => this.setState({ loading: false, ...response.data }))
        .catch((error) => toast.error(`error loading page ${error}`));
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
    const { isStripeSuccessful, securityDepositRequired, booking, charges } =
      this.state;
    if (!isStripeSuccessful || booking.cancelled || !booking.confirmed) {
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
    Stripe.setPublishableKey(this.state.stripe_publishable_key);
    this.setState({
      isStripeSuccessful: true,
      loading: false,
    });
  };

  // Charge Security Deposit
  // ---------------------------------------------
  chargeSecurityDeposit = (token) => {
    axios
      .post(
        `${process.env.DIRECT_URL}/api/v2/listings/${this.state.listing.id}/process_security_deposit`,
        {
          booking_id: this.state.booking.id,
          customer_email: this.state.customerEmail,
          customer_name: this.state.customerName,
          customer_telephone: this.state.customerTelephone,
          stripe_token: token,
        }
      )
      .then((response) => {
        this.setState({
          charges: [...this.state.charges, { is_security_deposit: true }],
          isSubmitted: true
        });
      })
      .catch((error) => {
        return toast.error(`unable to process security deposit ${error}`)
      });
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
  handleStripeSuccess = (json) => {
    const token = json.id;
    this.chargeSecurityDeposit(token);
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

  within48HoursOfCheckIn = () => {
    const checkIn = moment(this.state.booking.check_in, "YYYY-MM-DD");
    const rightNow = moment();
    const duration = moment.duration(rightNow.diff(checkIn));
    return Math.abs(duration.asHours()) <= 48;
  }

  // Render
  // ---------------------------------------------
  render() {
    if (this.state.loading) return null;
    const checkIn = moment(this.state.booking.check_in, "YYYY-MM-DD");
    const checkOut = moment(this.state.booking.check_out, "YYYY-MM-DD");
    const currency = this.state.charges[0]
      ? this.state.charges[0].currency
      : this.state.listing.currency;
    const guests = this.state.booking.num_guests;
    const translate = ReactI18n.getIntlMessage;

    if (this.state.isSubmitted) {
      return (
        <Redirect
          to={{
            pathname: `/my-bookings/receipt/${this.state.booking.booking_code}`,
          }}
        />
      );
    }

    return (
      <main className="checkout-main receipt-main">
        <Script
          url="https://js.stripe.com/v2/"
          onError={this.handleStripeScriptError}
          onLoad={this.handleStripeScriptLoad}
        />
        
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
              this.within48HoursOfCheckIn() && (
                <Deposit
                amount={this.state.securityDeposit.calculation_amount}
                currency={currency}
                bookingCode={this.state.booking.booking_code}
                moreChargesNeeded={this.moreChargesNeeded()}
                />
              )}
          </section>
          {this.getChargeAmount() !== (0).toFixed(2) && 
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
        }
        <section className="payment">
          {this.moreChargesNeeded() && this.within48HoursOfCheckIn() && (
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
