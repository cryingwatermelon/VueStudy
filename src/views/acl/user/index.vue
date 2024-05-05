<script setup lang="ts">
import useUserStore from "@/store/modules/user";

const { userLogout } = useUserStore();
</script>

<template>
  <div>
    <h1>权限管理--user展示站位</h1>
    <el-button @click="userLogout">clear store</el-button>
  </div>
</template>

<style scoped lang="scss"></style>
