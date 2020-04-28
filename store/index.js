import Menu from '~/common/shared/Menu'

const state = () => ({
  token: '',
  user: {},
  menu: new Menu()
})

const mutations = {
  setToken (state, token) {
    state.token = token
  },
  setLogout (state) {
    state.token = ''
    state.menus = []
    state.user = {}
  },
  setCurrentUser (state, user) {
    state.user = user
  },
  setMenus (state, menus) {
    state.menu.setChildren(menus)
  },
  setMenuActive (state, route) {
    state.menu.setActive(route)
  }
}

const actions = {
  async login ({ commit }, params) {
    const data = await this.$axios.post('/auth/_login', params)
    if (data) {
      this.$axios.setToken(data.token, 'Bearer')
      sessionStorage.setItem('token', data.token)
      commit('setToken', data.token)
    }
  },
  async logout () {
    await this.$axios.get('/auth/logout')
  },
  async currentUser ({ commit }) {
    const data = await this.$axios.get('/sys/user')
    commit('setCurrentUser', data.user)
  },
  async menus ({ commit }) {
    const data = await this.$axios.get('/sys/navMenu')
    data.menus && commit('setMenus', data.menus)
  },
  async hello () {
    console.log(this.$axios.defaults)
    await this.$axios.get('/sys/hello')
  }
}

export {
  state, mutations, actions
}
