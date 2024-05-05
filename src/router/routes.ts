import {
  HomeFilled,
  Promotion,
  DocumentDelete,
  DataLine,
  Platform,
  Lock,
  User,
  UserFilled,
  Monitor,
  Goods,
  ShoppingCartFull,
  ChromeFilled,
  Calendar,
  Orange,
} from "@element-plus/icons-vue";

import { RouteRecordRaw } from "vue-router";

// Product路由
const productRoute: RouteRecordRaw = {
  path: "product",
  name: "Product",
  meta: {
    title: "商品管理",
    hidden: false, //hide or not
    icon: Goods,
  },
  redirect: "/product/trademark",
  children: [
    {
      path: "trademark",
      name: "Trademark",
      component: () => import("@/views/product/trademark/index.vue"),
      meta: {
        title: "品牌管理",
        hidden: false, //hide or not
        icon: ShoppingCartFull,
      },
    },
    {
      path: "attr",
      name: "Attr",
      component: () => import("@/views/product/attr/index.vue"),
      meta: {
        title: "属性管理",
        hidden: false, //hide or not
        icon: ChromeFilled,
      },
    },
    {
      path: "spu",
      name: "Spu",
      component: () => import("@/views/product/spu/index.vue"),
      meta: {
        title: "SPU管理",
        hidden: false, //hide or not
        icon: Calendar,
      },
    },
    {
      path: "sku",
      name: "Sku",
      component: () => import("@/views/product/sku/index.vue"),
      meta: {
        title: "SKU管理",
        hidden: false, //hide or not
        icon: Orange,
      },
    },
  ],
};

// ACL 路由
const aclRoute: RouteRecordRaw = {
  path: "acl",
  name: "Acl",
  meta: {
    title: "权限管理",
    hidden: false, //hide or not
    icon: Lock,
  },
  redirect: "/acl/user",
  children: [
    {
      path: "user",
      name: "User",
      component: () => import("@/views/acl/user/index.vue"),
      meta: {
        title: "用户管理",
        hidden: false,
        icon: User,
      },
    },
    {
      path: "role",
      name: "Role",
      component: () => import("@/views/acl/role/index.vue"),
      meta: {
        title: "角色管理",
        hidden: false,
        icon: UserFilled,
      },
    },
    {
      path: "permission",
      name: "Permission",
      component: () => import("@/views/acl/permission/index.vue"),
      meta: {
        title: "菜单管理",
        hidden: false,
        icon: Monitor,
      },
    },
  ],
};

// 常量路由（需要显示在menu中的路由）
export const menuRoute: RouteRecordRaw[] = [
  {
    path: "home",
    component: () => import("@/views/home/index.vue"),
    meta: {
      title: "首页",
      hidden: false,
      icon: HomeFilled, //这里有问题Q1
    },
  },
  {
    path: "screen",
    name: "Screen",
    component: () => import("@/views/screen/index.vue"),
    meta: {
      title: "数据大屏",
      hidden: false,
      icon: Platform,
    },
  },
  productRoute,
  aclRoute,
];

// 常量路由(不需要显示在menu中的路由)
export const constantRoute: RouteRecordRaw[] = [
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/login/index.vue"),
    meta: {
      title: "登录",
      hidden: true,
      public: true,
      icon: Promotion,
    },
  },
  //登录以后的路由

  {
    path: "/404",
    name: "404",
    component: () => import("@/views/404/index.vue"),
    meta: {
      title: "404",
      hidden: true,
      icon: DocumentDelete,
    },
  },
  {
    path: "/:pathMatch(.*)*",
    name: "Any",
    redirect: "/404",
    meta: {
      title: "Any",
      hidden: true,
      icon: DataLine,
    },
  },
];

// 布局路由
export const layoutRoute: RouteRecordRaw[] = [
  {
    path: "/",
    name: "layout",
    component: () => import("@/layout/index.vue"),
    redirect: "/home",
    meta: {
      title: "",
      hidden: true, //hide or not
    },
    children: menuRoute,
  },
];
