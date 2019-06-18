import axios from 'axios'
import { Message } from 'element-ui'

const service = axios.create({
  baseURL: process.env.baseUrl,
  timeout: 500000,
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json; charset=utf-8'
  }
})

// service.defaults.headers.common['token'] = 'a2ba9cedf858d187c456279d1ff72aab';

// 添加请求拦截器
service.interceptors.request.use(
  config => {
    // 在发送请求之前做些什么
    return config
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error)
  }
)

// respone interceptor
service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code !== 0) {
      Message({
        message: res.msg,
        type: 'error',
        duration: 3 * 1000
      })
    } else {
      return res
    }
  },
  error => {
    if (error.response) {
      switch (error.response.status) {
        case 401:
          // 返回 401 跳转到登录页面
          location.href = '/login?url=' + location.pathname + location.search
          break
        case 403:
          Message({
            message: '没有权限',
            type: 'error',
            duration: 3 * 1000
          })
      }
    }
    return Promise.reject(error)
  }
)

export default service
