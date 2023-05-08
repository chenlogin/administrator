<template>
  <footer class="footer" :style="style">
    <slot></slot>
  </footer>
</template>
<script lang="ts">
import { computed, defineComponent } from 'vue'
import type { CSSProperties } from 'vue'

export default defineComponent({
  name: 'ElFooter',
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
                '--el-footer-height': props.height,
              }
            : {}) as CSSProperties
      ),
    }
  },
})
</script>
<style lang="scss" scoped>
.footer {
  box-sizing: border-box;
  flex-shrink: 0;
  height: var(--el-footer-height);
}
</style>
