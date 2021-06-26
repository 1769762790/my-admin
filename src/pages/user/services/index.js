import request from '@/lib/request'

export const login = (data) => {
    return request({
        url: '/login',
        method: 'POST',
        data
    })
}