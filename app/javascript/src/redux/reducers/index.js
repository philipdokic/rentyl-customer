import {combineReducers} from 'redux'
import organization from './organizationReducer'

const rootRuducer = combineReducers({
    organization
})

export default rootRuducer