const initialState = {
    bookList: [],
    bookEdit: [],
    isLoading: false,
    isRejected: false,
    isFulfilled: false
}

 const book = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_BOOKS_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_BOOKS_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BOOKS_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data
            }
        case 'GET_BOOK_SEARCH_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_BOOK_SEARCH_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true
            }
        case 'GET_BOOK_SEARCH_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data
            }
        case 'GET_BOOK_ID_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_BOOK_ID_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BOOK_ID_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookEdit: action.payload.data
            }
        case 'GET_BOOK_CATEGORY_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'GET_BOOK_CATEGORY_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'GET_BOOK_CATEGORY_FULFILLED':
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookList: action.payload.data
            }
        case 'POST_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'POST_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'POST_BOOK_FULFILLED':
            state.bookList.result.push(action.payload.data)
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
                bookEdit: action.payload.data
            }
        case 'PATCH_BOOK_PENDING':
            return {
                ...state,
                isLoading: true,
                isRejected: false,
                isFulfilled: false
            }
        case 'PATCH_BOOK_REJECTED':
            return {
                ...state,
                isLoading: false,
                isRejected: true,
            }
        case 'PATCH_BOOK_FULFILLED':
            console.log(action.payload)
            // const find = state.bookList.result.find(item => Number(item.id) === Number(action.payload.data.result.id))
            // state.bookList.result[state.bookList.result.indexOf(find)] = action.payload.data.result
            return {
                ...state,
                isLoading: false,
                isFulfilled: true,
            }
            case 'DELETE_BOOK_PENDING':
                return {
                    ...state,
                    isLoading: true,
                    isRejected: false,
                    isFulfilled: false
                }
            case 'DELETE_BOOK_REJECTED':
                return {
                    ...state,
                    isLoading: false,
                    isRejected: true,
                }
            case 'DELETE_BOOK_FULFILLED':
                const afterDelete = state.bookList.result.filter(item => { return (Number(item.bookid) !== Number(action.payload.data.result.bookid)) })
                return {
                    ...state,
                    isLoading: false,
                    isFulfilled: true,
                    bookList: afterDelete
                }
            default:
                return state
    }
}
export default book