<template>
  <div>
    <el-button @click="add">添加</el-button>
    <v-add :info="info" @hide="hide" ref="look"></v-add>
    <v-list @emit="emit"></v-list>
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
        title: "轮播图添加",
        isAdd: true,
      },
    };
  },
  watch: {},
  methods: {
    add() {
      this.info = {
        isShow: true,
        title: "轮播图添加",
        isAdd: true,
      };
    },
    hide() {
      this.info.isShow = false;
    },

    emit(id) {
      this.info = {
        isShow: true,
        title: "修改轮播图",
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