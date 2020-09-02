<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="菜单名称" :label-width="width">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="上级菜单" :label-width="width">
          <el-select v-model="form.pid" placeholder="请选择活动区域" @change="changePid">
            <el-option label="顶级菜单" :value="0"></el-option>
            <!-- 动态数据 -->
            <el-option v-for="item in list" :key="item.id" :label="item.title" :value="item.id"></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单类型">
          <el-radio-group v-model="form.type" disabled>
            <el-radio :label="1">目录</el-radio>
            <el-radio :label="2">菜单</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="菜单图标" :label-width="width" v-if="form.type===1">
          <el-select v-model="form.icon" placeholder="请选择目录图标">
            <el-option value="el-icon-setting">
              <i class="el-icon-setting"></i>
            </el-option>
            <el-option value="el-icon-goods">
              <i class="el-icon-goods"></i>
            </el-option>
            <el-option value="el-icon-user">
              <i class="el-icon-user"></i>
            </el-option>
            <el-option value="el-icon-camera">
              <i class="el-icon-camera"></i>
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="菜单地址" :label-width="width" v-else>
          <el-select v-model="form.url" placeholder="请选择">
            <el-option
              v-for="item in indexRouters"
              :key="item.path"
              :label="item.name"
              :value="'/'+item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouters } from "../../../router";

import {
  reqAddMenu,
  reqMenuDetail,
  reqMenuUpdate,
} from "../../../utils/request";

import { successAlert, failureAlert } from "../../../utils/alert";

import { mapGetters, mapActions } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({ list: "menu/list" }),
  },
  data() {
    return {
      width: "180px",
      indexRouters: indexRouters,
      form: {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({ reqList: "menu/reqListAction" }),

    cancel() {
      this.$emit("hide");
    },
    changePid() {
      this.form.type = this.form.pid == 0 ? 1 : 2;
    },
    //重置form数据
    empty() {
      this.form = {
        pid: 0,
        title: "",
        icon: "",
        type: 1,
        url: "",
        status: 1,
      };
    },
    add() {
      console.log(this.form);
      reqAddMenu(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          // 重新获取list;
          this.reqList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    //查看一条数据
    look(id) {
      reqMenuDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        console.log(this.form.id);
      });
    },
    update() {
      reqMenuUpdate(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          //弹框消失
          this.$emit("hide");
          //数据重置
          this.empty();
          // 重新获取list;
          this.reqList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    close() {
      if (!this.info.isAdd) {
        this.empty();
      }
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
</style>