<script lang="ts" setup>
import { Right } from '@element-plus/icons-vue'
import * as echarts from 'echarts'

const charts = ref()

onMounted(() => {
  const mycharts = echarts.init(charts.value)
  mycharts.setOption({
    title: {
      text: '男女比例',
      textStyle: {
        color: 'skyblue',
      },
      left: '40%',
    },
    xAxis: {
      show: false,
      min: 0,
      max: 100,
    },
    yAxis: {
      show: false,
      type: 'category',
    },
    series: [
      {
        type: 'bar',
        data: [58],
        barwidth: 10,
        z: 100,
        itemStyle: {
          color: 'skyblue',
          borderRadius: 20,
        },
      },
      {
        type: 'bar',
        data: [100],
        barwidth: 10,
        barGap: '-100%',
        itemStyle: {
          color: 'pink',
          borderRadius: 20,
        },
      },
    ],
    grid: {
      left: 0,
      right: 0,
      top: 20,
      bottom: 0,
    },
  })
})
</script>

<template>
  <div class="box">
    <div class="title ">
      <p>男女比例</p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div class="sex">
      <div class="man">
        <img src="../../images/man.png" alt="">
      </div>
      <div class="woman">
        <img src="../../images/woman.png" alt="">
      </div>
    </div>
    <div class="rate">
      <p>man58%</p>
      <p>woman42%</p>
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<style lang="scss" scoped>
.box{
  width: 100%;
  height: 100%;
  background: url(../../images/dataScreen-main-cb.png) no-repeat;
  background-size: 100% 100%;
  margin: 20px 0px;
  .title{
    font-size: 20px;
    p{
      color: white;
      font-size: 20px;
    }
  }
  .sex{
    display: flex;
    justify-content: center;

    .man{
      margin: 20px;
      display: flex;
      justify-content: center;
      width: 110px;
      height: 110px;
      background: url(../../images/man-bg.png)no-repeat;
      align-items: center;
    }
    .woman{
      margin: 20px;
      display: flex;
      justify-content: center;
      width: 110px;
      height: 110px;
      background: url(../../images/woman-bg.png)no-repeat;
      align-items: center;
    }
  }
  .rate{
    display: flex;
    justify-content:space-evenly;
    color: white;

  }
  .charts{
    height: 100px;
  }

}
</style>
