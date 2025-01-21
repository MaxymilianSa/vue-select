<template>
    <div class="delta-select__icons">
        <slot name="clear-icon">
            <button @click.stop="() => $emit('handleClickClear')" v-if="!disabled && clearable && options.length"
                class="delta-select__clear">
                <CloseIcon :size="12" color="#111216" />
            </button>
        </slot>
        <slot name="toggle-icon">
            <ExpandVerticalIcon :size="18" color="#111216" @click="$emit('handleClickOpen')" />
        </slot>
    </div>
</template>

<script setup lang="ts">
import type { IconsValueProps } from '@/@types/main';

import CloseIcon from '@/components/icons/CloseIcon.vue';
import ExpandVerticalIcon from '@/components/icons/ExpandVerticalIcon.vue';

defineProps<IconsValueProps>();
defineEmits<{
    (e: 'handleClickClear'): void;
    (e: 'handleClickOpen'): void;
}>();
</script>