export const CANTO_TOTAL: WordGenerator[] = [
    dependOn(
        {
            person: pickOne(CANTO_PEOPLE),
            not: pickOne(CANTO_NOT),
            color: pickOne(CANTO_COLORS),
        },
        (fields) => ({
            canto: `${fields.person.canto} ${fields.not.canto} chung-ee ${fields.color.canto}`,
            english: `${fields.person.english} ${fields.not.english} likes ${fields.color.english}`,
            difficulty: 1,
        })
    ),
];

export function getPhrase(difficulty: number) {
    return pickOne(CANTO_TOTAL)(difficulty);
}
