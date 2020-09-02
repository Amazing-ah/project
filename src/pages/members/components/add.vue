<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form" label-width="80px">
        <el-form-item label="手机号">
          <el-input v-model="form.phone"></el-input>
        </el-form-item>

        <el-form-item label="昵称">
          <el-input v-model="form.nickname"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form.password"></el-input>
        </el-form-item>

        <el-form-item label="状态">
          <el-switch v-model="form.status" :active-value="1" :inactive-value="2"></el-switch>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>

        <el-button type="primary" @click="change">修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import { reqMemberDetails, reqMemberChange } from "../../../utils/request";
import { successAlert, failureAlert } from "../../../utils/alert";

export default {
  props: ["info"],
  data() {
    return {
      form: {
        uid: "",
        nickname: "",
        phone: "",
        password: "",
        status: 1,
      },
      empty() {
        this.form = {
          uid: "",
          nickname: "",
          phone: "",
          password: "",
          status: 1,
        };
      },
    };
  },
  watch: {},
  computed: {},
  methods: {
    ...mapActions({
      reqMembers: "members/reqMembersAction",
    }),
    look(id) {
      reqMemberDetails({ uid: id }).then((res) => {
        this.form = res.data.list;
      });
    },
    cancel() {
      this.info.isShow = false;
    },
    change() {
      reqMemberChange(this.form).then((res) => {
        if (res.data.code === 200) {
          successAlert(res.data.msg);
          this.cancel();
          this.empty();
          this.reqMembers();
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>