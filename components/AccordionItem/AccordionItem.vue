<script setup lang="ts">
defineProps<{
  iconPosition?: 'start' | 'end'
}>()
const collapsed = ref(true)
const arrowRotation = computed(() => {
  return !collapsed.value && 'rotate-90'
})
const minusRotation = computed(() => {
  return !collapsed.value && 'rotate-180'
})
const plusRotation = computed(() => {
  return !collapsed.value ? 'rotate-180' : 'rotate-90'
})
</script>

<template>
  <div v-bind="$attrs">
    <button class="flex items-center mb-2" @click="collapsed = !collapsed">
      <img
        v-if="iconPosition === 'start'"
        src="/accordionArrow.svg"
        :class="`left-icon duration-100 ${arrowRotation}`"
      />
      <slot name="title"></slot>
      <div v-if="iconPosition === 'end'" class="right-icon relative w-[25px] h-[25px] flex items-center justify-center">
        <img src="/accordionMinus.svg" alt="" :class="`absolute duration-100 ${minusRotation}`" />
        <img src="/accordionMinus.svg" alt="" :class="`absolute duration-100 ${plusRotation}`" />
      </div>
    </button>
    <AppCollapsible :collapsed="collapsed">
      <slot name="content"></slot>
    </AppCollapsible>
  </div>
</template>
