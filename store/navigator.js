import Navigator from '~/common/shared/Navigator'
const state = () => (new Navigator())

const mutations = {
  navigate (state, route) {
    state.navigate(route)
  }
}

export {
  state, mutations
}
