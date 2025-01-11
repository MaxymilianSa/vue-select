<template>
    <div class="delta-select" ref="dropdownRef"
        :class="{ 'delta-select--disabled': disabled, 'delta-select--is-open': isOpen && !disabled }">
        <div class="delta-select__button">
            <button class="delta-select__button-bg" @click="toggleDropdown"></button>
            <div class="delta-select__value" v-if="Array.isArray(selectedOption)">
                <span class="delta-select__selected-item" v-for="option in selectedOption" :key="option.value">
                    {{ option.label }}
                    <button @click.stop="updateValue(option.value, option.disabled)">
                        <CloseIcon :size="12" color="#111216" />
                    </button>
                </span>
            </div>
            <div class="delta-select__value" v-else>
                <input type="text" ref="searchEl" v-model="search" placeholder="Select ..."
                    @focus="() => isOpen = true" />
            </div>
            <div class="delta-select__icons">
                <slot name="clear-icon" v-bind="{ isOpen, disabled, clearValue }">
                    <button @click.stop="clearValue" v-if="!disabled && clearable && selectedOption.length"
                        class="delta-select__clear">
                        <CloseIcon :size="12" color="#111216" />
                    </button>
                </slot>
                <slot name="toggle-icon" v-bind="{ isOpen, disabled, toggleDropdown }">
                    <ExpandVerticalIcon :size="18" color="#111216" @click="toggleDropdown" />
                </slot>
            </div>
        </div>
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
import CloseIcon from './icons/CloseIcon.vue';
import ExpandVerticalIcon from './icons/ExpandVerticalIcon.vue';

const props = withDefaults(defineProps<SelectProps>(), {
    allOption: true,
    hideSelected: false,
    clearable: true,
})
const model = defineModel<ValueType>()
const search = ref('')
const searchEl = ref<HTMLInputElement | null>(null)
const isOpen = ref(false);
const dropdownRef = ref<HTMLElement | null>(null);

const selectedOption = computed<string | OptionType[]>(() => props.multiple ? props.options.filter(option => model.value?.includes(option.value)) : props.options.find(option => option.value === model.value)?.label || '')
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
}

const handleClickOutside = (event: MouseEvent) => {
    if (dropdownRef.value && !dropdownRef.value.contains(event.target as Node)) {
        isOpen.value = false;
    }
}

onMounted(() => {
    document.addEventListener('click', handleClickOutside)
})

onBeforeMount(() => {
    document.removeEventListener('click', handleClickOutside)
})
</script>
