import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppButton from './AppButton.vue'

describe('AppButton.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppButton)
  })

  const testCases = [
    { props: {}, classes: ['filled'] },
    { props: { state: 'success' }, classes: ['filled', 'success'] },
    { props: { state: 'error' }, classes: ['filled', 'error'] },

    { props: { variant: 'outlined' }, classes: ['outlined'] },
    { props: { variant: 'outlined', state: 'success' }, classes: ['outlined', 'success'] },
    { props: { variant: 'outlined', state: 'error' }, classes: ['outlined', 'error'] },

    { props: { variant: 'transparent' }, classes: ['transparent'] },
    { props: { variant: 'transparent', state: 'success' }, classes: ['transparent', 'success'] },
    { props: { variant: 'transparent', state: 'error' }, classes: ['transparent', 'error'] },

    { props: { size: 'small' }, classes: ['small'] },
    { props: { size: 'normal' }, classes: ['normal'] },
    { props: { size: 'large' }, classes: ['large'] },

    { props: { fullWidth: true }, classes: ['full'] },
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

  it('should display feedback message under the button', async () => {
    const feedbackMessage = 'test feedback'
    await component.setProps({ feedback: feedbackMessage })
    const paragraph = await component.find('p')

    expect(paragraph.exists()).toBe(true)
    expect(paragraph.text()).toStrictEqual(feedbackMessage)
  })

  it('should display loader if loading props true', async () => {
    await component.setProps({ loading: true })
    const loader = component.find('button').find('.loader')

    expect(loader.exists()).toBe(true)
  })

  it('should make button disabled, if we provide disabled attribute', async () => {
    component = shallowMount(AppButton, {
      attrs: {
        disabled: true,
      },
    })
    const button = await component.find('button')

    expect(button.attributes().disabled).toBeDefined()
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

  it('should throw an error when we use both "to" and "href" props', async () => {
    try {
      component = shallowMount(AppButton, {
        props: {
          to: '/to',
          href: '/href',
        },
      })
    } catch (error) {
      if (error instanceof Error) {
        expect(!!error.message).toBe(true)
      }
    }
  })
})
