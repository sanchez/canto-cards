<template>
    <template v-if="pause">
        <Header>
            Get Ready!

            <template #subtitle>
                Please hand the device to <b>{{ currentPlayer.name }}</b
                >, once you are ready, click the button below to start the
                round.
            </template>
        </Header>

        <Button @click="start()">Start Round</Button>
    </template>

    <template v-else>
        <div class="absolute top-4 right-4">
            Remaining Time: {{ remaining }}s
        </div>

        <Header>
            {{ currentPlayer.name }}'s Turn

            <template #subtitle>
                Get as many correct guesses before the time runs out! Keep
                trying until someone guesses correctly, or skip to try another
            </template>
        </Header>

        <div class="w-full text-center">
            <div>Speak the following:</div>
            <div class="text-4xl font-bold">
                {{ currentGuess?.canto }}
            </div>
        </div>

        <div class="w-full text-center">
            <div>Others must correct guess:</div>
            <div class="text-lg">
                {{ currentGuess?.english }}
            </div>
        </div>

        <div class="w-full grid grid-cols-2 gap-4">
            <Button
                class="w-full"
                variant="primary"
                @click="success()">
                Correct Guess
            </Button>
            <Button
                class="w-full"
                variant="secondary"
                @click="fail()">
                Skip
            </Button>
        </div>
    </template>
</template>

<script setup lang="ts">
    const { gameState } = useGameState();
    const playerIndex = ref(0);
    const currentPlayer = computed(() => {
        return gameState.value.players[playerIndex.value];
    });

    const {
        remaining,
        reset,
        start: timerStart,
    } = useCountdown(60, {
        onComplete() {
            pause.value = true;
            playerIndex.value += 1;
            history.value = [];

            if (playerIndex.value >= gameState.value.players.length) {
                gameState.value.stage = "gameOver";
            }
        },
    });

    const pause = ref(true);

    const currentGuess = ref<PhraseResponse>();
    const history = ref<string[]>([]);

    function generatePhrase() {
        let count = 0;

        while (true) {
            const phrase = getPhrase(gameState.value.currentDifficulty);

            count += 1;

            if (phrase) {
                if (count < 20 && history.value.includes(phrase.canto)) {
                    continue; // Avoid repeating phrases
                }

                history.value.push(phrase.canto);
                return phrase;
            }
        }
    }

    function newPhrase() {
        const phrase = generatePhrase();
        currentGuess.value = phrase;
        pause.value = false;
    }

    function start() {
        newPhrase();
        reset();
        timerStart();
    }

    function success() {
        currentPlayer.value.score += 1;
        newPhrase();
    }

    function fail() {
        newPhrase();
    }
</script>
