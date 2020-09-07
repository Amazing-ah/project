<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="规格编号" sortable width="180"></el-table-column>

      <el-table-column prop="specsname" label="规格名称" sortable width="180"></el-table-column>

      <el-table-column label="规格属性">
        <template slot-scope="scope">
          <el-tag type="success" v-for="item in scope.row.attrs" :key="item">{{item}}</el-tag>
        </template>
      </el-table-column>

      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <v-del @delete="del(scope.row.id)"></v-del>
        </template>
      </el-table-column>
    </el-table>

    <!-- 一页条数， total 数据总和，  prev 上一页，pager当前页，next下一页-->
    <el-pagination
      :page-size="size"
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

import { reqSpecsDel } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters({
      list: "standard/list",
      total: "standard/total",
      size: "standard/size",
      page: "standard/page",
    }),
  },
  methods: {
    ...mapActions({
      reqSpecsList: "standard/reqSpecsListAction",
      reqSpecsTotal: "standard/reqSpecsTotalAction",
      reqSpecsPage: "standard/reqSpecsPageAction",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqSpecsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");

          // this.reqSpecsPage();

          this.reqSpecsTotal();
          this.reqSpecsList();
          this.reqSpecsPage(1);
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    changeCurrentPage(p) {
      this.reqSpecsPage(p);
    },
  },
  mounted() {
    this.reqSpecsList();
    this.reqSpecsTotal();
    // this.reqSpecsPage();
  },
};
</script>
<style scoped>
</style>