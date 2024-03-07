<script setup lang="ts">
const components = [
  { id: 1, path: '/playground/inputs', name: 'Inputs' },
  { id: 2, path: '/playground/modal', name: 'Modal' },
  { id: 3, path: '/playground/multiSelect', name: 'MultiSelect' },
  { id: 4, path: '/playground/singleSelect', name: 'SingleSelect' },
  { id: 5, path: '/playground/grid', name: 'Grid' },
  { id: 5, path: '/playground/table', name: 'Table' },
]
</script>

<template>
  <div class="playground-wrap">
    <slot></slot>
    <ul class="list">
      <li v-for="component of components" :key="component.id" class="item">
        <NuxtLink :to="component.path">{{ component.name }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.playground-wrap {
  @apply h-[100vh] flex flex-col justify-center items-center px-12;
}
.list {
  border: 1px solid #9851b2;
  @apply py-[10px] px-[50px] rounded;
}
.item {
  border: 1px solid #9851b2;
  @apply text-2xl bg-[#52106a] text-[#fff] px-[14px] rounded mb-2;
}
</style>
