<template>
    <button class="delta-select__button-bg" @click="handleClick"></button>
    <div class="delta-select__value">
        <div class="delta-select__value-option" v-if="!isOpen || !model?.length"
            @click="() => !filterable && handleClick">{{ options }}
        </div>
        <input v-if="filterable" type="text" ref="inputRef" v-model.trim="model"
            :placeholder="!options ? 'Select ...' : ''" @keypress.enter="handleEnterOnInput" @click="handleClick" />
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';

import type { SingleValueProps } from '@/@types/main';

const model = defineModel<string>();

defineProps<SingleValueProps>();
const emit = defineEmits<{
    (e: 'handleClick'): void;
    (e: 'handleEnterOnInput'): void;
}>();

const inputRef = ref<HTMLInputElement | null>(null);

const handleClick = () => emit('handleClick');
const handleEnterOnInput = () => emit('handleEnterOnInput');

defineExpose({
    inputRef
});
</script>