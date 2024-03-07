import { mount, VueWrapper } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AppAlert from '~/components/AppAlert/AppAlert.vue'
import IconButton from '~/components/IconButton/IconButton.vue'

describe('AppAlert.vue component', () => {
  let component: VueWrapper
  const alertMessage = 'alert message'
  beforeEach(() => {
    component = mount(AppAlert, {
      props: {
        message: alertMessage,
        show: true,
      },
      components: {
        IconButton,
      },
    })
  })

  it('should render alert message when props provided', async () => {
    const paragraph = component.find('p')

    expect(paragraph.text()).toBe(alertMessage)
  })

  it('should render error alert when state props is error', async () => {
    await component.setProps({ state: 'error' })
    const alert = component.find('.alert')

    expect(alert.classes()).toContain('error')
  })

  it('should emit close event when close button clicked', async () => {
    const btn = component.get('.button')
    await btn.trigger('click')

    expect(component.emitted().close).toBeTruthy()
  })
})
