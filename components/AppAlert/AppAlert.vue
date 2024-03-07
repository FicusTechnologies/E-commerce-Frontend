<script setup lang="ts">
import { XMarkIcon } from '@heroicons/vue/16/solid'
import IconButton from '~/components/IconButton/IconButton.vue'

const props = withDefaults(
  defineProps<{
    show: boolean
    state?: 'success' | 'error'
    message: string
  }>(),
  {
    state: 'success',
  },
)

const emit = defineEmits<{
  (e: 'close'): void
}>()
</script>

<template>
  <div v-if="show" class="alert" :class="state">
    <p class="mr-4">{{ message }}</p>
    <icon-button variant="transparent" size="small" @click="emit('close')">
      <XMarkIcon />
    </icon-button>
  </div>
</template>

<style lang="scss" scoped>
.alert {
  @apply w-fit p-4 flex items-center rounded-md;
}
.success {
  @apply bg-lime-100 text-lime-800;
}
.error {
  @apply bg-red-100 text-red-800;
}
</style>
