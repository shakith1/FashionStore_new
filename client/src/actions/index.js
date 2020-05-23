import axios from 'axios';

export function userRegister(user, userList) {
    const request = axios.post(`/api/register`, user)

    return (dispatch) => {
        request.then(({ data }) => {
            let users = data.success ? [...userList, data.user] : userList;
            let response = {
                success: data.success,
                users
            }

            dispatch({
                type: 'USER_REGISTER',
                payload: response
            })
        })
    }
}

export function getManagers() {
    const request = axios.get(`/api/managers`)
        .then(response => response.data);

    return {
        type: 'GET_MANAGER',
        payload: request
    }
}

export function addCategory(category) {
    const request = axios.post(`/api/category`, category)
        .then(response => response.data);

    return {
        type: 'ADD_CATEGORY',
        payload: request
    }
}

export function getCategories() {
    const request = axios.get(`/api/getCategory`)
        .then(response => response.data);

    return {
        type: 'GET_CATEGORY',
        payload: request
    }
}

export function loginUser({ email, password }) {
    const request = axios.post('/api/login', { email, password })
        .then(response => response.data)

    return {
        type: 'USER_LOGIN',
        payload: request
    }
}

export function sendMail(user) {
    const request = axios.post(`/api/sendmail`, user)
        .then(response => response.data)

    return {
        type: 'SEND_MAIL',
        payload: request
    }
}

export function getUsers() {
    const request = axios.get(`/api/users`)
        .then(response => response.data);

    return {
        type: 'GET_USER',
        payload: request
    }
}

export function getUser(id) {
    const request = axios.get(`/api/getUser?id=${id}`)
        .then(response => response.data);

    return {
        type: 'GET_USER_BY_ID',
        payload: request
    }
}

export function updateUser(data) {
    const request = axios.post(`/api/user_update`, data)
        .then(response => response.data);

    return {
        type: 'UPDATE_USER',
        payload: request
    }

}

export function deleteUser(id) {
    const request = axios.delete(`/api/delete_user?id=${id}`)
        .then(response => response.data)

    return {
        type: 'DELETE_USER',
        payload: request
    }
}

export function clearUser() {
    return {
        type: 'CLEAR_USER',
        payload: {
            user: null,
            updateUser: false,
            userDeleted: false
        }
    }
}

export function auth(){
    const request = axios.get('/api/auth')
                .then(response => response.data);

    return {
        type:'USER_AUTH',
        payload:request
    }

}