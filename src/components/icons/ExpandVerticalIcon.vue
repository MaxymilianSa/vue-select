<template>
    <svg :width="size" :height="size" :viewBox="`0 0 24 24`" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path
            d="M11.9999 19.2401L7.04989 14.2901L5.63989 15.7101L11.9999 22.0701L18.3599 15.7101L16.9499 14.2901L11.9999 19.2401ZM5.63989 8.29005L7.04989 9.71005L11.9999 4.76005L16.9499 9.71005L18.3599 8.29005L11.9999 1.93005L5.63989 8.29005Z"
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