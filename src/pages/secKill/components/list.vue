<template>
  <div>
    <div>
      <el-table
        :data="list"
        style="width: 90%;margin:10px auto;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      >
        <el-table-column prop="title" label="名称" sortable width="180"></el-table-column>

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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";
import { reqSecKillDel } from "../../../utils/request";

export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "secKill/list",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "secKill/reqSecKillListAction",
    }),
    //点击了编辑按钮
    edit(id) {
      this.$emit("emit", id);
    },
    //删除
    del(id) {
      //点击了确定，发起删除请求
      reqSecKillDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    //一进来 走请求
    this.reqList();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>