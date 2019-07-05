import request from '@/common/request'

export const state = () => ({
  menus: [],
  users: {},
  roles: {}
})

export const mutations = {
  setMenus(state, menus) {
    state.menus = menus
  },
  setUsers(state, page) {
    state.users = page
  },
  setRoles(state, roles) {
    state.roles = roles
  }
}

export const actions = {
  async menus({ commit }, params) {
    const data = await request.get('/sys/menus')
    data && commit('setMenus', data.menus)
  },
  async users({ commit }) {
    const data = await request.get('/sys/users')
    data && commit('setUsers', data.page)
  },
  async roles({ commit }) {
    const data = await request.get('/sys/roles')
    data && commit('setRoles', data.roles)
  },
  async hello() {
    await request.get('/sys/hello')
  }
}
