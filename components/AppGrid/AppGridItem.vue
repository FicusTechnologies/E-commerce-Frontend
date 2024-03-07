<script setup lang="ts">
import type { PropWithBreakpoint } from '~/models/types'

import { computed } from 'vue'
import { getResponsiveClasses } from '../../services/helpers'

type Breakpoints = PropWithBreakpoint<number>
const props = defineProps<{
  colSpan?: number | Breakpoints
  rowSpan?: number | Breakpoints
}>()

const colSpan = computed(() => {
  return getResponsiveClasses('col-span', props.colSpan as Breakpoints)
})

const rowSpan = computed(() => {
  return getResponsiveClasses('row-span', props.rowSpan as Breakpoints)
})
</script>

<template>
  <div class="grid-item" data-test-unit="grid-item" :class="[colSpan, rowSpan]"><slot></slot></div>
</template>
