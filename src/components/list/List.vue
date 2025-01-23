<template>
    <slot>
        <ul class="delta-select__list" v-if="options.length">
            <slot name="header" v-bind="$props" v-if="canCheckAll">
                <CheckAll v-if="multiple && allOption && !max" @handle-click="$emit('addAll')" />
            </slot>
            <li v-for="option in options" :key="option.value">
                <slot name="option"
                    v-bind="{ ...$props, ...option, add: () => $emit('add', option.value, option.disabled), remove: () => $emit('remove', option.value, option.disabled) }">
                    <Item v-bind="{ ...$props, ...option }" @add="$emit('add', option.value, option.disabled)"
                        @remove="$emit('remove', option.value, option.disabled)" />
                </slot>
            </li>
            <slot name="footer" v-bind="$props"></slot>
        </ul>
        <slot name="empty-info" v-else>
            <div class="delta-select__empty-info">
                No options available
            </div>
        </slot>
    </slot>
</template>

<script lang="ts" setup>
import { computed } from 'vue';
import type { ListProps } from '@/@types/main';

import CheckAll from './CheckAll.vue';
import Item from './Item.vue';

const props = defineProps<ListProps>();
defineEmits<{
    (e: 'add', value: string, disabled?: boolean): void;
    (e: 'remove', value: string, disabled?: boolean): void;
    (e: 'addAll'): void;
}>();

const canCheckAll = computed(() => props.options.length > 0 && !props.options.every(option => option.disabled));
</script>