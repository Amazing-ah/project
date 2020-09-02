<template>
  <div>
    <el-button type="primary" @click="addList">添加</el-button>
    <v-add :info="info" @hide="hide" ref="add"></v-add>
    <v-list @emit="emit($event)"></v-list>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";

export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: { isShow: false, title: "添加菜单", isAdd: true },
    };
  },
  watch: {},
  methods: {
    addList() {
      this.info = {
        isShow: true,
        title: "添加菜单",
        isAdd: true,
      };
    },
    hide() {
      this.info.isShow = false;
    },
    emit(id) {
      this.info = {
        isShow: true,
        title: "修改菜单",
        isAdd: false,
      };
      // 父组件调用自组件的方法
      this.$refs.add.look(id);
    },
  },
  mounted() {},
  beforeDestroy() {},
};
</script>
<style scoped>
.el-button {
  margin: 15px 0;
}
</style>