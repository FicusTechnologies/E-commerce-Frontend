import { shallowMount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AppSelect from './AppSelect.vue'

describe('AppSelect.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppSelect, {
      props: {
        options: [
          { hip: 1, value: 'Option 1' },
          { hip: 2, value: 'Option 2' },
          { hip: 3, value: 'Option 3' },
        ],
        modelValue: [],
        multiselect: false,
        'onUpdate:modelValue': async (modelValue: any) => await component.setProps({ modelValue }),
      },
      slots: {
        'option-label': 'Here should be size',
      },
    })
  })

  it('should render placeholder text initially', async () => {
    const placeholder = await component.find('[data-test-unit="placeholder"]')
    expect(placeholder.text()).toBe('Select options')
  })

  it('should render slot text', async () => {
    expect(component.html()).toContain('Here should be size')
  })

  it('maps values correctly with mapValue function', async () => {
    const component = shallowMount(AppSelect, {
      props: {
        options: [{ value: 'A' }, { value: 'B' }, { value: 'C' }],
      },
    })

    const mapValueFunction = component.vm.mapValue

    expect(mapValueFunction({ value: 'A' })).toBe('A')
    expect(mapValueFunction({ value: 'B' })).toBe('B')
    expect(mapValueFunction({ value: 'C' })).toBe('C')
  })

  it('should show options when clicked on select', async () => {
    const select = await component.find('[data-test-unit="select"]')
    await select.trigger('click')

    const optionsWrap = await component.find('[data-test-unit="options-wrap"]')
    expect(optionsWrap.isVisible()).toBe(true)
  })

  it('should update modelValue on selecting an option', async () => {
    await component.setProps({ multiselect: true })
    const select = await component.find('.select')
    await select.trigger('click')

    const firstOption = await component.find('.checkmark')
    await firstOption.trigger('click')

    expect(component.emitted()['update:modelValue'][0][0]).toEqual([component.vm.props.options[0]])
  })

  it('should close options when clicked outside', async () => {
    const select = await component.find('[data-test-unit="select"]')
    await select.trigger('click')

    document.body.click()

    expect(component.vm.optionsIsVisible).toBe(false)
  })

  it('should close options in the single select mode', async () => {
    await component.setProps({ multiselect: false })
    const select = await component.find('[data-test-unit="select"]')
    await select.trigger('click')

    const option = await component.find('.checkmark')
    await option.trigger('click')

    expect(component.vm.optionsIsVisible).toBe(false)
  })

  it('selects and deselects options properly in multiselect mode', async () => {
    await component.setProps({
      multiselect: true,
    })
    await component.find('[data-test-unit="select"]').trigger('click')

    const checkmarks = component.findAll('[data-test-unit="checkmark"]')

    await checkmarks[0].trigger('click')
    await checkmarks[1].trigger('click')

    expect(component.vm.props.modelValue).toEqual([component.vm.props.options[0], component.vm.props.options[1]])

    await checkmarks[0].trigger('click')

    expect(component.vm.props.modelValue).toEqual([component.vm.props.options[1]])
  })
})
