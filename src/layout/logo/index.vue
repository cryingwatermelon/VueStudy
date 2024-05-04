<script setup lang="ts">
import setting from "@/setting";
defineOptions({ name: "Logo" });
</script>

<template>
  <div class="logo">
    <img :src="setting.logo" alt="" v-if="setting.logoHidden" />
    <p>{{ setting.title }}</p>
  </div>
</template>

<style scoped lang="scss">
.logo {
  width: 100%;
  height: $base-menu-logo-height;
  color: white;
  display: flex;
  align-items: center;
  padding: 10px;
  img {
    width: 40px;
    height: 40px;
  }
  p {
    font-size: $base-menu-tiitle-fontsize;
    margin-left: 10px;
  }
}
</style>
