<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%;margin-bottom: 20px;"
      row-key="id"
      border
      default-expand-all
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="菜单标号" sortable width="180"></el-table-column>
      <el-table-column prop="title" label="菜单名称" sortable width="180"></el-table-column>
      <el-table-column label="菜单图标">
        <template slot-scope="scope">
          <i :class="scope.row.icon"></i>
        </template>
      </el-table-column>

      <el-table-column prop="url" label="地址"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMenuDel } from "../../../utils/request";
import { successAlert, failureAlert } from "../../../utils/alert";

export default {
  computed: {
    ...mapGetters({
      list: "menu/list",
    }),
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    ...mapActions({
      reqList: "menu/reqListAction",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "删除",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //点击了确定，发起删除请求
          reqMenuDel({ id: id }).then((res) => {
            if (res.data.code == 200) {
              successAlert("删除成功");
              this.reqList();
            } else {
              failureAlert(res.data.msg);
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },
  mounted() {
    // 一进来就发请求
    this.reqList();
  },
};
</script>
<style scoped>
</style>