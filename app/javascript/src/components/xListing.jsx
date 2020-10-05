import React from 'react'
import {connect} from 'react-redux'

const Listing = (props) => {
    const listing = props.listings.length ? props.listings.find(id => id = props.match.params.id) : {}
    return(<div>
        <h1>This is a listing</h1>
    <div>This is the id: {listing.id}</div>
    <div>This is the unit id: {listing.unit_id}</div>
    </div>)
}

function mapStateToProps(state) {
    return {
        listings: state.listings
    };
}

export default connect(mapStateToProps)(Listing)