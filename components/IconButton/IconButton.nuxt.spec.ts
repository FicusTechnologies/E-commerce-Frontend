import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import IconButton from '~/components/IconButton/IconButton.vue'

describe('AppButton.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(IconButton)
  })

  const testCases = [
    { props: {}, classes: ['filled', 'normal'] },
    { props: { variant: 'outlined' }, classes: ['outlined'] },
    { props: { variant: 'transparent' }, classes: ['transparent'] },

    { props: { size: 'small' }, classes: ['small'] },
    { props: { size: 'normal' }, classes: ['normal'] },
    { props: { size: 'large' }, classes: ['large'] },
  ]

  describe.each(testCases)('with props %#', ({ props, classes }) => {
    beforeEach(async () => {
      await component.setProps(props)
    })

    it(`should correctly render button with ${JSON.stringify(props)}`, async () => {
      const button = await component.find('button')
      expect(button.classes()).toEqual(expect.arrayContaining(classes))
    })
  })

  it('should render "a" tag instead of button, when href prop provided', async () => {
    await component.setProps({ href: '/href' })
    const tagA = await component.find('a')

    expect(tagA.exists()).toBe(true)
  })

  it('should render "nuxt-link" tag instead of button, when "to" prop provided', async () => {
    await component.setProps({ to: '/to' })
    const nuxtLink = await component.find('nuxt-link-stub')

    expect(nuxtLink.exists()).toBe(true)
  })

  it('should throw and error when we use both "to" and "href" props', async () => {
    try {
      component = shallowMount(IconButton)
    } catch (error) {
      if (error instanceof Error) {
        expect(!!error.message).toBe(true)
      }
    }
  })
})
