<template>
  <div>
    <el-button @click="add">添加</el-button>
    <v-add :info="info" ref="lookDetails"></v-add>
    <v-list :info="info" @edit="edit"></v-list>
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
        title: "角色添加",
        isAdd: true,
      },
    };
  },
  watch: {},
  methods: {
    add() {
      this.info = {
        isShow: true,
        title: "角色添加",
        isAdd: true,
      };
    },
    edit(id) {
      this.info = {
        isShow: true,
        title: "角色修改",
        isAdd: false,
      };
      this.$refs.lookDetails.look(id);
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