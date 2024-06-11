<script setup lang="ts">
// import useUserStore from '@/store/modules/user'

// const { userLogout } = useUserStore()
import { Delete, Edit, UserFilled } from '@element-plus/icons-vue'

import type { AllRole, AllRoleResponseData, Records, SetRoleData, User, UserResponseData } from '@/api/acl/user/type'

import { reqAddOrUpdateUser, reqAllRole, reqRemoveUser, reqSelectUser, reqSetUserRole, reqUserInfo } from '@/api/acl/user'
import useLayoutSettingStore from '@/store/modules/setting'

const pageNo = ref<number>(1)
const pageSize = ref<number>(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(30)
const keyword = ref<string>('')
const userArr = ref<Records>([])
const drawer = ref<boolean>(false)
const drawer2 = ref<boolean>(false)
const userParameter = reactive<User>({
  username: '',
  name: '',
  password: '',
})
const formRef = ref<any>()
const checkAll = ref<boolean>(false)
const isIndeterminate = ref(true)
const allRole = ref<AllRole>([])
const userRole = ref<AllRole>([])
const selectIdArr = ref<number[]>([])
function validatorUsername(rule: any, value: any, callback: any) {
  if (value.trim().length >= 5)
    callback()
  else
    callback(new Error('用户名字至少五位'))
}
function validatorName(rule: any, value: any, callback: any) {
  if (value.trim().length >= 5)
    callback()
  else
    callback(new Error('用户昵称至少五位'))
}
function validatorPassword(rule: any, value: any, callback: any) {
  if (value.trim().length >= 6)
    callback()
  else
    callback(new Error('用户密码至少六位'))
}
const rules = {
  username: [{ required: true, trigger: 'blur', validator: validatorUsername }],
  name: [{ required: true, trigger: 'blur', validator: validatorName }],
  password: [{ required: true, trigger: 'blur', validator: validatorPassword }],
}
onMounted(() => {
  getHasUser()
})

async function getHasUser(pager = 1) {
  pageNo.value = pager
  const result: UserResponseData = await reqUserInfo(pageNo.value, pageSize.value, keyword.value)
  // console.log(result)
  if (result.code === 200) {
    total.value = result.data.total
    userArr.value = result.data.records
  }
}
function handler(pager: number) {
  getHasUser(pager)
}
function addUser() {
  drawer.value = true
  Object.assign(userParameter, {
    id: 0,
    username: '',
    name: '',
    password: '',
  })
  // 清除上一次错误的提示
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
    formRef.value.clearValidate('password')
  })
}
function updateUser(row: User) {
  drawer.value = true
  Object.assign(userParameter, row)
  nextTick(() => {
    formRef.value.clearValidate('username')
    formRef.value.clearValidate('name')
  })
}
async function save() {
// 先校验
  await formRef.value.validate()
  // add or update
  const result = await reqAddOrUpdateUser(userParameter)
  if (result.code === 200) {
    drawer.value = false
    ElMessage({
      type: 'success',
      message: userParameter.id ? '更新成功' : '添加成功',
    })
    getHasUser(userParameter.id ? pageNo.value : 1)// 可留可不留
    window.location.reload()// 自动触发刷新一次，刷新的目的是如果更改用户信息，重新登陆
  }
  else {
    drawer.value = false
    ElMessage({
      type: 'error',
      message: userParameter.id ? '更新失败' : '添加失败',
    })
  }
}
function cancel() {
  drawer.value = false
}
async function setRoles(row: User) {
  drawer2.value = true
  // console.log(row)
  Object.assign(userParameter, row)
  const result: AllRoleResponseData = await reqAllRole(userParameter.id as number)
  // console.log(result)
  if (result.code === 200) {
    allRole.value = result.data.allRolesList
    userRole.value = result.data.assignRoles
    drawer2.value = true
  }
  // console.log(allRole.value)
  // console.log(userRole.value)
}
function handleCheckedRolesChange(value: string[]) {
  const checkedCount = value.length
  checkAll.value = checkedCount === allRole.value.length
}
function handleCheckAllChange(val: boolean) {
  userRole.value = val ? allRole.value : []
  isIndeterminate.value = false
}
async function confirmClick() {
  const data: SetRoleData = {
    userId: userParameter.id as number,
    roleIdList: userRole.value.map((item) => {
      return (item.id as number)
    }),
  }
  const result = await reqSetUserRole(data)
  // console.log(result) 拿到了
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '更新成功',
    })
    drawer2.value = false
    getHasUser(pageNo.value)
  }
}
function cancelDrawer() {
  drawer2.value = false
}
async function deleteUser(userId: number) {
  const result = await reqRemoveUser(userId)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
// 复选框勾选的时候触发
function selectChange(value: any) {
  selectIdArr.value = value
}
// 批量删除
async function deleteSelectUser() {
  const idList: any = selectIdArr.value.map((item) => {
    // console.log(item.id)
    return item.id
  })
  const result: any = await reqSelectUser(idList)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '删除成功',
    })
    getHasUser(userArr.value.length > 1 ? pageNo.value : pageNo.value - 1)
  }
}
function search() {
  getHasUser()
  keyword.value = ''
}

