import request from '@/common/request'
import { menusToTree, menusToTreeAll } from '@/common/utils'

export const state = () => ({
  menus: [],
  allMenus: []
})

export const mutations = {
  setMenus(state, menus) {
    state.menus = menusToTree(menus)
    state.allMenus = menusToTreeAll(menus)
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
