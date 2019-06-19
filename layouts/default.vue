<template>
  <el-container class="default-container">
    <el-header class="header" height="45px">Header</el-header>
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
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>导航一</span>
            </template>
            <el-menu-item-group>
              <template slot="title"
                >分组一</template
              >
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
            <el-menu-item-group title="分组2">
              <el-menu-item index="1-3">选项3</el-menu-item>
            </el-menu-item-group>
            <el-submenu index="1-4">
              <template slot="title"
                >选项4</template
              >
              <el-menu-item index="1-4-1">选项1</el-menu-item>
            </el-submenu>
          </el-submenu>
          <el-menu-item index="2">
            <i class="el-icon-menu"></i>
            <span slot="title">导航二</span>
          </el-menu-item>
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
export default {
  name: 'Default',
  components: { Hamburger },
  data() {
    return {
      collapse: false
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
.header {
  line-height: 45px;
}
.aside {
  background: #545c64;
  position: relative;
  height: 100%;
  padding-bottom: 40px;
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
</style>
