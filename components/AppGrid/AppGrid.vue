<script setup lang="ts">
import type { PropWithBreakpoint } from '~/models/types'
import { computed } from 'vue'
import { getResponsiveClasses } from '../../services/helpers'
type Breakpoints = PropWithBreakpoint<number>
export interface Props {
  colGap?: number | Breakpoints
  rowGap?: number | Breakpoints
  gridCol?: number | Breakpoints
}
const props = withDefaults(defineProps<Props>(), {
  colGap: 6,
  rowGap: 4,
  gridCol: 12,
})
const gridCol = computed(() => {
  return getResponsiveClasses('grid-cols', props.gridCol as Breakpoints)
})

const xGaps = computed(() => {
  return getResponsiveClasses('gap-x', props.colGap as Breakpoints)
})

const yGaps = computed(() => {
  return getResponsiveClasses('gap-y', props.rowGap as Breakpoints)
})
</script>

<template>
  <div class="grid" data-test-unit="grid" :class="[xGaps, yGaps, gridCol]">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.grid {
  display: grid;
}
</style>
