import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount, flushPromises } from '@vue/test-utils'
import AppCounter from './AppCounter.vue'

describe('AppButton.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppCounter, {
      props: {
        modelValue: 3,
      },
    })
  })

  it('increments and decrements the counter value', async () => {
    const component = shallowMount(AppCounter, {
      props: {
        modelValue: 0,
        'onUpdate:modelValue': (e) => component.setProps({ modelValue: e }),
      },
    })
    expect(component.find('[data-test-unit="counter"]').text()).toContain('0')
    await component.find('[data-test-unit="incrementButton"]').trigger('click')
    expect(component.find('[data-test-unit="counter"]').text()).toContain('1')

    await component.find('[data-test-unit="decrementButton"]').trigger('click')
    expect(component.find('[data-test-unit="counter"]').text()).toContain('0')
  })
  it(`should correctly render button size`, async () => {
    await component.setProps({ size: 'small' })
    const counterIcon = await component.find('[data-test-unit="counterIcon"]')

    expect(counterIcon.classes()).toContain('small')

    await component.setProps({ size: 'normal' })
    expect(counterIcon.classes()).toContain('normal')
  })

  it('disables buttons when min or max value is reached', async () => {
    const component = shallowMount(AppCounter, {
      props: {
        min: 0,
        max: 5,
        modelValue: 5,
        'onUpdate:modelValue': (e) => component.setProps({ modelValue: e }),
      },
    })

    expect(component.find('[data-test-unit="counter"]').text()).toContain('5')
    await component.find('[data-test-unit="incrementButton"]').trigger('click')
    expect(component.find('[data-test-unit="counter"]').text()).toContain('5')

    await component.setProps({ modelValue: 0 })
    expect(component.find('[data-test-unit="counter"]').text()).toContain('0')
    await component.find('[data-test-unit="decrementButton"]').trigger('click')
    expect(component.find('[data-test-unit="counter"]').text()).toContain('0')
  })
})
