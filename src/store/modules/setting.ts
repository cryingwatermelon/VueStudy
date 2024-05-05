//关于layout组件的小仓库
import { defineStore } from "pinia";

const useLayoutSettingStore = defineStore(
  "SettingStore",
  () => {
    // const CollapseAll = ref(false);

    // string 转数字 +'1' Number('1')
    // 数字转boolean Boolean(1) !!1
    // const CollapseAll = ref(!!+(localStorage.getItem("CollapseAll") || false));
    const CollapseAll = ref(false);
    const Refresh = ref(false);
    // console.log(CollapseAll.value);

    const changeIcon = () => {
      CollapseAll.value = !CollapseAll.value;
      // boolean转数字 +CollapseAll.value Number(CollapseAll.value)
      // 数字转string 1.toString() String(1) `${1}`
      // localStorage.setItem("CollapseAll", `${+CollapseAll.value}`);
    };

    return {
      CollapseAll,
      Refresh,
      changeIcon,
    };
  },
  {
    persist: {
      paths: ["CollapseAll"],
    },
  }
);

export default useLayoutSettingStore;