// 获取模版仓库setting
const settingStore = useLayoutSettingStore()
function reset() {
  // todo
  settingStore.Refresh = !settingStore.Refresh
}
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
          <el-input v-model="keyword" placeholder="请输入搜索用户名" />
        </el-form-item>
        <el-form-item>
          <el-button v-model="keyword" type="success" size="default" :disabled="keyword ? false : true" @click="search">
            搜索
          </el-button>
          <el-button type="danger" size="default" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <el-button type="primary" size="default" @click="addUser">
        添加用户
      </el-button>
      <el-button type="primary" size="default" :disabled="selectIdArr.length ? false : true" @click="deleteSelectUser">
        批量删除
      </el-button>
      <el-table border :data="userArr" @selection-change="selectChange">
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" align="center">
          <template #default="{ row, $index }">
            {{ $index + 1 + (pageNo - 1) * pageSize }}
          </template>
        </el-table-column>
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="用户名字" align="center" prop="username" />
        <el-table-column label="用户名称" align="center" prop="name" />
        <el-table-column label="用户角色" align="center">
          <template #default="{ row }">
            <el-tooltip
              effect="dark"
              :content="row.roleName"
              placement="top"
            >
              {{ row.roleName }}
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" prop="createTime" width="250px" show-overflow-tooltips />
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" size="small" :icon="UserFilled" @click="setRoles(row)">
              分配角色1
            </el-button>
            <el-button type="success" size="small" :icon="Edit" @click="updateUser(row)">
              编辑
            </el-button>
            <el-button type="danger" size="small" :icon="Delete" @click="deleteUser(row.userId)">
              删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo" v-model:page-size="pageSize" :page-sizes="[2, 5, 8, 10]"
        :small="small" :disabled="disabled" :background="background" layout="prev, pager, next,->,sizes,total"
        :total="total" @current-change="handler"
      />
    </el-card>
    <el-drawer v-model="drawer">
      <template #header>
        <h4>添加/修改用户</h4>
      </template>
      <template #default>
        <el-form ref="formRef" :model="userParameter" :rules="rules">
          <el-form-item label="用户姓名" prop="username">
            <el-input v-model="userParameter.username" placeholder="请输入用户姓名" />
          </el-form-item>
          <el-form-item label="用户昵称" prop="name">
            <el-input v-model="userParameter.name" placeholder="请输入用户昵称" />
          </el-form-item>
          <el-form-item v-if="!userParameter.id" label="用户密码" prop="password">
            <el-input v-model="userParameter.password" placeholder="请输入用户密码" />
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="flex: auto;">
          <el-button type="danger" @click="cancel">
            取消
          </el-button>
          <el-button type="success" @click="save">
            确定
          </el-button>
        </div>
      </template>
    </el-drawer>
    <el-drawer v-model="drawer2">
      <template #header>
        <h4>分配角色用户</h4>
      </template>
      <template #default>
        <el-form>
          <el-form-item label="用户姓名">
            <el-input v-model="userParameter.username" placeholder="请输入用户姓名" :disabled="true" />
          </el-form-item>
          <el-form-item label="角色列表">
            <el-checkbox
              v-model="checkAll"
              :indeterminate="isIndeterminate"
              @change="handleCheckAllChange"
            >
              Check all
            </el-checkbox>
            <el-checkbox-group
              v-model="userRole"
              @change="handleCheckedRolesChange"
            >
              <el-checkbox v-for="(role, index) in allRole" :key="index" :value="role">
                {{ role.roleName }}
              </el-checkbox>
            </el-checkbox-group>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div style="margin:10px,0px">
          <el-button @click="cancelDrawer">
            取消
          </el-button>
          <el-button @click="confirmClick">
            确认
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped>
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
