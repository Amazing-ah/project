<template>
  <div class="wrap">
    <div class="box">
      <h3>登录</h3>
      <el-form :model="users" :rules="rules">
        <el-form-item prop="username">
          <el-input v-model="users.username" placeholder="输入账号" clearable></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input v-model="users.password" placeholder="输入密码" clearable show-password></el-input>
        </el-form-item>
      </el-form>

      <el-button type="primary" @click="toLogin">登录</el-button>
    </div>
  </div>
</template>
<script>
import { reqAdminLogin } from "../../utils/request";
import { successAlert, failureAlert } from "../../utils/alert";
import { mapActions } from "vuex";

export default {
  data() {
    return {
      users: {
        username: "",
        password: "",
      },
      rules: {
        username: [
          { required: true, message: "请输入登录名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" },
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 2, max: 5, message: "长度在 2 到 5 个字符", trigger: "blur" },
        ],
      },
    };
  },
  watch: {},
  methods: {
    ...mapActions({
      changeInfoAction: "user/changeInfoAction",
    }),

    toLogin() {
      reqAdminLogin(this.users).then((res) => {
        if (res.data.code == 200) {
          successAlert(res.data.msg);
          this.changeInfoAction(res.data.list);
          this.$router.push("/");
        } else {
          failureAlert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.wrap {
  width: 100vw;
  height: 100vh;
  background: linear-gradient(to right, #543544, #2e3e5e);
  position: fixed;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

.box {
  width: 400px;
  height: 340px;
  background-color: #fff;
  padding: 20px;
  text-align: center;
}

.box h3 {
  font-size: 40px;
}
.el-input {
  margin: 15px 0;
}
</style>