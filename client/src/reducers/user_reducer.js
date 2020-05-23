export default function (state = {}, action) {
    switch (action.type) {
        case 'USER_REGISTER':
            return {
                ...state,
                register: action.payload.success,
                users: action.payload.users
            }
        case 'GET_MANAGER':
            return { ...state, users: action.payload }
        case 'USER_LOGIN':
            return { ...state, login: action.payload }
        case 'SEND_MAIL':
            return { ...state, email: action.payload.success }
        default:
            return state;
    }
}