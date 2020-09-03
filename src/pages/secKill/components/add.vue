<template>
  <div class="add">
    <el-dialog :title="info.title" :visible.sync="info.isShow" width="60%" @close="close">
      <el-form :model="form" :rules="rules" ref="clearE">
        <el-form-item label="活动名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="活动期限" :label-width="width">
          <el-date-picker
            v-model="time"
            value-format="timestamp"
            type="datetimerange"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :default-time="['12:00:00']"
          ></el-date-picker>
        </el-form-item>

        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域" @change="changeFirstId">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态的数据 -->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域" @change="changeSecondId">
            <el-option label="--请选择--" value disabled></el-option>

            <!-- 动态的数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品" :label-width="width">
          <el-select v-model="form.goodsid" placeholder="请选择">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 动态的数据 -->
            <el-option
              v-for="item in attrList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添 加</el-button>
        <el-button type="primary" @click="change" v-else>修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import {
  reqSecKillAdd,
  reqSecKillDetail,
  reqSecKillChange,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      width: "100px",

      //二级分类列表
      secondCateList: [],
      //商品
      attrList: [],
      //事件
      time: [],
      form: {
        title: "",
        first_cateid: "",
        second_cateid: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      },
      rules: {
        roleid: [
          { required: true, message: "请选择所属角色", trigger: "change" },
        ],
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      //vuex取得商品分类列表
      goodsList: "goodsCate/list",
      // //商品列表
      shangPinList: "goodsManage/list",
    }),
  },
  methods: {
    ...mapActions({
      //商品分类列表
      reqGoodsList: "goodsCate/reqGoodsListAction",
      // 商品列表
      reqShangPinList: "goodsManage/reqShangPinListAction",
      reqSecKillList: "secKill/reqSecKillListAction",
    }),

    //改变一级分类
    changeFirstId() {
      this.secondCateList = this.goodsList.find(
        (item) => item.id == this.form.first_cateid
      ).children;
      //二级分类重置
      this.form.second_cateid = "";

      //商品重制
      this.form.goodsid = "";
    },

    //商品规格
    changeSecondId() {
      this.attrList = this.shangPinList.filter(
        (item) =>
          item.first_cateid == this.form.first_cateid &&
          item.second_cateid == this.form.second_cateid
      );
      this.form.goodsid = "";
    },

    //重置form数据
    empty() {
      //二级分类的列表
      this.secondCateList = [];
      //规格属性的列表
      this.attrList = [];

      //表单数据
      this.form = {
        title: "",
        first_cateid: "",
        second_cateid: "",
        begintime: "",
        endtime: "",
        goodsid: "",
        status: 1,
      };
    },
    add() {
      reqSecKillAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqSecKillList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    look(id) {
      reqSecKillDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.time.push(res.data.list.begintime);
        this.time.push(res.data.list.endtime);
        // this.form.specsattr = this.form.specsattr.split(",");
        // //二级分类
        this.secondCateList = this.goodsList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        // //商品属性
        this.attrList = this.shangPinList.filter(
          (item) =>
            item.first_cateid == this.form.first_cateid &&
            item.second_cateid == this.form.second_cateid
        );
      });
    },
    cancel() {
      this.$emit("hide");
      this.$refs.clearE.clearValidate();
    },
    close() {
      !this.info.isAdd && this.empty();
      this.$refs.clearE.clearValidate();
    },
    change() {
      reqSecKillChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.$emit("hide");
          this.empty();
          this.reqSecKillList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.goodsList.length == 0) {
      this.reqGoodsList();
    }
    this.reqShangPinList(true);
  },
};
</script>
<style scoped>
.upload-box {
  width: 150px;
  height: 150px;
  border: 1px dashed #cccccc;
  position: relative;
}
.upload-add {
  width: 150px;
  height: 150px;
  text-align: center;
  line-height: 150px;
  font-size: 40px;
  color: #666;
  font-weight: 400;
}
.upload-img {
  width: 100%;
  height: 100%;
  position: absolute;
  left: 0;
  top: 0;
}
.upload-file {
  width: 150px;
  height: 150px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
}
</style>