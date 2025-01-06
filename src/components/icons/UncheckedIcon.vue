<template>
    <svg :width="size" :height="size" :viewBox="`0 0 ${size} ${size}`" fill="none">
        <path
            d="M10 0C4.486 0 0 4.486 0 10C0.001 15.515 4.487 20.001 10 20.001C15.514 20.001 20 15.515 20.001 10C20.001 4.486 15.515 0 10 0ZM10 18.001C5.59 18.001 2.001 14.412 2 10C2 5.589 5.589 2 10 2C14.412 2 18.001 5.589 18.001 10C18 14.412 14.411 18.001 10 18.001Z"
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
