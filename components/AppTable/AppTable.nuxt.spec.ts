import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppTable from './AppTable.vue'

describe('AppTable', () => {
  it('should renders with certain data', async () => {
    const component = mount(AppTable, {
      props: {
        columns: [{ id: 'id', title: 'ID' }],
        data: [{ id: 1 }],
      },
    })
    await component.vm.$nextTick()

    expect(component.find('th').text()).toBe('ID')
    expect(component.find('td').text()).toBe('1')
  })

  it('should renders in loading state', async () => {
    const component = mount(AppTable, {
      props: {
        columns: [{ id: 'id', title: 'ID' }],
        data: [{ id: 1 }],
        loading: true,
      },
    })
    await component.vm.$nextTick()
    expect(component.find('.loader').exists()).toBe(true)
  })

  it('should renders in empty state', async () => {
    const component = mount(AppTable, {
      props: {
        columns: [{ id: 'id', title: 'ID' }],
        data: [],
      },
    })

    await component.vm.$nextTick()
    expect(component.find('td').text()).toBe('No data')
  })

  it('triggers slot with item data', async () => {
    const component = mount(AppTable, {
      props: {
        columns: [{ id: 'id', title: 'ID' }],
        data: [{ id: 1, name: 'First' }],
      },
      slots: {
        id: `<template #id="{item}"><div class="slot-content">{{ item.id }}: {{ item.name }}</div></template>`,
      },
    })

    await component.vm.$nextTick()
    expect(component.find('.slot-content').html()).toContain('1: First')
  })
})
