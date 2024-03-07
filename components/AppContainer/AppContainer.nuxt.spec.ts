import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import AppContainer from './AppContainer.vue'

describe('AppContainer.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppContainer)
  })
  it('should renders correctly', () => {
    expect(component.exists()).toBe(true)
  })
})
