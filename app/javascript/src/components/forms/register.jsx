// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import DirectCheckbox from '../inputs/direct-checkbox';

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
// COMPONENT->REGISTER-FORM ----------------------
// -----------------------------------------------
const RegisterForm = props => {
  return (
    <div
      className="user-creation-form"
      style={{ width: '100%', maxWidth: '320px', margin: 'auto' }}
    >
      <label>* Email</label>
      <input type="text" name="email" onChange={props.onChange} />
      <label>* Name</label>
      <input type="text" name="name" onChange={props.onChange} />
      <label>Telephone</label>
      <input type="text" name="telephone" onChange={props.onChange} />
      <label>* Password</label>
      <input type="password" name="password" onChange={props.onChange} />
      <label>* Confirm Password</label>
      <input
        type="password"
        name="password_confirmation"
        onChange={props.onChange}
      />
      {props.brand.organization.id === 5 && (
        <div>
          <DirectCheckbox
            name="terms_agreement"
            checked={props.terms_agreement}
            onChange={props.onCheckboxClick}
            labelText={`I accept the ${(
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href="https://www.gamedayhousing.com/pages/terms-of-use"
              >
                Terms of Service
              </a>
            )}`}
          />
          <DirectCheckbox
            name="privacy_agreement"
            checked={props.privacy_agreement}
            onChange={props.onCheckboxClick}
            labelText={`I accept the ${(
              <a
                style={{ textDecoration: 'underline' }}
                target="_blank"
                href="https://www.gamedayhousing.com/pages/privacy-policy"
              >
                Privacy Policy
              </a>
            )}`}
          />
        </div>
      )}
      <div className="form-actions">
        <StyledButton
          className="button"
          onClick={() => props.onSubmit('Employee')}
        >
          SIGN UP AS AN OWNER
        </StyledButton>
        <StyledButton
          className="button"
          onClick={() => props.onSubmit('Customer')}
        >
          SIGN UP AS A GUEST
        </StyledButton>
      </div>
    </div>
  );
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default RegisterForm;
