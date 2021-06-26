import request from '@/lib/request'

export const getMenuList = () => {
    return request({
        url: '/user/menu',
        method: 'GET'
    })
}