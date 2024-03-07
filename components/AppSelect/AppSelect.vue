<script setup lang="ts" generic="T">
import { ref } from 'vue'
import { onClickOutside } from '@vueuse/core'

interface Props {
  options: Array<T>
  mapValue?: (option: T) => T
  multiselect?: boolean
  placeholder?: string
  modelValue: T[] | T
}

const props = withDefaults(defineProps<Props>(), {
  options: Array,
  mapValue: (option: T) => (option && option.value) || option,
  multiselect: false,
  placeholder: 'Select options',
  modelValue: Array,
})

const emit = defineEmits(['update:modelValue'])

const target = ref(null)
const optionsIsVisible = ref(false)

onClickOutside(target, () => (optionsIsVisible.value = false))

function showOptions() {
  optionsIsVisible.value = true
}

function selectOption(option: T): void {
  if (props.multiselect) {
    handleCheckboxChange(option)
  } else {
    handleRadioChange(option)
  }
}
function getOptionValue<T>(option: T): T {
  return props.mapValue(option)
}

function handleCheckboxChange(value: T): void {
  const updatedOptions = [...props.modelValue]
  const index = updatedOptions.indexOf(value)

  if (index === -1) {
    updatedOptions.push(value)
  } else {
    updatedOptions.splice(index, 1)
  }
  emit('update:modelValue', updatedOptions)
}
function handleRadioChange(value: T): void {
  emit('update:modelValue', value)
  optionsIsVisible.value = false
}
</script>

<template>
  <div class="select-wrap">
    <div class="select" data-test-unit="select" @click="showOptions">
      <p data-test-unit="placeholder">{{ placeholder }}</p>
      <img src="../../assets/icons/selectArrow.svg" alt="" />
    </div>
    <div v-show="optionsIsVisible" ref="target" data-test-unit="options-wrap" class="options-wrap">
      <ul class="list" data-test-unit="list">
        <div v-for="option of props.options" :key="option.hip" class="option-wrap">
          <li class="option" data-test-unit="option">
            <div v-if="multiselect" class="relative">
              <input type="checkbox" class="checkbox" data-test-unit="checkbox" :value="getOptionValue<T>(option)" />
              <span
                data-test-unit="checkmark"
                class="checkmark"
                :class="{ activeBox: modelValue?.includes(option) }"
                @click="handleCheckboxChange(option)"
              ></span>
            </div>
            <div v-else>
              <input type="radio" class="checkbox" data-test-unit="checkbox" :value="getOptionValue<T>(option)" />
              <span
                data-test-unit="checkmark"
                class="checkmark"
                :class="{ activeBox: modelValue === getOptionValue<T>(option) }"
                @click="handleRadioChange(getOptionValue<T>(option))"
              ></span>
            </div>
            <label class="cursor-pointer" @click="selectOption(option)">
              <slot name="option-label" :option="option"> Here should be size </slot>
            </label>
          </li>
        </div>
      </ul>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.select-wrap {
  @apply relative;

  .select {
    border: 1px solid #420d55;
    box-shadow: 0px 0px 0px 2px #dccfe1;
    @apply flex items-center justify-between px-3 h-[35px] w-[185px]  rounded-[5px] bg-[white];
  }
  .options-wrap {
    border: 1px solid #52106a;
    padding: 8px 4px 8px 8px;
    @apply absolute w-[185px] top-[44px] rounded-[5px] z-50  bg-[white];
    .list {
      @apply h-[85px] overflow-y-auto;
      &::-webkit-scrollbar {
        width: 3px;
      }

      &::-webkit-scrollbar-track {
        background: #f1f1f1;
        border-radius: 6px;
      }

      &::-webkit-scrollbar-thumb {
        border-radius: 5px;
        background: #52106a;
      }
    }
    .option-wrap {
      @apply relative;
      .checkbox {
        opacity: 0;
        margin-right: 5px;
      }
      .checkmark {
        border: 1px solid #c4c4c4;
        @apply absolute mr-2 w-[10px] h-[10px] top-[5px] left-0 rounded-[50%] bg-[white] cursor-pointer;
      }

      .activeBox {
        border: 1px solid #52106a;
        background: #52106a;
      }
      .option {
        line-height: 19px;
        letter-spacing: 0.07px;
        cursor: pointer;
        @apply flex items-center pb-[6px] text-sm w-full cursor-pointer;
      }
    }
  }
}
</style>
