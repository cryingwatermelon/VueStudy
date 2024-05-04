<script lang="ts" setup>
import useLayoutSettingStore from "@/store/modules/setting";
const LayoutSettingStore = useLayoutSettingStore();
//控制当前组件是否需要销毁重建
let flag = ref(true);
//监听refresh时候发生变化
watch(
  () => LayoutSettingStore.Refresh,
  () => {
    flag.value = false;
    nextTick(() => {
      flag.value = true;
    });
  }
);
</script>

<template>
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <component :is="Component" v-if="flag" />
    </transition>
  </router-view>
</template>

<style lang="scss" scoped>
.fade-enter-from {
  opacity: 0;
  transform: scale(0);
}

.fade-enter-active {
  transition: all 0.3s;
}

.fade-enter-to {
  opacity: 1;
  transform: scale(1);
}
</style>
