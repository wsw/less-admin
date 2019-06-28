import request from '@/common/request'

export const state = () => ({
  menus: []
})

export const mutations = {
  setMenus(state, menus) {
    state.menus = menus
  }
}

export const actions = {
  async menus({ commit }, params) {
    const data = await request.get('/sys/menus')
    data && commit('setMenus', data.menus)
  },
  async hello() {
    await request.get('/sys/hello')
  }
}
