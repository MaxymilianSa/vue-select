<template>
    <slot>
        <ul class="delta-select__list">
            <li v-if="multiple && allOption && !max">
                <button @click="$emit('addAllOptions')" class="delta-select__item choose-all">Choose all</button>
            </li>
            <Item v-for="option in options" :key="option.value" v-bind="{ ...$props, ...option }"
                @add-option="$emit('addOption', option.value, option.disabled)" />
        </ul>
    </slot>
</template>

<script lang="ts" setup>
import type { ListProps } from '@/@types/main';

import Item from './Item.vue';

defineProps<ListProps>();
defineEmits(['addOption', 'addAllOptions']);

</script>