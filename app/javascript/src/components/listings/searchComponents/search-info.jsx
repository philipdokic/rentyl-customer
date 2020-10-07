// Dependencies
// -----------------------------------------------
import React from 'react';

// -----------------------------------------------
// COMPONENT->SEARCH-INFO ------------------------
// -----------------------------------------------
export default class SearchInfo extends React.Component {
  static propTypes = {};

  constructor(props) {
    super(props);
  }

  renderUnfiltered = () => {
    const translate = this.props.translate;
    if (this.props.totalProperties === 1) {
      return {
        __html: translate(`cx.search.num_results.unfiltered.single_html`, {
          num: this.props.totalProperties
        })
      };
    } else {
      return {
        __html: translate(`cx.search.num_results.unfiltered.plural_html`, {
          num: this.props.totalProperties
        })
      };
    }
  };

  render() {
    if (this.props.isLoaded && this.props.totalProperties) {
      return (
        <section className="search-info">
          <span dangerouslySetInnerHTML={this.renderUnfiltered()} />
        </section>
      );
    }
    return null;
  }
}
