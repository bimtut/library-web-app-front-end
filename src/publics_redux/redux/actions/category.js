import axios from 'axios'
import ip from './ip'


export const getCategory = () =>{
    return{
        type:"GET_CATEGORY",
        payload:axios.get(`http://${ip}/category`,null,{
            headers:{
                "authorization":"Allow"
            }
        })
    }
}
