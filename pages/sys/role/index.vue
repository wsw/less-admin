<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <el-table :data="roles" style="width: 100%" border>
      <el-table-column prop="roleId" label="#" width="200"> </el-table-column>
      <el-table-column width="200" prop="roleName" label="名称">
      </el-table-column>
      <el-table-column width="200" prop="remark" label="描述">
      </el-table-column>
      <el-table-column label="创建时间" prop="createTime"></el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="modify(scope.row)">
            编辑权限
          </el-button>
          <el-button size="small" type="text" @click="del(scope.row)">
            删除
          </el-button>
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
          :rules="[{ required: true, message: '角色名称' }]"
          prop="roleName"
          label="角色名称"
        >
          <el-input v-model="form.roleName" placeholder="角色名称"></el-input>
        </el-form-item>
        <el-form-item label="角色描述">
          <el-input v-model="form.remark" placeholder="角色描述"></el-input>
        </el-form-item>
        <el-form-item label="权限配置">
          <el-cascader
            v-model="form.checkedKeys"
            style="width: 100%"
            placeholder="选择权限"
            :options="menus"
            :props="{
              multiple: true,
              checkStrictly: true,
              value: 'menuId',
              emitPath: false,
              children: 'child',
              label: 'name'
            }"
            clearable
          ></el-cascader>
          <p class="tip">注：下级存在的情况下，必须选中上级.</p>
          <el-form-item>
            <el-button
              :loading="dialog.loading"
              type="primary"
              @click="submitForm"
              >提交</el-button
            >
            <el-button @click="dialog.visible = false">取消</el-button>
          </el-form-item>
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-card>
</template>

<script>
import request from '~/common/request'
import { menusToTreeAll } from '~/common/utils'
export default {
  data() {
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
      }
    }
  },
  computed: {
    roles() {
      return this.$store.state.system.roles
    },
    menus() {
      return menusToTreeAll(this.$store.state.system.menus)
    }
  },
  async fetch({ store }) {
    await store.dispatch('system/roles')
    await store.dispatch('system/menus')
  },
  created() {},
  methods: {
    add() {
      this.form.checkedKeys = []
      this.form.roleName = ''
      this.form.remark = ''
      this.dialog.title = '新增'
      this.dialog.visible = true
    },
    async submitForm() {
      const sysRole = {
        roleName: this.form.roleName,
        remark: this.form.remark,
        menuIds: this.form.checkedKeys
      }
      this.dialog.loading = true
      if (this.dialog.title === '新增') {
        await request.post('/sys/role', sysRole)
      } else {
        sysRole.roleId = this.form.roleId
        await request.put('/sys/role', sysRole)
      }
      this.dialog.loading = false
      this.dialog.visible = false
      this.$store.dispatch('system/roles')
    },
    async modify(row) {
      const result = await request.get('/sys/role/menus', {
        params: { id: row.roleId }
      })
      this.form.checkedKeys = result.menus
      this.form.roleName = row.roleName
      this.form.remark = row.remark
      this.form.roleId = row.roleId
      this.dialog.visible = true
    },
    async del(row) {
      await this.$confirm(`确定删除[id=${row.roleId}]角色?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      await request.delete('sys/role', { params: { id: row.roleId } })
      this.$message('删除成功！')
      this.$store.dispatch('system/roles')
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
