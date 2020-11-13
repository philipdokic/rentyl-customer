// Dependencies
// -----------------------------------------------
import React from 'react';

 const ErrorsPaymentTransaction = (props) => {

  const renderError = error => {
    if (error === null) {
      return null;
    }
    return (
      <li key={error.param}>
        {error.type}:{error.param}:{error.code}
      </li>
    );
  };

    return (
      <figure>
        <ul>{props.errors.map(error => renderError(error))}</ul>
      </figure>
    );
  }


export default ErrorsPaymentTransaction
