// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';

// Styles
// -----------------------------------------------
const StyledButton = styled.a`
  &.button {
    background: #fcfcfc;
    border: 1px solid #bbc5c7;
    box-shadow: none;
    color: #bbc5c7;
    margin-bottom: 8px;
    width: 100%;

    &:hover {
      background-color: #fcfcfc;
    }
  }
`;

// -----------------------------------------------
// COMPONENT->EMAIL-FORM -------------------------
// -----------------------------------------------
const EmailForm = props => {
  return (
    <div
      className="user-creation-form"
      style={{ width: '100%', maxWidth: '320px', margin: 'auto' }}
    >
      <label>* Email</label>
      <input type="text" name="email" onChange={props.onChange} />
      <div className="form-actions">
        <StyledButton
          className="button"
          onClick={() => props.onSubmit('Employee')}
        >
          SIGN IN AS AN OWNER
        </StyledButton>
        <StyledButton
          className="button"
          onClick={() => props.onSubmit('Customer')}
        >
          SIGN IN AS A GUEST
        </StyledButton>
      </div>
    </div>
  );
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default EmailForm;