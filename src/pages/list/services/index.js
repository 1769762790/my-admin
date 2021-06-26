import request from '@/lib/request'

export const updateUser = (data) => {
    return request({
        method: 'POST',
        url: '/updateUser',
        data
    })
}
export const deleteUser = (data) => {
    return request({
        method: 'POST',
        url: '/deleteUser',
        data
    })
}
export const addUser = (data) => {
    return request({
        method: 'POST',
        url: '/insertUser',
        data
    })
}
export const batchDelUser = (data) => {
    return request({
        method: 'POST',
        url: '/batchDeleteUser',
        data
    })
}