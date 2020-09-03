<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close">
      <el-form :model="form" :rules="rules" ref="clearE">
        <el-form-item label="分类名称" :label-width="width" prop="specsname">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item
          :label-width="width"
          v-for="(item, index) in valueList"
          label="规格属性"
          :key="index"
          :prop="'valueList'+index+'.value'"
          :rules="{
      required: true, message: '规格属性不能为空', trigger: 'blur'
    }"
        >
          <el-row>
            <el-col :span="18">
              <el-input v-model="item.value" auto-complete="off"></el-input>
            </el-col>
            <el-col :span="4">
              <el-button type="primary" v-if="index==0" @click="addValue">新增规格属性</el-button>
              <el-button type="danger" v-else @click="delValue(index)">删除</el-button>
            </el-col>
          </el-row>
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
  reqSpecsAdd,
  reqSpecsDetail,
  reqSpecsChange,
} from "../../../utils/request";

export default {
  props: ["info"],
  data() {
    return {
      width: "100px",
      valueList: [
        {
          value: "",
        },
      ],
      form: {
        specsname: "",
        attrs: "",
        status: 1,
      },

      rules: {
        specsname: [
          { required: true, message: "请输入分类名称", trigger: "blur" },
        ],
        // value: [{ required: true, message: "请输入规格属性", trigger: "blur" }],
      },
    };
  },
  watch: {},
  computed: {
    ...mapGetters({
      list: "standard/list",
    }),
  },
  methods: {
    ...mapActions({
      reqSpecsList: "standard/reqSpecsListAction",
    }),
    empty() {
      (this.form = { specsname: "", attrs: "", status: 1 }),
        (this.valueList = [{ value: "" }]);
    },
    addValue() {
      this.valueList.push({ value: "" });
    },
    delValue(index) {
      this.valueList.splice(index, 1);
    },

    add() {
      // specsname: "",
      // attrs: "",
      if (this.form.specsname === "") {
        failureAlert("请输入分类名称");
        return;
      }
      if (this.form.attrs === "") {
        failureAlert("请输入规格属性");
        return;
      }
      this.form.attrs = JSON.stringify(
        this.valueList.map((item) => item.value)
      );
      reqSpecsAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqSpecsList();
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
    close() {
      !this.info.isAdd && this.empty();
      this.$refs.clearE.clearValidate();
    },

    look(id) {
      reqSpecsDetail({ id: id }).then((res) => {
        this.form = res.data.list[0];
        this.valueList = JSON.parse(this.form.attrs).map((item) => ({
          value: item,
        }));
      });
    },
    change() {
      this.form.attrs = JSON.stringify(
        this.valueList.map((item) => item.value)
      );
      reqSpecsChange(this.form).then((res) => {
        if (res.data.code == 200) {
          //添加成功
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          //重新获取list
          this.reqSpecsList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    // this.reqGoodsList();
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