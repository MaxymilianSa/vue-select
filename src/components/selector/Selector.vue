<template>
    <div class="delta-select__button">
        <button class="delta-select__button-bg" @click="toggleDropdown"></button>
        <slot name="input" v-bind="{ isOpen, disabled, model, options }">
            <Multiple v-if="Array.isArray(options)" v-bind="{ isOpen, options, filterable, hideMoreItems }"
                ref="inputRef" v-model="model" @handle-click="toggleDropdown" @handle-enter-on-input="addValueOnEnter"
                @handle-backspace-on-input="removeValueOnBackspace"
                @remove="(value, disabled) => $emit('remove', value, disabled)" />
            <Single v-bind="{ isOpen, options, filterable }" ref="inputRef" v-model="model"
                @handle-click="toggleDropdown" @handle-enter-on-input="addValueOnEnter" v-else />
        </slot>
        <Icons v-bind="{ disabled, clearable, options }" @handle-click-clear="$emit('clear')"
            @handle-click-open="toggleDropdown">
            <template #clear-icon>
                <slot name="clear-icon" v-bind="{ isOpen, disabled, clear: () => $emit('clear') }"></slot>
            </template>
            <template #toggle-icon>
                <slot name="toggle-icon" v-bind="{ isOpen, disabled, toggleDropdown: () => toggleDropdown }"></slot>
            </template>
        </Icons>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { SelectorProps } from '@/@types/main';

import Multiple from './components/Multiple.vue';
import Single from './components/Single.vue';
import Icons from './components/Icons.vue';

const props = defineProps<SelectorProps>();

const model = defineModel<string>();
const emit = defineEmits<{
    (e: 'add', value: string, disabled?: boolean): void;
    (e: 'remove', value: string, disabled?: boolean): void;
    (e: 'toggleDropdown'): void;
    (e: 'clear'): void;
}>();


const inputRef = ref<{ inputRef: HTMLInputElement | null } | null>(null);

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
            emit('add', optionsToSelect[0].value, optionsToSelect[0].disabled);
        }
    }
}

const removeValueOnBackspace = () => {
    if (Array.isArray(props.options) && props.options.length > 0 && model.value === '') {
        emit('remove', props.options[props.options.length - 1].value, props.options[props.options.length - 1].disabled);
    }
}

defineExpose({
    inputRef
});
</script>