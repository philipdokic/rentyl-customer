export default function listingReducer(state={}, action){
  switch (action.type) {
    case "SET_LISTING":
      return {...state.listing, ...action.listing };
    default:
      return state;
  }
}