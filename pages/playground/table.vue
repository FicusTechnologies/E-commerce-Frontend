<script setup lang="ts">
import { ref } from 'vue'
import AppTable from '~/components/AppTable/AppTable.vue'
import AppSelect from '@/components/AppSelect.vue'

definePageMeta({
  layout: 'playground',
})

const сolumns = ref([
  { id: 'name', title: 'Name' },
  { id: 'size', title: 'Size' },
  { id: 'metal', title: 'Metal' },
  { id: 'probe', title: 'Probe' },
  { id: 'quantity', title: 'Quantity' },
  { id: 'cost', title: 'Cost' },
])

const tableData = ref([
  {
    name: 'Earrings Selentoni',
    size: [
      { id: 1, label: 'EU 15.80 | USA 5.25', chest: 32, waist: 24, hip: 34 },
      { id: 2, label: 'EU 15.80 | USA 5.26', chest: 34, waist: 26, hip: 36 },
      { id: 3, label: 'EU 15.80 | USA 5.26', chest: 34, waist: 26, hip: 36 },
      { id: 4, label: 'EU 15.80 | USA 5.26', chest: 34, waist: 26, hip: 36 },
    ],
    metal: 'Wite gold',
    probe: '95',
    quantity: 'here gonna be counter comp',
    cost: '343$',
  },
  {
    name: 'Earrings Selentoni',
    size: [
      { id: 1, label: 'EU 15.80 | USA 5.25', chest: 32, waist: 24, hip: 34 },
      { id: 2, label: 'EU 15.80 | USA 5.26', chest: 34, waist: 26, hip: 36 },
    ],
    metal: 'Wite gold',
    probe: '95',
    quantity: 'here gonna be counter comp',
    cost: '343$',
  },
])

const selectedOptions = ref([])
const isLoading = ref(false)

const secondTableClass = ref(
  'w-full border-separate text-base font-normal border-spacing-0 bg-[#f5f5f5] rounded-[10px]',
)
const secondHaderCellClass = ref('py-4 first:pl-10  bg-[#f5f5f5] first:rounded-tl-[10px] last:rounded-tr-[10px]')

const thierdTableClass = ref(
  'w-full border-separate text-base font-normal border-spacing-0 rounded-t-[10px] bg-[#f5f5f5] px-5',
)
const thierdHeaderCellClass = ref('bg-[#f5f5f5] py-4 first:pl-10 first:rounded-tl-[10px] last:rounded-tr-[10px]')
const thierdBodyCellClass = ref('bg-[#f5f5f5] py-[30px] first:pl-10 last:pr-10 border-b-2 border-[#C4C4C4]')
</script>

<template>
  <div class="h-[100vh] flex justify-center items-center flex-col w-full">
    <!-- <AppTable :columns="сolumns" :data="tableData" :loading="isLoading">
      <template #size="{ item }">
        <AppSelect v-model="selectedOptions" :options="item.size" :multiselect="true" placeholder="Chose a size">
          <template #option-label="{ option }">
            {{ option.label }}
          </template>
        </AppSelect>
      </template>

      <template #empty>
        <div>No data available. Please try again later.</div>
      </template>

      <template #summary>
        <div class="pl-6">* This item is available for pre-order. Product production time 5-7 working days</div>
      </template>
    </AppTable>
    -->

    <AppTable
      :columns="сolumns"
      :data="tableData"
      :loading="isLoading"
      :table-class="secondTableClass"
      :header-cell-class="secondHaderCellClass"
    >
      <template #size="{ item }">
        <AppSelect v-model="selectedOptions" :options="item.size" :multiselect="true" placeholder="Chose a size">
          <template #option-label="{ option }">
            {{ option.label }}
          </template>
        </AppSelect>
      </template>

      <template #empty>
        <div>You haven't placed any orders yet.</div>
      </template>
    </AppTable>

    <!-- <AppTable
      :columns="сolumns"
      :data="tableData"
      :loading="isLoading"
      :table-class="thierdTableClass"
      :header-cell-class="thierdHeaderCellClass"
      :body-cell-class="thierdBodyCellClass"
    >
      <template #size="{ item }">
        <AppSelect v-model="selectedOptions" :options="item.size" :multiselect="true" placeholder="Chose a size">
          <template #option-label="{ option }">
            {{ option.label }}
          </template>
        </AppSelect>
      </template>

      <template #empty>
        <div>No data available. Please try again later.</div>
      </template>

      <template #summary>
        <div class="bg-[#f5f5f5] py-[30px] first:pl-10 last:pr-10 rounded-b-[10px] text-end">
          Total items: {{ tableData.length }}
        </div>
      </template>
    </AppTable> -->
  </div>
</template>
