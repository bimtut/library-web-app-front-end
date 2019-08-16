import axios from 'axios'
import ip from './ip'

export const getBookSearch = (word) => {
    return {
        type: "GET_BOOK_SEARCH",
        payload: axios.get(`http://${ip}/book/search/?search=${word}`, null,{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const getAllBook = () => {
    return {
        type: "GET_BOOKS",
        payload: axios.get(`http://${ip}/book/`, null,{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const getBookid = (id) => {
    return {
        type: "GET_BOOK_ID",
        payload: axios.get(`http://${ip}/book/${id}`, null,{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const bookPost = (data) => {
    console.log('data post book',data);
    
    return {
        type: "POST_BOOK",
        payload: axios.post(`http://${ip}/book`,data,{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const bookEdit = (data, id) => {
    return {
        type: "PATCH_BOOK",
        payload: axios.patch(`http://${ip}/book/${id}`,{...data},{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const pinjam = (data, id) => {
    return {
        type: "PINJAM",
        payload: axios.patch(`http://${ip}/book/${id}/pinjam`,{...data},{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const kembalikan = (data, id) => {
    return {
        type: "KEMBALIKAN",
        payload: axios.patch(`http://${ip}/book/${id}/kembalikan`,{...data},{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}

export const bookDelete = (id) => {
    return {
        type: "DELETE_BOOK",
        payload: axios.delete(`http://${ip}/book/${id}`,null,{
            headers: {
                "authorization":"Allow"
            }
        })
    }
}