<template>
    <button @click="$emit('handleClick')" class="delta-select__item choose-all">Choose all</button>
</template>

<script lang="ts" setup>
defineEmits(['handleClick']);

</script>