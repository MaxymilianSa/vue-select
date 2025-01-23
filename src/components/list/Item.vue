<template>
    <button @click="() => isChecked ? $emit('remove') : $emit('add')" class="delta-select__item"
        :class="{ active: isChecked, disabled: isDisabled, className }">
        <span v-if="multiple && !hideSelected">
            <CheckedIcon v-if="isChecked" color="#111216" />
            <UncheckedIcon v-else color="#EEEEEE" />
        </span>
        <div class="delta-select__item-content">
            <div v-if="preIcon" class="delta-select__item-icon">
                <component :is="preIcon" />
            </div>
            <div class="delta-select__item-text">
                {{ label }}
                <span v-if="description">{{ description }}</span>
            </div>
            <div v-if="postIcon" class="delta-select__item-icon">
                <component :is="postIcon" />
            </div>
        </div>
    </button>
</template>

<script lang="ts" setup>
import { computed } from 'vue';

import type { OptionProps, OptionType } from '@/@types/main';

import CheckedIcon from '../icons/CheckedIcon.vue';
import UncheckedIcon from '../icons/UncheckedIcon.vue';

const { value, model, disabled, multiple, max } = defineProps<OptionProps>();
defineEmits<{
    (e: 'add'): void;
    (e: 'remove'): void;
}>();

const isChecked = computed(() => value === model || (model as OptionType['value'][]).includes(value))
const isDisabled = computed(() => disabled || (max && multiple && (model as OptionType['value'][]).length >= max));
</script>