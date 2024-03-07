<script setup lang="ts">
import { useSlots } from 'vue'
import { onClickOutside } from '@vueuse/core'

const props = defineProps<{ show: boolean }>()
const emit = defineEmits(['closeModal'])
const target = ref(null)
const slots = useSlots()
function onClose() {
  emit('closeModal')
}
onClickOutside(target, () => emit('closeModal'))
</script>

<template>
  <ClientOnly>
    <Teleport to="#modal-container">
      <div v-if="props.show" class="main-wrap" data-test-unit="modalBackground">
        <div ref="target" class="modal" data-test-unit="modalWindow">
          <div class="modal-header">
            <slot name="header" :on-close="onClose"></slot>
            <img
              class="close-icon"
              src="../../assets/icons/closeIcon.svg"
              data-test-unit="closeIcon"
              alt="Close icon"
              @click="onClose"
            />
          </div>
          <div class="modal-body-wrap" :class="!slots.header || !slots.footer ? 'pt-8 pb-7' : 'py-5'">
            <div class="modal-body">
              <slot :on-close="onClose"></slot>
            </div>
          </div>
          <div v-if="slots.footer" class="modal-footer">
            <slot name="footer" :on-close="onClose"></slot>
          </div>
        </div>
      </div>
    </Teleport>
  </ClientOnly>
</template>

<style lang="scss" scoped>
@mixin boxShadow() {
  box-shadow: 0px 0px 0px 4px rgba(255, 255, 255, 0.25);
}

.main-wrap {
  background: rgba(0, 0, 0, 0.6);
  @apply flex justify-center items-center absolute top-0 bottom-0 left-0 right-0 z-[999] overflow-hidden;

  .modal {
    @include boxShadow();
    @apply flex flex-col relative max-w-[874px] max-h-[515px] min-w-[423px] min-h-[220px]  bg-[white] rounded-[10px] p-5;
    .close-icon {
      @apply absolute right-4 top-[22px] h-4 cursor-pointer;
    }
    &-header {
      line-height: 25px;
      letter-spacing: 0.09px;
      @apply flex justify-between items-center text-[#420d55] text-lg font-medium;
    }
    .modal-body-wrap {
      @apply flex;
      .modal-body {
        flex-grow: 1;
        @apply text-xl leading-8;
      }
    }

    &-footer {
      height: 100px;
      @apply flex justify-end items-end;
    }
  }
}
</style>
