import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const renderListings = (props) => {
return props.listings.map(l=>(<div key={l.id}><Link to={`listings/${l.id}`}>{l.unit_id}</Link></div>))
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