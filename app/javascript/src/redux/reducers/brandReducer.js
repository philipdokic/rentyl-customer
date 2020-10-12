export default function brandReducer(state={}, action){
    switch (action.type) {
        case "SET_BRAND":
            return {...state.brand,  ...action.brand };
        default:
            return state;
    }
}