<template>
  <div class="echarts-content">
    <div id="main"></div>
  </div>
</template>

<script>
import { defineComponent } from 'vue'
import * as echarts from 'echarts'
import { getEchartsData } from '@/api/echarts'
export default defineComponent({
  mounted() {
    getEchartsData().then((res) => {
      this.drawEcharts(res.data)
    })
  },
  methods: {
    drawEcharts(row) {
      var myChart = echarts.init(document.getElementById('main'))
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts图表展示'
        },
        // 显示图表的列表
        legend: {
          top: 'bottom'
        },
        // 图表的工具箱
        toolbox: {
          show: true,
          feature: {
            mark: { show: true },
            dataView: { show: true, readOnly: false },
            restore: { show: true },
            saveAsImage: { show: true }
          }
        },
        tooltip: {},
        xAxis: {
          data: row.map((item) => item.x)
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'line',
            data: row.map((item) => item.val)
          },
          {
            name: 'Nightingale Chart',
            type: 'pie',
            radius: [50, 150],
            center: ['70%', '50%'],
            roseType: 'area',
            itemStyle: {
              borderRadius: 8
            },
            data: row.map((item, index) => {
              return {
                value: item.val,
                name: 'rose' + (index + 1)
              }
            })
          }
        ],
        serise: {}
      })
    }
    // 饼状图
  }
})
</script>

<style lang="scss" scoped>
.echarts-content {
  // position: relative;
  height: 100%;
  padding: 14px;
  #main {
    // float: left;
    // width: 500px;
    // height: 500px;
    height: 100%;
    background: #fff;
  }
}
</style>
