// Dependencies
// -----------------------------------------------
import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// Components
// -----------------------------------------------
import CardSetupForm from './card-setup-form';

// Load Stripe
// -----------------------------------------------
let stripeToken;
const stripePromise = props => {
  if (!stripeToken) {
    stripeToken = props.stripeAccountID ? loadStripe(props.stripePublishableKey, { stripeAccount: props.stripeAccountID }) : loadStripe(props.stripePublishableKey)
  }
  return stripeToken;
};

// Stripe
// -----------------------------------------------
const Stripe = props => {
  return (
    <Elements stripe={stripePromise(props)}>
      <CardSetupForm
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
    </Elements>
  );
}

// Export
// -----------------------------------------------
export default Stripe;
