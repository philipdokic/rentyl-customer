export default function brandReducer(state={}, action){
    switch (action.type) {
        case "SET_BRAND":
            return {...state.brand,  ...action.brand };
        case "SET_BIG_BRAND":
            const brand = {...action.brand.brand}
            delete action.brand.brand
            return {...state.brand, ...{...brand, ...action.brand } }
            //return {...state.brand, ...{...brand, ...action.brand, contact: JSON.parse(action.brand.contact), options: JSON.parse(action.brand.options)} }
        default:
            return state;
    }
}