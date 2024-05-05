//创建用户相关的小仓库
import { defineStore } from "pinia";

//引入接口
import { reqlogin, reqUserInfo } from "@/api/user";
import type { LoginForm } from "@/api/user/type";

const useUserStore = defineStore(
  "User",
  () => {
    // const token = ref(localStorage.getItem("TOKEN") || "");
    const token = ref("");
    const isLogin = computed(() => !!token.value);

    const userInfo = reactive({
      name: "",
      avatar: "",
    });

    async function userLogin(data: LoginForm) {
      // console.log();
      let result = await reqlogin(data);

      // console.log(result);
      //登录成功200 登录失败201 要存储token
      if (result.code === 200) {
        token.value = result.data;
        //pinia存储数据用的是js对象
        // local store
        // localStorage.setItem("TOKEN", result.data);

        return "ok";
      } else {
        return Promise.reject(new Error(result.message));
      }
    }
    //获取用户信息的方法
    async function getUserInfo() {
      //获取用户信息进行存储
      const result = await reqUserInfo();
      // console.log(result);

      if (result.code == 200) {
        Object.assign(userInfo, result.data);
        // console.log(userInfo);
      } else {
        return Promise.reject(new Error(result.message));
      }
    }
    function userLogout() {
      userInfo.name = "";
      userInfo.avatar = "";
      token.value = "";
    }

    return {
      token,
      isLogin,
      userLogin,
      userInfo,
      getUserInfo,
      userLogout,
    };
  },
  {
    persist: {
      paths: ["token", "userInfo"],
    },
  }
);

//对外暴露
export default useUserStore;
