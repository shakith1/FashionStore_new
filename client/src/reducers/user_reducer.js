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
        case 'GET_USER':
            return { ...state, users: action.payload }
        case 'GET_USER_BY_ID':
            return { ...state, user: action.payload }
        case 'UPDATE_USER':
            return {
                ...state,
                updateUser: action.payload.success,
                user: action.payload.doc
            }
        case 'DELETE_USER':
            return {
                ...state,
                userDeleted: action.payload
            }
        case 'CLEAR_USER':
            return {
                ...state,
                updateUser: action.payload.updateUser,
                user: action.payload.user,
                userDeleted: action.payload.userDeleted
            }
        case 'USER_AUTH':
            return { ...state, login: action.payload }
        default:
            return state;
    }
}