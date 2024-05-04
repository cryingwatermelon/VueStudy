<script lang="ts" setup>
import { Expand, Fold, ArrowRight } from "@element-plus/icons-vue";
import useLayoutSettingStore from "@/store/modules/setting";

const LayoutSettingStore = useLayoutSettingStore();
// let CollapseAll = ref(false);

defineOptions({ name: "Breadcrumb" });

let $route = useRoute();
// const Handler = () => {
//   return $route.matched.filter((item) => item.meta.title);
// };

const Breadcrumb = computed(() =>
  $route.matched.filter((item) => item.meta.title)
);
</script>
<template>
  <!-- 左侧面包屑 -->
  <!-- 需要动态展示路由 -->
  <el-icon style="margin-right: 10px" @click="LayoutSettingStore.changeIcon">
    <!-- <Expand /> -->
    <component :is="LayoutSettingStore.CollapseAll ? Fold : Expand"></component>
  </el-icon>
  <!-- <el-button @click="Handler">test</el-button> -->
  <!-- <el-breadcrumb separator="/"> -->
  <el-breadcrumb :separator-icon="ArrowRight">
    <!-- <el-breadcrumb-item :to="{ path: '/' }">权限管理</el-breadcrumb-item>
    <el-breadcrumb-item>
      <a href="/">用户管理</a>
    </el-breadcrumb-item> -->
    <el-breadcrumb-item
      v-for="(item, index) in Breadcrumb"
      :key="index"
      :to="item.path"
    >
      <div style="display: flex; align-items: center; gap: 4px">
        <el-icon>
          <component :is="item.meta.icon"></component>
        </el-icon>
        <span>{{ item.meta.title }}</span>
      </div>

      <!-- <el-button @click="Handler"></el-button> -->
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped></style>
