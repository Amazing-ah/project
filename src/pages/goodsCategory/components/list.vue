<template>
  <div>
    <el-table
      :data="list"
      style="width: 90%;margin:10px auto;margin-bottom: 20px;"
      row-key="id"
      border
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
    >
      <el-table-column prop="id" label="分类编号" sortable width="180"></el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180"></el-table-column>
      <el-table-column label="图片">
        <template slot-scope="scope">
          <img :src="$preImg+scope.row.img" alt />
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import { reqGoodsDel } from "../../../utils/request";
export default {
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters({
      list: "goodsCate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqGoodsList: "goodsCate/reqGoodsListAction",
    }),
    edit(id) {
      this.$emit("emit", id);
    },
    del(id) {
      reqGoodsDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqGoodsList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqGoodsList();
  },
};
</script>
<style scoped>
</style>