<template>
    <Header>Players</Header>

    <div class="w-full flex flex-nowrap gap-3 items-stretch">
        <Input
            class="grow"
            v-model="newPlayerName"
            placeholder="Enter player name"
            @keyup.enter="handleAddPlayer" />

        <Button
            class="grow-0 max-w-fit"
            @click="handleAddPlayer"
            >Add Player</Button
        >
    </div>

    <div
        class="w-full flex flex-col flex-nowrap gap-3 items-stretch"
        v-auto-animate>
        <div
            v-for="(player, index) in gameState.players"
            :key="player.name"
            class="flex items-center justify-between p-4 bg-white/70 backdrop-blur-sm rounded-xl border-2 border-rose-100 shadow-sm hover:shadow-md transition-all duration-200">
            <span class="text-lg text-slate-700 grow w-full">{{
                player.name
            }}</span>
            <Button
                class="grow-0 max-w-fit"
                @click="() => removePlayer(index)"
                variant="secondary"
                disabled>
                Remove
            </Button>
        </div>
    </div>
</template>

<script setup lang="ts">
    const { gameState, addPlayer, removePlayer, startGame } = useGameState();
    const newPlayerName = ref("");

    const handleAddPlayer = () => {
        if (newPlayerName.value.trim()) {
            addPlayer(newPlayerName.value);
            newPlayerName.value = "";
        }
    };
</script>
