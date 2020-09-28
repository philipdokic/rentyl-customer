import React from 'react'
import {connect} from 'react-redux'
import * as brandAction from './redux/action/brandActions'
import axios from 'axios'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import NoMatch from './components/NoMatch'


const setBrand = (props) => {
  axios.get('/api/listings?brand=100030000048', {headers:{'Content-Type': 'application/json'}})
        .then(res => {
        debugger
    })
  axios.get('/api/organizations')
  .then(res => {
    props.dispatch(brandAction.setBrand(res.data))
  })
}


const App = (props) => {
    setBrand(props)
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
        </Switch>
            )
}

export default connect()(App)