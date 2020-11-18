// Validate Guests
// -----------------------------------------------
export const validateGuests = val => {
  return !isNaN(val) && val > 0 && val < 25;
};

// Validate Card CVV
// -----------------------------------------------
export const validateCardCvv = val => {
  const sanitizedVal = val.replace(' ', '');
  return Stripe.card.validateCVC(sanitizedVal);
};

// Validate Card Expiry
// -----------------------------------------------
export const validateCardExpiry = val => {
  return Stripe.card.validateExpiry(val);
};

// Validate Charge Amount
// -----------------------------------------------
export const validateChargeAmount = val => {
  const regex = /^[0-9.]+$/;
  return regex.test(val);
};

// Validate Card Number
// -----------------------------------------------
export const validateCardNumber = val => {
  const sanitizedVal = val.replace(' ', '');
  return (
    sanitizedVal.length > 13 && Stripe.card.validateCardNumber(sanitizedVal)
  );
};

// Validate Customer Email
// -----------------------------------------------
export const validateCustomerEmail = val => {
  const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,8}$/;
  return val.length > 5 && regex.test(val);
};

// Validate Customer Name
// -----------------------------------------------
export const validateCustomerName = val => {
  return val.length > 3;
};

// Validate Customer Postal Code
// -----------------------------------------------
export const validateCustomerPostalCode = val => {
  return val.length > 3 && val.length < 12;
};

// Validate Customer Telephone
// -----------------------------------------------
export const validateCustomerTelephone = val => {
  return val.length > 9;
};
