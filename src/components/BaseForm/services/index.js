import request from '@/lib/request'

export const getSelectOptions = (url, params) => {
    return request({
        method: 'GET',
        url,
        params
    })
}