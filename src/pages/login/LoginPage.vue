<template>
  <h3>登录模块</h3>
  <el-divider border-style="dashed" />
  <el-button type="primary" @click="login">登录</el-button>
</template>

<script lang="ts" setup>
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

let backupUrl = ''
const login = () => {
  window.location.href = `${backupUrl}?ticket=123`
}
onMounted(() => {
  const { currentRoute } = useRouter()
  const route = currentRoute.value
  backupUrl = route.query.service as string
})
</script>
