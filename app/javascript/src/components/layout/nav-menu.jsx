// Dependencies
// -----------------------------------------------
import React from 'react';
import {connect} from 'react-redux'
import { filter, isEmpty, each } from 'lodash';
import ReactI18n from 'react-i18n';

// Components
// -----------------------------------------------
import Link from '../links/link';

// -----------------------------------------------
// COMPONENT->NAV-MENU ---------------------------
// -----------------------------------------------
class NavMenu extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);

    this.state = {
      toggledMenu: false,
      menu: this.props.brand.menu,
      activeLinks: this.props.brand.menu.menu_items,
      previousLinks: null
    };
    this.renderMenuItems = this.renderMenuItems.bind(this);
    this.unflatten = this.unflatten.bind(this);
  }

  // Toggle Menu
  // ---------------------------------------------
  toggleMenu(e) {
    e.preventDefault();
    this.setState({ toggledMenu: !this.state.toggledMenu });
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

  // Handle Toggle
  // ---------------------------------------------
  handleToggle = (e, menuItem) => {
    e.preventDefault();
    var div = document.getElementById(`submenu-${menuItem.id}`);
    if (!div) {
      return false;
    }
    div.style.display = div.style.display == 'block' ? 'none' : 'block';
  };

  // Close Menu
  // ---------------------------------------------
  closeMenu = (e, menuItem) => {
    var div = document.getElementById(  `submenu-${menuItem.id}`);
    if (!div) {
      this.setState({ toggledMenu: false });
      return false;
    }
    div.style.display = div.style.display == 'block' ? 'none' : 'block';
    this.setState({ toggledMenu: false });
  };

  // Render Menu Items
  // ---------------------------------------------
  renderMenuItems() {
    var items = this.state.menu.menu_items;
    var tree = this.unflatten(items);

    return tree.map(menuItem => {
      const url =
        menuItem.slug.startsWith('/') || menuItem.slug.startsWith('http')
          ? menuItem.slug
          : `/${menuItem.slug}`;
      return (
        <li
          key={menuItem.id}
          className="closed"
          style={{ width: '100%', padding: '0' }}
        >
          {this.isDropdown(menuItem) ? (
            <Link to={url} onClick={e => this.handleToggle(e, menuItem)}>
              {menuItem.title}
            </Link>
          ) : menuItem.slug.startsWith('http') ? (
            <Link to={url} onClick={e => this.closeMenu(e, menuItem)} target="_blank" title={menuItem.title}>
              {menuItem.title}
            </Link>
          ) : (
            <Link to={url} onClick={e => this.closeMenu(e, menuItem)} title={menuItem.title}>
              {menuItem.title}
            </Link>
          )}
          {typeof menuItem.children !== 'undefined' && (
            <figure
              className="site-nav-submenu"
              style={{ width: '90%' }}
              id={`submenu-${menuItem.id}`}
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
                      onClick={e => this.closeMenu(e, menuItem)}
                      target="_blank"
                      title={subItem.title}
                    >
                      {subItem.title}
                    </Link>
                  );
                } else {
                  return (
                    <Link key={subItem.title} to={suburl} onClick={e => this.closeMenu(e, menuItem)} title={subItem.title}>
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
                  <Link key={fl.name} to={fl.url} onClick={e => this.closeMenu(e, menuItem)} title={fl.name}>
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
    const translate = ReactI18n.getIntlMessage;

    return (
      <nav className="site-nav site-nav-menu site-nav-expanded">
        <Link to="#" onClick={e => this.toggleMenu(e)} className="menu-toggle">
          {translate(`global.menu`)}
        </Link>
        {this.state.toggledMenu && (
          <div>
            <li key="0">
              <Link to="/" title="Home">
                Home
              </Link>
            </li>
            <li key="1" className="expanded-pages">
              <ul
                style={{
                  flexDirection: 'column',
                  justifyContent: 'flex-start'
                }}
              >
                {this.renderMenuItems()}
              </ul>
            </li>
          </div>
        )}
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
export default connect(mapStateToProps)(NavMenu)
