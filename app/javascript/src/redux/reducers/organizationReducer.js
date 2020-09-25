export default function organizationReducer(state={}, action){
    switch (action.type) {
        case "SET_ORGANIZATION":
            return {...state,  ...action.organization };
        default:
            return state;
    }
}