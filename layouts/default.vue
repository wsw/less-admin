<template>
  <el-container class="default-container">
    <el-header class="header" height="45px">
      Less快速开发框架
      <el-dropdown @command="handleUserCommand" class="user-info">
        <span class="el-dropdown-link">
          {{ user.username }}<i class="el-icon-arrow-down el-icon--right" />
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="logout">
            登出
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container class="main-container n-progress">
      <el-aside :width="collapse ? '55px' : '200px'" class="aside">
        <el-menu
          :collapse="collapse"
          :collapse-transition="false"
          :default-active="menu.active + ''"
          @select="select"
        >
          <template v-for="item in menu.children">
            <sub-menu :key="item.menuId" :menu="item" />
          </template>
        </el-menu>
        <div class="aside-bottom">
          <hamburger :is-active="collapse" @toggle="toggle" />
        </div>
      </el-aside>
      <el-main class="main">
        <nuxt />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import Hamburger from '@/components/hamburger/Hamburger'
import SubMenu from '@/components/menu/SubMenu'

export default {
  name: 'Default',
  components: { Hamburger, SubMenu },
  data () {
    return {
      collapse: false
    }
  },
  middleware: 'navigation',
  computed: {
    menu () {
      return this.$store.state.menu
    },
    user () {
      return this.$store.state.user
    }
  },
  async created () {
    // await this.$store.dispatch('currentUser')
    await this.$store.dispatch('menus')
    this.$store.commit('setMenuActive', this.$route)
  },
  methods: {
    toggle () {
      this.collapse = !this.collapse
    },
    handleUserCommand (command) {
      if (command === 'logout') {
        this.$store.dispatch('logout').then(() => {
          this.$router.push('/login')
        })
      }
    },
    select (index) {
      const url = this.menu.map[index].url
      this.$router.push({
        path: url.includes('http') || url.includes('https')
          ? `/frame/?url=${url}` : '/' + url
      })
    }
  }
}
</script>

<style scoped lang="scss">
.default-container {
  padding-top: 45px;
  position: relative;
  height: 100%;
}
.main-container {
  background: #eceff1;
  height: 100%;
}
.header {
  line-height: 45px;
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  background-color: #283EB2;
  color: white;
}
.aside {
  background: white;;
  position: relative;
  height: 100%;
  padding-bottom: 40px;
  width: 200px;
  transition: 0.5s;

  .aside-bottom {
    text-align: center;
    position: absolute;
    height: 39px;
    border-top: 1px solid #EBEEF5;
    line-height: 39px;
    text-align: center;
    width: 100%;
  }
}
.main {
  height: 100%;
  padding: 0;
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
<style lang="scss">
.default-container .aside {
  border-right: 1px solid #EBEEF5;
  .el-menu {
    border: 0;
    height: 100%;
    overflow: auto;
    .el-menu-item {
      color: #666;
      &.is-active, &:hover, &:focus {
        background-color: #409eff;
        color: white;
      }
    }
  }
}
.default-container .box-card {
  height: 100%;
  border: 0;
  overflow: auto;
}
.el-table td,
.el-table th {
  text-align: center;
}
.el-table td.text-left {
  text-align: left;
}
</style>
