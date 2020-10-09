import React from 'react'
import axios from 'axios'
import {connect} from 'react-redux'

// Redux
// -----------------------------------------------
import * as listingAction from '../redux/action/listing'

const renderListings = (props) => {
return props.listings.map(l=>(<div key={l.id}><div onClick={ () => redirectListing(props, l.id)}>{l.unit_id}</div></div>))
}

const redirectListing = (props, id) => {
  axios.get(`/api/listings/${id}`, {headers:{'Content-Type': 'application/json'}})
    .then(res => {
      props.dispatch(listingAction.setListing(res.data))
      props.history.push(`/listings/${id}?check-in=13-11-2020&check-out=17-11-2020&guests=1&sort=default&zoom=14`)
    })
}

const Listings = (props) => {
    return(<div>
        <h1>Choose a listing!</h1>
        {props.listings && renderListings(props) }
    </div>)
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(mapStateToProps)(Listings)