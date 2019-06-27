<template>
  <el-card class="box-card">
    <div slot="header">
      <el-button type="primary" @click="add">新增</el-button>
    </div>
    <el-table
      :data="menus"
      style="width: 100%"
      row-key="menuId"
      border
      :tree-props="{ children: 'child' }"
    >
      <el-table-column prop="name" label="名称" width="200"> </el-table-column>
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
  </el-card>
</template>

<script>
export default {
  computed: {
    menus() {
      return this.$store.state.system.allMenus
    }
  },
  methods: {
    modify(row) {},
    del(row) {},
    add() {}
  }
}
</script>

<style scoped></style>
