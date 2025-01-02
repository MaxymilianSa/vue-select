import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import SelectComponent from '@/components/SelectComponent.vue'

describe('SelectComponent', () => {
  it('renders properly', () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: '1',
      },
    })
    expect(wrapper.exists()).toBe(true)
  })

  it('displays the selected option', () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: '1',
      },
    })
    expect(wrapper.find('.delta-select__value').text()).toBe('Option 1')
  })

  it('toggles the dropdown', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: '1',
      },
    })
    expect(wrapper.find('.delta-select__list').exists()).toBe(false)
    await wrapper.find('.delta-select').trigger('click')
    expect(wrapper.find('.delta-select__list').exists()).toBe(true)
  })

  it('updates the selected value', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: '1',
      },
    })
    await wrapper.find('.delta-select').trigger('click')
    await wrapper.findAll('.delta-select__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])
  })
})
