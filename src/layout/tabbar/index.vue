<script setup lang="ts">
import Breadcrumb from "./breadcrumb/index.vue";
import Setting from "./setting/index.vue";
// import useLayoutSettingStore from "@/store/modules/setting";
defineOptions({ name: "Tabbar" });
</script>

<template>
  <div class="tabbar">
    <div class="tabbar_left">
      <Breadcrumb />
    </div>
    <div class="tabbar_right">
      <Setting />
    </div>
  </div>
</template>

<style scoped lang="scss">
.tabbar {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  // align-items: center;
  // background-image: linear-gradient(
  //   to right,
  //   rgb(255, 255, 255),
  //   rgb(0, 6, 2),
  //   rgb(255, 255, 255)
  // )
  // background-image: linear-gradient(to right, #fff, #cec9c9, #fff);
  // background-color: crimson;
  background-image: linear-gradient(
    to left,
    rgb(255, 255, 255) 25%,
    rgb(161, 198, 223) 50%,
    rgb(173, 220, 238) 75%,
    rgb(255, 255, 255)
  );
  .tabbar_left {
    display: flex;
    align-items: center;
    margin-left: 20px;
  }
  .tabbar_right {
    display: flex;
    // background-color: skyblue;
    align-items: center;
  }
}
</style>
