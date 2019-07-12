import request from '@/common/request'
import { menusToTree } from '@/common/utils'

// 先获取本地是否有token，直接放到请求的header中
if (sessionStorage.getItem('token')) {
  request.defaults.headers.common.Authorization =
    'Bearer ' + sessionStorage.getItem('token')
}

export const state = () => ({
  token: '',
  user: {},
  menus: []
})

export const mutations = {
  setToken(state, token) {
    state.token = token
    sessionStorage.setItem('token', token)
    request.defaults.headers.common.Authorization = 'Bearer ' + token
  },
  setLogout(state) {
    state.token = ''
    state.menus = []
    state.user = {}
  },
  setCurrentUser(state, user) {
    state.user = user
  },
  setMenus(state, menus) {
    state.menus = menusToTree(menus)
  }
}

export const actions = {
  async login({ commit }, params) {
    const data = await request.post('/auth/login', params)
    data && commit('setToken', data.token)
  },
  async logout() {
    await request.get('/auth/logout')
  },
  async currentUser({ commit }) {
    const data = await request.get('/sys/user')
    commit('setCurrentUser', data.user)
  },
  async menus({ commit }, params) {
    const data = await request.get('/sys/navMenu')
    data && commit('setMenus', data.menus)
  },
  async hello() {
    await request.get('/sys/hello')
  }
}
