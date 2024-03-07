import { describe, it, expect, beforeEach } from 'vitest'
import { shallowMount } from '@vue/test-utils'
import AppTypography from '~/components/AppTypography/AppTypography.vue'

describe('AppTypography.vue component', () => {
  let component: any

  beforeEach(() => {
    component = shallowMount(AppTypography)
  })

  it('should have have the default props, if none props was provided', () => {
    // Assert
    expect(component.props()).toStrictEqual({
      variant: 'body4',
      bold: false,
      italic: false,
      uppercase: false,
      underline: false,
      color: 'primary',
    })
  })

  it('should render body4 paragraph with default props', async () => {
    // Arrange
    const paragraph = await component.find('p')

    // Assert
    expect(paragraph.classes()).toContain('body4')
  })

  it('should render h tag if h variant prop provided', async () => {
    // Arrange
    await component.setProps({ variant: 'h1' })
    const heading = await component.find('h1')

    // Assert
    expect(heading.classes()).toContain('h1')
  })

  it('should make the font medium if bold and body props provided', async () => {
    // Arrange
    await component.setProps({ bold: true, variant: 'body4' })
    const paragraph = await component.find('p')

    // Assert
    expect(paragraph.classes()).toContain('font-medium')
  })

  it('should make the font semibold if bold and h props provided', async () => {
    // Arrange
    await component.setProps({ bold: true, variant: 'h4' })
    const paragraph = await component.find('h4')

    // Assert
    expect(paragraph.classes()).toContain('font-semibold')
  })

  it('should make text italic if prop provided', async () => {
    // Arrange
    await component.setProps({ italic: true })
    const paragraph = await component.find('p')

    // Assert
    expect(paragraph.classes()).toContain('italic')
  })

  it('should make text underline when underline prop provided', async () => {
    // Arrange
    await component.setProps({ underline: true })
    const paragraph = await component.find('p')

    // Assert
    expect(paragraph.classes()).toContain('underline')
  })

  it('should make all letters uppercase when prop uppercase true', async () => {
    // Arrange
    await component.setProps({ uppercase: true })
    const paragraph = await component.find('p')

    // Assert
    expect(paragraph.classes()).toContain('uppercase')
  })
})
