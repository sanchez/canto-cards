<template>
    <Landing v-if="gameState.stage === 'players'" />
    <Difficulty v-else-if="gameState.stage === 'difficulty'" />
    <Round v-else-if="gameState.stage === 'activeRound'" />
    <Leaderboard v-else-if="gameState.stage === 'gameOver'" />
</template>

<script setup lang="ts">
    const { gameState } = useGameState();
</script>
