import cloneDeep from 'lodash/cloneDeep'
const home = {
  menuId: 0,
  parentId: 0,
  name: '首页',
  url: '',
  type: 1,
  icon: 'shouye',
  orderNum: 0 }
export default class Menu {
  constructor () {
    this.children = [home]
    this.active = '0'
    this.map = { 0: home }
    this.menus = []
  }

  setChildren (menus) {
    this.menus = menus
    this.children = [home].concat(this.toTree(menus, 0))
  }

  setActive (route) {
    let url
    if (route.path === '/frame/') {
      url = route.query.url
    } else {
      url = route.path.slice(1)
    }
    for (const key in this.map) {
      if (this.map.hasOwnProperty(key) &&
      url === this.map[key].url) {
        this.active = key
      }
    }
  }

  authorizeMenus () {
    return this.toAuthorizeTree(this.menus)
  }

  toAuthorizeTree (menus, parentId = 0) {
    const parents = []
    menus.forEach((menu) => {
      if (menu.parentId === parentId) {
        const cloneMenu = cloneDeep(menu)
        const children = this.toAuthorizeTree(menus, menu.menuId)
        if (children.length > 0) {
          cloneMenu.children = children
        }
        parents.push(cloneMenu)
      }
    })
    return parents
  }

  toTree (menus, parentId = 0, url) {
    const parents = []
    menus.forEach((menu) => {
      if (menu.parentId === parentId && menu.type < 2) {
        const cloneMenu = cloneDeep(menu)
        const children = this.toTree(menus, menu.menuId)
        if (children.length > 0) {
          cloneMenu.children = children
        } else {
          parentId > 0 && (this.map[menu.menuId] = cloneMenu)
        }
        parents.push(cloneMenu)
      }
    })
    return parents
  }
}
