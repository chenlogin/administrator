<template>
  <div class="project-region">
    <template v-for="(item, index) in data" :key="index">
      <p @click="fn(item)">
        <span style="width: 70px; display: inline-block">{{ item.name }}</span>
        <el-divider direction="vertical" />
        <span style="margin-left: 15px; display: inline-block">{{ item.desc }}</span>
        <i></i>
      </p>
      <el-divider />
    </template>
    <div class="more-projects">
      <el-button type="primary" @click="fn(cliInfo)">创建新项目</el-button>
      <el-button type="secondary" @click="fn(moreProject)">查看项目详情</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ProjectItem } from '../model'

const cliInfo = {
  name: '@cm/mini-cli 脚手架',
  desc: '',
  link: 'https://github.com/chenlogin/custom-cli',
}
const moreProject = {
  name: '',
  desc: '',
  link: '',
}
defineProps({
  data: {
    type: Array<ProjectItem>,
    default: [],
  },
})
const emit = defineEmits(['clickFn'])
const fn = (item: ProjectItem) => {
  emit('clickFn', item)
}
</script>

<style lang="scss" scoped>
.project-region {
  margin-top: 16px;
  p {
    position: relative;
    height: 50px;
    line-height: 50px;
    color: #666;
    cursor: pointer;
    i {
      position: absolute;
      top: 17px;
      right: 0;
      background: url('@/assets/arrow.png') no-repeat;
      background-size: 100%;
      width: 16px;
      height: 16px;
    }
  }
}
.more-projects {
  margin: 20px 0 0 170px;
}
</style>
