<script setup lang="ts">
const currentPage4 = ref(4);

const pageSize4 = ref(100);
const small = ref(false);
const background = ref(false);
const disabled = ref(false);

const handleSizeChange = (val: number) => {
  console.log(`${val} items per page`);
};
const handleCurrentChange = (val: number) => {
  console.log(`current page: ${val}`);
};
</script>

<template>
  <el-card style="max-width: 480px">
    <el-button type="primary" size="default" @click="" icon="Plus"
      >添加品牌</el-button
    >
    <el-table style="margin: 10px 0px" border>
      <el-table-column label="序号" width="80px" align="center" />
      <el-table-column label="品牌名称" />
      <el-table-column label="品牌LOGO" />
      <el-table-column label="品牌操作" />
    </el-table>
    <div class="demo-pagination-block">
      <div class="demonstration">All combined</div>
      <el-pagination
        v-model:current-page="currentPage4"
        v-model:page-size="pageSize4"
        :page-sizes="[100, 200, 300, 400]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="total, sizes, prev, pager, next, jumper"
        :total="400"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      />
    </div>
  </el-card>
</template>

<style scoped lang="scss"></style>
