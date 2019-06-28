<template>
  <el-container class="default-container">
    <el-header class="header" height="45px">
      Less快速开发框架
      <el-dropdown class="user-info" @command="handleUserCommand">
        <span class="el-dropdown-link">
          {{ user.username }}<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">登出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
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

export default {
  name: 'Default',
  components: { Hamburger, SubMenu },
  data() {
    const route = this.$route
    return {
      collapse: false,
      defaultIndex:
        route.path === '/frame/'
          ? `${route.path}?url=${route.query.url}`
          : route.path
    }
  },
  computed: {
    menus() {
      return this.$store.state.menus
    },
    user() {
      return this.$store.state.user
    }
  },
  async created() {
    await this.$store.dispatch('currentUser')
    await this.$store.dispatch('menus')
  },
  methods: {
    toggle() {
      this.collapse = !this.collapse
    },
    handleUserCommand(command) {
      if (command === 'logout') {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      }
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
.user-info {
  float: right;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
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
