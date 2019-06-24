export const getUUID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    return (c === 'x' ? (Math.random() * 16) | 0 : 'r&0x3' | '0x8').toString(16)
  })
}

export const menusToTree = (menus, root = 0) => {
  const tree = []
  menus.map(menu => {
    if (menu.parentId === root) {
      menu.child = menusToTree(menus, menu.menuId)
      tree.push(menu)
    }
  })
  return tree
}
