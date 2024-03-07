<script setup lang="ts" generic="T">
const slots = useSlots()
interface Props {
  columns: Record<string, string>[]
  data: Array<T>
  loading?: boolean
  tableClass?: string
  headerCellClass?: string
  bodyCellClass?: string
}
const props = withDefaults(defineProps<Props>(), {
  loading: false,
})
</script>
<template>
  <div v-if="columns.length" class="w-full">
    <table :class="['table', tableClass]">
      <thead>
        <tr>
          <th v-for="column in columns" :key="column.id" :class="['table__header-cell', headerCellClass]">
            {{ column.title }}
          </th>
        </tr>
      </thead>
      <tbody>
        <template v-if="data.length && !loading">
          <tr v-for="(item, index) of data" :key="index">
            <td v-for="column in columns" :key="column.id" :class="['table__body-cell', bodyCellClass]">
              <slot :name="column.id" :item="item">
                {{ item[column.id] }}
              </slot>
            </td>
          </tr>
        </template>
        <tr v-else-if="loading">
          <td class="w-full text-center" :class="['table__body-cell', bodyCellClass]">
            <span class="loader" data-test-unit="loader"></span>
          </td>
        </tr>
        <tr v-else-if="!loading && !data.length">
          <td :class="[bodyCellClass]">
            <slot name="empty">No data</slot>
          </td>
        </tr>
      </tbody>
    </table>
    <div class="table__summary" v-if="slots.summary">
      <slot name="summary"></slot>
    </div>
  </div>
</template>
<style lang="scss" scoped>
th,
td {
  font-size: 16px;
  font-weight: 400;
  text-align: left;
  color: black;
}

.loader {
  width: 24px;
  height: 24px;
  border: 3px solid;
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: rotation 1s linear infinite;
}

.table {
  @apply w-full border-separate text-base font-normal border-spacing-y-[10px];

  &__header-cell {
    @apply bg-[white] first:pl-10;
  }

  &__body-cell {
    @apply bg-[#f5f5f5] py-[30px] first:rounded-l-[10px] first:pl-10 last:rounded-r-[10px] last:pr-10;
  }
}

@keyframes rotation {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
</style>
