<script setup lang="ts" generic="T">
import { defineEmits } from 'vue'
const props = defineProps<{
  modelValue: T
  options: T[]
}>()
const emit = defineEmits(['update:modelValue'])
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div v-for="option of options" :key="option.id" class="option-wrap">
    <div class="mr-[10px]">
      <input v-bind="$attrs" type="radio" class="radio" />
      <span
        class="checkmark"
        :class="{ activeBox: modelValue === option }"
        @click="emit('update:modelValue', option)"
      ></span>
    </div>
    <label :for="`${$attrs.id}`">{{ option.label }}</label>
  </div>
</template>
<style lang="scss" scoped>
.option-wrap {
  @apply flex relative;
  .radio {
    opacity: 0;
  }
  .checkmark {
    @apply border-none absolute mr-2 w-[12px] h-[12px] rounded-[50%] top-[5px] left-0 bg-[#D9D9D9] cursor-pointer;
    &:hover {
      background-color: #9770a6;
    }
  }
  .activeBox {
    border: none;
    background: #52106a;
  }
}
</style>
