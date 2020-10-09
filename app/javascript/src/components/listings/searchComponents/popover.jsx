// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

// -----------------------------------------------
// COMPONENT->POPOVER ------------------
// -----------------------------------------------
export default class Popover extends React.Component {
  static propTypes = {
    label: PropTypes.string
  };

  constructor(props) {
    super(props);

    this.state = {
      isExpanded: false
    };
  }

  componentWillMount() {
    document.addEventListener('mousedown', this.handleClickOutside, false);
  }

  componentWillUnmount() {
    document.removeEventListener('mousedown', this.handleClickOutside, false);
  }

  handleClickOutside = e => {
    if (this.node.contains(e.target)) {
      return;
    }

    this.setState({ isExpanded: false });
  };

  toggleExpanded = () => this.setState({ isExpanded: !this.state.isExpanded });

  render() {
    return (
      <div
        className="popover-button"
        ref={node => (this.node = node)}
        onClick={this.toggleExpanded}
      >
        <label>{this.props.label}</label>
        {this.state.isExpanded ? (
          <div onClick={e => e.stopPropagation()} className="popover-content">
            {this.props.children}
          </div>
        ) : null}
      </div>
    );
  }
}
