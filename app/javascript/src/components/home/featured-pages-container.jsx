// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->FEATURED-PAGES-CONTAINER -----------
// -----------------------------------------------
class FeaturedPagesContainer extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return (
      <section className="home-section">
        <h2 className="text-center">
          {translate(`cx.global.page.featured.plural`)}
        </h2>
        <div className="featured-pages">
          {this.props.brand.home.featured_pages.map(page => (
            <figure className="featured-page">
              <Link to={page.url}>
                {page.image ? (
                  <div
                    className="featured-image"
                    style={{ backgroundImage: `url(${page.image.image.url})` }}
                  ></div>
                ) : null}
                <div className="featured-page-content">
                  <h3>{page.name}</h3>
                  <p>{page.description}</p>
                </div>
                <span className="featured-read-more">
                  {translate(`cx.global.page.read_more`)}
                </span>
              </Link>
            </figure>
          ))}
        </div>
      </section>
    );
  }
}

// Map State to Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand.id ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(FeaturedPagesContainer);