<script setup lang="ts">
import AppContainer from '../../components/AppContainer/AppContainer.vue'
import AppGrid from '../../components/AppGrid/AppGrid.vue'
import AppGridItem from '../../components/AppGrid/AppGridItem.vue'

import { ref } from 'vue'
definePageMeta({
  layout: 'playground',
})

const items: {
  id: number
  label: string
  title: string
}[] = [
  { id: 1, label: 'sacrality', title: 'hexagon light' },
  { id: 2, label: 'sacrality', title: 'hexagon light' },
  { id: 3, label: 'sacrality', title: 'hexagon light' },
  { id: 4, label: 'sacrality', title: 'hexagon light' },
  { id: 5, label: 'sacrality', title: 'hexagon light' },
  { id: 6, label: 'sacrality', title: 'hexagon light' },
  { id: 7, label: 'sacrality', title: 'hexagon light' },
  { id: 8, label: 'sacrality', title: 'hexagon light' },
  { id: 9, label: 'sacrality', title: 'hexagon light' },
  { id: 10, label: 'sacrality', title: 'hexagon light' },
  { id: 11, label: 'sacrality', title: 'hexagon light' },
  { id: 12, label: 'sacrality', title: 'hexagon light' },
  { id: 13, label: 'sacrality', title: 'hexagon light' },
  { id: 14, label: 'sacrality', title: 'hexagon light' },
  { id: 15, label: 'sacrality', title: 'hexagon light' },
  { id: 16, label: 'sacrality', title: 'hexagon light' },
]
const gridCol = ref({ sm: 1, md: 2, lg: 3, xl: 4, '2xl': 4 })
const colGap = ref({ sm: 0, md: 6, lg: 6, xl: 6, '2xl': 6 })
const rowGap = ref({ sm: 8, md: 2, lg: 4, xl: 4, '2xl': 4 })
const colSpan = ref({ sm: 0, md: 0, lg: 0, xl: 0, '2xl': 0 })
const rowSpan = ref({ sm: 0, md: 0, lg: 0, xl: 0, '2xl': 0 })
</script>

<template>
  <AppContainer>
    <AppGrid :grid-col="gridCol" :col-gap="colGap" :row-gap="rowGap">
      <AppGridItem v-for="item of items" :key="item.id" :row-span="rowSpan" :col-span="colSpan">
        <img src="../../assets/icons/Photo1.png" alt="" />
        <span class="content">
          <p class="label">{{ item.label }}</p>
          <h2 class="title">{{ item.title }}</h2>
        </span>
      </AppGridItem>
    </AppGrid>
  </AppContainer>
</template>

<style lang="scss" scoped>
.content {
  @apply flex flex-col items-end uppercase;
  .label {
    @apply text-xs;
  }
  .title {
    @apply text-lg font-medium;
  }
}
</style>
