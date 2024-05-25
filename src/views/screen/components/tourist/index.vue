<script lang="ts" setup>
import * as echarts from 'echarts'
import 'echarts-liquidfill'

const people = ref('216908人')

const charts = ref()
onMounted(() => {
  const mycharts = echarts.init(charts.value)
  // 设置实例配置项
  mycharts.setOption({
    title: { text: '水球图' },
    xAxis: {},
    yAxis: {},
    series: [{
      type: 'liquidFill',
      data: [0.6, 0.5, 0.4, 0.3],
      itemStyle: {
        shadowBlur: 0,
      },
      outline: {
        borderDistance: 0,
        itemStyle: {
          borderWidth: 5,
          borderColor: '#156ACF',
          shadowBlur: 20,
          shadowColor: 'rgba(255, 0, 0, 1)',
        },
      },
    }],
    grid: {
      left: 0,
      right: 0,
      top: 0,
      bottom: 0,

    },
  })
})
</script>

<template>
  <div class="box">
    <div class="top">
      <p class="title">
        实时游客统计
      </p>
      <p class="bg" />
      <p class="right">
        可预约总量 <span>99999</span>人
      </p>
    </div>
    <div class="number">
      <span v-for="(item, index) in people" :key="index">{{ item }}</span>
    </div>
    <div ref="charts" class="charts">
      123
    </div>
  </div>
</template>

<style lang="scss" scoped>
.box{
  background: url(../../images/dataScreen-main-lb.png) no-repeat;
  background-size: 100% 100%;
  margin-top: 10px;
  .top{
    margin-left: 20px;
    .title{
    color: white;
    font-size: 20px;
    }
    .bg{
      width: 68px;
      height: 7px;
      background: url(../../images/dataScreen-title.png) no-repeat;
      background-size: 100% 100%;
      margin-top: 10px;
    }
    .right{
      float: right;
      font-size: 20px;
      color: white ;
      .span{
        color: rgb(222, 238, 47);
      }
    }
  }
  .number{
    padding: 10px;
    margin-top: 30px;
    display: flex;
    span{
      height: 40px;
      flex: 1;
      text-align: center;
      line-height: 40px;
      background: url(../../images/total.png)no-repeat;
      background-size: 100% 100%;
      color: #29fcff;
   }
 }
 .charts{
  width: 100%;
  height: 290px;
 }
}
</style>
