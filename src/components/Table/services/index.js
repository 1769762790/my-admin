import request from '@/lib/request'

export const getTableData = (url, params) => {
    return request({
        method: 'GET',
        params,
        url
    })
}