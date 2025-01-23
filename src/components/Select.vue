<template>
    <div class="delta-select" ref="dropdownRef"
        :class="{ 'delta-select--disabled': disabled, 'delta-select--is-open': isOpen && !disabled }">
        <slot name="button">
            <Selector v-model="search"
                v-bind="{ isOpen, options: selectedOptions, list: optionsList, disabled, clearable, filterable, multiple, hideMoreItems }"
                @toggle-dropdown="toggleDropdown" @add="(value, disabled) => add(value, disabled)"
                @remove="(value, disabled) => remove(value, disabled)" @clear="clear" @focus="() => isOpen = true">
                <template #input>
                    <slot name="input" v-bind="{ isOpen, disabled, model, options, add, remove, toggleDropdown }">
                    </slot>
                </template>
                <template #clear-icon>
                    <slot name="clear-icon" v-bind="{ isOpen, disabled, clear }"></slot>
                </template>
                <template #toggle-icon>
                    <slot name="toggle-icon" v-bind="{ isOpen, disabled, toggleDropdown }"></slot>
                </template>
            </Selector>
        </slot>
        <slot name="list"
            v-bind="{ multiple, max, allOption, hideSelected, options: optionsList, model, add, remove, addAll }"
            v-if="isOpen && !disabled">
            <List v-bind="{ multiple, max, allOption, hideSelected, options: optionsList, model }" @add-all="addAll"
                @add="add" @remove="remove">
                <template #header="props">
                    <slot name="header" v-bind="{ ...props, addAll }"></slot>
                </template>
                <template #option="props">
                    <slot name="option" v-bind="{ ...props, add, remove }"></slot>
                </template>
                <template #footer="props">
                    <slot name="footer" v-bind="{ ...props }"></slot>
                </template>
                <template #empty-info>
                    <slot name="empty-info"></slot>
                </template>
            </List>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted, onBeforeMount } from 'vue';

import type { SelectProps, OptionType, ValueType } from '@/@types/main';

import List from './list/List.vue';
import Selector from './selector/Selector.vue';

const props = withDefaults(defineProps<SelectProps>(), {
    allOption: true,
    hideSelected: false,
    clearable: true,
    hideMoreItems: true,
})
const model = defineModel<ValueType>()
const search = ref('')
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedOptions = computed<string | OptionType[]>(() => props.multiple && Array.isArray(model.value) ? model.value?.map((value) => props.options.find((option) => option.value === value)).filter((option) => !!option) : props.options.find(option => option.value === model.value)?.label || '')
const optionsList = computed(() => {
    let newOptions = props.options;
    if (props.multiple && props.hideSelected) {
        newOptions = props.options.filter(option => !model.value?.includes(option.value)).filter((option) => option.label.toLowerCase().includes(search.value.toLowerCase()))
    } else {
        newOptions = props.options.filter((option) => option.label.toLowerCase().includes(search.value.toLowerCase()))
    }
    return newOptions
})
const closeOnSelect = computed(() => props.closeOnSelect || !props.multiple)

const toggleDropdown = () => {

    if (props.disabled) {
        return
    }

    isOpen.value = !isOpen.value;
}

const add = (value: OptionType['value'], disabled: OptionType['disabled']) => {
    if (disabled) {
        return
    }

    if (props.multiple) {
        const values = model.value ? [...model.value] : []
        const index = values.indexOf(value)

        if (props.max && values.length >= props.max && index === -1) {
            return
        }

        values.push(value)

        model.value = values
        search.value = ''

        if (closeOnSelect.value) {
            isOpen.value = false
        }

        return
    }

    model.value = value

    if (closeOnSelect.value) {
        isOpen.value = false
        search.value = ''
    }
}

const addAll = () => {
    if (!props.multiple || !props.allOption || props.max) {
        return
    }

    const values = model.value ? [...model.value] : []

    model.value = [...values, ...optionsList.value.filter(({ disabled, value }) => !disabled && !values.includes(value)).map(option => option.value)]

    if (closeOnSelect.value) {
        isOpen.value = false
    }

    search.value = ''
}

const remove = (value: OptionType['value'], disabled: OptionType['disabled']) => {
    if (props.disabled || disabled) {
        return
    }

    if (props.multiple) {
        const values = model.value ? [...model.value] : []
        const index = values.indexOf(value)

        if (index > -1) {
            values.splice(index, 1)
        }

        model.value = values
    }
}

const clear = () => {
    model.value = props.multiple ? [] : ''
    search.value = ''
}

const handleClickOutside = (event: Event) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
    if (event.target instanceof HTMLButtonElement && event.target.classList.contains('delta-select__item')) {
        return
    }

    search.value = ''
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeMount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
