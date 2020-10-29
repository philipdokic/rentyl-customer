// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import { get } from 'lodash';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';

// Components
// -----------------------------------------------
import Link from '../links/link';
import NavExpanded from './nav-expanded';
import NavMenu from './nav-menu';

// Styles
// -----------------------------------------------
const Container = styled.div`
  max-width: 100%;
`;

// -----------------------------------------------
// COMPONENT->HEADER -----------------------------
// -----------------------------------------------
class Header extends React.Component {

  // Build Home Link
  // ---------------------------------------------
  buildHomeLink() {
    // if (this.props.logo_image.url) {
    //   return (
    //     <img src={this.props.logo_image.url} alt={this.props.brand.name} />
    //   );
    // } else {
      return <span className="font-heading">{this.props.brand.name}</span>;
    // }
  }

  // Render
  // ---------------------------------------------
  render() {
    return (
      <>
        {get(this, 'props.brand.header.custom_html') ? (
          <Container>
            <div
              dangerouslySetInnerHTML={{
                __html: this.props.brand.header.custom_html
              }}
            />
          </Container>
        ) : (
          <header id="site-header" className="site-header">
            <figure className="header-logo">
              <Link to="/" title={this.props.brand.name}>
                {this.buildHomeLink()}
              </Link>
            </figure>
            <MediaQuery query="(max-width: 639px)">
              {this.props.hide_nav ? null : (
                <NavMenu />
              )}
            </MediaQuery>
            <MediaQuery query="(min-width: 640px)">
              {this.props.hide_nav ? null : (
                <NavExpanded />
              )}
            </MediaQuery>
          </header>
        )}
      </>
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
export default connect(mapStateToProps)(Header)