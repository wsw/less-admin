<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button size="mini" type="primary" @click="add">新增</el-button>
    </div>
    <el-table
      :data="menus"
      style="width: 100%"
      row-key="menuId"
      border
      :tree-props="{ children: 'child' }"
    >
      <el-table-column
        class-name="text-left"
        prop="name"
        label="名称"
        width="200"
      >
      </el-table-column>
      <el-table-column align="center" width="100" prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag size="small" :type="scope.row.typeTag">{{
            scope.row.typeName
          }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" prop="icon" label="图标">
        <template slot-scope="scope">
          <icon-svg v-if="scope.row.icon" :name="scope.row.icon"></icon-svg>
        </template>
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="url"
        label="地址"
      >
      </el-table-column>
      <el-table-column
        show-overflow-tooltip
        align="center"
        prop="perms"
        label="权限标识"
      >
      </el-table-column>
      <el-table-column align="center" prop="orderNum" width="100" label="排序">
      </el-table-column>
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button size="small" type="text" @click="modify(scope.row)">
            修改
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
        <el-form-item label="类型">
          <el-radio v-model="form.type" :label="0">目录</el-radio>
          <el-radio v-model="form.type" :label="1">菜单</el-radio>
          <el-radio v-model="form.type" :label="2">按钮</el-radio>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '请输入菜单名' }]"
          prop="name"
          label="菜单名称"
        >
          <el-input v-model="form.name" placeholder="菜单名称"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.parentId"
            placeholder="选择上级菜单"
            :options="cascadeMenu"
            :props="{
              checkStrictly: true,
              value: 'menuId',
              emitPath: false,
              children: 'child',
              label: 'name'
            }"
            clearable
          ></el-cascader>
          <!--          <el-input v-model="form.parentId"></el-input>-->
        </el-form-item>
        <el-form-item v-show="form.type === 1" label="菜单路由">
          <el-input v-model="form.url" placeholder="菜单路由"></el-input>
        </el-form-item>
        <el-form-item v-show="form.type === 2" label="权限标识">
          <el-input v-model="form.perms" placeholder="权限标识"></el-input>
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="图标">
          <el-select filterable v-model="form.icon" placeholder="菜单图标">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
              <span style="float: right">{{ item }}</span>
              <icon-svg :name="item"></icon-svg>
            </el-option>
          </el-select>
          <!--          <el-input v-model="form.icon" placeholder="菜单图标"></el-input>-->
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="排序号">
          <el-input v-model="form.orderNum"></el-input>
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
import request from '@/common/request'
import { menusToTreeAll, menusToTree } from '@/common/utils'
const restForm = {
  menuId: '',
  parentId: 0,
  name: '',
  url: '',
  type: 1,
  icon: '',
  perms: '',
  orderNum: 0
}
export default {
  data() {
    return {
      form: { ...restForm },
      dialog: {
        visible: false,
        title: '',
        type: 0,
        loading: false
      }
    }
  },
  computed: {
    cascadeMenu() {
      return menusToTree(this.$store.state.system.menus)
    },
    menus() {
      return menusToTreeAll([...this.$store.state.system.menus])
    },
    iconList() {
      return this.icons
    }
  },
  async fetch({ store }) {
    await store.dispatch('system/menus')
  },
  methods: {
    modify(row) {
      this.dialog.type = 1
      this.dialog.title = '修改'
      this.form = { ...row }
      this.dialog.visible = true
    },
    async del(row) {
      await this.$confirm(`确定删除[id=${row.menuId}]菜单?`, '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消'
      })
      await request.delete('sys/menu', { params: { id: row.menuId } })
      this.$message('删除成功！')
      this.$store.dispatch('system/menus')
    },
    add() {
      this.dialog.type = 0
      this.dialog.title = '新增'
      this.form = { ...restForm }
      this.dialog.visible = true
    },
    async submitForm() {
      await this.$refs.form.validate()
      const sysMenu = {
        name: this.form.name,
        icon: this.form.icon,
        type: this.form.type,
        url: this.form.url,
        perms: this.form.perms,
        orderNum: this.form.orderNum,
        parentId: this.form.parentId
      }
      this.dialog.loading = true
      if (this.dialog.type === 1) {
        sysMenu.menuId = this.form.menuId
        await request.put('/sys/menu', sysMenu)
      } else {
        await request.post('/sys/menu', sysMenu)
      }
      this.dialog.visible = false
      this.dialog.loading = false
      this.$store.dispatch('system/menus')
    }
  }
}
</script>

<style scoped></style>
