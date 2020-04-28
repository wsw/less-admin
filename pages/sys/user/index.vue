<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button @click="add" size="mini" type="primary">
        新增
      </el-button>
    </div>
    <el-table :data="users.list" style="text-align:center" size="mini" border>
      <el-table-column type="selection" width="55" />
      <el-table-column prop="userId" label="序号" width="55" />
      <el-table-column prop="username" label="账号" width="150" />
      <el-table-column label="状态" width="100">
        <template slot-scope="scope">
          <el-tag v-if="scope.row.status === 1" class="primary">
            正常
          </el-tag>
          <el-tag v-else>
            注销
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column prop="email" label="邮箱" />
      <el-table-column prop="mobile" label="手机号" />
      <el-table-column label="角色">
        <template slot-scope="scope">
          <el-tag v-for="role in scope.row.roles" :key="role.id" class="primary">
            {{ role.roleName }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button v-if="scope.row.userId !== 1" @click="modify(scope.row)" size="small" type="text">
            修改
          </el-button>
          <!--          <el-button size="small" type="text" @click="del(scope.row)">-->
          <!--            删除-->
          <!--          </el-button>-->
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.type === 'add' ? '新增' : '修改'"
      :visible.sync="dialog.visible"
      width="600px"
    >
      <el-form ref="form" :model="form" size="medium" label-width="100px">
        <el-form-item
          :rules="[{ required: true, message: '请输入账号' }]"
          prop="username"
          label="账号"
        >
          <el-input v-model="form.username" placeholder="账号" />
        </el-form-item>
        <el-form-item
          v-if="dialog.type === 'add'"
          :rules="[{ required: true, message: '请输入密码' }]"
          prop="username"
          label="密码"
        >
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item v-else label="密码">
          <el-input
            v-model="form.password"
            type="password"
            placeholder="密码"
          />
        </el-form-item>
        <el-form-item label="邮箱">
          <el-input v-model="form.email" placeholder="邮箱" />
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="form.mobile" placeholder="手机号" />
        </el-form-item>
        <el-form-item label="角色">
          <el-checkbox-group v-model="form.roles">
            <el-checkbox
              v-for="role in roles"
              :key="role.roleId"
              :label="role.roleId"
            >
              {{ role.roleName }}
            </el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="form.status">
            <el-option :value="0" label="注销" />
            <el-option :value="1" label="正常" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button
            :loading="dialog.loading"
            @click="submitForm"
            type="primary"
          >
            提交
          </el-button>
          <el-button @click="dialog.visible = false">
            取消
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
const ResetForm = { username: '', password: '', email: '', roles: [], mobile: '', status: 1 }
export default {
  data () {
    return {
      count: 0,
      dialog: {
        loading: false,
        visible: false,
        type: 'add'
      },
      form: { ...ResetForm }
    }
  },
  async asyncData ({ $axios }) {
    const usersResult = await $axios.get('/sys/users')
    const rolesResult = await $axios.get('/sys/roles')
    return {
      users: usersResult.page,
      roles: rolesResult.roles
    }
  },
  created () {},
  methods: {
    add () {
      this.form = { ...ResetForm }
      this.dialog.visible = true
      this.dialog.title = 'add'
    },
    modify (user) {
      this.form.username = user.username
      // this.form.password = user.password
      this.form.email = user.email
      this.form.roles = user.roles.map(role => role.roleId)
      this.form.mobile = user.mobile
      this.form.status = user.status
      this.form.userId = user.userId
      this.dialog.visible = true
      this.dialog.title = 'edit'
    },
    async submitForm () {
      await this.$refs.form.validate()
      const user = {
        username: this.form.username,
        email: this.form.email,
        mobile: this.form.mobile,
        roles: this.form.roles,
        status: this.form.status
      }
      this.dialog.loading = true
      if (this.dialog.type === 'edit') {
        user.userId = this.form.userId
        if (this.form.password) {
          user.password = this.form.password
        }
        await this.$axios.put('/sys/user', user)
      } else {
        user.password = this.form.password
        await this.$axios.post('/sys/user', user)
      }
      this.dialog.loading = false
      this.dialog.visible = false
      const usersResult = await this.$axios.get('/sys/users')
      this.users = usersResult.page
    }
  }
}
</script>

<style scoped></style>
