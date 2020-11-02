// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import moment from 'moment';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->FOOTER-LINKS -----------------------
// -----------------------------------------------
class FooterLinks extends React.Component {

  // Render Default
  // ---------------------------------------------
  renderDefault = () => {
    const translate = ReactI18n.getIntlMessage;

    return (
      <ul key="ul-footer-links">
        <li key="li-name">{this.props.brand.name}</li>
        <li key="li-home">
          <Link to="/">{translate(`cx.global.home`)}</Link>
        </li>
        {this.props.brand.theme != 'default_single_property' ? (
          <li key="li-listings">
            <Link to="/listings">{translate(`cx.global.listing.plural`)}</Link>
          </li>
        ) : null}
        {this.props.brand.theme != 'default_single_property' ? (
          <li key="li-search">
            <Link to="/listings/search">{translate(`global.actions.search`)}</Link>
          </li>
        ) : null}
        <li key="li-sitemap">
          <Link to="/sitemap.xml">{translate(`cx.global.sitemap`)}</Link>
        </li>
        {/* <li key="li-copyright" className="extra-padding-top">
          {this.props.brand.brand_info.copyright != ''
            ? this.props.brand.brand_info.copyright
            : translate(`cx.global.colophon`, {
              brand: this.props.brand.name,
              year: moment().format('YYYY')
            })
          }
        </li> */}
      </ul>
    );
  };

  // Render Section
  // ---------------------------------------------
  renderSection = (section, index) => (
    <ul key={`ul-footer-links-${index}`}>
      <li key={`li-${section.title}`}>{section.title}</li>
      {section.links.map(link => (
        <li key={`li-${link.text}`}>
          <Link to={link.url}>{link.text}</Link>
        </li>
      ))}
    </ul>
  );

  // Render
  // ---------------------------------------------
  render() {
    return (
      <div className="footer-sections-container">
        {this.props.sections && this.props.sections.length
          ? this.props.sections.map(this.renderSection)
          : this.renderDefault()}
      </div>
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
export default connect(mapStateToProps)(FooterLinks)