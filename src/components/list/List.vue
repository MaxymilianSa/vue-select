<template>
    <slot>
        <ul class="delta-select__list" v-if="options.length">
            <slot name="header" v-bind="$props" v-if="canCheckAll">
                <CheckAll v-if="multiple && allOption && !max" @handle-click="$emit('addAllOptions')" />
            </slot>
            <li v-for="option in options" :key="option.value">
                <slot name="option" v-bind="{ ...$props, ...option }">
                    <Item v-bind="{ ...$props, ...option }"
                        @handle-click="$emit('addOption', option.value, option.disabled)" />
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
    (e: 'addOption', value: string, disabled?: boolean): void;
    (e: 'addAllOptions'): void;
}>();

const canCheckAll = computed(() => props.options.length > 0 && !props.options.every(option => option.disabled));
</script>