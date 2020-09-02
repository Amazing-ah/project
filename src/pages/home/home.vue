<template>
  <div>
    <div id="main" class="box"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters({
      list: "goodsCate/list",
    }),
  },
  methods: {
    ...mapActions({
      reqGoodsList: "goodsCate/reqGoodsListAction",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById("main"));

          // 指定图表的配置项和数据
          var option = {
            title: {
              text: "商品分类概况",
            },
            tooltip: {},
            legend: {
              data: ["分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "分数数量",
                type: "line",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };

          // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },

  mounted() {
    this.reqGoodsList();
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 500px;
  border: 2px solid #cccccc;
  margin: 20px auto;
}
</style>