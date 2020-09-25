import React from 'react'
import ReactDOM from 'react-dom'
import {BrowserRouter as Router} from 'react-router-dom'
import App from '../src/App'
import configureStore from '../src/redux/configureStore'
import { Provider } from 'react-redux'

const store = configureStore()

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <Provider store={store}>
      <Router>
        <App/>
      </Router>
    </Provider>,
    document.body.appendChild(document.createElement('div')),
  )
})