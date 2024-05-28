<script lang="ts" setup>
import * as echarts from 'echarts'

const charts = ref()
onMounted(() => {
  const mychart = echarts.init(charts.value)
  const option = {
    title:
    { text: '散点图', left: '40%', textStyle: {
      color: 'white',
    } },
    xAxis: {
      type: 'category',
      show: true,
    },
    yAxis: {

      show: false,
    },
    grid: {
      left: 20,
      right: 0,
      top: 20,
      bottom: 20,
    },
    series: {
      type: 'scatter',
      data: [33, 44, 55, 8, 88, 67, 87, 9, 10, 100, 12, 21, 34, 54, 56, 78, 93, 3, 2, 1],
      symbol: 'diamond',
      symbolSize: 16,
      label: {
        show: true,
        position: 'top',
        color: 'red',
      },
      itemStyle: {
        color: {
          type: 'linear',
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [{
            offset: 0,
            color: 'red',
          }, {
            offset: 1,
            color: 'blue',
          }],
          global: false,
        },
      },
    },

  }

  mychart.setOption(option)
})
</script>

<template>
  <div class="box7">
    <div class="title">
      <p>
        年度游客量对比
      </p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<style lang="scss" scoped>
.box7{
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png)no-repeat;
  background-size: 100% 100%;
  margin: 20px,20px;
  .title{
  margin-left: 5px;
  p{
    color: white;
    font-size: 20px;

  }
  }
  .charts{
    height: calc(100% - 30%);
  }
}
</style>
