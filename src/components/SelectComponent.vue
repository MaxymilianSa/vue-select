<template>
    <button class="delta-select" @click.capture="toggleDropdown">
        <div class="delta-select__value" v-if="Array.isArray(selectedOption)">
            <span class="delta-select__selected-item" v-for="option in selectedOption" :key="option.value">
                {{ option.label }}
            </span>
        </div>
        <div class="delta-select__value" v-else>
            {{ selectedOption }}
        </div>
        <div class="delta-select__list" v-if="isOpen">
            <button v-for="option in options" :key="option.value" @click.stop="updateValue(option.value)"
                class="delta-select__item"
                :class="{ active: option.value === model || (model as OptionType['value'][]).includes(option.value) }">{{
                    option.label }}</button>
        </div>
    </button>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';

import type { SelectProps, OptionType } from '@/@types/main';

const props = defineProps<SelectProps>()
const model = defineModel()
const isOpen = ref(false);

const selectedOption = computed<string | OptionType[]>(() => props.multiple ? props.options.filter(option => (model.value as OptionType['value'][]).includes(option.value)) : props.options.find(option => option.value === model.value)?.label || 'Select...')

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
}

const updateValue = (value: OptionType['value']) => {

    if (props.multiple) {
        const values = [...model.value as OptionType['value'][]]
        const index = values.indexOf(value)
        if (index > -1) {
            values.splice(index, 1)
        } else {
            values.push(value)
        }

        return model.value = values
    }

    model.value = value
}

</script>
