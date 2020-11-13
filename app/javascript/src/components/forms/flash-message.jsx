// Dependencies
// -----------------------------------------------
import React from 'react';

// -----------------------------------------------
// COMPONENT->FLASH-MESSAGE ----------------------
// -----------------------------------------------
const FlashMessage = props => {
  return (
    <div className="flash-message">
      {props.message}
      <a href="#" className="close-link" onClick={props.onClick}>
        ×
      </a>
    </div>
  );
};

// Export
// -----------------------------------------------
export default FlashMessage;
