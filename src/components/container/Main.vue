<template>
  <main class="main" :style="style">
    <slot></slot>
  </main>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElMain',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width ? ({ '--el-main-width': props.width } as CSSProperties) : {}
      }),
    }
  },
})
</script>
<style lang="scss" scoped>
.main {
  --el-main-width: 500px;
  display: block;
  flex: 1;
  overflow: auto;
  box-sizing: border-box;
  width: var(--el-main-width);
}
</style>
