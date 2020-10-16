// Dependencies
// -----------------------------------------------
import React from 'react';
import ReactI18n from 'react-i18n';
import Scrollchor from 'react-scrollchor';
import Sticky from 'react-stickynode';

// -----------------------------------------------
// COMPONENT->MULTI-NAVBAR -----------------------
// -----------------------------------------------
export default class MultiNavbar extends React.Component {

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

            <li>
              <Scrollchor to="details-units">
                {translate(`cx.details.headers.units`)}
              </Scrollchor>
            </li>

            {this.props.owner ? (
              <li>
                <Scrollchor to="details-owner">
                  {translate(`cx.details.manager`)}
                </Scrollchor>
              </li>
            ) : null}
            <li>
              <Scrollchor to="details-map">
                {translate(`cx.details.location`)}
              </Scrollchor>
            </li>
          </ul>
        </nav>
      </Sticky>
    );
  }
}
