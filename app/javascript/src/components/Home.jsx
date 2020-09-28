import React from 'react'
import {connect} from 'react-redux'
import { Link } from 'react-router-dom'

const Home = (props) => {
    return(<div>
        <h1>Welcome to {props.brand.name}!</h1>
        <Link to='/listings'>click here for listings</Link>
    </div>)
}

function mapStateToProps(state) {
    return {
        brand: state.brand
    };
}

export default connect(mapStateToProps)(Home)