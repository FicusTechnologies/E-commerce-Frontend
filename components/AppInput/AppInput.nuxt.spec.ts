import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import AppInput from './AppInput.vue'

describe('AppInput.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppInput)
  })

  it('should render input with default props value', async () => {
    expect(component.props()).toEqual({
      wrapperClass: undefined,
      label: undefined,
      modelValue: undefined,
      invalid: false,
      valid: false,
      feedback: undefined,
    })
  })

  it('should render input with invalid state', async () => {
    await component.setProps({ invalid: true })
    const input = await component.find('input')

    expect(input.classes()).toContain('invalid')
  })

  it('should render input with valid state', async () => {
    await component.setProps({ valid: true })
    const input = await component.find('input')

    expect(input.classes()).toContain('valid')
  })

  it('should render feedback message below the input', async () => {
    const feedbackMessage = 'test feedback'
    await component.setProps({ feedback: feedbackMessage })
    const feedbackParagraph = await component.find('.feedback')

    expect(feedbackParagraph.text()).toBe(feedbackMessage)
  })

  it('should render input with label', async () => {
    const label = 'Test Label'
    await component.setProps({ label })
    const labelElement = await component.find('.label')

    expect(labelElement.text()).toBe(label)
  })

  it('should not render appended content when input password is not empty', async () => {
    await component.setProps({ modelValue: 'password123' })
    const appendSlot = await component.find('.append-password-slot')

    expect(appendSlot.exists()).toBe(false)
  })

  it('updates modelValue when input value changes and when changed props from parent', async () => {
    const component = shallowMount(AppInput, {
      props: {
        modelValue: 'initialText',
        'onUpdate:modelValue': async (modelValue: any) => await component.setProps({ modelValue }),
      },
    })
    const input = component.get('input')

    await input.setValue('test')
    expect(component.props('modelValue')).toBe('test')

    await component.setProps({ modelValue: 'hello' })
    await component.vm.$nextTick()
    expect(input.element._value).toBe('hello')
  })

  it('binds non-prop attributes to the input element', async () => {
    const component = shallowMount(AppInput, {
      attrs: {
        type: 'email',
        'data-test': 'customTestId',
      },
    })
    const input = component.find('.input')
    expect(input.attributes('type')).toBe('email')
    expect(input.attributes('data-test')).toBe('customTestId')
  })

  it('if disabled attr is provided we cannot type anything in input', async () => {
    const component = shallowMount(AppInput, {
      props: {
        modelValue: 'initialValue',
        'onUpdate:modelValue': (e) => component.setProps({ modelValue: e }),
      },
      attrs: {
        disabled: true,
      },
    })
    const input = component.find('.input')
    await input.setValue('newValue')

    expect(component.vm.props.modelValue).toBe('initialValue')
  })

  it('toggles password visibility when the eye icon is clicked', async () => {
    const component = shallowMount(AppInput, {
      props: {
        modelValue: 'initialPassword',
      },
      attrs: {
        type: 'password',
      },
    })

    // Check if the initial type is 'password'
    const input = component.find('.input')
    expect(input.attributes('type')).toBe('password')

    // Click on the eye icon to toggle password visibility
    const eyeIcon = component.find('.eye')
    await eyeIcon.trigger('click')

    // Check if the type is now 'text' after clicking the eye icon
    expect(input.attributes('type')).toBe('text')

    // Click on the eye icon again to toggle back to password visibility
    await eyeIcon.trigger('click')

    // Check if the type is back to 'password' after the second click
    expect(input.attributes('type')).toBe('password')
  })
})
