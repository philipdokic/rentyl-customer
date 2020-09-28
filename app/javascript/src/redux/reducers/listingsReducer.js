export default function brandReducer(state=[], action){
    switch (action.type) {
        case "SET_LISTINGS":
            return {...state,  ...action.listings };
        default:
            return state;
    }
}