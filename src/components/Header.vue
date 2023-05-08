<template>
  <div class="header">
    <div class="holder"></div>
    <div class="header-content">
      <div class="header-content-logo">
        <span class="logo">
          <img class="logo-img" :src="logoImg" />
          <span class="logo-title">项目管理平台</span>
        </span>
        <span class="profile" @click="getInfo">
          <img class="profile-img" :src="profileImg" />
          <span class="profile-title" @click="getInfo">{{ nameCh.name }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import logoImg from '@/assets/logo.png'
import profileImg from '@/assets/profile.png'
import { storeToRefs } from 'pinia'
import { userInfoStore } from '@/store/index'

const userInfo = userInfoStore()

// 响应式 refs
const { nameCh } = storeToRefs(userInfo)
// action 可以直接提取
const { getInfo } = userInfo
</script>

<style lang="scss" scoped>
.holder {
  height: 64px;
}
.header-content {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  min-width: 1200px;
  background: #fff;
  color: #404040;
  font-size: 14px;
  font-weight: 500;
  z-index: 999;
  .header-content-logo {
    width: 1200px;
    height: 64px;
    box-sizing: border-box;
    margin: 0 auto;
    .logo {
      float: left;
      height: 64px;
      display: inline-flex;
      flex-wrap: wrap;
      align-content: center;
      .logo-img {
        width: 40px;
        height: 40px;
        border-radius: 20px;
        margin-right: 10px;
      }
      .logo-title {
        font-size: 24px;
      }
    }
    .profile {
      float: right;
      height: 64px;
      display: inline-flex;
      flex-wrap: wrap;
      align-content: center;
      .profile-img {
        width: 24px;
        height: 24px;
        margin-right: 12px;
        border-radius: 15px;
      }
      .profile-title {
        font-size: 14px;
        font-weight: 500;
        height: 24px;
        line-height: 24px;
      }
    }
  }
}
</style>
