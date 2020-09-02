<template>
  <div class="add">
    <el-dialog
      :title="info.title"
      :visible.sync="info.isShow"
      width="60%"
      @close="close"
      @opened="creatEditor"
    >
      <el-form :model="form">
        <el-form-item label="一级分类" :label-width="width">
          <el-select v-model="form.first_cateid" placeholder="请选择活动区域" @change="changeFirstId">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in goodsList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" :label-width="width">
          <el-select v-model="form.second_cateid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in secondCateList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品名称" :label-width="width">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" :label-width="width">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" :label-width="width">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" :label-width="width" v-if="form.pid!=0">
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" :label-width="width">
          <el-select v-model="form.specsid" placeholder="请选择活动区域" @change="changeSpecId">
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option
              v-for="item in specsList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" :label-width="width">
          <el-select v-model="form.specsattr" placeholder="请选择活动区域" multiple>
            <el-option label="--请选择--" value disabled></el-option>
            <!-- 少一个动态的数据 -->
            <el-option v-for="item in attrList" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" :label-width="width">
          <el-radio :label="1" v-model="form.isnew">是</el-radio>
          <el-radio :label="2" v-model="form.isnew">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" :label-width="width">
          <el-radio :label="1" v-model="form.ishot">是</el-radio>
          <el-radio :label="2" v-model="form.ishot">否</el-radio>
        </el-form-item>
        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
        <el-form-item label="商品描述" :label-width="width">
          <!-- 富文本编辑器的节点 -->
          <div id="editor" v-if="info.isShow"></div>
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
import E from "wangeditor";

import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import {
  reqShangPinAdd,
  reqShangPinDetail,
  reqShangPinChange,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      width: "100px",

      //图片地址
      imgUrl: "",
      //二级分类列表
      secondCateList: [],
      //商品属性
      attrList: [],

      form: {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: "",
        isnew: 1,
        ishot: 1,
        status: 1,
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      //vuex取得商品分类列表
      goodsList: "goodsCate/list",
      //商品规格
      specsList: "standard/list",
      //商品列表
      list: "goodsManage/list",
    }),
  },
  methods: {
    ...mapActions({
      //属性列表
      reqGoodsList: "goodsCate/reqGoodsListAction",
      //规格列表
      reqSpecsList: "standard/reqSpecsListAction",
      //商品列表
      reqList: "goodsManage/reqShangPinListAction",
    }),

    //改变一级分类
    changeFirstId() {
      this.secondCateList = this.goodsList.find(
        (item) => item.id == this.form.first_cateid
      ).children;

      //二级分类重置
      this.form.second_cateid = "";
    },

    //商品规格
    changeSpecId() {
      //当商品规格变了，就计算一下商品属性要展示的数组列表
      this.attrList = this.specsList.find(
        (item) => item.id == this.form.specsid
      ).attrs;

      //选中的商品属性重置
      this.form.specsattr = [];
    },

    //重置form数据
    empty() {
      //二级分类的列表
      this.secondCateList = [];
      //规格属性的列表
      this.attrList = [];
      //图片临时地址
      this.imgUrl = "";

      //表单数据
      this.form = {
        first_cateid: "",
        second_cateid: "",
        goodsname: "",
        price: "",
        market_price: "",
        img: null,
        description: "",
        specsid: "",
        specsattr: [],
        isnew: 1,
        ishot: 1,
        status: 1,
      };
    },
    add() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();

      reqShangPinAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    look(id) {
      reqShangPinDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
        this.form.specsattr = this.form.specsattr.split(",");
        //二级分类
        this.secondCateList = this.goodsList.find(
          (item) => item.id == this.form.first_cateid
        ).children;
        //商品属性
        this.attrList = this.specsList.find(
          (item) => item.id == this.form.specsid
        ).attrs;
      });
    },
    cancel() {
      this.$emit("hide");
    },
    close() {
      !this.info.isAdd && this.empty();
    },
    change() {
      //取出富文本编辑器的内容，赋值给form的description
      this.form.description = this.editor.txt.html();

      reqShangPinChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("更新成功");
          this.$emit("hide");
          this.empty();
          this.reqList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    creatEditor() {
      this.editor = new E("#editor");
      this.editor.create();
      //给富文本编辑器赋值
      this.editor.txt.html(this.form.description);
    },
    selectImg(e) {
      var file = e.target.files[0];

      //判断文件格式是否正确
      if (file.size > 2 * 1024 * 1024) {
        failureAlert("文件大小不能超过2M");
        return;
      }

      let type = [".jpg", ".jpeg", ".png", ".gif"];
      var extname = file.name.slice(file.name.indexOf("."));
      if (!type.includes(extname)) {
        failureAlert("格式不正确");
        return;
      }

      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
  },
  mounted() {
    if (this.goodsList.length == 0) {
      this.reqGoodsList();
    }
    this.reqSpecsList(true);
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