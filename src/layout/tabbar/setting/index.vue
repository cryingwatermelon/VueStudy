<script lang="ts" setup>
import {
  FullScreen,
  Refresh,
  Setting,
  ArrowDown,
} from "@element-plus/icons-vue";
defineOptions({ name: "Setting" });
import useLayoutSettingStore from "@/store/modules/setting";
import useUserStore from "@/store/modules/user";

const LayoutSettingStore = useLayoutSettingStore();
const { userInfo, userLogout } = useUserStore();
const $router = useRouter();
// const $route = useRoute();
const updateRefresh = () => {
  LayoutSettingStore.Refresh = !LayoutSettingStore.Refresh;
};
const FullScreenOperation = () => {
  //  Dom对象属性fullScreenElement用来判断当前是不是全屏模式
  let full = document.fullscreenElement;
  if (!full) {
    //文档根节点的方法requestFullscreen可以直接实现全屏模式
    document.documentElement.requestFullscreen();
  } else {
    //退出全屏模式
    document.exitFullscreen();
  } //浏览器兼容问题装插件解决
};
const Logout = () => {
  //第一件事向服务器发请求【退出登录接口】现在项目没有这个接口
  //仓库中关于用户的数据清空
  //跳转到login
  userLogout();
  $router.push({ path: "/login" });
  //P49 logout再login要不要跳转回上次停留页面
};
</script>

<template>
  <el-button size="small" :icon="Refresh" circle @click="updateRefresh">
  </el-button>
  <el-button
    size="small"
    :icon="FullScreen"
    circle
    @click="FullScreenOperation"
  >
  </el-button>
  <el-button size="small" :icon="Setting" circle> </el-button>
  <img
    :src="userInfo.avatar"
    style="width: 24px; height: 24px; border-radius: 50%; margin: 0px 15px"
  />
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userInfo.name }}
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="Logout">退出登录</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
