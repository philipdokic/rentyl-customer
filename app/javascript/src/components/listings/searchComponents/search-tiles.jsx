// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Spinner from '../resources/spinner';
import { SearchTile } from './index';

// Constants
// -----------------------------------------------
const translate = ReactI18n.getIntlMessage;

// -----------------------------------------------
// COMPONENT->SEARCH-TILES -----------------------
// -----------------------------------------------
const SearchTiles = props => {
  if (props.isLoading) {
    return (
      <section className="search-tiles search-tiles-empty">
        <Spinner />
      </section>
    );
  } else if (props.filteredResults && props.filteredResults.length) {
    return (
      <section className="search-tiles">
        {props.filteredResults.map((result, index) => (
          <SearchTile
            key={index}
            result={result}
            getStringifiedQueryString={props.getStringifiedQueryString}
            theme={props.theme}
            translate={translate}
            datesSet={props.datesSet}
          />
        ))}
      </section>
    );
  } else {
    return (
      <section className="search-tiles search-tiles-empty">
        <figure className="search-tile-empty">
          <i />
          <h3>{translate(`cx.search.num_results.no_results`)}</h3>
        </figure>
      </section>
    );
  }
};

// -----------------------------------------------
// EXPORT ----------------------------------------
// -----------------------------------------------
export default SearchTiles;
