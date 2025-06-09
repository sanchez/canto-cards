export type PhraseResponse = {
    canto: string;
    english: string;
    difficulty: number;
};

export type Optional<T> = T | undefined;

export type WordGenerator = (difficulty: number) => Optional<PhraseResponse>;

export function dependOn<T extends Record<string, PhraseResponse>>(
    dependents: Record<keyof T, WordGenerator>,
    cb: (dependents: T) => Optional<PhraseResponse>
): WordGenerator {
    return (difficulty) => {
        const fields = Object.entries(dependents).reduce(
            (acc, [key, generator]) => {
                (acc[key] as any) = generator(difficulty);
                return acc;
            },
            {} as Record<keyof T, Optional<PhraseResponse>>
        );

        let maxDifficulty = 0;
        for (const val of Object.values(fields)) {
            if (val === undefined) return undefined;
            maxDifficulty = Math.max(maxDifficulty, val.difficulty);
        }

        const result = cb(fields as T);
        if (result === undefined) {
            return undefined;
        }

        if (result.difficulty < maxDifficulty) {
            return undefined;
        }

        return {
            canto: result.canto,
            english: result.english,
            difficulty: Math.max(result.difficulty, maxDifficulty),
        };
    };
}

export function minDifficulty(
    difficulty: number,
    phrase: PhraseResponse
): WordGenerator {
    return (d: number) => {
        if (d < difficulty) {
            return undefined;
        }
        return {
            canto: phrase.canto,
            english: phrase.english,
            difficulty: phrase.difficulty,
        };
    };
}

export function pickOne(generators: WordGenerator[]): WordGenerator {
    return (difficulty) => {
        // Sample a random generator, keep looping until we find one that can generate a phrase

        if (generators.length === 0) {
            return undefined;
        }

        while (true) {
            const randomIndex = Math.floor(Math.random() * generators.length);
            const generator = generators[randomIndex];
            const result = generator(difficulty);
            if (result !== undefined) {
                return result;
            }
        }
    };
}
