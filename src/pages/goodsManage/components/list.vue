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
        <el-table-column prop="id" label="编号" sortable></el-table-column>
        <el-table-column prop="goodsname" label="名称" sortable width="180"></el-table-column>
        <el-table-column label="图片">
          <template slot-scope="scope">
            <img :src="$preImg+scope.row.img" alt />
          </template>
        </el-table-column>
        <el-table-column label="新品">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.isnew==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>
        <el-table-column label="热卖">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.ishot==1">是</el-button>
            <el-button type="danger" v-else>否</el-button>
          </template>
        </el-table-column>

        <el-table-column label="状态">
          <template slot-scope="scope">
            <el-button type="primary" v-if="scope.row.status==1">启用</el-button>
            <el-button type="info" v-else>禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200px">
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
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";
import { reqShangPinDel } from "../../../utils/request";

export default {
  components: {},
  computed: {
    ...mapGetters({
      list: "goodsManage/list",
      total: "goodsManage/total",
      size: "goodsManage/size",
      page: "goodsManage/page",
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqList: "goodsManage/reqShangPinListAction",
      reqShangPinTotal: "goodsManage/reqShangPinTotalAction",
      reqShangPinPage: "goodsManage/reqShangPinPageAction",
    }),
    //点击了编辑按钮
    edit(id) {
      this.$emit("emit", id);
    },
    //删除
    del(id) {
      //点击了确定，发起删除请求
      reqShangPinDel({ id: id }).then((res) => {
        if (res.data.code == 200) {
          successAlert("删除成功");
          this.reqList();
          this.reqShangPinTotal();
          this.reqShangPinPage(1);
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    changeCurrentPage(p) {
      this.reqShangPinPage(p);
    },
  },
  mounted() {
    //一进来 走请求
    this.reqList();

    this.reqShangPinTotal();
  },
};
</script>
<style scoped>
img {
  width: 80px;
  height: 80px;
}
</style>