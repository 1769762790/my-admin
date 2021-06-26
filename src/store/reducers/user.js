import * as types from '../action-types'

const initUserInfo = {
    name: '',
    token: ''
}

export default (state = initUserInfo, action) => {
    switch (action.type) {
        case types.USER_SET_USER_TOKEN:
            return {
                ...state,
                token: action.token
            }
        case types.USER_SET_USER_INFO:
            return {
                ...state,
                name: action.name
            }
        default: 
            return state
    }
}