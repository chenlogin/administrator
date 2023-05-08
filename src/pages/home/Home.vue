<template>
  <div class="common-layout">
    <Container>
      <div class="left">
        <Aside width="445px">
          <div class="moduler">
            <div class="title">新人指南</div>
            <Guider :data="beginner" @click-fn="showDetail"></Guider>
          </div>
          <div class="moduler gap">
            <div class="title">项目汇总</div>
            <Project :data="projectInfo" @click-fn="showProjectInfo"></Project>
          </div>
        </Aside>
      </div>
      <div class="right">
        <Main width="740px">
          <div class="moduler">
            <div>
              <div class="title">快捷入口</div>
              <div class="guider">
                <Guider :data="quickEntry" @click-fn="showDetail"></Guider>
              </div>
            </div>
            <div class="gap">
              <div class="title">领取任务</div>
              <Chart></Chart>
            </div>
          </div>
        </Main>
      </div>
    </Container>
    <el-drawer v-model="drawer" :show-close="false" :close-on-click-modal="false" :destroy-on-close="true" size="95%">
      <template #header="{ close }">
        <h3>{{ notification.title }}</h3>
        <el-button
          v-if="notification.link.indexOf('wiki') > -1"
          type="primary"
          @click="openOriginalPage(notification.link)">
          编辑
        </el-button>
        <el-button type="primary" @click="close">关闭</el-button>
      </template>
      <iframe id="aa" :src="notification.link"></iframe>
    </el-drawer>
  </div>
  <el-dialog v-model="modalVisible" size="medium" :title="notification.title">
    <div v-for="(item, index) in notification.value" :key="index" style="line-height: 30px">{{ item }}</div>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="modalVisible = false">已了解</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref, reactive } from 'vue'
import Container from '@/components/container/Container.vue'
import Aside from '@/components/container/Aside.vue'
import Main from '@/components/container/Main.vue'
import Guider from './components/Guider.vue'
import Project from './components/Project.vue'
import Chart from './components/Chart.vue'
import { beginner, quickEntry, projectInfo } from './data/index'
import { GuiderItem, ProjectItem } from './model'

const modalVisible = ref(false)
const drawer = ref(false)
const notification = reactive({
  title: '标题文案',
  link: '',
  value: ['通知的信息描述', '通知的信息描述'],
})
const showDetail = (value: GuiderItem) => {
  let item = value.detail[0]
  notification.title = item.title
  notification.value = item.value
  notification.link = item.link
  if (item.link === '') {
    modalVisible.value = true
  } else {
    drawer.value = true
  }
}
const showProjectInfo = (value: ProjectItem) => {
  window.open(value.link)
}
const openOriginalPage = (url: string) => {
  window.open(url.replace('viewpage', 'editpage'))
}
</script>

<style lang="scss" scoped>
.common-layout {
  min-width: 1200px;
  margin: 16px 0;
}
.left {
  margin-right: 16px;
}
.right {
  width: 740px;
  background: #fff;
  border-radius: 8px;
}
.title {
  font-size: 16px;
  font-family: PingFangSC-Medium, PingFang SC, Arial, sans-serif;
  font-weight: 500;
  color: #333;
}
.moduler {
  padding: 16px;
  box-sizing: border-box;
  background: #fff;
  border-radius: 8px;
}
.gap {
  margin-top: 16px;
}
iframe {
  width: 100%;
  height: 100%;
  border: 0;
}
</style>
