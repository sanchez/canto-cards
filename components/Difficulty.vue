<template>
    <Header>
        Pick a difficulty level:

        <template #subtitle>
            Pick a difficulty level to start the game. The difficulty controls
            the which words and phrases are used in the game. Each difficulty
            level also includes words and phrases from previous levels, e.g.
            Difficulty 3 includes all words and phrases from Difficulty 1 and 2.
        </template>
    </Header>

    <Button
        v-for="difficulty in 5"
        :key="difficulty"
        @click="selectDifficulty(difficulty)">
        Difficulty {{ difficulty }}
    </Button>
</template>

<script setup lang="ts">
    const { gameState } = useGameState();

    function selectDifficulty(difficulty: number) {
        gameState.value.currentDifficulty = difficulty;
        gameState.value.stage = "activeRound";
    }
</script>
