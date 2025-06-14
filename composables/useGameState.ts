export interface Player {
    name: string;
    score: number;
}

type GameStage = "players" | "difficulty" | "activeRound" | "gameOver";

interface GameState {
    players: Player[];
    currentPlayerIndex: number;
    stage: GameStage;
    currentDifficulty: number;
}

export const useGameState = () => {
    const gameState = useState<GameState>("gameState", () => ({
        players: [],
        currentPlayerIndex: 0,
        stage: "players",
        currentDifficulty: 1,
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
        gameState.value.currentPlayerIndex = 0;
    };

    const setDifficulty = (difficulty: number) => {
        gameState.value.currentDifficulty = difficulty;
    };

    const startRound = () => {
        if (gameState.value.stage !== "difficulty") return;
        gameState.value.stage = "activeRound";
    };
    const endRound = () => {
        gameState.value.stage = "players";
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
            stage: "players",
            currentDifficulty: 1,
        };
    };

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
        setDifficulty,
    };
};
