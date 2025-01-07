<template>
    <slot>
        <ul class="delta-select__list">
            <slot name="header" v-bind="$props">
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
    </slot>
</template>

<script lang="ts" setup>
import type { ListProps } from '@/@types/main';

import CheckAll from './CheckAll.vue';
import Item from './Item.vue';

defineProps<ListProps>();
defineEmits(['addOption', 'addAllOptions']);
</script>