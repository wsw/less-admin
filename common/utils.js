export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

// 目录跟菜单
export const menusToTree = (menus, root = 0) => {
  const tree = []
  menus.map(menu => {
    if (menu.parentId === root && menu.type < 2) {
      const child = menusToTree(menus, menu.menuId)
      if (child && child.length > 0) {
        menu.child = child
      }
      tree.push({ ...menu })
    }
  })
  return tree
}
// 目录跟菜单跟按钮
const MENU_TYPE = [
  { typeName: '目录', typeTag: 'primary' },
  { typeName: '菜单', typeTag: 'success' },
  { typeName: '按钮', typeTag: 'info' }
]
export const menusToTreeAll = (menus, root = 0) => {
  const tree = []
  menus.map(menu => {
    if (menu.parentId === root) {
      const child = menusToTreeAll(menus, menu.menuId)
      if (child && child.length > 0) {
        menu.child = child
      }
      tree.push({ ...menu, ...MENU_TYPE[menu.type] })
    }
  })
  return tree
}
