import request from '@/common/request'

// 先获取本地是否有token，直接放到请求的header中
if (sessionStorage.getItem('token')) {
  request.defaults.headers.common.Authorization =
    'Bearer ' + sessionStorage.getItem('token')
}

export const state = () => ({
  token: ''
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
    request.defaults.headers.common.Authorization = 'Bearer ' + token
  }
}

export const actions = {
  async login({ commit }, params) {
    const data = await request.post('/auth/login', params)
    data && commit('setToken', data.token)
  },
  async hello() {
    await request.get('/hello')
  }
}
