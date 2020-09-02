<template>
  <div>
    <el-container class="wrap">
      <el-aside width="200px">
        <el-menu
          router
          default-active="/"
          class="el-menu-vertical-demo"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
        >
          <!-- 首页 -->

          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <div v-for="item in info.menus" :key="item.id">
            <el-submenu v-if="item.children" :index="item.id+''">
              <template slot="title">
                <i :class="item.icon"></i>
                <span>{{item.title}}</span>
              </template>
              <el-menu-item-group>
                <el-menu-item :index="i.url" v-for="i in item.children" :key="i.id">{{i.title}}</el-menu-item>
              </el-menu-item-group>
            </el-submenu>

            <el-menu-item v-else :index="item.url">{{item.title}}</el-menu-item>
          </div>

          <!-- 商城管理 -->

          <!-- <el-submenu index="3"> -->
          <!-- <template slot="title">
                <i class="el-icon-location"></i>
                <span>商城管理</span>
          </template>-->
          <!-- <el-menu-item-group>
          <el-menu-item index="/goodsCategory">商品分类</el-menu-item>-->
          <!-- <el-menu-item index="/goodsStandard">商品规格</el-menu-item>
                <el-menu-item index="/goodsManage">商品管理</el-menu-item>
                <el-menu-item index="/members">会员管理</el-menu-item>
                <el-menu-item index="/carousel">轮播图管理</el-menu-item>
          <el-menu-item index="/secKill">秒杀活动</el-menu-item>-->
          <!-- </el-menu-item-group>
          </el-submenu>-->
          <!-- </div> -->

          <!-- 系统设置 -->
        </el-menu>
      </el-aside>

      <el-container>
        <el-header>
          <i>{{info.username}}</i>
          <el-button type="primary" @click="out">退出</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑 -->
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>{{$route.name}}</el-breadcrumb-item>
          </el-breadcrumb>
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {};
  },
  watch: {},
  computed: {
    ...mapGetters({
      info: "user/info",
    }),
  },
  methods: {
    ...mapActions({
      changeInfoAction: "user/changeInfoAction",
    }),
    out() {
      this.changeInfoAction({});
      this.$router.push("/login");
    },
  },
  mounted() {
    console.log(this.info.menus);
  },
};
</script>
<style scoped>
.wrap {
  height: 100vh;
}
.el-aside {
  background-color: #20222a;
}
.el-header {
  background-color: #b2c0d0;
  display: flex;
  justify-content: flex-end;
  align-items: center;
}
.el-header .el-button {
  margin: 0 20px;
}
</style>