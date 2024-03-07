<script setup lang="ts">
import AppSelect from '~/components/AppSelect/AppSelect.vue'
definePageMeta({
  layout: 'playground',
})

const clothesSizes = ref([
  { id: 1, label: 'EU 15.80 | USA 5.25', chest: 32, waist: 24, hip: 34 },
  { id: 2, label: 'EU 15.80 | USA 5.26', chest: 34, waist: 26, hip: 36 },
  { id: 3, label: 'EU 15.80 | USA 5.27', chest: 36, waist: 28, hip: 38 },
  { id: 4, label: 'EU 15.80 | USA 5.28', chest: 38, waist: 30, hip: 40 },
  { id: 5, label: 'EU 15.80 | USA 5.29', chest: 40, waist: 32, hip: 42 },
])

const selectedOptions = ref([])
</script>

<template>
  <div class="h-[100vh] flex justify-center items-center">
    <AppSelect v-model="selectedOptions" :options="clothesSizes" :multiselect="true" placeholder="Chose a size">
      <template #option-label="{ option }">
        {{ option.label }}
      </template>
    </AppSelect>
  </div>
</template>
