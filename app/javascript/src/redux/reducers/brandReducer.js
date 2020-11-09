export default function brandReducer(state={}, action){
  switch (action.type) {
    case "SET_BRAND":
      const brandWithInfo = {...action.brand.brand, ...action.brand}
      delete brandWithInfo['brand']
      return {...state, ...brandWithInfo, contact: JSON.parse(action.brand.contact)}
    case "SET_HOME":
      return {...state, home: {...action.brand, options: JSON.parse(action.brand.options)}}
    default:
      return state;
  }
}