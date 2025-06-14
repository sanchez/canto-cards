<template>
    <Header>
        Game Over!

        <template #subtitle>
            Congratulations to all players, and big congratulations to our
            winner{{ winnersPlural }}: {{ nameDisplay }}
        </template>
    </Header>

    <div class="w-full grid grid-cols-1 gap-3">
        <template v-for="([score, players], index) in scores">
            <div
                v-for="player in players"
                :key="player.name">
                <div
                    class="flex items-center justify-between p-4 rounded border-2"
                    :class="{
                        'bg-green-100 border-green-500': index === 0,
                        'bg-yellow-100 border-yellow-500': index === 1,
                        'bg-gray-100 border-gray-500': index > 1,
                    }">
                    <div>{{ player.name }}</div>
                    <div>{{ score }}</div>
                </div>
            </div>
        </template>
    </div>

    <div>
        Thanks for trying and playing my game, I hope you had fun and possibly
        even learnt something, if you would like to play another game with the
        same difficulty and players simply click the Play Again button:
    </div>

    <Button @click="playAgain">Play Again</Button>

    <div />

    <div>
        Or if you would like to change the players or difficulty then click the
        Change Players button:
    </div>

    <Button @click="changePlayers">Change Players</Button>
</template>

<script setup lang="ts">
    const { gameState } = useGameState();

    const scores = computed(() => {
        const lookups = gameState.value.players.reduce((p, c) => {
            if (!p[c.score]) {
                p[c.score] = [];
            }

            p[c.score].push(c);
            return p;
        }, {} as Record<number, Player[]>);

        return Object.entries(lookups).sort(
            ([scoreA], [scoreB]) => Number(scoreB) - Number(scoreA)
        );
    });

    const winners = computed(() => {
        return scores.value[0][1];
    });

    const nameDisplay = computed(() => {
        return winners.value.map((player) => player.name).join(", ");
    });

    const winnersPlural = computed(() => {
        return winners.value.length > 1 ? "s" : "";
    });

    function playAgain() {
        gameState.value.stage = "activeRound";
    }

    function changePlayers() {
        gameState.value.stage = "players";
    }
</script>
