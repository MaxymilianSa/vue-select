<template>
    <main>
        <v-select v-model="value" v-bind="{ options }" filterable hide-selected multiple />
    </main>
</template>

<script setup lang="ts">
import { ref, h } from 'vue'

import Memoji from './assets/images/memoji.png'

const value = ref<string | string[]>('')

const options = [
    {
        value: "john-doe",
        label: "John Doe",
        description: "A seasoned software engineer with expertise in full-stack development.",
        preIcon: h('img', { src: Memoji, alt: 'John Doe' }),
    },
    {
        value: "jane-smith",
        label: "Jane Smith",
        description: "A creative UX designer with a passion for creating intuitive user experiences.",
        preIcon: h('img', { src: Memoji, alt: 'John Doe' }),
    },
    {
        value: "michael-brown",
        label: "Michael Brown",
        description: "A data scientist specializing in machine learning and predictive analytics.",
        preIcon: h('img', { src: Memoji, alt: 'John Doe' }),
    },
    {
        value: "emily-davis",
        label: "Emily Davis",
        description: "A marketing strategist with a proven track record in digital campaign optimization.",
        preIcon: h('img', { src: Memoji, alt: 'John Doe' }),
        disabled: true,
    },
    {
        value: "david-johnson",
        label: "David Johnson",
        description: "A finance professional with extensive experience in corporate accounting.",
        preIcon: h('img', { src: Memoji, alt: 'John Doe' }),
    }
];

</script>
