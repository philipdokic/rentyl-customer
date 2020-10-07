// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';

// -----------------------------------------------
// COMPONENT->SEARCH-MAP-TOGGLE ------------------
// -----------------------------------------------
export default class SearchMapToggle extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  toggleSearchWithMap = e => {
    e.preventDefault();
    this.props.toggleSearchWithMap();
  };

  render() {
    const translate = this.props.translate;
    if (this.props.isLoaded) {
      return (
        <a
          className="search-map-toggle"
          href="#"
          onClick={e => this.toggleSearchWithMap(e)}
        >
          <i
            className={`indicator-map-toggle ${
              this.props.searchWithMap ? 'toggled-true' : ''
            }`}
          />
          <span>{translate(`cx.search.re_search_with_map`)}</span>
        </a>
      );
    }
    return null;
  }
}
