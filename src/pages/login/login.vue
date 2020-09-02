<template>
  <div class="wrap">
    <div class="box">
      <h3>登录</h3>
      <el-input v-model="users.username" placeholder="请输入账号" clearable></el-input>
      <el-input v-model="users.password" placeholder="请输入密码" clearable show-password></el-input>
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