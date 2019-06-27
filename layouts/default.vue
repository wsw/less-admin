<template>
  <el-container class="default-container">
    <el-header class="header" height="45px">Less快速开发框架</el-header>
    <el-container class="main-container">
      <el-aside class="aside" :width="collapse ? '65px' : '200px'">
        <el-menu
          :collapse="collapse"
          :collapse-transition="false"
          background-color="#202b30"
          text-color="#8a979e"
          :router="true"
          active-text-color="white"
          :default-active="defaultIndex"
        >
          <el-menu-item index="" :route="{ path: '/' }">
            <i class="el-icon-s-grid"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <template v-for="menu in menus">
            <sub-menu :key="menu.menuId" :menu="menu"></sub-menu>
          </template>
        </el-menu>
        <div class="aside-bottom">
          <hamburger :is-active="collapse" @toggle="toggle"></hamburger>
        </div>
      </el-aside>
      <el-main class="main"><nuxt /></el-main>
    </el-container>
  </el-container>
</template>

<script>
import Hamburger from '@/components/hamburger/Hamburger'
import SubMenu from '@/components/menu/SubMenu'
import '@/components/icon-svg/svg/icon-menu.svg'

export default {
  name: 'Default',
  components: { Hamburger, SubMenu },
  async created() {
    await this.$store.dispatch('system/menus')
    this.menus = this.$store.state.system.menus
  },
  data() {
    const route = this.$route
    return {
      collapse: false,
      menus: [],
      defaultIndex:
        route.path === '/frame/'
          ? `${route.path}?url=${route.query.url}`
          : route.path
    }
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
    }
  }
}
</script>

<style scoped>
.default-container,
.main-container {
  height: 100%;
}
.main-container {
  background: #eceff1;
}
.header {
  line-height: 45px;
}
.aside {
  background: #202b30;
  position: relative;
  height: 100%;
  padding-bottom: 40px;
  width: 200px;
  transition: 0.5s;
}
.main {
  height: 100%;
}
.aside-bottom {
  text-align: center;
  position: absolute;
  bottom: 5px;
  width: 100%;
}
</style>
<style>
html,
body,
#__nuxt,
#__layout {
  height: 100%;
  width: 100%;
}
.default-container .el-menu {
  border: 0;
  height: 100%;
  overflow: auto;
}
.default-container .box-card {
  height: 100%;
  border: 0;
  overflow: auto;
}
</style>
