<template>
  <div style="padding-top: 200px">
    <el-form label-position="left" label-width="0px" class="login-container">
      <h3 class="title">系统登录</h3>
      <el-form-item>
        <el-input
          v-model="username"
          type="text"
          auto-complete="off"
          placeholder="账号"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-input
          v-model="password"
          type="password"
          auto-complete="off"
          placeholder="密码"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-row :gutter="10">
          <el-col :span="12"
            ><el-input
              v-model="captcha"
              width="50%"
              type="text"
              auto-complete="off"
              placeholder="验证码"
            ></el-input
          ></el-col>
          <el-col :span="12">
            <img
              style="height: 40px; width: 100%"
              :src="'http://127.0.0.1:3000/auth/captcha.jpg?uuid=' + uuid"
              @click="reloadCaptcha"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <!-- <el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox> -->
      <el-form-item style="width:100%;">
        <el-button
          type="primary"
          style="width:100%;"
          @click.native.prevent="handleSubmit"
          >登录</el-button
        >
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { getUUID } from '~/common/utils'
export default {
  name: 'Login',
  layout: 'blank',
  data() {
    return {
      username: '',
      password: '',
      captcha: '',
      uuid: getUUID()
    }
  },
  methods: {
    handleSubmit() {
      if (this.username && this.password && this.captcha) {
        this.$store
          .dispatch('login', {
            username: this.username,
            password: this.password,
            code: this.captcha,
            uuid: this.uuid
          })
          .then(success => {
            if (this.$store.state.token) {
              this.$router.push({ path: this.$route.query.url || '/' })
            }
          })
      } else {
        this.$message('信息不完整！')
      }
    },
    reloadCaptcha() {
      this.uuid = getUUID()
    }
  }
}
</script>

<style scoped>
.login-container {
  -webkit-border-radius: 5px;
  border-radius: 5px;
  -moz-border-radius: 5px;
  margin: 0 auto;
  width: 350px;
  padding: 35px 35px 15px 35px;
  background: #fff;
  border: 1px solid #eaeaea;
  box-shadow: 0 0 25px #cac6c6;
}
.login-container .title {
  margin: 0px auto 40px auto;
  text-align: center;
  color: #505458;
}
.login-container .remember {
  margin: 0px 0px 35px 0px;
}
</style>
