<script setup lang="ts">
// import useUserStore from '@/store/modules/user'

// const { userLogout } = useUserStore()
const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(30)
</script>

<template>
  <!-- <div>
    <h1>权限管理--user展示站位</h1>
    <el-button @click="userLogout">clear store</el-button>
  </div> -->
  <div>
    <el-card style="height: 80px;">
      <el-form :inline="true" class="form">
        <el-form-item label="用户名" style="width: 300px;">
          <el-input placeholder="请输入搜索用户名" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" size="default">
            搜索
          </el-button>
          <el-button type="danger" size="default">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <el-button type="primary" size="default">
        添加用户
      </el-button>
      <el-button type="primary" size="default">
        批量删除
      </el-button>
      <el-table>
        <el-table-column type="selection" align="center" />
        <el-table-column type="index" label="#" align="center" />
        <el-table-column label="ID" align="center" />
        <el-table-column label="用户名字" align="center" />
        <el-table-column label="用户名称" align="center" />
        <el-table-column label="用户角色" align="center" />
        <el-table-column label="创建时间" align="center" />
        <el-table-column label="操作" align="center" width="200px" fixed="right" />
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[5, 10, 15, 20]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next,->,sizes,total"
        :total="total"
      />
    </el-card>
  </div>
</template>

<style scoped lang="scss">
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
