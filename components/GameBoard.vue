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

<template>
    <div
        v-if="gameState.isGameStarted"
        class="space-y-6">
        <div
            v-if="!gameState.isRoundActive"
            class="text-center space-y-4">
            <h2
                class="text-2xl font-bold text-primary-800 dark:text-primary-200">
                {{ currentPlayer?.name }}'s Turn
            </h2>
            <div class="space-y-6">
                <div class="text-center space-y-2">
                    <h3
                        class="text-xl font-medium text-indigo-600 dark:text-indigo-400">
                        Select Difficulty
                    </h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">
                        Higher difficulty means more complex phrases
                    </p>
                </div>
                <div
                    class="flex justify-center gap-3 px-4"
                    v-auto-animate>
                    <button
                        v-for="difficulty in 5"
                        :key="difficulty"
                        @click="setDifficulty(difficulty)"
                        class="w-14 h-14 sm:w-16 sm:h-16 rounded-xl flex items-center justify-center text-lg sm:text-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl active:scale-95 transform"
                        :class="[
                            gameState.currentDifficulty === difficulty
                                ? 'bg-gradient-to-br from-rose-500 to-indigo-500 text-white'
                                : 'bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm text-slate-700 dark:text-slate-200 hover:bg-white dark:hover:bg-slate-700',
                        ]">
                        {{ difficulty }}
                    </button>
                </div>
                <button
                    v-if="gameState.isDifficultySelected"
                    @click="startRound"
                    class="w-full py-4 bg-gradient-to-r from-indigo-500 to-rose-500 text-white text-lg font-medium rounded-xl hover:from-indigo-600 hover:to-rose-600 active:scale-[0.98] transform transition-all duration-200 shadow-lg hover:shadow-xl">
                    Begin Turn
                </button>
            </div>
        </div>

        <template v-else>
            <GameTimer
                :duration="ROUND_DURATION"
                :is-active="gameState.isRoundActive"
                @timeout="endRound" />
            <div class="space-y-6">
                <div
                    class="p-6 bg-white/70 dark:bg-slate-800/70 backdrop-blur-sm rounded-xl border-2 border-indigo-100 dark:border-indigo-900 shadow-lg space-y-4">
                    <h3
                        class="text-lg font-medium text-indigo-600 dark:text-indigo-400">
                        Speak this phrase:
                    </h3>
                    <p
                        class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 break-words">
                        {{ currentPhrase.canto }}
                    </p>
                </div>

                <div class="flex flex-col sm:flex-row gap-3">
                    <button
                        @click="isRevealed = !isRevealed"
                        class="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-500 to-rose-500 text-white rounded-xl hover:from-indigo-600 hover:to-rose-600 active:scale-[0.98] transform transition-all duration-200 shadow-lg hover:shadow-xl text-base sm:text-lg">
                        {{ isRevealed ? "Hide" : "Show" }} English
                    </button>
                    <button
                        @click="nextPhrase"
                        class="px-4 py-3 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-700 active:scale-[0.98] transform transition-all duration-200">
                        Skip Phrase
                    </button>
                </div>

                <div
                    v-if="isRevealed"
                    v-auto-animate
                    class="p-6 bg-rose-50/70 dark:bg-rose-950/30 backdrop-blur-sm rounded-xl border-2 border-rose-100 dark:border-rose-900 shadow-lg space-y-4">
                    <h3
                        class="text-lg font-medium text-rose-600 dark:text-rose-400">
                        English Translation:
                    </h3>
                    <p
                        class="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-slate-200 break-words">
                        {{ currentPhrase.english }}
                    </p>
                </div>

                <div class="flex justify-center">
                    <button
                        v-if="isRevealed"
                        @click="handleCorrectGuess"
                        class="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg font-medium rounded-xl hover:from-emerald-600 hover:to-teal-600 active:scale-[0.98] transform transition-all duration-200 shadow-lg hover:shadow-xl">
                        Correct Guess! +1 Point
                    </button>
                </div>
            </div>
        </template>
    </div>
</template>
