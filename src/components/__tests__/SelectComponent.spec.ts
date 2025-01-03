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
    await wrapper.find('.delta-select__button').trigger('click')
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
    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.findAll('.delta-select__item')[1].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['2'])
  })

  it('updates multiple selected values', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ],
        modelValue: ['1', '2'],
        multiple: true,
      },
    })
    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.findAll('.delta-select__item')[0].trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([['1', '2', '3']])
  })

  it('removes selected option from the list', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: [],
        multiple: true,
      },
    })

    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.findAll('.delta-select__item')[2].trigger('click')
    const options = wrapper.findAll('.delta-select__item')
    expect(options.length).toBe(2)
    expect(options[1].text()).toBe('Option 1')
  })

  it('does not allow selecting more than the maximum number of options', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ],
        modelValue: [],
        multiple: true,
        max: 2,
      },
    })

    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.findAll('.delta-select__item')[0].trigger('click')
    await wrapper.findAll('.delta-select__item')[0].trigger('click')
    await wrapper.findAll('.delta-select__item')[0].trigger('click')

    const selectedOptions = wrapper.findAll('.delta-select__selected-item')
    expect(selectedOptions.length).toBe(2)
  })

  it('allows selecting all options when "allOption" is true', async () => {
    const wrapper = mount(SelectComponent, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
          { value: '3', label: 'Option 3' },
        ],
        modelValue: [],
        multiple: true,
        allOption: true,
      },
    })

    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.find('.choose-all').trigger('click')
    const selectedOptions = wrapper.findAll('.delta-select__selected-item')
    expect(selectedOptions.length).toBe(3)
  })
})
