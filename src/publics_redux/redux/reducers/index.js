import {combineReducers} from 'redux'

import book from './book'
import category from './category'
import history from './history'
import user from './user'

const appReducer = combineReducers({
    book,
    category,
    history, 
    user
})

export default appReducer
