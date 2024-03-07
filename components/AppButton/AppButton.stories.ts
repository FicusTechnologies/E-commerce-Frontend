import type { Meta, StoryObj } from '@storybook/vue3'

import AppButton from './AppButton.vue'

const meta: Meta = {
  title: 'Basic/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['filled', 'outlined', 'transparent'] },
    size: { control: 'select', options: ['small', 'normal', 'large'] },
    state: { control: 'select', options: ['success', 'error'] },
    fullWidth: { control: 'boolean' },
    loading: { control: 'boolean' },
    feedback: { control: 'text' },
  },
}

export default meta
type Story = StoryObj<typeof meta>

const Template: Story = (args: any) => ({
  components: { AppButton },
  setup() {
    return { args }
  },
  template: `
    <app-button v-bind="args">
      {{ args.variant === 'filled' ? 'Filled Button' : args.variant === 'outlined' ? 'Outlined Button' : 'Transparent Button' }}
    </app-button>
  `,
})

export const Filled: Story = Template.bind({})
Filled.args = {
  variant: 'filled',
}

export const Outlined: Story = Template.bind({})
Outlined.args = {
  variant: 'outlined',
}

export const Transparent: Story = Template.bind({})
Transparent.args = {
  variant: 'transparent',
}

export const Success: Story = Template.bind({})
Success.args = {
  state: 'success',
}

export const Error: Story = Template.bind({})
Error.args = {
  state: 'error',
}
