<template>
  <div>
    <el-button @click="add">添加</el-button>
    <v-add :info="info" ref="look"></v-add>
    <v-list @edit="edit"></v-list>
  </div>
</template>
<script>
import vAdd from "./components/add";
import vList from "./components/list";
export default {
  components: {
    vAdd,
    vList,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "添加管理员",
        isAdd: true,
      },
    };
  },
  watch: {},
  methods: {
    add() {
      this.info = {
        isShow: true,
        title: "添加管理员",
        isAdd: true,
      };
    },
    edit(id) {
      this.info = {
        isShow: true,
        title: "修改管理员",
        isAdd: false,
      };
      this.$refs.look.look(id);
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