<template>
  <aside class="aside" :style="style">
    <slot></slot>
  </aside>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElAside',
  props: {
    width: {
      type: String,
      default: null,
    },
  },
  setup(props) {
    return {
      style: computed(() => {
        return props.width ? ({ '--el-aside-width': props.width } as CSSProperties) : {}
      }),
    }
  },
})
</script>
<style lang="scss" scoped>
.aside {
  --el-aside-width: 300px;
  overflow: auto;
  box-sizing: border-box;
  flex-shrink: 0;
  width: var(--el-aside-width);
}
</style>
