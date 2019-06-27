<template>
  <el-submenu
    v-if="menu.child && menu.child.length > 0"
    :index="menu.menuId + ''"
  >
    <template slot="title">
      <!--      <i v-if="menu.icon" :class="'el-icon-' + menu.icon"></i>-->
      <icon-svg v-if="menu.icon" :name="menu.icon"></icon-svg>
      <span>{{ menu.name }}</span>
    </template>
    <template v-for="m in menu.child">
      <sub-menu :key="m.menuId" :menu="m"></sub-menu>
    </template>
  </el-submenu>
  <el-menu-item
    v-else
    :route="handRoute(menu.url)"
    :index="handRoute(menu.url).path"
  >
    <!--    <i v-if="menu.icon" :class="'el-icon-' + menu.icon"></i>-->
    <icon-svg v-if="menu.icon" :name="menu.icon"></icon-svg>
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
      // 直接设置路由地址为菜单的index，可以获取默认选择地址
      return {
        path: url.includes('http') ? `/frame/?url=${url}` : '/' + url
      }
    }
  }
}
</script>
