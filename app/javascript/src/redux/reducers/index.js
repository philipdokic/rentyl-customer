import {combineReducers} from 'redux'
import brand from './brandReducer'
import listing from './listingReducer'
import listings from './listingsReducer'
const rootRuducer = combineReducers({
    brand,
    listing,
    listings
})

export default rootRuducer