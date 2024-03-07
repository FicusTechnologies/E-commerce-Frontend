<script setup lang="ts">
defineProps<{
  collapsed: boolean
}>()

type TransitionHook = (el: HTMLElement, done?: () => void) => void

const beforeEnter: TransitionHook = (el) => {
  el.style.height = '0'
}

const enter: TransitionHook = (el) => {
  el.style.height = el.scrollHeight + 'px'
}

const beforeLeave: TransitionHook = (el) => {
  el.style.height = el.scrollHeight + 'px'
}

const leave: TransitionHook = (el) => {
  el.style.height = '0'
}
</script>
<template>
  <transition @before-enter="beforeEnter" @enter="enter" @before-leave="beforeLeave" @leave="leave">
    <div v-if="!collapsed" class="slot-container w-full">
      <slot></slot>
    </div>
  </transition>
</template>
