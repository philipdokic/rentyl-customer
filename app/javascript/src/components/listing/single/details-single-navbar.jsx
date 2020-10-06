// Dependencies
// -----------------------------------------------
import React from 'react';
import PropTypes from 'prop-types';
import Scrollchor from 'react-scrollchor';
import Sticky from 'react-stickynode';

export default class DetailsSingleNavbar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const translate = this.props.translate;
    return (
      <Sticky>
        <nav className="details-nav">
          <ul>
            <li>
              <Scrollchor to="details-overview">
                {translate(`cx.details.overview`)}
              </Scrollchor>
            </li>
            {this.props.owner && (
              <li>
                <Scrollchor to="details-owner">
                  {translate(`cx.details.manager`)}
                </Scrollchor>
              </li>
            )}

{/*             <li>
              <Scrollchor to="details-availability">
                {translate(`cx.details.headers.availability`)}
              </Scrollchor>
            </li> */}
            <li>
              <Scrollchor to="details-map">
                {translate(`cx.details.location`)}
              </Scrollchor>
            </li>
            {this.props.reviews && (
              <li>
                <Scrollchor to='review-section'>
                  {translate(`cx.details.reviews`)}
                </Scrollchor>
              </li>
            )}
          </ul>
        </nav>
      </Sticky>
    );
  }
}
