import * as types from '../action-types'


export const setHeaderFixed  = () => {
    return {
        type: types.HEADER_SET_FIXED
    }
}

export const setSiderOpen = () => {
    return {
        type: types.SIDER_SET_ISOPEN
    }
}

export const setSideBarRoutes = routes => ({
    type: types.SET_SIDE_BAR_ROUTES,
    payload: routes
})