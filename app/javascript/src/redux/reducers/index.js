import {combineReducers} from 'redux'
import brand from './brandReducer'
import lisings from './listingsReducer'
const rootRuducer = combineReducers({
    brand,
    lisings
})

export default rootRuducer