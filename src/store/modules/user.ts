//创建用户相关的小仓库
import { defineStore } from 'pinia'
//引入接口
import { reqlogin } from '@/api/user'
import type { LoginForm } from '@/api/user/type'

let useUserStore = defineStore('User', {
    state: () => {
        return {
            token:localStorage.getItem("TOKEN"),
        }
    },
    actions: {
        async userLogin(data:LoginForm){
            // console.log();
            let result:any = await reqlogin(data); 
            // console.log(result); 
            //登录成功200 登录失败201 要存储token
            if(result.code===200){
            this.token=result.data.token;
            //pinia存储数据用的是js对象
            // local store
            localStorage.setItem("TOKEN",result.data.token);

            return 'ok';
            }else{
                return Promise.reject(new Error(result.data.message));

            }


        }

    },
    getters: {

    }

})
//对外暴露

export default useUserStore;