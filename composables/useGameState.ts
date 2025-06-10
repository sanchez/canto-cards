interface Player {
    name: string;
    score: number;
}

interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    isGameStarted: boolean;
    isRoundActive: boolean;
    currentDifficulty: number;
    isDifficultySelected: boolean;
}

export const useGameState = () => {
    const gameState = useState<GameState>("gameState", () => ({
        players: [],
        currentPlayerIndex: 0,
        isGameStarted: false,
        isRoundActive: false,
        currentDifficulty: 1,
        isDifficultySelected: false,
    }));

    const currentPlayer = computed(
        () => gameState.value.players[gameState.value.currentPlayerIndex]
    );

    const addPlayer = (name: string) => {
        if (!name.trim()) return;
        gameState.value.players.push({ name, score: 0 });
    };

    const removePlayer = (index: number) => {
        gameState.value.players.splice(index, 1);
    };

    const startGame = () => {
        if (gameState.value.players.length === 0) return;
        gameState.value.isGameStarted = true;
        gameState.value.currentPlayerIndex = 0;
    };

    const setDifficulty = (difficulty: number) => {
        gameState.value.currentDifficulty = difficulty;
        gameState.value.isDifficultySelected = true;
    };

    const startRound = () => {
        if (!gameState.value.isDifficultySelected) return;
        gameState.value.isRoundActive = true;
    };
    const endRound = () => {
        gameState.value.isRoundActive = false;
        gameState.value.isDifficultySelected = false;
        gameState.value.currentPlayerIndex =
            (gameState.value.currentPlayerIndex + 1) %
            gameState.value.players.length;
    };

    const addPoint = () => {
        if (currentPlayer.value) {
            currentPlayer.value.score++;
        }
    };

    const resetGame = () => {
        gameState.value = {
            players: [],
            currentPlayerIndex: 0,
            isGameStarted: false,
            isRoundActive: false,
            currentDifficulty: 1,
            isDifficultySelected: false,
        };
    };

    const isGameOver = computed(
        () =>
            gameState.value.isGameStarted &&
            gameState.value.currentPlayerIndex === 0 &&
            !gameState.value.isRoundActive
    );

    return {
        gameState,
        currentPlayer,
        addPlayer,
        removePlayer,
        startGame,
        startRound,
        endRound,
        addPoint,
        resetGame,
        isGameOver,
        setDifficulty,
    };
};
