<template>
    <div class="delta-select__button">
        <button class="delta-select__button-bg" @click="toggleDropdown"></button>
        <div class="delta-select__value delta-select__value-multiple" ref="valueContainer" v-if="Array.isArray(options)"
            @click="toggleDropdown">
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
                :placeholder="!options ? 'Select ...' : ''" @keypress.enter="addValueOnEnter"
                @keydown.backspace="removeValueOnBackspace" />
        </div>
        <Single v-bind="{ isOpen, options, filterable }" ref="inputRef" v-model="model" @handle-click="toggleDropdown"
            @handle-enter-on-input="addValueOnEnter" v-else />
        <div class="delta-select__icons">
            <slot name="clear-icon" v-bind="{ isOpen, disabled, clearValue: () => $emit('clearValue') }">
                <button @click.stop="() => $emit('clearValue')" v-if="!disabled && clearable && options.length"
                    class="delta-select__clear">
                    <CloseIcon :size="12" color="#111216" />
                </button>
            </slot>
            <slot name="toggle-icon" v-bind="{ isOpen, disabled, toggleDropdown: () => toggleDropdown }">
                <ExpandVerticalIcon :size="18" color="#111216" @click="toggleDropdown" />
            </slot>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';

import type { SelectorProps, OptionType } from '@/@types/main';

import CloseIcon from '@/components/icons/CloseIcon.vue';
import ExpandVerticalIcon from '@/components/icons/ExpandVerticalIcon.vue';

import Single from './components/Single.vue';

const props = defineProps<SelectorProps>();

const model = defineModel<string>();
const emit = defineEmits<{
    (e: 'updateValue', value: string, disabled?: boolean): void;
    (e: 'toggleDropdown'): void;
    (e: 'clearValue'): void;
}>();


const inputRef = ref<{ inputRef: HTMLInputElement | null } | null>(null);
const valueContainer = ref<HTMLElement | null>(null);

const optionsToShow = computed<OptionType[]>(() => props.isOpen ? (Array.isArray(props.options) ? props.options : []) : visibleOptions.value);
const visibleOptions = computed<OptionType[]>(() => props.hideMoreItems ? updateVisibleOptions() : (Array.isArray(props.options) ? props.options : []));
const hiddenOptionsCount = computed<number>(() => (Array.isArray(props.options) ? props.options.length : 0) - visibleOptions.value.length);

const toggleDropdown = () => {
    if (props.disabled) return;

    if (props.isOpen) {
        inputRef.value?.inputRef?.blur();
    } else {
        inputRef.value?.inputRef?.focus();
    }

    emit('toggleDropdown');
};

const addValueOnEnter = () => {
    if (props.list.length > 0) {
        const optionsToSelect = props.list.filter((option) => !option.disabled && (Array.isArray(props.options) ? !props.options.find(({ value }) => value === option.value) : props.options !== option.value));

        if (optionsToSelect.length > 0) {
            emit('updateValue', optionsToSelect[0].value, optionsToSelect[0].disabled);
        }
    }
}

const removeValueOnBackspace = () => {
    if (Array.isArray(props.options) && props.options.length > 0) {
        emit('updateValue', props.options[props.options.length - 1].value, props.options[props.options.length - 1].disabled);
    }
}

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