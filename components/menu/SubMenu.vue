<template>
  <el-submenu v-if="menu.child.length > 0" :index="menu.menuId + ''">
    <template slot="title">
      <i v-if="menu.icon" :class="'el-icon-' + menu.icon"></i>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="m in menu.child">
      <sub-menu :key="m.menuId" :menu="m"></sub-menu>
    </template>
  </el-submenu>
  <el-menu-item v-else :route="handRoute(menu.url)" :index="menu.menuId + ''">
    <i v-if="menu.icon" :class="'el-icon-' + menu.icon"></i>
    <span slot="title">
      {{ menu.name }}
    </span>
  </el-menu-item>
</template>

<script>
export default {
  name: 'SubMenu',
  props: {
    menu: {
      type: Object,
      required: true
    }
  },
  methods: {
    handRoute(url) {
      return {
        path: '/' + url
      }
    }
  }
}
</script>
