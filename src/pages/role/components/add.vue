<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @close="close">
      <el-form :model="form">
        <el-form-item label="角色名称" :label-width="width">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="角色权限" :label-width="width">
          <el-tree :data="menuList" show-checkbox node-key="id" :props="defaultProps" ref="tree"></el-tree>
        </el-form-item>

        <el-form-item label="状态" :label-width="width">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.isAdd">添加</el-button>
        <el-button type="primary" v-else @click="changeRole">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqRoleAdd,
  reqRoleDetail,
  reqRoleChange,
} from "../../../utils/request";

import { mapGetters, mapActions } from "vuex";
import { successAlert, failureAlert } from "../../../utils/alert";
export default {
  computed: {
    ...mapGetters({
      menuList: "menu/list",
    }),
  },
  props: ["info"],
  data() {
    return {
      width: "100px",
      form: {
        rolename: "",
        menus: [],
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
    close() {
      !this.info.isAdd && this.empty();
    },
    cancel() {
      this.info.isShow = false;
      this.empty();
    },
    ...mapActions({
      reqMenuList: "menu/reqListAction",
      reqRoleList: "role/reqRoleListAction",
    }),
    empty() {
      (this.form = {
        rolename: "",
        menus: [],
        status: 1,
      }),
        this.$refs.tree.setCheckedKeys([]);
    },
    add() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqRoleList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
    look(id) {
      reqRoleDetail({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(res.data.list.menus));
      });
    },
    changeRole() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqRoleChange(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqRoleList();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {
    if (this.menuList.length == 0) {
      this.reqMenuList();
    }
  },
  beforeDestroy() {},
};
</script>
<style scoped>
</style>