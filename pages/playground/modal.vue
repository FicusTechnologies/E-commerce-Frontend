<script setup lang="ts">
import AppModal from '../../components/AppModal/AppModal.vue'
import { ref } from 'vue'
definePageMeta({
  layout: 'playground',
})
const isShownModal = ref(true)
const buttonNames: Array<{ id: number; name: string }> = [
  { id: 1, name: 'Cancel' },
  { id: 2, name: 'Ok' },
]

function closeModal() {
  isShownModal.value = false
}
</script>
<template>
  <AppModal :show="isShownModal" @close-modal="closeModal">
    <template #header>The product has been added to the cart</template>
    <template #default>
      So, how can we better design error messages to improve the user experience and increase conversions?So, how can we
      better design error messages to improve the user experience and increase conversions?So, how can we better design
      error messages to improve the user experience and increase conversions?So, how can we better design error messages
      to improve the user experience and increase conversions?So, how can we better design error messages to improve the
      user experience and increase conversions?So, how can we better design error messages to improve the user
      experience and increase conversions?
    </template>
    <template #footer="{ onClose }">
      <button
        v-for="button in buttonNames"
        :key="button.id"
        class="button"
        :class="button.name === 'Cancel' ? 'cancel-button' : 'ok-button'"
        @click="onClose"
      >
        {{ button.name }}
      </button>
    </template>
  </AppModal>
</template>

<style lang="scss" scoped>
.button {
  @apply max-h-10 w-20 py-1 px-[10px] text-base rounded-lg;
}
.cancel-button {
  border: 2px solid;
  color: black;
  @apply font-bold  mr-1 border-violet-500;
}

.ok-button {
  @apply font-semibold text-[white] bg-violet-900;
}
</style>
