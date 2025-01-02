<template>
    <button class="delta-select" @click.capture="toggleDropdown">
        <div class="delta-select__value">
            {{ selectedOption }}
        </div>
        <div class="delta-select__list" v-if="isOpen">
            <button v-for="option in options" :key="option.value" @click.stop="updateValue(option.value)"
                class="delta-select__item" :class="{ active: option.value === model }">{{
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

const selectedOption = computed(() => props.options.find(option => option.value === model.value)?.label || 'Select...')

const toggleDropdown = () => {
    isOpen.value = !isOpen.value;
}

const updateValue = (value: OptionType['value']) => model.value = value

</script>
