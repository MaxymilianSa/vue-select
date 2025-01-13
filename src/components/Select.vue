<template>
    <div class="delta-select" ref="dropdownRef"
        :class="{ 'delta-select--disabled': disabled, 'delta-select--is-open': isOpen && !disabled }">
        <Selector v-model="search" v-bind="{ isOpen, options: selectedOptions, disabled, clearable }"
            @toggle-dropdown="toggleDropdown" @remove-option="(value, disabled) => updateValue(value, disabled)"
            @clear-value="clearValue" @focus="() => isOpen = true" />
        <slot name="list"
            v-bind="{ multiple, max, allOption, hideSelected, options: optionsList, model, updateValue, addAllOptions }"
            v-if="isOpen && !disabled">
            <List v-bind="{ multiple, max, allOption, hideSelected, options: optionsList, model }"
                @add-all-options="addAllOptions" @add-option="updateValue">
                <template #header="props">
                    <slot name="header" v-bind="{ ...props, addAllOptions }"></slot>
                </template>
                <template #option="props">
                    <slot name="option" v-bind="{ ...props, updateValue }"></slot>
                </template>
                <template #footer="props">
                    <slot name="footer" v-bind="{ ...props }"></slot>
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
})
const model = defineModel<ValueType>()
const search = ref('')
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedOptions = computed<string | OptionType[]>(() => props.multiple ? props.options.filter(option => model.value?.includes(option.value)) : props.options.find(option => option.value === model.value)?.label || '')
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

const updateValue = (value: OptionType['value'], disabled: OptionType['disabled']) => {
    if (disabled) {
        return
    }

    if (props.multiple) {
        const values = model.value ? [...model.value] : []
        const index = values.indexOf(value)

        if (props.max && values.length >= props.max && index === -1) {
            return
        }

        if (index > -1) {
            values.splice(index, 1)
        } else {
            values.push(value)
        }

        model.value = values

        if (closeOnSelect.value) {
            isOpen.value = false
        }

        return
    }

    model.value = value

    if (closeOnSelect.value) {
        isOpen.value = false
    }
}

const addAllOptions = () => {
    if (!props.multiple || !props.allOption || props.max) {
        return
    }

    model.value = props.options.filter(({ disabled }) => !disabled).map(option => option.value)

    if (closeOnSelect.value) {
        isOpen.value = false
    }
}

const clearValue = () => {
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
