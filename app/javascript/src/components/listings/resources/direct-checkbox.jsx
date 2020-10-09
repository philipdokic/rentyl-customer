import React from 'react';

export default class DirectCheckbox extends React.Component {
  constructor(props) {
    super(props);
  }

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
