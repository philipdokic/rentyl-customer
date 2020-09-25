import React from 'react'
import {connect} from 'react-redux'
import * as organizationAction from './redux/action/organizationActions'
import axios from 'axios'
import { Route, Switch } from "react-router-dom";
import Home from './components/Home'
import NoMatch from './components/NoMatch'


const setOrganization = (props) => {
    axios.get('/api/organizations')
    .then(res => {
        props.dispatch(organizationAction.setOrganization(res.data))
    })
}

const App = (props) => {
    setOrganization(props)
    return (
        <Switch>
            <Route exact path="/" component={Home} />
            <Route component={NoMatch} />
        </Switch>
            )
}

export default connect()(App)