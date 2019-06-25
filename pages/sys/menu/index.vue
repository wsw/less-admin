<template>
  <el-card class="box-card">
    <div slot="header" class="clearfix">
      <span>卡片名称</span>
      <el-button style="float: right; padding: 3px 0" type="text"
        >操作按钮</el-button
      >
    </div>
    <el-table
      :data="menus"
      style="width: 100%"
      row-key="menuId"
      border
      :tree-props="{ children: 'child' }"
    >
      <el-table-column prop="name" label="名称" width="180"> </el-table-column>
      <el-table-column align="center" prop="type" label="类型" width="180">
        <template slot-scope="scope">
          {{
            scope.row.type == 0 ? '目录' : scope.row.type == 1 ? '菜单' : '按钮'
          }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="icon" label="图标">
      </el-table-column>
      <el-table-column align="center" prop="url" label="地址">
      </el-table-column>
    </el-table>
  </el-card>
</template>

<script>
export default {
  computed: {
    menus() {
      return this.$store.state.system.allMenus
    }
  }
}
</script>

<style scoped></style>
