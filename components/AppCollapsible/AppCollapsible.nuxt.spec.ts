import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AppCollapsible from './AppCollapsible.vue'

describe('AppCollapsible.vue component', () => {
  let component: any
  beforeEach(() => {
    component = shallowMount(AppCollapsible, {
      props: {
        collapsed: true,
      },
    })
  })

  it("shouldn't render content when collapsed props is true", async () => {
    const slotContainer = await component.find('.slot-container')

    expect(slotContainer.exists()).toBe(false)
  })

  it('should render content when collapsed props is false', async () => {
    await component.setProps({ collapsed: false })
    const slotContainer = await component.find('.slot-container')

    expect(slotContainer.exists()).toBe(true)
  })
})
