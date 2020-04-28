import { Message } from 'element-ui'

export default function ({ $axios, error, app, store, redirect }) {
  $axios.onRequest((config) => {
    console.log('请求地址：' + config.url)
  })

  console.log(app)

  $axios.onError((err) => {
    const code = parseInt(err.response && err.response.status)
    console.log('err', err)
    switch (code) {
      case 400:
        err.message = '错误请求'
        break
      case 401:
        err.message = '未授权，请重新登录'
        redirect('/login')
        break
      case 403:
        err.message = '拒绝访问'
        break
      case 404:
        err.message = '请求错误,未找到该资源'
        break
      case 405:
        err.message = '请求方法未允许'
        break
      case 408:
        err.message = '请求超时'
        break
      case 500:
        err.message = '服务器端出错'
        break
      case 501:
        err.message = '网络未实现'
        break
      case 502:
        err.message = '网络错误'
        break
      case 503:
        err.message = '服务不可用'
        break
      case 504:
        err.message = '网络超时'
        break
      case 505:
        err.message = 'http版本不支持该请求'
        break
      default:
        err.message = `连接错误${err.response.status}`
    }
    Message.error(err.message)
  })
  // $axios.onResponse()

  $axios.interceptors.response.use((response) => {
    const res = response.data
    if (res.code !== 0) {
      Message.error(res.msg)
      return Promise.reject(response)
    } else {
      return res
    }
  })

  if (process.client) {
    $axios.setBaseURL('/api')
  }

  if (sessionStorage.getItem('token')) {
    // Adds header: `Authorization: Bearer 123` to all requests
    $axios.setToken(sessionStorage.getItem('token'), 'Bearer')
    store.commit('setToken', sessionStorage.getItem('token'))
  }
}
