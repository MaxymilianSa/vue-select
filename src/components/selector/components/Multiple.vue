<template>
    <div class="delta-select__value delta-select__value-multiple" ref="valueContainer" v-if="Array.isArray(options)"
        @click="$emit('handleClick')">
        <span class="delta-select__selected-item" v-for="option in optionsToShow" :key="option.value">
            {{ option.label }}
            <button @click.stop="$emit('updateValue', option.value, option.disabled)">
                <CloseIcon :size="12" color="#111216" />
            </button>
        </span>
        <span v-if="hiddenOptionsCount > 0 && !isOpen && hideMoreItems" class="delta-select__more">
            +{{ hiddenOptionsCount }} more
        </span>
        <input v-if="filterable" ref="inputRef" type="text" v-model.trim="model"
            :placeholder="!options ? 'Select ...' : ''" @keypress.enter="$emit('handleEnterOnInput')"
            @keydown.backspace="$emit('handleBackspaceOnInput')" />
    </div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue';

import type { OptionType, MultipleValueProps } from '@/@types/main';

import CloseIcon from '@/components/icons/CloseIcon.vue';

const props = defineProps<MultipleValueProps>();
defineEmits<{
    (e: 'updateValue', value: string, disabled?: boolean): void;
    (e: 'handleClick'): void;
    (e: 'handleEnterOnInput'): void;
    (e: 'handleBackspaceOnInput'): void;
}>();
const model = defineModel<string>();

const inputRef = ref<HTMLInputElement | null>(null);
const valueContainer = ref<HTMLElement | null>(null);

const optionsToShow = computed<OptionType[]>(() => props.isOpen ? (Array.isArray(props.options) ? props.options : []) : visibleOptions.value);
const visibleOptions = computed<OptionType[]>(() => props.hideMoreItems ? updateVisibleOptions() : (Array.isArray(props.options) ? props.options : []));
const hiddenOptionsCount = computed<number>(() => (Array.isArray(props.options) ? props.options.length : 0) - visibleOptions.value.length);

const updateVisibleOptions = () => {
    if (!valueContainer.value || !Array.isArray(props.options) || !props.options.length) return [];

    const containerWidth = valueContainer.value.clientWidth;
    const containerStyle = getComputedStyle(valueContainer.value);
    const gap = parseFloat(containerStyle.gap) || 0;
    let totalWidth = 0;

    const visibleOptions: OptionType[] = [];

    const spans = valueContainer.value.querySelectorAll('.delta-select__selected-item');

    for (let i = 0; i < spans.length; i++) {
        const span = spans[i] as HTMLElement;
        const spanWidth = span.offsetWidth + gap;

        if (totalWidth + spanWidth > containerWidth) {
            break;
        }

        totalWidth += spanWidth;
        visibleOptions.push(props.options[i]);
    }

    return visibleOptions;
}
</script>