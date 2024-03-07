import { mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'
import AccordionItem from './AccordionItem.vue'

describe('AppCollapsible.vue component', () => {
  let component: any
  const content = 'Content slot'
  const title = 'Title slot'
  beforeEach(() => {
    component = mount(AccordionItem, {
      slots: {
        title,
        content,
      },
    })
  })

  it('should render only collapsed accordion button', async () => {
    const button = await component.find('button')

    expect(button.text()).toBe(title)
    expect(component.html()).not.toContain(content)
  })

  it('should show accordion content when button clicked', async () => {
    const button = await component.find('button')

    await button.trigger('click')

    expect(button.text()).toBe(title)
    expect(component.html()).toContain(content)
  })

  it('should render start arrow icon when iconPosition prop is start', async () => {
    await component.setProps({ iconPosition: 'start' })
    const button = await component.find('button')

    expect(button.find('.left-icon').exists()).toBe(true)
  })

  it('should render end plus icon when iconPosition prop is end', async () => {
    await component.setProps({ iconPosition: 'end' })
    const button = await component.find('button')

    expect(button.find('.right-icon').exists()).toBe(true)
  })
})
