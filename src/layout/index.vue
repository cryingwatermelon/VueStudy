<script setup lang="ts">
import Logo from './logo/index.vue'
import Main from './main/index.vue'
import Tabbar from './tabbar/index.vue'

import { menuRoute } from '@/router/routes'
import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'
// 引入常量路由

// 最新的方法
defineOptions({ name: 'Layout' })

const { CollapseAll } = storeToRefs(useLayoutSettingStore())

const { getUserInfo } = useUserStore()

// 目前首页挂载完毕就发请求
onMounted(() => {
  getUserInfo()
})
</script>

<!-- 课里的方法 -->
<!-- <script lang="ts">
export default {
  name: "Layout3",
};
</script> -->

<!-- 最早的写法 -->
<!-- <script lang="ts">
import Logo from "./logo/index.vue";
import Tabbar from "./tabbar/index.vue";

import useUserStore from "@/store/modules/user";

export default {
  name: "Layout1",
  components: {
    Logo,
    Tabbar,
  },
  setup() {
    const UserStore = useUserStore();
    return {
      UserStore,
    };
  },
};
</script> -->

<template>
  <div class="layout_container">
    <!-- 左侧菜单 -->
    <div class="layout_slider" :class="{ CollapseAll }">
      <Logo />
      <!-- 展示菜单 -->
      <!-- 滚动组件：菜单 -->
      <el-menu
        :collapse="CollapseAll"
        background-color="#001529"
        text-color="white"
        mode="vertical"
      >
        <!-- 根据路由动态生成菜单 -->
        <MyMenu :menu-list="menuRoute" />
      </el-menu>
    </div>
    <!-- 顶部导航 -->
    <div class="layout_tabber" :class="{ CollapseAll }">
      <!-- <el-radio-group
        v-model="LayoutSettingStore.CollapseAll"
        style="margin-bottom: 20px"
      >
        <el-radio-button :value="false">expand</el-radio-button>
        <el-radio-button :value="true">collapse</el-radio-button>
      </el-radio-group> -->
      <Tabbar />
    </div>
    <!-- 内容展示区 -->
    <div class="layout_main" :class="{ CollapseAll }">
      <!-- <RouterView v-slot="{ Component, route }">
        <Transition name="fade-transform" mode="out-in">
          <component :is="Component" :key="route" />
        </Transition>
      </RouterView> -->
      <Main />
    </div>
  </div>
</template>

<style scoped lang="scss">
.layout_container {
  width: 100%;
  height: 100vh;

  .layout_slider {
    width: $base-menu-width;
    color: white;
    height: 100vh;
    background-color: $base-menu-background;
    transition: all 0.5s;

    // p {
    //   color: aliceblue;
    // }

    .scrollbar {
      width: 100%;
      height: calc(100vh - $base-menu-logo-height);
      .el-menu {
        border-right: none;
      }
    }
    // &.CollapseAll {
    //   width: $base-menu-collapse-width;
    // }
  }

  .layout_tabber {
    position: fixed;
    width: calc(100% - $base-menu-width);
    height: $base-tabber-height;
    // background-color: aquamarine;
    top: 0px;
    left: $base-menu-width;
    transition: all 0.5s;
    // left: calc(100% - $base-menu-collapse-width);
    &.CollapseAll {
      width: calc(100% - $base-menu-collapse-width);
      left: $base-menu-collapse-width;
    }
  }

  .layout_main {
    position: absolute;
    width: calc(100% - $base-menu-width);
    height: calc(100vh - $base-tabber-height);
    background-color: aliceblue;
    top: $base-tabber-height;
    left: $base-menu-width;
    padding: 20px;
    overflow: auto;
    transition: all 0.5s;
    &.CollapseAll {
      width: calc(100% - $base-menu-collapse-width);
      left: $base-menu-collapse-width;
    }
  }
}

.fade-transform-leave-active,
.fade-transform-enter-active {
  transition: all 0.5s;
}

.fade-transform-enter {
  transform: translateX(-30px);
  opacity: 0;
}

.fade-transform-leave-to {
  transform: translateX(30px);
  opacity: 0;
}

:deep(.el-menu--collapse .el-sub-menu) {
  .el-sub-menu__icon-arrow {
    display: none;
  }

  span {
    visibility: hidden;
  }
}
</style>
