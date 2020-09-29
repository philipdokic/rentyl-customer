import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const renderListings = (props) => {
    debugger
return props.listings.map(l=>(<Link to={`listings/${l.id}`} key={l.id}>{l.name}</Link>))
}

const Listings = (props) => {
    debugger
    return(<div>
        <h1>Choose a listing!</h1>
        {props.listings.length > 0 && renderListings(props) }
    </div>)
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(mapStateToProps)(Listings)