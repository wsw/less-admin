<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button @click="add" size="mini" type="primary">
        新增
      </el-button>
    </div>
    <el-table :data="roles" style="width: 100%" border>
      <el-table-column prop="roleId" label="#" width="200" />
      <el-table-column width="200" prop="roleName" label="名称" />
      <el-table-column width="200" prop="remark" label="描述" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" size="small" type="text">
            编辑权限
          </el-button>
          <el-button @click="del(scope.row)" size="small" type="text">
            删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialog.visible"
      width="600px"
    >
      <el-form ref="form" :model="form" size="medium" label-width="100px">
        <el-form-item
          :rules="[{ required: true, message: '角色名称' }]"
          prop="roleName"
          label="角色名称"
        >
          <el-input v-model="form.roleName" placeholder="角色名称" />
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.remark" placeholder="角色描述" />
        </el-form-item>
        <el-form-item label="权限配置">
          <el-cascader
            v-model="form.checkedKeys"
            :options="menus"
            :props="{
              multiple: true,
              checkStrictly: true,
              value: 'menuId',
              emitPath: false,
              label: 'name'
            }"
            style="width: 100%"
            placeholder="选择权限"
            clearable
          />
          <p class="tip">
            注：下级存在的情况下，必须选中上级.
          </p>
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
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
export default {
  data () {
    return {
      dialog: {
        visible: false,
        title: '修改',
        loading: false
      },
      form: {
        checkedKeys: [],
        roleName: '',
        remark: ''
      },
      roles: []
    }
  },
  computed: {
    menus () {
      return this.$store.state.menu && this.$store.state.menu.authorizeMenus()
    }
  },
  created () {
    this.getRoles()
  },
  methods: {
    add () {
      this.form.checkedKeys = []
      this.form.roleName = ''
      this.form.remark = ''
      this.dialog.title = '新增'
      this.dialog.visible = true
    },
    async submitForm () {
      const sysRole = {
        roleName: this.form.roleName,
        remark: this.form.remark,
        menuIds: this.form.checkedKeys
      }
      this.dialog.loading = true
      if (this.dialog.title === '新增') {
        await this.$axios.post('/sys/role', sysRole)
      } else {
        sysRole.roleId = this.form.roleId
        await this.$axios.put('/sys/role', sysRole)
      }
      this.dialog.loading = false
      this.dialog.visible = false
      this.getRoles()
    },
    async modify (row) {
      const result = await this.$axios.get('/sys/role/menus', {
        params: { id: row.roleId }
      })
      this.form.checkedKeys = result.menus
      this.form.roleName = row.roleName
      this.form.remark = row.remark
      this.form.roleId = row.roleId
      this.dialog.visible = true
    },
    async del (row) {
      try {
        await this.$confirm(`确定删除[id=${row.roleId}]角色?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        await this.$axios.delete('sys/role', { params: { id: row.roleId } })
        this.$message('删除成功！')
        this.getRoles()
      } catch (e) {}
    },
    async getRoles () {
      const rolesResult = await this.$axios.get('/sys/roles')
      this.roles = rolesResult.roles
    }
  }
}
</script>

<style scoped>
.tip {
  color: red;
  font-size: 12px;
  padding: 0;
  margin: 0;
}
</style>
