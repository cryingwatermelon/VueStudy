//路由鉴权
import router from "./router";
import nprogress from "nprogress";
import "nprogress/nprogress.css";
import useUserStore from "./store/modules/user";
// import pinia from "./store";

//全局前置守卫
router.beforeEach((to, from, next) => {
  const { token } = useUserStore();
  //访问某一个路由之前守卫
  //to：你将要访问的那个路由 from：从哪里来 next：路由放行函数
  nprogress.start();
  // if (token) {
  //   if (to.path === "/login") {
  //     next({ path: from.fullPath });
  //   } else {
  //     next();
  //   }
  // } else {
  //   //用户未登录判断
  //   if (to.path === "/login") {
  //     next();
  //   } else {
  //     next({ path: "/login", query: { redirect: to.path } });
  //   }
  // }

  // 访问登录页
  if (to.path === "/login") {
    // 有token时，从哪来回哪去
    if (token) next(from.fullPath);
    // 没有token时放行
    else next();
  }
  // 如果token不存在，强制跳转到登录页，带路由跳转参数
  if (!token) next({ path: "/login", query: { redirect: to.fullPath } });
  next();
});
//全局后置守卫
router.afterEach((to, from) => {
  nprogress.done();
  // document.title = to.meta.title;
});
//实现进度条业务 done
// 路由鉴权（路由组件访问权限的设置）
//全部路由组件：一级路由+404+any
//用户未登录访问login 其余路由指向login
