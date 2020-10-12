import {combineReducers} from 'redux'
import brand from './brandReducer'
import listing from './listingReducer'
import listings from './listingsReducer'
const rootReducer = combineReducers({
    brand,
    listing,
    listings
})

export default rootReducer