// Dependencies
// -----------------------------------------------
import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

// Redux
// -----------------------------------------------
import * as brandAction from '../redux/action/brand'
import * as listingsAction from '../redux/action/listings'

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

// Home
// -----------------------------------------------
const Home = (props) => {
  setBrand(props);

  return (
    <div>
      <h1>Welcome to {props.brand.name}!</h1>
      <Link to='/listings'>click here for listings</Link>
    </div>
)
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
export default connect(mapStateToProps)(Home)