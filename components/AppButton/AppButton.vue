<script setup lang="ts">
import type { RouteLocation } from 'vue-router'
import { computed } from 'vue'
interface Props {
  variant?: 'filled' | 'outlined' | 'transparent'
  state?: 'success' | 'error'
  feedback?: string
  to?: string | RouteLocation
  href?: string
  size?: 'small' | 'large' | 'normal'
  fullWidth?: boolean
  loading?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  variant: 'filled',
  size: 'normal',
  fullWidth: false,
  loading: false,
})

if (props.to && props.href) {
  throw new Error("Can't use 'to' and 'href' props at the same time")
}

const buttonSize = computed(() => {
  return props.fullWidth ? 'full' : props.size
})

const component = computed(() => {
  if (props.href) return 'a'
  if (props.to) return resolveComponent('NuxtLink')
  return 'button'
})
</script>

<template>
  <component
    :is="component"
    :to="to || null"
    :href="href || null"
    :class="[variant, state, buttonSize]"
    class="button"
    v-bind="$attrs"
  >
    <span v-if="loading" class="loader"></span>
    <slot v-else></slot>
  </component>
  <p v-if="feedback" class="normal-case text-base tracking-normal text-gray-700">{{ feedback }}</p>
</template>

<style scoped lang="scss">
// TODO: make loader as separate component
.loader {
  width: 24px;
  height: 24px;
  border: 3px solid #fff;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

.button {
  @apply flex justify-center items-center focus-visible:outline-purple-500 text-xs tracking-widest uppercase rounded-lg h-10;

  &.small {
    @apply w-24;
  }

  &.normal {
    @apply w-36;
  }

  &.large {
    @apply w-48;
  }

  &.full {
    @apply w-full;
  }
}

.filled {
  @apply bg-purple-500 border-purple-500 text-gray-100 border;

  &.success {
    @apply bg-lime-100 border-lime-500 text-lime-600 border focus-visible:outline-lime-500;
  }

  &.error {
    @apply bg-red-100 border-red-500 text-red-600 border focus-visible:outline-red-500;
  }
}

.outlined {
  @apply border-purple-500 text-purple-600 border;

  &.success {
    @apply border-lime-500 text-lime-600 border focus-visible:outline-lime-500;
  }

  &.error {
    @apply border-red-500 text-red-600 border focus-visible:outline-red-500;
  }
}

.transparent {
  @apply text-purple-600;

  &.success {
    @apply text-lime-600 focus-visible:outline-lime-500;
  }

  &.error {
    @apply text-red-600 focus-visible:outline-red-500;
  }
}
</style>
