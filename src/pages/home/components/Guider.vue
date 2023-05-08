<template>
  <div class="guider">
    <span v-for="(item, index) in data" :key="index" class="item" :class="[item.style]" @click="fn(item)">
      <i :class="[item.icon]"></i>{{ item.name }}
    </span>
  </div>
</template>

<script lang="ts" setup>
import { GuiderItem } from '../model'

defineProps({
  data: {
    type: Array<GuiderItem>,
    default: [],
  },
})

const emit = defineEmits(['clickFn'])
const fn = (item: GuiderItem) => {
  emit('clickFn', item)
}
</script>

<style lang="scss" scoped>
.guider {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .item {
    flex: 0 1 auto;
    width: 200px;
    height: 76px;
    border-radius: 8px;
    margin-top: 12px;
    cursor: pointer;

    position: relative;
    padding-left: 60px;
    box-sizing: border-box;
    font-size: 18px;
    color: #fff;
    line-height: 76px;
    &.right {
      width: 168px;
      height: 48px;
      background: #f7f7f7;
      padding-left: 48px;
      box-sizing: border-box;
      font-size: 14px;
      color: #333;
      line-height: 48px;
    }
    &.blue {
      background: #2576fc;
    }
    &.green {
      background: #00ebb4;
    }
    &.yellow {
      background: #ffb321;
    }
    &.red {
      background: #ff6a45;
    }
    i {
      position: absolute;
      left: 20px;
      top: 50%;
      transform: translateY(-50%);
      display: inline-block;
      width: 28px;
      height: 28px;
      &.code {
        background: url('@/assets/code.png') no-repeat;
        background-size: 100%;
      }
      &.commit {
        background: url('@/assets/commit.png') no-repeat;
        background-size: 100%;
      }
      &.branch {
        background: url('@/assets/branch.png') no-repeat;
        background-size: 100%;
      }
      &.sendlog {
        background: url('@/assets/sendlog.png') no-repeat;
        background-size: 100%;
      }
      &.zujian {
        background: url('@/assets/zujian.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.client {
        background: url('@/assets/client.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.tools {
        background: url('@/assets/tools.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.editor {
        background: url('@/assets/editor.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.zuoye {
        background: url('@/assets/zuoye.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.ziyuan {
        background: url('@/assets/ziyuan.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.kaoyue {
        background: url('@/assets/kaoyue.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
      &.zhiliang {
        background: url('@/assets/zhiliang.png') no-repeat;
        background-size: 100%;
        width: 20px;
        height: 20px;
      }
    }
  }
}
</style>
