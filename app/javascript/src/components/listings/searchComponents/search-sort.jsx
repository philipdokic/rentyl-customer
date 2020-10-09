// // Dependencies
// // -----------------------------------------------
import React from 'react';
import MediaQuery from 'react-responsive';

// // -----------------------------------------------
// // COMPONENT->SEARCH-SORT ------------------------
// // -----------------------------------------------
export default class SearchSort extends React.Component {

  constructor(props) {
    super(props);
  }

  updateSort = (e, val) => {
    e.preventDefault();
    this.props.updateSort(val);
  };

  toggleSortMenu = e => {
    e.preventDefault();
    this.props.updateVisiblity('sort');
  };

  renderSortOptions = () => {
    const translate = this.props.translate;
    return (
      <ul>
        {this.props.brand.organization_id != 52 ? (
          <li>
            {this.props.sort === 'default' ? (
              <span>{translate(`cx.search.sort.default`)}</span>
            ) : (
              <a href="#" onClick={e => this.updateSort(e, 'default')}>
                {translate(`cx.search.sort.default`)}
              </a>
            )}
          </li>
        ) : null}
        <li>
          {this.props.sort === 'name' ? (
            <span>{translate(`cx.search.sort.name`)}</span>
          ) : (
            <a href="#" onClick={e => this.updateSort(e, 'name')}>
              {translate(`cx.search.sort.name`)}
            </a>
          )}
        </li>
        <li>
          {this.props.sort === 'price_asc' ? (
            <span>{translate(`cx.search.sort.price_asc`)}</span>
          ) : (
            <a href="#" onClick={e => this.updateSort(e, 'price_asc')}>
              {translate(`cx.search.sort.price_asc`)}
            </a>
          )}
        </li>
        <li>
          {this.props.sort === 'price_desc' ? (
            <span>{translate(`cx.search.sort.price_desc`)}</span>
          ) : (
            <a href="#" onClick={e => this.updateSort(e, 'price_desc')}>
              {translate(`cx.search.sort.price_desc`)}
            </a>
          )}
        </li>
      </ul>
    );
  };

  render() {
    const translate = this.props.translate;
    return (
      <figure className="search-sort">
        <MediaQuery query="(max-width: 479px)">
          <div className="sort-toggleable">
            <h3>
              <a href="#" onClick={e => this.toggleSortMenu(e)}>
                <span>{translate(`cx.search.sort.label`)}</span>
                {this.props.visible ? <i>-</i> : <i>+</i>}
              </a>
            </h3>
            {this.props.visible ? this.renderSortOptions() : null}
          </div>
        </MediaQuery>
        <MediaQuery query="(min-width: 480px)">
          <div className="sort-exposed">
            <h3>{translate(`cx.search.sort.label`)}:</h3>
            {this.renderSortOptions()}
          </div>
        </MediaQuery>
      </figure>
    );
  }
}
