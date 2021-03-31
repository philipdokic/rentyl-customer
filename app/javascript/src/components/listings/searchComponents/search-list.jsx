// Dependencies
// -----------------------------------------------
import React from 'react';

// Components
// -----------------------------------------------
import Spinner from '../resources/spinner';
import { SearchItem } from './index';
import { SearchTile } from './index';

// -----------------------------------------------
// COMPONENT->SEARCH-LIST ------------------------
// -----------------------------------------------
const SearchList = props => {
  if (props.isLoading) {
    return (
      <section className="search-tiles search-tiles-empty">
        <Spinner />
      </section>
    );
  } else if (props.filteredResults && props.filteredResults.length) {

    var listItemWrapper;
    if (props.view === 'grid') {
      listItemWrapper = {
        width: '32.5%'
      };
    }
    else {
      listItemWrapper = {
        width: '100%'
      };
    }

    return (
      <section className={"search-tiles " + (props.view === 'grid' ? 'search-grids' : 'search-listings')}>
        {props.filteredResults.map((result, index) => (
          <div className="search-grid-item-wrapper" style={listItemWrapper} key={index}>
            {props.view === 'list' && (
              <SearchItem
                result={result}
                getStringifiedQueryString={props.getStringifiedQueryString}
                theme={props.theme}
                translate={props.translate}
                datesSet={props.datesSet}
              />
            )}
            {props.view === 'grid' && (
              <SearchTile
                result={result}
                getStringifiedQueryString={props.getStringifiedQueryString}
                theme={props.theme}
                translate={props.translate}
                datesSet={props.datesSet}
              />
            )}
          </div>
        ))}
      </section>
    );
  } else {
    return (
      <section className="search-tiles search-tiles-empty">
        <figure className="search-tile-empty">
          <i />
          <h3>{props.translate(`cx.search.num_results.no_results`)}</h3>
        </figure>
      </section>
    );
  }
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default SearchList;
