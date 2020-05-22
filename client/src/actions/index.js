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