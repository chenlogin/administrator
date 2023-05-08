<template>
  <header class="header" :style="style">
    <slot></slot>
  </header>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElHeader',
  props: {
    height: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(
        () =>
          (props.height
            ? {
                '--el-header-height': props.height,
              }
            : {}) as CSSProperties
      ),
    }
  },
})
</script>
<style lang="scss" scoped>
.header {
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-header-height);
}
</style>
