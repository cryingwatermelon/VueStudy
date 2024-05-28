<script lang="ts" setup>
import * as echarts from 'echarts'

const charts = ref()
onMounted(() => {
  const mychart = echarts.init(charts.value)
  const option = {
    title:
    { text: '游客消费统计', textStyle: {
      color: 'white',
    } },
    radar: {
      indicator: [
        { name: '消费', max: 6500 },
        { name: '好感', max: 16500 },
        { name: '出行', max: 2500 },
        { name: '小吃', max: 3000 },
        { name: '爱好', max: 50000 },
        { name: '景点', max: 1500 },
      ],
    },
    series: [
      {
        name: 'Budget vs Spending',
        type: 'radar',
        data: [
          {
            value: [4200, 3000, 10000, 7000, 1000, 6600],
            name: 'shopping',
          },
          {
            value: [3000, 4000, 10000, 7000, 2000, 3000],
            name: 'foods',
          },
        ],
      },
    ],
  }

  mychart.setOption(option)
})
</script>

<template>
  <div class="box8">
    <div class="title">
      <p>
        数据统计
      </p>
      <img src="../../images/dataScreen-title.png" alt="">
    </div>
    <div ref="charts" class="charts" />
  </div>
</template>

<style lang="scss" scoped>
.box8{
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
