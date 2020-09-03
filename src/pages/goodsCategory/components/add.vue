<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close">
      <el-form :model="form" :rules="rules" ref="clearE">
        <el-form-item label="上级分类" :label-width="width" prop="pid">
          <el-select v-model="form.pid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option v-for="item in list" :key="item.id" :label="item.catename" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" :label-width="width" prop="catename">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" :label-width="width" v-if="form.pid!=0" prop="pic">
          <div class="upload-box">
            <h3 class="upload-add">+</h3>
            <img class="upload-img" v-if="imgUrl" :src="imgUrl" alt />
            <input class="upload-file" @change="selectImg" type="file" />
          </div>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" v-if="info.isAdd" @click="addList">添 加</el-button>
        <el-button type="primary" v-else @click="change">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import {
  reqGoodsAdd,
  reqGoodsDetail,
  reqGoodsChange,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      width: "100px",
      imgUrl: "",
      form: {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      },
      rules: {
        pid: [{ required: true, message: "请选择分类", trigger: "change" }],
        catename: [
          { required: true, message: "请选择分类名称", trigger: "blur" },
        ],
        pic: [{ required: true, message: "请选择分类名称", trigger: "change" }],
      },
    };
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
    close() {
      !this.info.isAdd && this.empty();
      this.$refs.clearE.clearValidate();
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
    addList() {
      //   this.$emit("hide");
      if (
        (this.form.pid === 0 && this.form.catename === "") ||
        (this.form.pid !== 0 && this.form.catename === "")
      ) {
        failureAlert("请输入分类名称");
        return;
      }
      if (this.form.pid !== 0 && this.form.img === "") {
        failureAlert("请添加图片");
        return;
      }

      reqGoodsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqGoodsList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.$emit("hide");
      this.empty();
      this.$refs.clearE.clearValidate();
    },
    empty() {
      this.form = {
        pid: 0,
        catename: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    look(id) {
      reqGoodsDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
      });
    },
    change() {
      if (
        (this.form.pid === 0 && this.form.catename === "") ||
        (this.form.pid !== 0 && this.form.catename === "")
      ) {
        failureAlert("请输入分类名称");
        return;
      }
      if (this.form.pid !== 0 && this.form.img === "") {
        failureAlert("请添加图片");
        return;
      }
      reqGoodsChange(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
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