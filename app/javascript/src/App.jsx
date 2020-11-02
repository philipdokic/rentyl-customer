// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import HtmlParser from 'react-html-parser';
import { Route, Switch, Redirect } from "react-router-dom";

// Components
// -----------------------------------------------
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import { Intercom } from './components/miscellaneous/';
import Listing from './redux/containers/listing'
import Listings from './redux/containers/listings'
import Home from './components/home/index'
import NoMatch from './components/NoMatch'

// Redux
// -----------------------------------------------
import * as brandAction from './redux/action/brand'

// -----------------------------------------------
// COMPONENT->APP --------------------------------
// -----------------------------------------------
class App extends React.Component {

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    Intercom(this.props.intercom_id);
    !this.props.brand.canonical && this.setBrand(this.props)
  }

  // Set Brand
  // ---------------------------------------------
  setBrand = (props) => {
    axios.get('/api/organizations')
    .then(res => {
      props.dispatch(brandAction.setBigBrand(res.data))
    })
  }

  // Import Custom Tags
  // ---------------------------------------------
  importCustomTags = () =>
    get(this, 'props.brand.header.meta_tags', []).map(tag =>
      HtmlParser(tag, this.htmlParserOptions)
    );

  // Import Custom Scripts
  // ---------------------------------------------
  importCustomScripts = () =>
    get(this, 'props.brand.brand_info.scripts_override') ? (
      <script type="text/javascript">
        {get(this, 'props.brand.brand_info.scripts_override')}
      </script>
    ) : null;

  // Import Custom Styles
  // ---------------------------------------------
  importCustomStyles = () =>
    get(this, 'props.brand.brand_info.css_override') ? (
      <style type="text/css">
        {get(this, 'props.brand.brand_info.css_override')}
      </style>
    ) : null;

  // Render
  // ---------------------------------------------
  render() {
    return (
      <>
        <Helmet>
          {this.importCustomTags()}
          {this.importCustomScripts()}
          {this.importCustomStyles()}
        </Helmet>
        <Header />
        <main
          className="cx-main listings_details theme-default_mixed"
          style={this.contentStyles}
        >
          <Switch>
            <Route path="/listings/search" component={Listings} />
            <Route path="/listings/list" component={Listings} />
            <Route path="/listings/grid" component={Listings} />
            <Route path="/listings/map" component={Listings} />
            <Route path="/listings/:listing_slug" component={Listing} />
            <Redirect from="/listings" to="/listings/search" />
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
          </Switch>
          <Footer />
        </main>
      </>
    )
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
export default connect(mapStateToProps)(App)