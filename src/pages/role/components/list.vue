<template>
  <div>
    <el-table
      :data="roleList"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
    >
      <el-table-column prop="id" label="角色编号" sortable width="180"></el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180"></el-table-column>

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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import { reqRoleDel } from "../../../utils/request";
export default {
  computed: {
    ...mapGetters({ roleList: "role/list" }),
  },
  props: ["info"],
  data() {
    return {};
  },
  watch: {},
  methods: {
    ...mapActions({ reqRoleList: "role/reqRoleListAction" }),
    edit(id) {
      this.$emit("edit", id);
    },
    del(id) {
      reqRoleDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");

          this.reqRoleList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqRoleList();
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>