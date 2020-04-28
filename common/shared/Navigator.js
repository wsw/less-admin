export default class Navigator {
  constructor () {
    this.tabs = []
    this.active = {}
  }

  navigate (route) {
    const clone = this.cloneRoute(route)
    if (!clone.path) { // 路由为空直接返回
      return
    }
    if (this.find(clone)) {
      this.active = clone
      return
    }
    this.tabs.push(clone)
  }

  remove (route) {
    const index = this.tabs.findIndex(item => item.name === route.name)
    this.tabs.splice(index, 1)
    this.active = this.tabs[index - 1]
  }

  replace (cloneRoute) {
    const index = this.tabs.findIndex(item => item.name === cloneRoute.name)
    if (index !== -1) {
      this.tabs.splice(index, 1, cloneRoute)
    } else {
      this.tabs.push(cloneRoute)
    }
  }

  find (route) {
    return this.tabs.find(tab => tab.path === route.path)
  }

  findIndex (route) {
    return this.tabs.findIndex(tab => tab.path === route.path)
  }

  childRoute (route) {
    return route.path && (route.path.indexOf(this.tabs[0].path) === 0)
  }

  cloneRoute (route) {
    return {
      // fullPath: route.fullPath,
      name: route.name,
      params: route.params,
      query: route.query,
      path: route.path
    }
  }
}
