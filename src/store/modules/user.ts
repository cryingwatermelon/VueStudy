//创建用户相关的小仓库
import { defineStore } from 'pinia'

//引入接口
import { reqlogin } from '@/api/user'
import type { LoginForm } from '@/api/user/type'

let useUserStore = defineStore('User', ()=>{

    const token = ref(localStorage.getItem("TOKEN") || '');

    async function userLogin(data:LoginForm){
        // console.log();
        let result = await reqlogin(data); 
        
        // console.log(result); 
        //登录成功200 登录失败201 要存储token
        if(result.code===200){
        token.value=result.data;
        //pinia存储数据用的是js对象
        // local store
        localStorage.setItem("TOKEN",result.data);

        return 'ok';
        }else{
            return Promise.reject(new Error(result.message));
        }
    }

    return {
        token,
        userLogin
    }
})

//对外暴露
export default useUserStore;