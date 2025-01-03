<template>
    <div class="delta-select">
        <button @click="toggleDropdown" class="delta-select__button">
            <div class="delta-select__value" v-if="Array.isArray(selectedOption)">
                <span class="delta-select__selected-item" v-for="option in selectedOption" :key="option.value"
                    @click.stop="updateValue(option.value, option.disabled)">
                    {{ option.label }}
                </span>
            </div>
            <div class="delta-select__value" v-else>
                {{ selectedOption }}
            </div>
        </button>
        <div class="delta-select__list" v-if="isOpen">
            <button v-if="multiple && allOption && !max" @click.stop="addAllOptionsToModel"
                class="delta-select__item choose-all">Choose
                all</button>
            <button v-for="option in optionsList" :key="option.value"
                @click="updateValue(option.value, option.disabled)" class="delta-select__item"
                :class="{ active: option.value === model || (model as OptionType['value'][]).includes(option.value), disabled: option.disabled || (max && multiple && (model as OptionType['value'][]).length >= max) }">{{
                    option.label }}</button>
        </div>
    </div>
</template>

<script lang="ts" setup>
import { ref, computed, withDefaults } from 'vue';

import type { SelectProps, OptionType } from '@/@types/main';

const props = withDefaults(defineProps<SelectProps>(), {
    allOption: true,
})
const model = defineModel()
const isOpen = ref(false);

const selectedOption = computed<string | OptionType[]>(() => props.multiple ? props.options.filter(option => (model.value as OptionType['value'][]).includes(option.value)) : props.options.find(option => option.value === model.value)?.label || 'Select...')
const optionsList = computed(() => props.multiple ? props.options.filter(option => !(model.value as OptionType['value'][]).includes(option.value)) : props.options)

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

        return model.value = values
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
