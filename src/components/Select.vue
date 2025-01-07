<template>
    <div class="delta-select">
        <button @click="toggleDropdown" class="delta-select__button">
            <div class="delta-select__value" v-if="Array.isArray(selectedOption)">
                <span class="delta-select__selected-item" v-for="option in selectedOption" :key="option.value">
                    {{ option.label }}
                    <button @click.stop="updateValue(option.value, option.disabled)">
                        <CloseIcon :size="12" color="#111216" />
                    </button>
                </span>
            </div>
            <div class="delta-select__value" v-else>
                {{ selectedOption }}
            </div>
        </button>
        <slot name="list" v-bind="{ ...props, options: optionsList, model, updateValue, addAllOptionsToModel }"
            v-if="isOpen">
            <List v-bind="{ ...props, options: optionsList, model }" @add-all-options="addAllOptionsToModel"
                @add-option="updateValue">
                <template #option="props">
                    <slot name="option" v-bind="{ ...props, updateValue }"></slot>
                </template>
            </List>
        </slot>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import type { SelectProps, OptionType } from '@/@types/main';

import List from './list/List.vue';
import CloseIcon from './icons/CloseIcon.vue';

const props = withDefaults(defineProps<SelectProps>(), {
    allOption: true,
    hideSelected: false,
})
const model = defineModel()
const isOpen = ref(false);

const selectedOption = computed<string | OptionType[]>(() => props.multiple ? props.options.filter(option => (model.value as OptionType['value'][]).includes(option.value)) : props.options.find(option => option.value === model.value)?.label || 'Select...')
const optionsList = computed(() => props.multiple && props.hideSelected ? props.options.filter(option => !(model.value as OptionType['value'][]).includes(option.value)) : props.options)

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
}

const updateValue = (value: OptionType['value'], disabled: OptionType['disabled']) => {

    if (disabled) {
        return
    }

    if (props.multiple) {
        const values = [...model.value as OptionType['value'][]]
        const index = values.indexOf(value)

        if (props.max && (model.value as OptionType['value'][]).length >= props.max && index === -1) {
            return
        }

        if (index > -1) {
            values.splice(index, 1)
        } else {
            values.push(value)
        }

        model.value = values
        return
    }

    model.value = value
}

const addAllOptionsToModel = () => {
    if (!props.multiple || !props.allOption || props.max) {
        return
    }

    model.value = props.options.filter(({ disabled }) => !disabled).map(option => option.value)
}

</script>
