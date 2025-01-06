<template>
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" fill="none">
        <path
            d="M10 0C4.486 0 0 4.486 0 10C0 15.514 4.486 20 10 20C15.514 20 20 15.514 20 10C20 4.486 15.514 0 10 0ZM10 18C5.589 18 2 14.411 2 10C2 5.589 5.589 2 10 2C14.411 2 18 5.589 18 10C18 14.411 14.411 18 10 18Z"
            :fill="color" />
        <path
            d="M7.99902 11.587L5.70002 9.29197L4.28802 10.708L8.00103 14.413L14.707 7.70697L13.293 6.29297L7.99902 11.587Z"
            :fill="color" />
    </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/@types/main';

withDefaults(defineProps<IconProps>(), {
    color: 'black',
    size: 20,
});
</script>