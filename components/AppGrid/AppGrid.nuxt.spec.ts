import { shallowMount, mount } from '@vue/test-utils'
import { describe, it, expect, beforeEach } from 'vitest'

import AppGrid from './AppGrid.vue'

describe('AppGrid.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppGrid)
  })
  it('renders correctly with default props', () => {
    expect(component.exists()).toBe(true)
  })
  it('renders correctly with custom props', () => {
    const wrapper = mount(component, {
      props: {
        colGap: {
          sm: 0,
          md: 6,
        },
        rowGap: {
          sm: 8,
          md: 2,
        },
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('should render item with corect prop styles', async () => {
    await component.setProps({ colGap: { sm: 2, md: 3 }, rowGap: 1 })
    const item = await component.find('[data-test-unit="grid"]')

    expect(item.classes()).toContain('sm:gap-x-2')
    expect(item.classes()).toContain('md:gap-x-3')
    expect(item.classes()).toContain('gap-y-1')
  })
})
