// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import { get, filter, isEmpty, each } from 'lodash';

// Components
// -----------------------------------------------
import Link from '../links/link';

// Constants
// -----------------------------------------------
const timeout = 300;
const linkPadding = {
  padding: '20px 0px'
};

// -----------------------------------------------
// COMPONENT->NAV-EXPANDED -----------------------
// -----------------------------------------------
class NavExpanded extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = {
      featuredListingsToggled: false,
      featuredPagesToggled: false,
      menu: this.props.brand.menu
    };
    this.renderMenuItems = this.renderMenuItems.bind(this);
    this.unflatten = this.unflatten.bind(this);
  }

  // Unflatten
  // ---------------------------------------------
  unflatten(array, parent, tree) {
    tree = typeof tree !== 'undefined' ? tree : [];
    parent = typeof parent !== 'undefined' ? parent : { id: undefined };

    var children = filter(array, function(child) {
      return child.parent_id == parent.id;
    });

    if (!isEmpty(children)) {
      if (parent.id == undefined) {
        tree = children;
      } else {
        parent['children'] = children;
      }
      each(children, child => this.unflatten(array, child));
    }

    return tree;
  }

  // Handdle Toggle
  // ---------------------------------------------
  handleToggle = (e, menuItem) => {
    e.preventDefault();
    var div = document.getElementById(`submenu-${menuItem.id}`);

    if (!div) {
      return false;
    }

    div.style.display = div.style.display == 'block' ? 'none' : 'block';
    timeout;
  };

  // Is Dropdown
  // ---------------------------------------------
  isDropdown = menuItem => {
    if (
      typeof menuItem.children !== 'undefined' ||
      menuItem.title == 'Featured Listings'
    ) {
      return true;
    } else {
      return false;
    }
  };

  // Render Menu Items
  // ---------------------------------------------
  renderMenuItems() {
    var items = get(this, 'state.menu.menu_items');
    var tree = this.unflatten(items);

    return tree.map(menuItem => {
      const url =
        menuItem.slug.startsWith('/') || menuItem.slug.startsWith('http')
          ? menuItem.slug
          : `/${menuItem.slug}`;
      return (
        <li key={menuItem.id} className="closed">
          {this.isDropdown(menuItem) ? (
            <Link
              to=""
              onMouseEnter={e => this.handleToggle(e, menuItem)}
              onMouseLeave={e => this.handleToggle(e, menuItem)}
              style={linkPadding}
            >
              {menuItem.title}
            </Link>
          ) : menuItem.slug.startsWith('http') ? (
            <Link to={url} target="_blank" title={menuItem.title}>
              {menuItem.title}
            </Link>
          ) : (
            <Link to={url} title={menuItem.title}>
              {menuItem.title}
            </Link>
          )}
          {typeof menuItem.children !== 'undefined' && (
            <figure
              className="site-nav-submenu"
              id={`submenu-${menuItem.id}`}
              onMouseEnter={e => this.handleToggle(e, menuItem)}
              onMouseLeave={e => this.handleToggle(e, menuItem)}
            >
              {menuItem.children.map(subItem => {
                const suburl =
                  subItem.slug.startsWith('/') ||
                  subItem.slug.startsWith('http')
                    ? subItem.slug
                    : `/${subItem.slug}`;
                if (subItem.slug.startsWith('http')) {
                  return (
                    <Link
                      key={subItem.title}
                      to={suburl}
                      target="_blank"
                      title={subItem.title}
                    >
                      {subItem.title}
                    </Link>
                  );
                } else {
                  return (
                    <Link key={subItem.title} to={suburl} title={subItem.title}>
                      {subItem.title}
                    </Link>
                  );
                }
              })}
            </figure>
          )}
          {menuItem.title === 'Featured Listings' &&
            this.props.featured_listings && (
              <figure
                className="site-nav-submenu"
                id={`submenu-${menuItem.id}`}
              >
                {this.props.featured_listings.map(fl => (
                  <Link key={fl.name} to={fl.url} title={fl.name}>
                    {fl.name}
                  </Link>
                ))}
              </figure>
            )}
        </li>
      );
    });
  }

  // Render
  // ---------------------------------------------
  render() {
    const gamedayMenuSlug = 'https://gamedayhousing.supportbee.com/288-gamedayhousing-faq/520-faq/738-owner-faq';

    return (
      <nav className="site-nav site-nav-expanded">
        <ul>
          <li key="0">
            <Link to="/" title="Home">
              Home
            </Link>
          </li>
          {get(this, 'props.brand.menu.menu_items') && (
            <li key="1" className="expanded-pages">
              <ul>{this.renderMenuItems()}</ul>
            </li>
          )}
          <li key="2">
            {get(this, 'props.brand.menu.menu_items.0.slug') === gamedayMenuSlug ? (
              <Link
                className="site-header-listings-link"
                to="https://www.gamedayhousing.com/sign_up"
                title="List Your Home Free"
              >
                List Your Home Free
              </Link>
            ) : (
              <Link
                className="site-header-listings-link"
                to="/listings"
                title="View Listings"
              >
                View Listings
              </Link>
            )}
          </li>
        </ul>
      </nav>
    );
  }
}

// Map State To Props
// -----------------------------------------------
function mapStateToProps(state) {
  return {
    brand: state.brand ? state.brand : {}
  };
}

// Export
// -----------------------------------------------
export default connect(mapStateToProps)(NavExpanded)