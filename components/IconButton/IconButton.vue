<script setup lang="ts">
import type { RouteLocation } from 'vue-router'

interface Props {
  variant?: 'filled' | 'outlined' | 'transparent'
  to?: string | RouteLocation
  href?: string
  size?: 'small' | 'large' | 'normal'
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'normal',
})

if (props.to && props.href) {
  throw new Error("Can't use 'to' and 'href' props at the same time")
}

const component = computed(() => {
  if (props.href) return 'a'
  if (props.to) return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component :is="component" :to="to || null" :href="href || null" :class="[variant, size]" class="button">
    <slot></slot>
  </component>
</template>

<style scoped lang="scss">
.button {
  @apply flex justify-center items-center focus-visible:outline-purple-500 rounded-lg;
}

.small {
  @apply w-6;
}
.normal {
  @apply w-9;
}
.large {
  @apply w-12;
}

.filled {
  @apply bg-purple-500 border border-purple-500;
}
.outlined {
  @apply border border-purple-500;
}
</style>
