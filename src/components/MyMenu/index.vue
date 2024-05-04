<template>
  <!-- <p>{{ menuList }}</p> -->

  <div @click.stop>
    <template v-for="item in menuList" :key="item.path">
      <!-- 这里也想提问 -->
      <!-- 没有子路由 -->
      <template v-if="!item.children">
        <el-menu-item
          :index="item.path"
          v-if="!item.meta.hidden"
          @click="goRoute(item.name)"
        >
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <template #title>
            <span> {{ item.meta.title }} </span>
          </template>
        </el-menu-item>
      </template>

      <!-- 只有一个子路由 -->
      <template v-if="item.children && item.children.length == 1">
        <el-menu-item
          :index="item.children[0].path"
          v-if="!item.children[0].meta.hidden"
          @click="goRoute(item.children[0].name)"
        >
          <el-icon>
            <component :is="item.children[0].meta.icon"></component>
          </el-icon>
          <template #title>
            <span>
              {{ item.children[0].meta.title }}
            </span>
          </template>
        </el-menu-item>
      </template>

      <!-- 有子路由且大于一个 -->
      <el-sub-menu
        :index="item.path"
        v-if="item.children && item.children.length > 1"
        style="color: white"
        @click="goRoute(item.name)"
      >
        <template #title>
          <el-icon>
            <component :is="item.meta.icon"></component>
          </el-icon>
          <span v-show="!CollapseAll"> {{ item.meta.title }} </span>
          <!-- <span>{{ item.meta.title }}</span> -->
        </template>
        <MyMenu :menuList="item.children"></MyMenu>
        <!-- Q2跳转问题 -->
      </el-sub-menu>
    </template>
  </div>
</template>

<script setup lang="ts">
import useLayoutSettingStore from "@/store/modules/setting";

// import { Menu } from "@element-plus/icons-vue";

defineProps(["menuList"]);
defineOptions({ name: "Menu" });
const { CollapseAll } = storeToRefs(useLayoutSettingStore());

//获取路由器对象
const $router = useRouter();
//点击菜单的回调
const goRoute = (name: string) => {
  //路由跳转
  // console.log(name);
  $router.push({ name: name });
};
</script>
