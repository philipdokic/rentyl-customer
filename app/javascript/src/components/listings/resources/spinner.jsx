import React from 'react';
import PropTypes from 'prop-types';

export default class Spinner extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <figure className="spinner" style={this.props.style}>
        <span></span>
        <span></span>
        <span></span>
        <span></span>
      </figure>
    );
  }
}
