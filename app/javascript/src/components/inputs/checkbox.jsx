// Dependencies
// -----------------------------------------------
import React from 'react';

// -----------------------------------------------
// COMPONENT->CHECKBOX ---------------------------
// -----------------------------------------------
export default class Checkbox extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <figure className="checkbox" style={{ display: 'inline-block' }}>
        <input
          type="checkbox"
          name={this.props.name}
          id={this.props.name}
          value={this.props.name}
          checked={this.props.checked}
          onChange={this.props.onChange}
        />
        <label htmlFor={this.props.name}>
          <span style={this.props.labelStyles}>{this.props.labelText}</span>
        </label>
      </figure>
    );
  }
}
