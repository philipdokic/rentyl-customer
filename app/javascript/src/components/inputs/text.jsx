// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';

// Styled Components
// ---------------------------------------------
const InputLabel = styled.label`
  text-transform: capitalize;
`;

// -----------------------------------------------
// COMPONENT->TEXT -------------------------------
// -----------------------------------------------
const Text = props => {

  // On Change
  // ---------------------------------------------
  const onChange = e => {
    props.onChange(e.target.name, e.target.value);
  };

  return (
    <figure>
      <InputLabel>
        {props.name} {props.required && '(Required)'}
      </InputLabel>
      <input
        type="text"
        name={props.name}
        placeholder={props.placeholder}
        required={props.required}
        onChange={e => onChange(e)}
      />
    </figure>
  );
}


export default Text