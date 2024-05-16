import SvgIcon from "./SvgIcon/index.vue";
import Category from "./Category/index.vue";
// console.log(ElementPlusIconsVue)
// console.log('123')

const allGloablComponent: any = { SvgIcon, Category };

export default {
  //务必叫做install方法
  install(app: any) {
    //注册项目全部的全局组件
    Object.keys(allGloablComponent).forEach((key) => {
      //注册为全局组件
      app.component(key, allGloablComponent[key]);
    });
  },
};
