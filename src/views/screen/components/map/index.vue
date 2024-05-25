<script lang="ts" setup>
import { Bottom } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

import chinaJSON from './china.json'

const map = ref()
echarts.registerMap('china', chinaJSON as any)

onMounted(() => {
  const mychart = echarts.init(map.value)
  mychart.setOption({
    geo: {
      map: 'china',
      roam: true,
      left: 150,
      right: 150,
      zoom: 1.7,
      bottom: 0,
      label: {
        show: true,
        color: 'white',
        fontSize: 14,
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
        opacity: 0.8,
      },
      emphasis: {
        itemStyle: {
          color: 'red',
        },
        label: {
          fontSize: 40,
        },
      },
    },
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,

    },
    series: [
      {
        type: 'lines',
        data: [
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [119.306239, 26.085302], // 终点

            ],
            lineStyle: {
              color: 'orange',
              width: 5,
            },
          },
          {
            coords: [
              [116.405285, 39.904989], // 起点
              [114.298572, 30.584355], // 终点

            ],
            lineStyle: {
              color: 'yellow',
              width: 5,
            },
          },
        ],
        // 动画特效
        effect: {
          show: true,
          symbol: 'arrow',
          color: 'black',
          symbolSize: 10,
        },
      },

    ],
  })
})
</script>

<template>
  <div ref="map" class="box4">
    <!-- <div ref="map" class="fig" /> -->
  </div>
</template>

<style lang="scss" scoped>
.box4{
margin-top: 150px;
}
</style>
