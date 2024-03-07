<script setup lang="ts" generic="T">
import { defineEmits } from 'vue'
const props = defineProps<{
  modelValue: boolean
  label: string
}>()
const emit = defineEmits(['update:modelValue'])
defineOptions({
  inheritAttrs: false,
})
</script>

<template>
  <div class="option-wrap">
    <div class="mr-[10px]">
      <input v-bind="$attrs" type="checkbox" :value="modelValue" class="checkbox" />
      <span class="checkmark" :class="{ activeBox: modelValue }" @click="emit('update:modelValue', !modelValue)"></span>
    </div>
    <label :for="`${$attrs.id}`">{{ label }}</label>
  </div>
</template>
<style lang="scss" scoped>
.option-wrap {
  @apply flex relative;

  .checkbox {
    opacity: 0;
  }
  .checkmark {
    border: 1px solid #313131;
    @apply absolute mr-2 w-[17px] h-[17px] rounded-[2px] top-[3px] left-0 bg-[white] cursor-pointer;
  }
  .activeBox {
    border: none;
    background: #52106a;
  }
}
</style>
