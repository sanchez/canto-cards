export const CANTO_OBJECTS: WordGenerator[] = [
    minDifficulty(1, { canto: "chee saw", english: "toilet" }),

    // Glass of _
    dependOn(
        {
            num: pickOne(CANTO_NUMBERS),
            liquid: pickOne(CANTO_LIQUIDS),
        },
        (fields) => ({
            canto: `${fields.num.canto} boy ${fields.liquid.canto}`,
            english: `${fields.num.english} cup of ${fields.liquid.english}`,
            difficulty: 2,
        })
    ),
];
