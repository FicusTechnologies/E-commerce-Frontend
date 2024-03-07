<script setup lang="ts">
import { MinusIcon } from '@heroicons/vue/24/outline'
import { PlusIcon } from '@heroicons/vue/24/outline'
interface Props {
  size?: 'small' | 'normal'
  min: number
  max: number
  modelValue: number
}

const props = withDefaults(defineProps<Props>(), {
  size: 'normal',
  min: 0,
  max: 10,
  modelValue: 0,
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <div class="counter-wrap">
    <button
      class="button"
      :disabled="modelValue === min"
      data-test-unit="decrementButton"
      @click="emit('update:modelValue', modelValue - 1)"
    >
      <MinusIcon :class="['counter-icon', size]" data-test-unit="counterIcon" />
    </button>
    <p class="counter" data-test-unit="counter">{{ modelValue }}</p>
    <button
      class="button"
      :disabled="modelValue === max"
      data-test-unit="incrementButton"
      @click="emit('update:modelValue', modelValue + 1)"
    >
      <PlusIcon :class="['counter-icon', size]" data-test-unit="counterIcon" />
    </button>
  </div>
</template>

<style lang="scss" scoped>
.counter-wrap {
  @apply flex items-center;
  .counter {
    @apply text-2xl mx-[8px] text-[#52106A];
  }
  .button {
    border: 1px solid #939393;
    border-radius: 50%;
    padding: 5px;
    &:hover {
      border-color: #52106a;
      .counter-icon {
        color: #52106a;
      }
    }
    .counter-icon {
      @apply text-[#939393]  cursor-pointer;
      &.small {
        @apply w-[12px] h-[12px];
      }

      &.normal {
        @apply w-[16px] h-[16px];
      }
    }
  }
  .button:disabled,
  .button[disabled] {
    border-color: #939393;
    cursor: default;
    &:hover {
      border-color: #939393;
      .counter-icon {
        color: #939393;
        cursor: default;
      }
    }
  }
}
</style>
