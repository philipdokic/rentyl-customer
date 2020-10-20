// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Link from '../links/link';

export default class FeaturedPagesContainer extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = this.props.translate;
    return (
      <section className="home-section">
        <h2 className="text-center">
          {translate(`cx.global.page.featured.plural`)}
        </h2>
        <div className="featured-pages">
          {this.props.featured_pages.map(page => (
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
