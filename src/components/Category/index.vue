<script lang="ts" setup>
import useCategoryStore from '@/store/modules/category'

// 接受父组件传递过俩的scene
defineProps(['scene'])
const categoryStore = useCategoryStore()
onMounted(() => {
  getC1()
})
function getC1() {
  // console.log("test");
  categoryStore.getC1()
}
function handler() {
  // 需求将之前二三级分类的仓库全部清空
  categoryStore.c2ID = ''
  categoryStore.c3Arr = []
  categoryStore.c3ID = ''
  categoryStore.getC2()
}
function handlernextlevel() {
  // 需要将之前三级分类的仓库全部清空
  categoryStore.c3ID = ''
  categoryStore.getC3()
}
</script>

<template>
  <el-card
    :body-style="{
      padding: '10px',
    }"
  >
    <el-form class="category" :inline="true">
      <el-form-item label="一级分类">
        <el-select v-model="categoryStore.c1ID" :disabled="scene === 0 ? false : true" @change="handler">
          <el-option
            v-for="c1 in categoryStore.c1Arr" :key="c1.id" :label="c1.name"
            :value="c1.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="二级分类">
        <el-select v-model="categoryStore.c2ID" :disabled="scene === 0 ? false : true" @change="handlernextlevel">
          <el-option
            v-for="c2 in categoryStore.c2Arr" :key="c2.id" :label="c2.name"
            :value="c2.id"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="三级分类">
        <el-select v-model="categoryStore.c3ID" :disabled="scene === 0 ? false : true">
          <el-option
            v-for="c3 in categoryStore.c3Arr" :key="c3.id" :label="c3.name" :value="c3.id"
          />
        </el-select>
      </el-form-item>
    </el-form>
  </el-card>
</template>

<style lang="scss" scoped>
.category {
  display: flex;
  // align-items: center;
  gap: 10px;
  // width: 100%;
}

.el-form-item {
  flex: 1;
  margin: 0px;
}
</style>
