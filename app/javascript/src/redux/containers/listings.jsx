import {connect} from 'react-redux'

import Search from '../../components/listings/search'

function mapStateToProps(state) {
    return {
        listings: state.listings.length ? state.listings : []
    };
}

export default connect(mapStateToProps)(Search)