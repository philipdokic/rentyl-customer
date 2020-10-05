import {connect} from 'react-redux'

import Single from '../../components/listing/single'

function mapStateToProps(state) {
    return {
        listing: state.listings.listings ? state.listings.listings.find(id => id = 100320000015) : {}
    };
}

export default connect(mapStateToProps)(Single)