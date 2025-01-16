<template>
    <div class="delta-select__button">
        <button class="delta-select__button-bg" @click="toggleDropdown"></button>
        <div class="delta-select__value delta-select__value-multiple" v-if="Array.isArray(options)"
            @click="toggleDropdown">
            <span class="delta-select__selected-item" v-for="option in options" :key="option.value">
                {{ option.label }}
                <button @click.stop="$emit('updateValue', option.value, option.disabled)">
                    <CloseIcon :size="12" color="#111216" />
                </button>
            </span>
            <input v-if="filterable" ref="inputRef" type="text" v-model.trim="model"
                :placeholder="!options ? 'Select ...' : ''" @keypress.enter="addValueOnEnter" />
        </div>
        <div class="delta-select__value" v-else>
            <div class="delta-select__value-option" v-if="!isOpen || !model?.length"
                @click="() => !filterable && toggleDropdown">{{ options }}
            </div>
            <input v-if="filterable" type="text" v-model.trim="model" :placeholder="!options ? 'Select ...' : ''"
                @focus="$emit('focus')" @keypress.enter="addValueOnEnter" />
        </div>
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
import { ref } from 'vue';

import type { SelectorProps } from '@/@types/main';

import CloseIcon from '@/components/icons/CloseIcon.vue';
import ExpandVerticalIcon from '@/components/icons/ExpandVerticalIcon.vue';

const props = defineProps<SelectorProps>();

const model = defineModel<string>();
const emit = defineEmits<{
    (e: 'updateValue', value: string, disabled?: boolean): void;
    (e: 'toggleDropdown'): void;
    (e: 'clearValue'): void;
    (e: 'focus'): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const toggleDropdown = () => {
    if (props.disabled) return;

    if (inputRef.value && props.multiple) inputRef.value.focus();

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

</script>