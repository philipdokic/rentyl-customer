// Dependencies
// -----------------------------------------------
import React from 'react';
import { connect } from 'react-redux';
import ReactI18n from 'react-i18n';
import Scrollchor from 'react-scrollchor';
import Sticky from 'react-stickynode';

// -----------------------------------------------
// COMPONENT->NAVBAR -----------------------------
// -----------------------------------------------
class Navbar extends React.Component {

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

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
            <li>
              <Scrollchor to="details-map">
                {translate(`cx.details.location`)}
              </Scrollchor>
            </li>
            {this.props.listing.reviews && (
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

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    listing: state.listing ? state.listing : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Navbar);