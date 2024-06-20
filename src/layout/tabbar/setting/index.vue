<script lang="ts" setup>
import {
  ArrowDown,
  FullScreen,
  Moon,
  Refresh,
  Setting,
  Sunny,
} from '@element-plus/icons-vue'

import useLayoutSettingStore from '@/store/modules/setting'
import useUserStore from '@/store/modules/user'

defineOptions({ name: 'Setting' })

const LayoutSettingStore = useLayoutSettingStore()
const { userInfo, userLogout } = useUserStore()
const $router = useRouter()
// const $route = useRoute();
function updateRefresh() {
  LayoutSettingStore.Refresh = !LayoutSettingStore.Refresh
}
function FullScreenOperation() {
  //  Dom对象属性fullScreenElement用来判断当前是不是全屏模式
  const full = document.fullscreenElement
  if (!full) {
    // 文档根节点的方法requestFullscreen可以直接实现全屏模式
    document.documentElement.requestFullscreen()
  }
  else {
    // 退出全屏模式
    document.exitFullscreen()
  } // 浏览器兼容问题装插件解决
}
function Logout() {
  // 第一件事向服务器发请求【退出登录接口】现在项目没有这个接口
  // 仓库中关于用户的数据清空
  // 跳转到login
  userLogout()
  $router.push({ path: '/login' })
  // P49 logout再login要不要跳转回上次停留页面
}
const color = ref('rgba(255, 69, 0, 0.68)')
const predefineColors = ref([
  '#ff4500',
  '#ff8c00',
  '#ffd700',
  '#90ee90',
  '#00ced1',
  '#1e90ff',
  '#c71585',
  'rgba(255, 69, 0, 0.68)',
  'rgb(255, 120, 0)',
  'hsv(51, 100, 98)',
  'hsva(120, 40, 94, 0.5)',
  'hsl(181, 100%, 37%)',
  'hsla(209, 100%, 56%, 0.73)',
  '#c7158577',
])
const dark = ref(false)
function changeDark() {
  const html = document.documentElement
  dark.value ? html.className = 'dark' : html.className = ''
}
const visible = ref(false)
function setColor() {
  const el = document.documentElement
  el.style.setProperty('--el-color-primary', color.value)
}
</script>

<template>
  <el-button size="small" :icon="Refresh" circle @click="updateRefresh" />
  <el-button
    size="small"
    :icon="FullScreen"
    circle
    @click="FullScreenOperation"
  />
  <!-- <el-button size="small" :icon="Setting" circle /> -->
  <el-popover
    placement="bottom"
    title="主题设置"
    :width="300"
    :visible="visible"
  >
    <!-- 表单组件 -->
    <el-form>
      <el-form-item label="主题颜色">
        <el-color-picker v-model="color" show-alpha :predefine="predefineColors" @change="setColor" />
      </el-form-item>
      <el-form-item label="暗黑模式">
        <el-switch
          v-model="dark"
          style="margin-left: 24px"
          inline-prompt
          :active-icon="Moon"
          :inactive-icon="Sunny"
          @click.stop="changeDark"
        />
      </el-form-item>
    </el-form>
    <template #reference>
      <el-button size="small" :icon="Setting" circle @click="visible = !visible" />
    </template>
  </el-popover>
  <img
    :src="userInfo.avatar"
    style="width: 24px; height: 24px; border-radius: 50%; margin: 0px 15px"
  >
  <el-dropdown>
    <span class="el-dropdown-link">
      {{ userInfo.name }}
      <el-icon class="el-icon--right">
        <ArrowDown />
      </el-icon>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item @click="Logout">
          退出登录
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped></style>
