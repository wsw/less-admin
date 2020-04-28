<script>
export default {
  name: 'SubMenu',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  render () {
    const nodes = []
    const menu = this.menu
    const icon = menu.icon && <icon-svg name={menu.icon} />
    if (menu.children && menu.children.length > 0) {
      const childrenNodes = menu.children.map((child) => {
        return <sub-menu key={child.menuId} menu={child}></sub-menu>
      })
      nodes.push(<el-submenu index={menu.menuId + ''}>
        <template slot="title">
          {icon}
          <span slot="title"> { menu.name } </span>
        </template>
        {childrenNodes}
      </el-submenu>)
    } else {
      nodes.push(<el-menu-item index={menu.menuId + ''}>
        {icon}
        <span slot="title"> { menu.name } </span>
      </el-menu-item>)
    }
    return nodes
  }
}
</script>
