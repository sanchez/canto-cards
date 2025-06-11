<template>
    <Landing v-if="gameState.stage === 'players'" />
</template>

<script setup lang="ts">
    const { gameState } = useGameState();
</script>
