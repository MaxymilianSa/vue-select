<template>
    <li>
        <button @click="$emit('addOption')" class="delta-select__item"
            :class="{ active: value === model || (model as OptionType['value'][]).includes(value), disabled: disabled || (max && multiple && (model as OptionType['value'][]).length >= max) }">{{
                label }}</button>
    </li>
</template>

<script lang="ts" setup>
import type { OptionProps, OptionType } from '@/@types/main';

defineProps<OptionProps>();
defineEmits(['addOption']);
</script>