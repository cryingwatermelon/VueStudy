<script setup lang="ts">
import { Avatar, Delete, Edit, Plus } from '@element-plus/icons-vue'

import type { MenuList, Records, RoleData, RoleResponseData } from '@/api/acl/role/type'
import type { DrawerProps } from 'element-plus'

import { reqALLMenuList, reqAddOrUpdateRole, reqAllRoleList, reqRemoveRole, reqSetPermission } from '@/api/acl/role'
import useLayoutSettingStore from '@/store/modules/setting'

const pageNo = ref(1)
const pageSize = ref(10)
const small = ref(false)
const background = ref(false)
const disabled = ref(false)
const total = ref(0)
const allRole = ref<Records>([])
const dialog = ref(false)
const drawer = ref(false)
const direction = ref<DrawerProps['direction']>('rtl')
const roleParameter = reactive<RoleData>({
  roleName: '',
})
const formRef = ref()
const menuArr = ref<MenuList>([])
const selectArr = ref<number[]>([])
const tree = ref<any>()
const rules = {
  roleName: [{ required: true, trigger: 'blur', validator: validatorRoleName }],
}
function validatorRoleName(rule: any, value: any, callback: any) {
  // todo 正则判断
  if (value.trim().length >= 2)
    callback()
  else
    callback(new Error('职位名称至少两位'))
}

// 搜索职位的关键字
const keyword = ref('')
onMounted(() => {
  getHasRole()
})
async function getHasRole(pager = 1) {
  pageNo.value = pager
  const result: RoleResponseData = await reqAllRoleList(pageNo.value, pageSize.value, keyword.value)
  if (result.code === 200) {
    total.value = result.data.total
    allRole.value = result.data.records
  }
}
function handlerCurrentChange(val: number) {
  getHasRole(val)
}
function sizeChange() {
  getHasRole()
}

function search() {
  getHasRole()
  keyword.value = ''
}
const settingStore = useLayoutSettingStore()

function reset() {
  settingStore.Refresh = !settingStore.Refresh
}
function addRole() {
  dialog.value = true
  Object.assign(roleParameter, {
    roleName: '',
    id: 0,
  })
  // 清空上一次表单校验错误结果
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
async function save() {
  // 进行表单校验
  await formRef.value.validate()
  const result = await reqAddOrUpdateRole(roleParameter)
  if (result.code === 200) {
    ElMessage({
      type: 'success',
      message: '添加成功',
    })
    dialog.value = false
    getHasRole(roleParameter.id ? pageNo.value : 1)
  }
  // console.log(result)
}
function updateRole(row: RoleData) {
  dialog.value = true
  Object.assign(roleParameter, row)
  nextTick(() => {
    formRef.value.clearValidate('roleName')
  })
}
async function setPermission(row: RoleData) {
  drawer.value = true
  Object.assign(roleParameter, row)
  const result = await reqALLMenuList(roleParameter.id as number)
  if (result.code === 200) {
    menuArr.value = result.data
    // console.log(menuArr.value)
    selectArr.value = filterSelectArr(menuArr.value, [])
    // console.log(selectArr.value)已经拿到了
  }
  // console.log(result)
}
function filterSelectArr(allData: any, initArr: any) {
  allData.forEach((item: any) => {
    if (item.select && item.level === 4)
      initArr.push(item.id)
    if (item.children && item.children.length > 0)
      filterSelectArr(item.children, initArr)
  })
  return initArr
}
async function handler() {
  // 职位的id
  const roleId = roleParameter.id
  // 选中节点的id
  const arr = tree.value.getCheckedKeys()
  // 半选
  const arr2 = tree.value.getHalfCheckedKeys()
  const permission = arr.concat(arr2)
  const result: any = await reqSetPermission(roleId as number, permission)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '分配权限成功' })
    drawer.value = false
    window.location.reload()
  }
}
const defaultProps = {
  children: 'children',
  label: 'name',
}
async function deleteRole(id: number) {
  const result: any = await reqRemoveRole(id)
  // console.log(result)
  if (result.code === 200) {
    ElMessage({ type: 'success', message: '删除成功' })
    getHasRole(roleParameter.id ? pageNo.value : 1)
  }
}
</script>

<template>
  <div>
    <el-card>
      <el-form :inline="true" class="form">
        <el-form-item label="职位搜索">
          <el-input v-model="keyword" placeholder="请输入搜索的职位关键词" />
        </el-form-item>
        <el-form-item>
          <el-button type="success" :disabled="keyword ? false : true" @click="search">
            搜索
          </el-button>
          <el-button type="danger" @click="reset">
            重置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
    <el-card style="margin-top: 20px;">
      <el-button type="primary" size="default" :icon="Plus" @click="addRole">
        添加职位
      </el-button>
      <el-table border style="margin-top: 20px;" :data="allRole">
        <el-table-column type="selection" align="center" />
        <el-table-column label="#" align="center">
          <template #default="{ row, $index }">
            {{ $index + 1 + (pageNo - 1) * pageSize }}
          </template>
        </el-table-column>
        <el-table-column label="ID" align="center" prop="id" />
        <el-table-column label="职位名称" align="center" prop="roleName" width="150px" />
        <el-table-column label="创建时间" align="center" prop="createTime" width="150px" :show-overflow-tooltip="true" />
        <el-table-column label="更新时间" align="center" prop="updateTime" width="150px" :show-overflow-tooltip="true" />
        <el-table-column label="操作" align="center" width="300px" fixed="right">
          <template #default="{ row }">
            <el-button type="primary" :icon="Avatar" size="small" @click="setPermission(row)">
              分配权限
            </el-button>
            <el-button type="success" :icon="Edit" size="small" @click="updateRole(row)">
              编辑
            </el-button>

            <el-popconfirm :title="`你确定删除 ${row.roleName} ?`" width="300px" @confirm="deleteRole(row.id)">
              <template #reference>
                <el-button type="danger" :icon="Delete" size="small">
                  删除
                </el-button>
              </template>
            </el-popconfirm>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        v-model:current-page="pageNo"
        v-model:page-size="pageSize"
        :page-sizes="[2, 5, 8, 10]"
        :small="small"
        :disabled="disabled"
        :background="background"
        layout="prev, pager, next,->,sizes,total"
        :total="total"
        @current-change="handlerCurrentChange"
        @size-change="sizeChange"
      />
    </el-card>
    <el-dialog v-model="dialog" :title="roleParameter.id ? '更新职位' : '添加职位'">
      <el-form ref="formRef" :model="roleParameter" :rules="rules">
        <el-form-item label="职位名称" prop="roleName">
          <el-input v-model="roleParameter.roleName" placeholder="请输入职位名称" />
        </el-form-item>
      </el-form>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="dialog = false">
            取消
          </el-button>
          <el-button type="primary" @click="save">
            确认
          </el-button>
        </div>
      </template>
    </el-dialog>
    <el-drawer v-model="drawer" :direction="direction">
      <template #header>
        <h4>分配菜单与按钮的权限</h4>
      </template>
      <template #default>
        <!-- todo树形控件 -->
        <el-tree
          ref="tree"
          style="max-width: 600px"
          show-checkbox
          node-key="id"
          default-expand-all
          :default-checked-keys="selectArr"
          :props="defaultProps"
          :data="menuArr"
        />
        <div />
      </template>
      <template #footer>
        <div style="flex: auto">
          <el-button @click="drawer = false">
            取消
          </el-button>
          <el-button type="primary" @click="handler">
            确认
          </el-button>
        </div>
      </template>
    </el-drawer>
  </div>
</template>

<style scoped lang="scss">
.form{
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 40px;
}
</style>
