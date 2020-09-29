export default function organizationReducer(state={}, action){
    switch (action.type) {
        case "SET_BRAND":
            return {...state,  ...action.brand };
        default:
            return state;
    }
}