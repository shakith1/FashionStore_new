import axios from 'axios';

export function userRegister(user,userList){
    const request = axios.post(`/api/register`,user)

    return (dispatch) =>{
        request.then(({data})=>{
            let users = data.success ? [...userList,data.user]:userList;
            let response = {
                success:data.success,
                users
            }

            dispatch({
                type:'USER_REGISTER',
                payload:response
            })
        })
    }
}

export function getManagers() {
    const request = axios.get(`/api/managers`)
    .then(response => response.data);

    return {
        type:'GET_MANAGER',
        payload:request
    }
}

export function addCategory(category){
    const request = axios.post(`/api/category`,category)
        .then(response => response.data);

    return {
        type:'ADD_CATEGORY',
        payload:request
    }
}

export function getCategories(){
    const request = axios.get(`/api/getCategory`)
    .then(response => response.data);

    return {
        type:'GET_CATEGORY',
        payload:request
    }
}

export function loginUser({email,password}){
    const request = axios.post('/api/login',{email,password})
                .then(response => response.data)

    return {
        type:'USER_LOGIN',
        payload:request
    }
}

export function sendMail(user){
    const request = axios.post(`/api/sendmail`,user)
    .then(response => response.data)

    return{
        type: 'SEND_MAIL',
        payload: request
    }
}