// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import { get } from 'lodash';
import ReactI18n from 'react-i18n';
import _get from 'lodash/get';
import startsWith from 'lodash/startsWith';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import FooterLinks from './footer-links';
import Link from '../links/link';

// Styles
// -----------------------------------------------
const Container = styled.div`
  max-width: 100%;
`;

// -----------------------------------------------
// COMPONENT->FOOTER -----------------------------
// -----------------------------------------------
class Footer extends React.Component {

  // Should Hide Footer
  // ---------------------------------------------
  shouldHideFooter = () =>
    startsWith(window.location.pathname, '/listings/search') ||
    startsWith(window.location.pathname, '/sign_up') ||
    startsWith(window.location.pathname, '/sign_in') ||
    startsWith(window.location.pathname, '/checkout') ||
    startsWith(window.location.pathname, '/reviews/new') ||
    startsWith(window.location.pathname, '/my-bookings/receipt');

  // Render
  // ---------------------------------------------
  render() {
    const translate = ReactI18n.getIntlMessage;

    return this.shouldHideFooter() ? null : (
      <footer className="site-footer">
        {get(this, 'props.brand.footer.custom_html') ? (
          <Container>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.brand.footer.custom_html
              }}
            />
          </Container>
        ) : (
          <div className="site-footer-content">
            <FooterLinks
              sections={_get(this, 'props.brand.footer.sections')}
            />
            <section>
              {this.props.brand.contact ? (
                <figure className="footer-contact">
                  {this.props.brand.contact.email ? (
                    <div>
                      {translate(`global.actions.email`)}:{' '}
                      <Link to={`mailto:${this.props.brand.contact.email}`}>
                        {this.props.brand.contact.email}
                      </Link>
                    </div>
                  ) : null}
                  {this.props.brand.contact.phone_primary &&
                  this.props.brand.contact.phone_primary.label &&
                  this.props.brand.contact.phone_primary.number ? (
                    <div>
                      {this.props.brand.contact.phone_primary.label}:{' '}
                      <Link
                        to={`tel:${this.props.brand.contact.phone_primary.number.replace(
                          /[^0-9]/,
                          ''
                        )}`}
                      >
                        {this.props.brand.contact.phone_primary.number}
                      </Link>
                    </div>
                  ) : null}
                  {this.props.brand.contact.phone_secondary &&
                  this.props.brand.contact.phone_secondary.label &&
                  this.props.brand.contact.phone_secondary.number ? (
                    <div>
                      {this.props.brand.contact.phone_secondary.label}:{' '}
                      <Link
                        to={`tel:${this.props.brand.contact.phone_secondary.number.replace(
                          /[^0-9]/,
                          ''
                        )}`}
                      >
                        {this.props.brand.contact.phone_secondary.number}
                      </Link>
                    </div>
                  ) : null}
                </figure>
              ) : null}
              {this.props.brand.social ? (
                <figure className="footer-social">
                  {this.props.brand.social.social_facebook ? (
                    <Link
                      target="_blank"
                      to={`http://${this.props.brand.social.social_facebook}`}
                      title={`${this.props.brand.name} on ${translate(
                        `cx.global.social.facebook`
                      )}`}
                    >
                      <i className="icon icon-facebook" />
                    </Link>
                  ) : null}
                  {this.props.brand.social.social_twitter ? (
                    <Link
                      target="_blank"
                      to={`http://${this.props.brand.social.social_twitter}`}
                      title={`${this.props.brand.name} on ${translate(
                        `cx.global.social.twitter`
                      )}`}
                    >
                      <i className="icon icon-twitter" />
                    </Link>
                  ) : null}
                  {this.props.brand.social.social_instagram ? (
                    <Link
                      target="_blank"
                      to={`http://${this.props.brand.social.social_instagram}`}
                      title={`${this.props.brand.name} on ${translate(
                        `cx.global.social.instagram`
                      )}`}
                    >
                      <i className="icon icon-instagram" />
                    </Link>
                  ) : null}
                  {this.props.brand.social.social_pinterest ? (
                    <Link
                      target="_blank"
                      to={`http://${this.props.brand.social.social_pinterest}`}
                      title={`${this.props.brand.name} on ${translate(
                        `cx.global.social.pinterest`
                      )}`}
                    >
                      <i className="icon icon-pinterest" />
                    </Link>
                  ) : null}
                  {this.props.brand.social.social_snapchat ? (
                    <Link
                      target="_blank"
                      to={`http://www.snapchat.com/add/${
                        this.props.brand.social.social_snapchat
                      }`}
                      title={`${this.props.brand.name} on ${translate(
                        `cx.global.social.snapchat`
                      )}`}
                    >
                      <i className="icon icon-snapchat" />
                    </Link>
                  ) : null}
                </figure>
              ) : null}
              {_get(this, 'props.brand.footer.credit_cards') ? (
                <figure className="footer-cards">
                  {Object.keys(_get(this, 'props.brand.footer.credit_cards'))
                    .filter(card =>
                      _get(this, `props.brand.footer.credit_cards.${card}`, {})
                    )
                    .map(card => (
                      <i
                        className={`icon icon-large icon-${card}`}
                        key={card}
                      />
                    ))}
                </figure>
              ) : null}
            </section>
          </div>
        )}
      </footer>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(Footer)