import { mount } from '@vue/test-utils'

import { describe, it, expect, beforeEach } from 'vitest'

import AppModal from './AppModal.vue'
describe('AppModal component', () => {
  let component: any

  beforeEach(() => {
    component = mount(AppModal)
  })

  it('should render modal with default props value', async () => {
    expect(component.props()).toEqual({
      show: false,
    })
  })

  it('does not render modal when show prop is false', async () => {
    await component.setProps({ show: false })
    const modal = document.querySelector('[data-test-unit="modalWindow"]')
    expect(modal).toBeNull()
  })

  it('render modal when show prop is true', async () => {
    await component.setProps({ show: true })
    const modal = document.querySelector('[data-test-unit="modalWindow"]')

    expect(modal).not.toBeNull()
  })

  it('renders header and footer slots in the proper places', async () => {
    const component = mount(AppModal, {
      props: {
        show: true,
      },
      slots: {
        header: '<div class="header">Hello, Slot!</div>',
        footer: '<div class="footer">Hello, Slot!</div>',
      },
    })

    await component.vm.$nextTick()

    const headerSlot = await document.querySelector('.header')
    const footerSlot = await document.querySelector('.footer')

    expect(headerSlot).not.toBeNull()
    expect(headerSlot.textContent).toBe('Hello, Slot!')

    expect(footerSlot).not.toBeNull()
    expect(footerSlot.textContent).toBe('Hello, Slot!')
  })

  it('does not render header and footer containers when slots are not provided', async () => {
    const component = mount(AppModal, {
      props: { show: true },
    })

    expect(component.vm.slots.header).toBeUndefined()
    expect(component.vm.slots.footer).toBeUndefined()
  })

  it('emits closeModal event when close icon is clicked', async () => {
    await component.setProps({ show: true })
    component.vm.$nextTick()

    await document.querySelector('.close-icon').click()

    expect(component.emitted().closeModal).toBeTruthy()
  })

  it('emits closeModal event when backdrop is clicked', async () => {
    await component.setProps({ show: true })
    component.vm.$nextTick()

    await document.querySelector('[data-test-unit="modalBackground"]').click()

    expect(component.emitted().closeModal).toBeTruthy()
  })
})
