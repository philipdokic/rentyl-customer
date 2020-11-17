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
export default class Text extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // On Change
  // ---------------------------------------------
  onChange = e => {
    props.onChange(e.target.name, e.target.value);
  };

  // Render
  // ---------------------------------------------
  render() {
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
}