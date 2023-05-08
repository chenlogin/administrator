<template>
  <section class="container">
    <slot></slot>
  </section>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'ElContainer',
})
</script>
<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: row;
  flex: 1;
  flex-basis: auto;
  box-sizing: border-box;
  min-width: 0;
  justify-content: center;
}
</style>
