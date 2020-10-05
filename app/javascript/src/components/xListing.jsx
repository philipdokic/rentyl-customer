import React from 'react'
import {connect} from 'react-redux'

const Listings = (props) => {
    return(<div>
        <h1>This is a listing</h1>
    <div>This is the id: {props.listing.id}</div>
    <div>This is the unit id: {props.listing.unit_id}</div>
    </div>)
}

function mapStateToProps(state) {
    return {
        listing: state.listings.listings ? state.listings.listings.find(id => id = 100320000015) : {}
    };
}

export default connect(mapStateToProps)(Listings)