// Dependencies
// -----------------------------------------------
import React from 'react';
import styled from 'styled-components';

// Styled Components
// ---------------------------------------------
const InputLabel = styled.label`
  text-transform: capitalize;
`;

// Text Input
// ---------------------------------------------
const TextInput = props => {

  // On Change
  // -------------------------------------------
  const onChange = e => {
    props.onChange(e.target.name, e.target.value);
  };

  // Return
  // -------------------------------------------
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
};

// Export
// ---------------------------------------------
export default TextInput;
