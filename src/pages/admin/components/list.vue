<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="用户编号" sortable width="180"></el-table-column>
      <el-table-column prop="username" label="用户名称" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="所属角色" sortable width="180"></el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <v-del @delete="del(scope.row.uid)"></v-del>
        </template>
      </el-table-column>
    </el-table>
    <!-- 一页条数， total 数据总和，  prev 上一页，pager当前页，next下一页-->
    <el-pagination
      :page-size="2"
      layout="prev, pager, next"
      :total="total"
      :current-page="page"
      @current-change="changeCurrentPage"
    ></el-pagination>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import { reqAdminDel } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({
      list: "admin/list",
      total: "admin/total",
      size: "admin/size",
      page: "admin/page",
    }),
  },
  data() {
    return {};
  },
  watch: {},
  methods: {
    ...mapActions({
      reqAdminList: "admin/reqAdminListAction",
      reqAdminTotal: "admin/reqAdminTotalAction",
      reqAdminPage: "admin/reqAdminPageAction",
    }),

    edit(id) {
      this.$emit("edit", id);
    },

    del(id) {
      reqAdminDel({ uid: id }).then((res) => {
        //点击了确定，发起删除请求
        if (res.data.code == 200) {
          successAlert("删除成功");

          //删除完成，重新取总数，page设置为1
          this.reqAdminTotal();
          this.reqAdminPage(1);
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    changeCurrentPage(p) {
      this.reqAdminPage(p);
    },
  },
  mounted() {
    this.reqAdminList();
    this.reqAdminTotal();
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>