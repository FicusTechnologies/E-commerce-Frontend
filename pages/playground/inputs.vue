<script setup lang="ts">
import { ref } from 'vue'
import AppInput from '../../components/AppInput/AppInput.vue'
definePageMeta({
  layout: 'playground',
})
const inputData: Ref<Record<string, string>> = ref({
  firstName: '',
  email: '',
  password: '',
})
</script>

<template>
  <div class="main-wrap">
    <AppInput
      v-model="inputData.firstName"
      data-test="text"
      type="text"
      label="First name"
      feedback="This is a feedback message"
    />
    <AppInput v-model="inputData.email" data-test="email" type="email" label="Email" :valid="true" />
    <AppInput v-model="inputData.password" data-test="password" type="password" label="Password" :invalid="true">
      <template #append>
        <p>
          <NuxtLink to="forgot">Forgot password?</NuxtLink>
        </p>
      </template>
    </AppInput>
  </div>
</template>

<style lang="scss" scoped>
.main-wrap {
  @apply h-96 w-[1000px] flex justify-center items-center flex-col;
}
</style>
