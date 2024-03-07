import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import AppGridItem from './AppGridItem.vue'

describe('AppGridItem.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppGridItem)
  })
  it('renders correctly with default props', () => {
    expect(component.exists()).toBe(true)
  })
  it('renders correctly with custom props', () => {
    const wrapper = mount(component, {
      props: {
        colSpan: { sm: 2, md: 3 },
        rowSpan: 1,
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render item with corect prop styles', async () => {
    await component.setProps({ colSpan: { sm: 2, md: 3 }, rowSpan: 1 })
    const item = await component.find('[data-test-unit="grid-item"]')

    expect(item.classes()).toContain('sm:col-span-2')
    expect(item.classes()).toContain('md:col-span-3')
    expect(item.classes()).toContain('row-span-1')
  })
})
