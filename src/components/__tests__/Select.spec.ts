import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import Select from '@/components/Select.vue'

describe('Select', () => {
  it('renders properly', () => {
    const wrapper = mount(Select, {
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
    const wrapper = mount(Select, {
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
    const wrapper = mount(Select, {
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

  it('not display the dropdown when disabled', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: '1',
        disabled: true,
      },
    })
    await wrapper.find('.delta-select__button').trigger('click')
    expect(wrapper.find('.delta-select__list').exists()).toBe(false)
  })

  it('updates the selected value', async () => {
    const wrapper = mount(Select, {
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
    const wrapper = mount(Select, {
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
    const wrapper = mount(Select, {
      props: {
        options: [
          { value: '1', label: 'Option 1' },
          { value: '2', label: 'Option 2' },
        ],
        modelValue: [],
        multiple: true,
        hideSelected: true,
      },
    })

    await wrapper.find('.delta-select__button').trigger('click')
    await wrapper.findAll('.delta-select__item')[2].trigger('click')
    const options = wrapper.findAll('.delta-select__item')
    expect(options.length).toBe(2)
    expect(options[1].text()).toBe('Option 1')
  })

  it('does not allow selecting more than the maximum number of options', async () => {
    const wrapper = mount(Select, {
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
    await wrapper.findAll('.delta-select__item')[1].trigger('click')
    await wrapper.findAll('.delta-select__item')[2].trigger('click')

    const selectedOptions = wrapper.findAll('.delta-select__selected-item')
    expect(selectedOptions.length).toBe(2)
  })

  it('allows selecting all options when "allOption" is true', async () => {
    const wrapper = mount(Select, {
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

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ value: '1', label: 'Option 1' }],
        modelValue: '',
      },
    })

    await wrapper.find('.delta-select__button').trigger('click')
    expect(wrapper.find('.delta-select').classes()).toContain('delta-select--is-open')

    await document.body.click()
    await wrapper.vm.$nextTick()

    expect(wrapper.find('.delta-select').classes()).not.toContain('delta-select--is-open')
  })

  it('clears the selected value when clearable is true', async () => {
    const wrapper = mount(Select, {
      props: {
        options: [{ value: '1', label: 'Option 1' }],
        modelValue: '1',
        clearable: true,
      },
    })

    expect(wrapper.find('.delta-select__clear').exists()).toBe(true)
    await wrapper.find('.delta-select__clear').trigger('click')
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual([''])
  })
})
