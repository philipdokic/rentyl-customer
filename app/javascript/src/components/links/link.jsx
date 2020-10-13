// Dependencies
// -----------------------------------------------
import React from 'react';
import { Link as ReactLink } from 'react-router-dom';
import startsWith from 'lodash/startsWith';

// Constants
// -----------------------------------------------
const startsWithOptions = ['mailto:', 'tel:'];

// -----------------------------------------------
// COMPONENT->LINK -------------------------------
// -----------------------------------------------
export default class Link extends React.Component {

  // Parse To
  // ---------------------------------------------
  parseTo = to => {
    const parser = document.createElement('a');
    parser.href = to;
    return parser;
  };

  // Is Internal
  // ---------------------------------------------
  isInternal = to => {
    if (!to || startsWithOptions.some(option => startsWith(to, option)))
      return false;
    if (to.indexOf('://') === -1) return true;

    const toLocation = this.parseTo(to);
    return window.location.hostname === toLocation.hostname;
  };

  // Remove Host From Internal Link
  // ---------------------------------------------
  removeHostFromInternalLink = to => {
    const toLocation = this.parseTo(to);
    if (window.location.hostname === toLocation.hostname) {
      return `${toLocation.pathname}${toLocation.search}`;
    }
    return to;
  };

  // Render
  // ---------------------------------------------
  render() {
    const { to, children, ...rest } = this.props;
    if (this.isInternal(to)) {
      return (
        <ReactLink to={this.removeHostFromInternalLink(to)} {...rest}>
          {children}
        </ReactLink>
      );
    } else {
      return (
        <a href={to} {...rest} rel="nofollow">
          {children}
        </a>
      );
    }
  }
}
