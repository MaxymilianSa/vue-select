<template>
    <main>
        <v-select v-model="value" v-bind="{ options }" multiple></v-select>
    </main>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const value = ref('')

const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
]

</script>
