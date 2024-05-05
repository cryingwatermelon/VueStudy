import nprogress from "nprogress";
import "nprogress/nprogress.css";

import router from ".";
import useUserStore from "@/store/modules/user";

const np = nprogress;

// 白名单
// const whiteList = ["/login"];

router.beforeEach((to, _, next) => {
  np.start();

  const { fullPath, path } = to;
  const { isLogin } = useUserStore();

  // 看是不是公共（login）页面，即不需要登录就可以访问的页面
  // console.log(`${path} 是不是白名单`, whiteList.includes(path));
  // if (whiteList.includes(path)) {
  //   if (isLogin && path === "/login") return next("");

  //   return next();
  // }

  console.log(`${path} 是不是白名单`, !!to.meta.public);
  if (!!to.meta.public) {
    // 如果是登录页面，且已登录，保持当前页面
    if (isLogin && path === "/login") return next("");
    return next();
  }

  console.log("有没有登陆", isLogin);
  if (!isLogin) {
    // 未登录，跳转到登录页，登录成功后再跳转到目标页面，query
    // 跳转到登录页，并携带参数
    return next({
      path: "/login",
      query: {
        redirect: fullPath,
      },
    });
  }

  // 已登录
  next();

  // 不 return 的话，next() 跳转后会执行这里的代码
  console.log("111");
});

router.afterEach(() => {
  np.done();
});
