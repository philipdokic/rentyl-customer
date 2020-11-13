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

const ResetPassword = styled.a`
  margin-top: 16px;
  width: 100%;
  display: block;
  text-align: center;
`;

// -----------------------------------------------
// COMPONENT->PASSWORD-FORM ----------------------
// -----------------------------------------------
const PasswordForm = props => (
  <div
    className="user-creation-form"
    style={{ width: '100%', maxWidth: '320px', margin: 'auto' }}
  >
    <label>* Password</label>
    <input type="password" name="password" onChange={props.onChange} />
    <div className="form-actions">
      <StyledButton className="button" onClick={props.onSubmit}>
        SIGN IN
      </StyledButton>
      {props.user.user_type === 'Employee' && (
        <ResetPassword onClick={props.onClick}>Reset Password</ResetPassword>
      )}
    </div>
  </div>
);

// Export
// -----------------------------------------------
export default PasswordForm;
