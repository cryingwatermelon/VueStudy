<script lang="ts" setup>
import * as echarts from 'echarts'

import type { ECharts } from 'echarts'

const charts = ref()
onMounted(() => {
  const mychart = echarts.init(charts.value)
  const option = {
    tooltip: {
      trigger: 'item',
    },
    legend: {
      right: 30,
      top: 40,
      orient: 'vertical',
      textStyle: {
        color: 'white ',
        fontSize: 14,
      },
    },
    series: [
      {
        name: 'Access Form',
        type: 'pie',
        radius: ['40%', '70%'],
        avoidLabelOverlap: false,
        itemStyle: {
          borderRadius: 10,
          borderColor: '#fff',
          borderWidth: 2,
        },
        label: {
          show: true,
          position: 'inside',
        },
        labelLine: {
          show: false,
        },
        data: [
          { value: 1000, name: '测试' },
          { value: 724, name: '测试' },
          { value: 123, name: '测试' },
          { value: 250, name: '测试' },
          { value: 888, name: '测试' },
        ],
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,
    },

  }
  mychart.setOption(option)
})
// const myChart = echarts.init(document.getElementById('main'))
// myChart.setOption({

// })
</script>

<template>
  <div class="box2">
    <div class="title">
      <p>年龄比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<style lang="scss" scoped>
.box2{
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png)no-repeat;
  background-size: 100% 100%;
  .title{
    margin-left: 20px;
    p{
      color: white ;
      font-size: 20px;

    }
  }
  .charts{
    height: 260px;
  }
}
</style>
