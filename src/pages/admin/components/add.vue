<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="所属角色" :label-width="width">
          <el-select v-model="form.roleid">
            <el-option value label="--请选择--" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="用户名称" :label-width="width">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" :label-width="width">
          <el-input v-model="form.password" autocomplete="off"></el-input>
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
  reqAdminAdd,
  reqAdminDet,
  reqAdminChange,
} from "../../../utils/request";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      roleList: "role/list",
    }),
  },
  data() {
    return {
      width: "100px",
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      defaultProps: {
        children: "children",
        label: "title",
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      roleAction: "role/reqRoleListAction",
      adminListActio: "admin/reqAdminListAction",
      reqAdminTotal: "admin/reqAdminTotalAction",
    }),
    close() {
      !this.info.isAdd && this.empty();
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },

    add() {
      reqAdminAdd(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("添加成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.roleAction();
          this.reqAdminTotal();
          this.adminListActio();
        } else {
          warningAlert(res.data.msg);
        }
      });
    },

    look(id) {
      reqAdminDet({ uid: id }).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
      });
    },

    change() {
      reqAdminChange(this.form).then((res) => {
        if (res.data.code == 200) {
          successAlert("修改成功");
          //弹框消失
          this.cancel();
          //数据重置
          this.empty();
          //刷新角色列表的数据
          this.roleAction();
          this.adminListActio();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.roleList.length == 0) {
      this.roleAction();
    }
  },
};
</script>
<style scoped>
</style>