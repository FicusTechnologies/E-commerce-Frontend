<script setup lang="ts">
import { useAttrs, useSlots } from 'vue'
import { EyeIcon, EyeSlashIcon } from '@heroicons/vue/24/solid'

const props = defineProps<{
  wrapperClass?: string
  label: string
  modelValue: string
  invalid?: boolean
  valid?: boolean
  feedback?: string
}>()

defineOptions({
  inheritAttrs: false,
})

const emit = defineEmits(['update:modelValue'])

const attrs = useAttrs()
const slots = useSlots()

const isPasswordType = ref(attrs.type === 'password')
const localType = ref(attrs.type)

const isEmpty = computed(() => !props.modelValue)

function togglePasswordVisability() {
  if (localType.value === 'password') {
    localType.value = 'text'
  } else {
    localType.value = 'password'
  }
}
</script>

<template>
  <div class="mb-5">
    <div class="input-wrap" :class="[{ valid, invalid }, wrapperClass]">
      <!-- Placeholder requaired to be an empty string for transition -->
      <div class="absolute">
        <slot name="prepend"></slot>
      </div>

      <input
        :class="[{ valid, invalid }, slots.prepend ? 'pl-[30px]' : 'pl-[15px]']"
        v-bind="$attrs"
        :type="localType"
        :value="modelValue"
        class="input"
        placeholder=" "
        @input="(e) => emit('update:modelValue', e.target?.value)"
      />

      <div v-if="isPasswordType">
        <div v-if="isEmpty" class="append-password-slot"><slot name="append"></slot></div>
        <div v-else class="eye-wrap">
          <EyeSlashIcon
            v-if="localType === 'password'"
            data-test-unit="eye-slash"
            class="eye"
            @click="togglePasswordVisability"
          />

          <EyeIcon
            v-if="localType === 'text'"
            data-test-unit="eye-not-slash"
            class="eye"
            @click="togglePasswordVisability"
          />
        </div>
      </div>

      <label class="label" :class="slots.prepend ? 'left-[20px]' : 'left-[15px]'">{{ label }}</label>
    </div>
    <p v-if="feedback" class="feedback">{{ feedback }}</p>
  </div>
</template>

<style lang="scss" scoped>
@mixin fieldShadow($borderColor, $shadowColor) {
  border: 1px solid $borderColor;
  box-shadow: 0px 0px 0px 3px $shadowColor;
}
.input-wrap {
  border: 1px solid #a8a8a8;
  @apply relative flex items-center justify-between mb-[10px]  w-[400px] rounded-[10px] bg-[#fff];
  &:hover {
    @apply border-violet-600;
    .label {
      @apply text-black-600;
    }
  }

  .input {
    @apply text-sm font-normal py-[13px] pr-[15px] w-full outline-none rounded-[10px] text-black-600;
    &:focus {
      @include fieldShadow(#420d55, #dccfe1);
    }
  }

  .invalid[type='password'] {
    color: #c3324b;
  }
  .append-password-slot {
    @apply absolute right-[11px] top-[15px] text-xs text-[#919191] hover:text-violet-600;
  }
  .eye-wrap {
    @apply absolute right-[11px] top-[15px] cursor-pointer;
    .eye {
      width: 18px;
    }
  }
  .label {
    transition: 0.3s;
    @apply absolute top-[14px] text-sm px-[5px] text-[#919191] pointer-events-none;
  }

  input:not(:placeholder-shown) ~ label,
  input:focus ~ label {
    letter-spacing: 0.06px;
    color: #919191 !important;
    @apply text-xs leading-4 top-[-8px] left-5 px-3 bg-[#fff];
  }
}
.feedback {
  letter-spacing: 0.07px;
  @apply text-sm font-medium leading-5 text-[#9ca3af];
}

.valid {
  @include fieldShadow(#84cc16, #e6f5d0);
  @apply hover:border-[#84cc16];
}

.invalid {
  @include fieldShadow(#c3324b, #fdd9df);
  @apply hover:border-[#c3324b];
}
</style>
