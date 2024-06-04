<script setup lang="ts">
import { Lock, User } from '@element-plus/icons-vue'

// 引入用户相关
import type { FormRules } from 'element-plus'

import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const loading = ref(false)
const $router = useRouter()
const $route = useRoute()
const useStore = useUserStore()
const loginForm = reactive({ username: 'admin', password: '111111' })

interface RuleForm {
  username: string
  password: string
}

async function login() {
  loading.value = true
  // 这里还应该有一次校验
  // 通知仓库发登录请求
  // 请求成功 跳转到首页
  // 失败 弹出失败信息
  try {
    // 保证登录成功
    await useStore.userLogin(loginForm)
    // console.log("route", $route.query?.redirect);
    const target = ($route.query?.redirect as string) || '/'
    // console.log("target", target);
    // if (target) {
    //   $router.push(target);
    // } else {
    //   $router.push("/");
    // }

    $router.replace(target)
    ElNotification({
      type: 'success',
      message: '欢迎回来',
      title: getTime(),
    })
    loading.value = false
  }
  catch (error) {
    loading.value = false
    ElNotification({
      type: 'error',
      message: (error as Error).message,
    })
  }
}

// const rules:FormRules<RuleForm> = {
//   username: [
//     { required: true, message: "请输入有效用户名", trigger: "blur" },
//     { min: 3, max: 5, message: '用户名应该3-5位', trigger: 'blur' }, //trigger blur表示失去焦点时触发 change是改变触发
//   ],
//   password: [
//     { required: true, message: "请输入有效密码", trigger: "blur" },
//     { min: 6, message: '密码应当不少于六位', trigger: 'blur' },
//   ],
// }
// 自定义规则校验函数
function validatorUsername(rule: any, value: any, callback: any) {
  // rule是校验规则对象，value是表单元素文本内容
  // callback是一个函数，如果符合条件，通过callback放行，不符合则注入错误信息
  if (value.lenght <= 5)
    callback()
  else
    callback(new Error('账号长度不得小于五位'))
}

function validatorPassword(rule: any, value: any, callback: any) {
  if (value.lenght <= 6)
    callback()
  else
    callback(new Error('账号长度不得小于六位'))
}
const rules = {
  username: [{ trigger: 'change', validator: validatorUsername }],
  password: [{ trigger: 'change', validator: validatorPassword }],
}
</script>

<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0" />
      <!-- xs:extra small -->
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules">
          <h1>Hello</h1>
          <h2>欢迎来到硅谷甄选</h2>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              type="username"
            />
          </el-form-item>

          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              type="password"
              :prefix-icon="Lock"
              show-password
            />
          </el-form-item>

          <el-button
            :loading="loading"
            class="login_btn"
            type="primary"
            size="default"
            @click="login"
          >
            登录
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh; //viewport height
  background: url("@/assets/images/background.png") no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url("@/assets/images/login_form.png") no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      color: white;
      font-size: 20px;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
    }
  }
}
</style>
