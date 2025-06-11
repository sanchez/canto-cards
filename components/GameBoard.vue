<template>
    <div
        v-if="gameState.isGameStarted"
        class="space-y-6">
        <div
            v-if="!gameState.isRoundActive"
            class="text-center space-y-4">
            <h2 class="text-2xl font-bold text-primary-800">
                {{ currentPlayer?.name }}'s Turn
            </h2>
            <div class="space-y-6">
                <div class="text-center space-y-2">
                    <h3 class="text-xl font-medium text-indigo-600">
                        Select Difficulty
                    </h3>
                    <p class="text-sm text-slate-500">
                        Higher difficulty means more complex phrases
                    </p>
                </div>
                <div
                    class="flex justify-center gap-3 px-4"
                    v-auto-animate>
                    <Button
                        v-for="difficulty in 5"
                        :key="difficulty"
                        @click="setDifficulty(difficulty)"
                        :variant="
                            gameState.currentDifficulty === difficulty
                                ? 'gradient'
                                : 'outline'
                        "
                        icon>
                        {{ difficulty }}
                    </Button>
                </div>
                <Button
                    v-if="gameState.isDifficultySelected"
                    @click="startRound"
                    variant="gradient"
                    size="lg"
                    block>
                    Begin Turn
                </Button>
            </div>
        </div>

        <template v-else>
            <GameTimer
                :duration="ROUND_DURATION"
                :is-active="gameState.isRoundActive"
                @timeout="endRound" />
            <div class="space-y-6">
                <div
                    class="p-6 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-indigo-100 shadow-lg space-y-4">
                    <h3 class="text-lg font-medium text-indigo-600">
                        Speak this phrase:
                    </h3>
                    <p
                        class="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
                        {{ currentPhrase.canto }}
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <Button
                        @click="isRevealed = !isRevealed"
                        variant="gradient"
                        size="md">
                        {{ isRevealed ? "Hide" : "Show" }} English
                    </Button>
                    <Button
                        @click="nextPhrase"
                        variant="ghost"
                        size="md">
                        Skip Phrase
                    </Button>
                </div>

                <div
                    v-if="isRevealed"
                    v-auto-animate
                    class="p-6 bg-rose-50/70 backdrop-blur-sm rounded-xl border-2 border-rose-100 shadow-lg space-y-4">
                    <h3 class="text-lg font-medium text-rose-600">
                        English Translation:
                    </h3>
                    <p
                        class="text-2xl sm:text-3xl font-bold text-slate-800 break-words">
                        {{ currentPhrase.english }}
                    </p>
                </div>

                <div class="flex justify-center">
                    <Button
                        v-if="isRevealed"
                        @click="handleCorrectGuess"
                        variant="gradient"
                        size="lg">
                        Correct Guess! +1 Point
                    </Button>
                </div>
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
    import { getPhrase } from "~/phrases/total";
    import type { PhraseResponse } from "~/phrases/core";

    const {
        gameState,
        currentPlayer,
        startRound,
        endRound,
        addPoint,
        setDifficulty,
    } = useGameState();

    const ROUND_DURATION = 300; // 5 minutes in seconds

    const currentPhrase = ref<PhraseResponse>(
        getPhrase(gameState.currentDifficulty)!
    );
    const isRevealed = ref(false);

    const nextPhrase = () => {
        currentPhrase.value = getPhrase(gameState.currentDifficulty)!;
        isRevealed.value = false;
    };

    const handleCorrectGuess = () => {
        addPoint();
        nextPhrase();
    };
</script>
