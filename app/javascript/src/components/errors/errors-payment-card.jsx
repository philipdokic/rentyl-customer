// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n'

const ErrorsPaymentCard = (props) => {

  const translate = ReactI18n.getIntlMessage

  const renderError = error => {
    if (error.code === 'empty' || error.code == null) {
      return null;
    }
    return (
      <li key={error.param}>
        {translate(`cx.errors.booking.${error.param}.${error.code}`)}
      </li>
    );
  };


  return (
    <figure className="checkout-errors">
      <ul>{props.errors.map(error => renderError(error))}</ul>
    </figure>
  );
}


export default ErrorsPaymentCard
