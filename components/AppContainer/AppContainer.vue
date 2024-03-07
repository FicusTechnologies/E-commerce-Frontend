<script setup lang="ts"></script>

<template>
  <div class="app-container" data-test-unit="container">
    <slot></slot>
  </div>
</template>

<style lang="scss" scoped>
.app-container {
  @apply container px-[15px]  my-0 mx-auto;
}

@media (max-width: 640px) {
  .app-container {
    @apply w-full;
  }
}
</style>
