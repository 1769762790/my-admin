import axios from 'axios'
import { message } from 'antd'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

NProgress.configure({ showSpinner: false });

//使用create方法创建axios实例
const baseUrl = '/api'
const service = axios.create({
    timeout: 7000, // 请求超时时间
    baseURL: baseUrl,
    method: 'post',
    headers: {
      'Content-Type': 'application/json;charset=UTF-8'
    }
  })
// 全局设定请求类型
// axios.defaults.headers.post['Content-Type'] = 'application/json'
//拦截请求
service.interceptors.request.use(function(config) {
    NProgress.start()
    return config
}, function(error) {
    return Promise.reject(error)
});
//拦截响应
service.interceptors.response.use(function (response) {
    NProgress.done()
    return successState(response)
    // return response
}, function(error) {
    return errorState(error)
});

// 封装数据返回失败提示函数---------------------------------------------------------------------------
function errorState (response) {
    // 隐藏loading
    // 如果http状态码正常，则直接返回数据
    const { status } = response.response
    if (status && status === 200) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
        return response
    } else {
        switch (status) {
            case 401: 
                message.error(status + '身份未认证')
            break;
            case 404: 
                message.error(status + '接口未找到')
            break;
            case 500: 
                message.error(status + '服务器异常')
            break;
            case 504: 
                message.error(status + '服务器连接超时')
            break;
            default:
                message.error('请求异常，请稍后重试')
        }
        return Promise.reject(response)
    }
}
// 封装数据返回成功提示函数---------------------------------------------------------------------------
function successState (res) {
    // 隐藏loading
    // 统一判断后端返回的错误码(错误码与后台协商而定)
    if (res.data.code === 0) {
      return res.data
    }
    message.error(res.data.message)
    return Promise.reject(res.data)
}

export default service