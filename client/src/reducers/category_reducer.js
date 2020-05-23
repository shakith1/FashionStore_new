export default function (state = {}, action) {
    switch (action.type) {
        case 'ADD_CATEGORY':
            return { ...state, newcategory: action.payload.post }
        case 'GET_CATEGORY':
            return { ...state, category: action.payload }
        default:
            return state;
    }
}