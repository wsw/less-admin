export default ({ store, route }) => {
  // 设置导航
  store.commit('navigator/navigate', route)
  // 设置菜单激活状态
  store.commit('setMenuActive', route)
}
