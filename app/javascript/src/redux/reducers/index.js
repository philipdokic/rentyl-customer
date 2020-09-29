import {combineReducers} from 'redux'
import brand from './brandReducer'
import listings from './listingsReducer'
const rootRuducer = combineReducers({
    brand,
    listings
})

export default rootRuducer