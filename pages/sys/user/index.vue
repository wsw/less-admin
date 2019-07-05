<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <el-table style="text-align:center" size="mini" :data="users.list" border>
      <el-table-column type="selection" width="55"> </el-table-column>
      <el-table-column prop="userId" label="序号" width="55"> </el-table-column>
      <el-table-column prop="username" label="账号" width="150">
      </el-table-column>
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" class="primary">正常</el-tag>
          <el-tag v-else>注销</el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱"> </el-table-column>
      <el-table-column prop="mobile" label="手机号"> </el-table-column>
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag
            v-for="role in scope.row.roles"
            :key="role.id"
            class="primary"
          >
            {{ role.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            v-if="scope.row.userId !== 1"
            size="small"
            type="text"
            @click="modify(scope.row)"
          >
            修改
          </el-button>
          <!--          <el-button size="small" type="text" @click="del(scope.row)">-->
          <!--            删除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.title"
      width="600px"
      :visible.sync="dialog.visible"
    >
      <el-form ref="form" :model="form" size="medium" label-width="100px">
        <el-form-item
          :rules="[{ required: true, message: '请输入账号' }]"
          prop="username"
          label="账号"
        >
          <el-input v-model="form.username" placeholder="账号"></el-input>
        </el-form-item>
        <el-form-item
          v-if="dialog.title === '新增'"
          :rules="[{ required: true, message: '请输入密码' }]"
          prop="username"
          label="密码"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item v-else label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          ></el-input>
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="邮箱"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" placeholder="手机号"></el-input>
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleId"
              >{{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option label="注销" :value="0"></el-option>
            <el-option label="正常" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="dialog.loading"
            type="primary"
            @click="submitForm"
            >提交</el-button
          >
          <el-button @click="dialog.visible = false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import request from '~/common/request'
export default {
  data() {
    return {
      count: 0,
      dialog: {
        loading: false,
        visible: false,
        title: '新增'
      },
      form: {
        username: '',
        password: '',
        email: '',
        roles: [],
        mobile: '',
        status: 1
      }
    }
  },
  computed: {
    users() {
      return this.$store.state.system.users
    },
    roles() {
      return this.$store.state.system.roles
    }
  },
  async fetch({ store }) {
    await store.dispatch('system/users')
    await store.dispatch('system/roles')
  },
  created() {},
  methods: {
    add() {
      this.form = {
        username: '',
        password: '',
        email: '',
        roles: [],
        mobile: '',
        status: 1
      }
      this.dialog.visible = true
      this.dialog.title = '新增'
    },
    modify(user) {
      this.form.username = user.username
      // this.form.password = user.password
      this.form.email = user.email
      this.form.roles = user.roles.map(role => role.roleId)
      this.form.mobile = user.mobile
      this.form.status = user.status
      this.form.userId = user.userId
      this.dialog.visible = true
      this.dialog.title = '修改'
    },
    async submitForm() {
      await this.$refs.form.validate()
      const user = {
        username: this.form.username,
        email: this.form.email,
        mobile: this.form.mobile,
        roles: this.form.roles,
        status: this.form.status
      }
      this.dialog.loading = true
      if (this.dialog.title === '修改') {
        user.userId = this.form.userId
        if (this.form.password) {
          user.password = this.form.password
        }
        await request.put('/sys/user', user)
      } else {
        user.password = this.form.password
        await request.post('/sys/user', user)
      }
      this.dialog.loading = false
      this.dialog.visible = false
      this.$store.dispatch('system/users')
    }
  }
}
</script>

<style scoped></style>
