<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button @click="add" size="mini" type="primary">
        新增
      </el-button>
    </div>
    <el-table
      :data="menus"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
      style="width: 100%"
      row-key="menuId"
      default-expand-all
      border
    >
      <el-table-column class-name="text-left" prop="name" label="名称" width="200" />
      <el-table-column align="center" width="100" prop="type" label="类型">
        <template slot-scope="scope">
          <el-tag
            :type="scope.row.type === 1
              ? 'success' : (scope.row.type === 2 ? 'info': '') "
            size="small"
          >
            {{ typeTag[scope.row.type] }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" width="100" prop="icon" label="图标">
        <template slot-scope="scope">
          <icon-svg v-if="scope.row.icon" :name="scope.row.icon" />
        </template>
      </el-table-column>
      <el-table-column show-overflow-tooltip align="center" prop="url" label="地址" />
      <el-table-column show-overflow-tooltip align="center" prop="perms" label="权限标识" />
      <el-table-column align="center" prop="orderNum" width="100" label="排序" />
      <el-table-column align="center" label="操作">
        <template slot-scope="scope">
          <el-button @click="modify(scope.row)" size="small" type="text">
            修改
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
        <el-form-item label="类型">
          <el-radio
            v-for="(tag, i) in typeTag"
            v-model="form.type"
            :label="i"
            :key="tag"
          >
            {{ tag }}
          </el-radio>
        </el-form-item>
        <el-form-item
          :rules="[{ required: true, message: '请输入菜单名' }]"
          prop="name"
          label="菜单名称"
        >
          <el-input v-model="form.name" placeholder="菜单名称" />
        </el-form-item>
        <el-form-item label="上级菜单">
          <el-cascader
            v-model="form.parentId"
            :options="menus"
            :props="{
              checkStrictly: true,
              value: 'menuId',
              emitPath: false,
              children: 'children',
              label: 'name'
            }"
            placeholder="选择上级菜单"
            clearable
          />
          <!--          <el-input v-model="form.parentId"></el-input>-->
        </el-form-item>
        <el-form-item v-show="form.type === 1" label="菜单路由">
          <el-input v-model="form.url" placeholder="菜单路由" />
        </el-form-item>
        <el-form-item v-show="form.type === 2" label="权限标识">
          <el-input v-model="form.perms" placeholder="权限标识" />
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="图标">
          <el-select v-model="form.icon" filterable placeholder="菜单图标">
            <el-option
              v-for="item in iconList"
              :key="item"
              :label="item"
              :value="item"
            >
              <span style="float: right">{{ item }}</span>
              <icon-svg :name="item" />
            </el-option>
          </el-select>
          <!--          <el-input v-model="form.icon" placeholder="菜单图标"></el-input>-->
        </el-form-item>
        <el-form-item v-show="form.type !== 2" label="排序号">
          <el-input v-model="form.orderNum" />
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
const TypeTag = ['目录', '菜单', '按钮']
export default {
  data () {
    return {
      form: { ...restForm },
      dialog: {
        visible: false,
        title: '',
        type: 0,
        loading: false
      },
      typeTag: TypeTag
    }
  },
  computed: {
    menus () {
      return this.$store.state.menu && this.$store.state.menu.authorizeMenus()
    },
    iconList () {
      return this.icons
    }
  },
  methods: {
    modify (row) {
      this.dialog.type = 1
      this.dialog.title = '修改'
      this.form = { ...row }
      this.dialog.visible = true
    },
    async del (row) {
      try {
        await this.$confirm(`确定删除[id=${row.menuId}]菜单?`, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        })
        await this.$axios.delete('sys/menu', { params: { id: row.menuId } })
        this.$message('删除成功！')
        await this.$store.dispatch('menus')
      } catch (e) {}
    },
    add () {
      this.dialog.type = 0
      this.dialog.title = '新增'
      this.form = { ...restForm }
      this.dialog.visible = true
    },
    async submitForm () {
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
        await this.$axios.put('/sys/menu', sysMenu)
      } else {
        await this.$axios.post('/sys/menu', sysMenu)
      }
      this.dialog.visible = false
      this.dialog.loading = false
      await this.$store.dispatch('menus')
    }
  }
}
</script>

<style scoped></style>
