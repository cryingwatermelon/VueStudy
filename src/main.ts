// import { createApp } from 'vue'
// import './style.css'
import 'virtual:svg-icons-register'
import '@/styles/index.scss'
import App from './App.vue'
import router from './router'
import pinia from './store'

import MyMenu from '@/components/MyMenu/index.vue'

import '@/router/permission'

import 'element-plus/theme-chalk/dark/css-vars.css'

const app = createApp(App)
// import SvgIcon from '@/components/SvgIcon/index.vue'
// app.component('SvgIcon',SvgIcon);

// test 假接口
// import axios from 'axios'
// axios({
//     url:'/api/user/login',
//     method:'post',
//     data:{
//         username:'admin',
//         password:'111111'
//     }
// })
// console.log(import.meta.env)

app.component('MyMenu', MyMenu)
app.use(pinia)
app.use(router)
// 引入路由鉴权文件
// import "./permission";

app.mount('#app')
