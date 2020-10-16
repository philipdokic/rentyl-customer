// Dependencies
// -----------------------------------------------
import React from 'react'
import {connect} from 'react-redux'
import { Route, Switch, Redirect } from "react-router-dom";

// Components
// -----------------------------------------------
import Listing from './redux/containers/listing'
import Listings from './redux/containers/listings'
import Home from './components/Home'
import NoMatch from './components/NoMatch'

// App
// -----------------------------------------------
const App = (props) => {
  return (
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
  )
}

// Export
// -----------------------------------------------
export default connect()(App)