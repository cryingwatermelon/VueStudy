// axios 二次封装
import axios from 'axios'
import { ElMessage } from 'element-plus'

import useUserStore from '@/store/modules/user'

// 创建axios实例
const request = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 5000,
})

// 请求拦截器
request.interceptors.request.use((config) => {
  // 请求头里面添加token
  // if (localStorage.getItem("TOKEN"))
  //   config.headers["Token"] = localStorage.getItem("TOKEN");

  // let userStore = useUserStore();
  // console.log(userStore.token);
  const { token } = useUserStore()
  if (token)
    config.headers.Token = token
  // console.log(config);
  return config
})

// 响应拦截器
request.interceptors.response.use(
  (response) => {
    // console.log(response);
    if (response.data.code === 200) {
      return response.data
    }
    else if (response.data.code === 201) {
      ElMessage({
        type: 'error',
        message: '系统数据，不能删除',
      })
    }
    else {
      console.log(response.data)
      alert('error')
    }
    // 业务错误，抛回去给调用者处理
  },
  (error) => {
    // 处理网络错误
    let msg = '无网络'
    const status = error.response.status
    switch (status) {
      case 401:
        msg = 'token过期'
        break
      case 403:
        msg = '无权访问'
        break
      case 404:
        msg = '请求地址错误'
        break
      case 500:
        msg = '服务器出现问题'
        break
    }

    ElMessage({
      type: 'error',
      message: msg,
    })

    return Promise.reject(error)
  },
)

export default request
