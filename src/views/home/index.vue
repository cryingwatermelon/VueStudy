<script setup lang="ts">
import useUserStore from '@/store/modules/user'
import { getTime } from '@/utils/time'

const userStore = useUserStore()
</script>

<template>
  <div>
    <el-card>
      <div class="box">
        <img :src="userStore.userInfo.avatar" alt="" class="avatar">
        <div class="bottom">
          <h3 class="title">
            {{ getTime() }}
            {{ userStore.userInfo.name }}
          </h3>
          <p class="subtitle">
            硅谷甄选运营平台
          </p>
        </div>
      </div>
    </el-card>
    <div class="bottoms">
      <svg-icon name="welcome" width="600px" height="300px" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.box{
  display: flex;
  .avatar{

    width: 100px;
    height: 100px;
    border-radius: 50%;
  }
  .bottom{
   margin-left: 20px;
    .title{
      font-size: 30px;
      font-weight: 900;

    }
    .subtitle{
      font-style: italic;
      color: rgb(3, 95, 132);

    }
  }
}
.bottoms{
 display: flex;
 margin-top: 20px;
 justify-content: center;
}
</style>
