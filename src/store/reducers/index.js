import user from './user'
import tagViews from './tagViews'
import app from './app'
import { combineReducers } from 'redux'

export default combineReducers({
    user,
    tagViews,
    app
})