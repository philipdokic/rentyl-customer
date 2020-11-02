export default function brandReducer(state={}, action){
  switch (action.type) {
    case "SET_BRAND":
      return {...state.brand, ...{...action.brand, contact: JSON.parse(action.brand.contact)}}
    case "SET_HOME":
      return {...state, home: {...action.brand}}
    default:
      return state;
  }
}