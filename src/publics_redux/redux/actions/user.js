import axios from 'axios'
import ip from './ip'


export const getAllUser = (token,idUser) => {
    return {
        type: "GET_USERS",
        payload: axios.get(`http://${ip}/user`,null,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}

export const getUserByEmail = (email) => {
    return {
        type: "GET_BY_EMAIL",
        payload: axios.post(`http://${ip}/user/login/`,email,{
            headers:{
                "authorization":"Allow",
            }
        })
    }
}

export const register = (data) => {
    return {
        type: "REGISTER",
        payload:axios.post(`http://${ip}/user/register`,data,{
            headers:{
                "authorization":"Allow",
                
            }
        })
    }
}

export const getToken = (token,idUser) =>{
    return{
        type: "GET_TOKEN",
        payload:axios.post(`http://${ip}/user/getToken`,null,{
            headers:{
                "x-access-token":`bearer ${localStorage.token}`,
                "authorization":"Allow",
                "x-control-user": localStorage.id
            }
        })
    }
}
