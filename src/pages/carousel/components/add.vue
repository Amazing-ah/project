<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 图片 -->
        <el-form-item label="图片" :label-width="width">
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
        <el-button type="primary" v-if="info.isAdd" @click="add">添 加</el-button>
        <el-button type="primary" v-else @click="change">修 改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";

import {
  reqBannerAdd,
  reqBannerDetail,
  reqBannerChange,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      width: "100px",
      imgUrl: "",
      form: {
        title: "",
        img: "",
        status: 1,
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      list: "carousel/list",
    }),
  },
  methods: {
    ...mapActions({
      reqBannerList: "carousel/reqBannerListAction",
    }),

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
    add() {
      //   this.$emit("hide");
      reqBannerAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqBannerList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    cancel() {
      this.$emit("hide");
      this.empty();
    },
    empty() {
      this.form = {
        title: "",
        img: "",
        status: 1,
      };
      this.imgUrl = "";
    },
    look(id) {
      reqBannerDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$preImg + res.data.list.img;
      });
    },
    change() {
      reqBannerChange(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqBannerList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    this.reqBannerList();
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