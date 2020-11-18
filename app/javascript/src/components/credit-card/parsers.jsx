// Card Type Mask
// -----------------------------------------------
export const cardTypeMask = val => {
  const cardType = Stripe.card.cardType(val);

  if (cardType === 'American Express') {
    return '1111 111111 11111';
  } else if (cardType === 'Diners Club') {
    return '1111 1111 1111 11';
  }
  return '1111 1111 1111 1111';
};
