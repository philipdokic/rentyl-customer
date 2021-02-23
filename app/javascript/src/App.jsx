// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios';
import {connect} from 'react-redux'
import { get } from 'lodash';
import { Helmet } from 'react-helmet';
import HtmlParser from 'react-html-parser';
import { Route, Switch, Redirect } from "react-router-dom";
import styled from 'styled-components'

// Components
// -----------------------------------------------
import Checkout from './components/checkout/index'
import Footer from './components/layout/footer';
import Header from './components/layout/header';
import Home from './components/home/index';
import { Intercom } from './components/miscellaneous/';
import Listing from './redux/containers/listing';
import Listings from './redux/containers/listings';
import NewContract from './components/contract/new';
import NoMatch from './components/NoMatch';
import Page from './components/pages/index';
import Payment from './components/payment/index';
import Receipt from './components/receipt/index';
import Review from './components/reviews/new';
import Ripple from './components/miscellaneous/ripple';
import SignIn from './components/guests/sign-in';
import SignUp from './components/guests/sign-up';
import Verification from './components/verification/index';

// Redux
// -----------------------------------------------
import * as brandAction from './redux/action/brand';

// Styles
// -----------------------------------------------
const LoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  height: 100vh;
  justify-content: center;
  width: 100%;
`;

// -----------------------------------------------
// COMPONENT->APP --------------------------------
// -----------------------------------------------
class App extends React.Component {

  // Constructor
  // ---------------------------------------------
  constructor(props) {
    super(props);
    this.state = { isLoading: true };
  }

  // Component Did Mount
  // ---------------------------------------------
  componentDidMount() {
    this.props.brand.footer !== undefined && Intercom(this.props.brand.footer.intercom_id)
    !this.props.brand.canonical && this.setBrand(this.props)
  }

  // Set Brand
  // ---------------------------------------------
  setBrand = (props) => {
    axios.get('/api/organizations')
    .then(async (res) => {
      await props.dispatch(brandAction.setBrand(res.data))
      this.setState({isLoading: false});
    })
  }

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
    if (!this.state.isLoading) {
      return (
        <>
          <Helmet>
            {this.importCustomStyles()}
          </Helmet>
          <Header />
          <main
            className="cx-main listings_details theme-default_mixed"
            style={this.contentStyles}
          >
            <Switch>
              <Route path="/checkout/:id" component={Checkout} />
              <Route path="/listings/search" component={Listings} />
              <Route path="/listings/list" component={Listings} />
              <Route path="/listings/grid" component={Listings} />
              <Route path="/listings/map" component={Listings} />
              <Route path="/listings/:listing_slug" component={Listing} />
              <Redirect from="/listings" to="/listings/search" />
              <Route path="/pages/:page_slug" component={Page} />
              <Route path="/my-bookings/verification/:booking_code" component={Verification} />
              <Route path="/my-bookings/new-contract/:booking_code" component={NewContract} />
              <Route path="/my-bookings/receipt/:booking_code" component={Receipt} />
              <Route path="/my-bookings/payment/:booking_code" component={Payment} />
              <Route path="/my-bookings/:booking_code" component={Payment} />
              <Route path="/reviews/new/:booking_code" component={Review} />
              <Route path="/sign_in" component={SignIn} />
              <Route path="/sign_up" component={SignUp} />
              <Route exact path="/" component={Home} />
              <Route component={NoMatch} />
            </Switch>
            <Footer />
          </main>
        </>
      )
    }

    return(
      <LoadingWrapper>
        <Ripple color="#50E3C2" />
      </LoadingWrapper>
    )
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
export default connect(mapStateToProps)(App)