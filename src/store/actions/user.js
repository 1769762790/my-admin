import * as types from '../action-types'

export const getUserInfo = token => dispatch => {
    return new Promise((resolve, reject) => {
        const userInfo = {
            name: '123'
        }
        dispatch(setUserInfo(userInfo))
        resolve(userInfo)
    })
}

export const setUserToken = token => {
    return {
        type: types.USER_SET_USER_TOKEN,
        token
    }
}

export const setUserInfo = userInfo => {
    return {
        type: types.USER_SET_USER_INFO,
        ...userInfo
    }
}