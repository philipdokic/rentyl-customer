// Dependencies
// -----------------------------------------------
import React from 'react';

// -----------------------------------------------
// COMPONENT->MESSAGE ----------------------------
// -----------------------------------------------
const Message = props => {

  // Error Message
  // ---------------------------------------------
  const errorMessage = () => (
    <div>
      <h1>Something went wrong...</h1>
      <p>
        Sorry, but we don't recognize your booking code. Please try again later!
      </p>
    </div>
  );

  // Success message
  // ---------------------------------------------
  const successMessage = () => (
    <div>
      <h1>Thank you for reviewing!</h1>
      <p>
        We appreciate you taking the time to give us feedback! We hope you
        choose to stay with us again soon.
      </p>
    </div>
  );

  // Return
  // ---------------------------------------------
  return props.error ? errorMessage() : successMessage();
};

// Export
// -----------------------------------------------
export default Message;
