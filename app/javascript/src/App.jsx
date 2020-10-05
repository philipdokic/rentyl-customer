// Dependencies
// -----------------------------------------------
import React from 'react'
import {connect} from 'react-redux'
import axios from 'axios'
import { Route, Switch, Redirect } from "react-router-dom";

// Redux
// -----------------------------------------------
import * as brandAction from './redux/action/brandActions'
import * as listingsAction from './redux/action/listingsActions'

// Components
// -----------------------------------------------
import Listing from './components/listing/index'
import Listings from './components/Listings'
import Home from './components/Home'
import NoMatch from './components/NoMatch'

// Set Brand
// -----------------------------------------------
const setBrand = (props) => {
  axios.get('/api/organizations')
  .then(res => {
    props.dispatch(brandAction.setBrand(res.data))
    axios.get(`/api/listings?brand=${res.data.id}`, {headers:{'Content-Type': 'application/json'}})
      .then(res => {
        props.dispatch(listingsAction.setListings(res.data))
    })
  })
}

// App
// -----------------------------------------------
const App = (props) => {
  setBrand(props)
  return (
    <Switch>
      <Route path="/listings/:id" component={Listing} />
      <Route path="/listings/search" component={Listings} />
      <Route path="/listings/list" component={Listings} />
      <Route path="/listings/grid" component={Listings} />
      <Route path="/listings/map" component={Listings} />
      <Redirect from="/listings" to="/listings/search" />
      <Route exact path="/" component={Home} />


      {/* <Route
        path="/pages/:page_slug"
        render={routeProps => (
          <Page {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/checkout/:listing_id"
        render={routeProps => (
          <Checkout {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/my-bookings/verification/:booking_code"
        render={routeProps => (
          <Verification {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/my-bookings/receipt/:booking_code"
        render={routeProps => (
          <Receipt {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/my-bookings/payment/:booking_code"
        render={routeProps => (
          <Payment {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/my-bookings/:booking_code"
        render={routeProps => (
          <Payment {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/reviews/new/:booking_code"
        render={routeProps => (
          <ReviewForm {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/sign_up"
        render={routeProps => (
          <SignUpPage {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/sign_in"
        render={routeProps => (
          <SignInPage {...this.props} {...routeProps} />
        )}
      />
      <Route
        path="/"
        render={routeProps => (
          <Home {...this.props} {...routeProps} />
        )}
      /> */}


      <Route component={NoMatch} />
    </Switch>
  )
}

export default connect()(App)