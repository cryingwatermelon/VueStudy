<script setup lang="ts">
import Age from './components/age/index.vue'
import Couter from './components/couter/index.vue'
import Line from './components/line/index.vue'
import Map from './components/map/index.vue'
import Rank from './components/rank/index.vue'
import Sex from './components/sex/index.vue'
import Top from './components/top/index.vue'
import Tourist from './components/tourist/index.vue'
import Year from './components/year/index.vue'

// 获取数据大屏展示内容盒子的DOM元素
const screen = ref()
onMounted(() => {
  screen.value.style.transform = `scale(${getScale()})translate(-50%,-50%)`
})
// 定义大屏锁放比例
// 计算缩放的比例
function getScale(w = 1920, h = 1080) {
  const ww = window.innerWidth / w
  const wh = window.innerHeight / h
  return ww < wh ? ww : wh
  // watch case1; ww<wh choose ww
  // watch  case2: ww>=wh choose wh
}
// 监听视口变化
window.onresize = () => {
  screen.value.style.transform = `scale(${getScale}) translate(-50%,-50%)`
}
</script>

<template>
  <div class="container">
    <div ref="screen" class="screen">
      <div class="top">
        <Top />
      </div>
      <div class="bottom">
        <div class="left">
          <Tourist class="Tourist" />
          <Sex class="Sex" />
          <Age class="Age" />
        </div>
        <div class="center">
          <!-- 飞行数据大屏 -->
          <Map class="map" />
          <Line class="line" />
        </div>
        <div class="right">
          <Rank class="rank" />
          <Couter class="couter" />
          <Year class="year" />
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container{
  width: 100vw;
  height: 100vh;
  background: url(./images/bg.png) no-repeat;
  background-size: 100% 100%;
  .screen{
    position: fixed;
    width: 1920px;
    height: 1080px;
    top: 50%;
    left:50%;
    transform-origin: left top;
    // transform: ;
  }
  .top{
    width: 100%;
    height: 40px;
  }
  .bottom{
    display: flex;
    .right{
      flex:1;
      // background-color: greenyellow;
    }
    .left{
      flex:1;
      display: flex;
      flex-direction:column;
      height: 1040px;
      .Tourist{
        flex: 1.5;
        // background-color: green;
      }
      .Sex{
        flex: 1;
        // background-color: skyblue;
      }
      .Age{
        flex: 1;
        // background-color: yellow;
      }
    }
    .center{
      flex:1.5;
      display: flex;
      flex-direction: column;
      .map{
        flex:3;
      }
      .line{
        flex:1;
      }

    }
    .right{
     flex:1;
     display: flex;
     flex-direction: column;
     margin-left: 40px;
     .rank{
      flex:1.5;
     }
     .year{
      flex:1;
      // background-color: aqua;
     }
     .couter{
      flex:1;
      // background-color: bisque;
     }
    }
  }

}
</style>
