<template>
  <el-container class="default-container">
    <el-header class="header" height="45px">Less</el-header>
    <el-container class="main-container">
      <el-aside class="aside" :width="collapse ? '65px' : '200px'">
        <el-menu
          :collapse="collapse"
          :collapse-transition="false"
          background-color="#545c64"
          text-color="#fff"
          :router="true"
          active-text-color="#ffd04b"
        >
          <el-menu-item index="0-0" :route="{ path: '/' }">
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
export default {
  name: 'Default',
  components: { Hamburger, SubMenu },
  async created() {
    await this.$store.dispatch('system/menus')
    this.menus = this.$store.state.system.menus
  },
  data() {
    return {
      collapse: false,
      menus: []
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
  background: #545c64;
  position: relative;
  height: 100%;
  padding-bottom: 40px;
  width: 200px;
  transition: 0.38s;
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
</style>
