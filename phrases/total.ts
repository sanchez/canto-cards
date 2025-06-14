export const CANTO_THINGS: WordGenerator[] = [
    ...CANTO_FOOD,
    ...CANTO_LIQUIDS,
    ...CANTO_OBJECTS,
];

export const CANTO_TOTAL: WordGenerator[] = [
    // _ like _
    dependOn(
        {
            person: pickOne(CANTO_PEOPLE),
            not: pickOne(CANTO_NOT),
            color: pickOne(CANTO_COLORS),
        },
        (fields) => ({
            canto: `${fields.person.canto} ${fields.not.canto} chung-ee ${fields.color.canto}`,
            english: `${fields.person.english} ${fields.not.english} like ${fields.color.english}`,
            difficulty: 1,
        })
    ),

    // _ want _
    dependOn(
        {
            person: pickOne(CANTO_PEOPLE),
            not: pickOne(CANTO_NOT),
            thing: pickOne(CANTO_THINGS),
            please: pickOne(CANTO_PLEASE),
        },
        (fields) => ({
            canto: `${fields.person.canto} ${fields.not.canto} oi ${fields.thing.canto} ${fields.please.canto}`,
            english: `${fields.person.english} ${fields.not.english} want ${fields.thing.english} ${fields.please.english}`,
            difficulty: 1,
        })
    ),

    // _ eat _
    dependOn(
        {
            person: pickOne(CANTO_PEOPLE),
            food: pickOne(CANTO_FOOD),
            want: pickOne(CANTO_WANT),
            not: pickOne(CANTO_NOT),
        },
        (fields) => ({
            canto: `${fields.person.canto} ${fields.not.canto} ${fields.want.canto} sek ${fields.food.canto}`,
            english: `${fields.person.english} ${
                fields.not.english ? "don't" : ""
            } ${fields.want.english ? "want to" : ""} eat ${
                fields.food.english
            }`,
            difficulty: 2,
        })
    ),

    // _ drink _
    dependOn(
        {
            person: pickOne(CANTO_PEOPLE),
            drink: pickOne(CANTO_LIQUIDS),
            want: pickOne(CANTO_WANT),
            not: pickOne(CANTO_NOT),
        },
        (fields) => ({
            canto: `${fields.person.canto} ${fields.not.canto} ${fields.want.canto} yum ${fields.drink.canto}`,
            english: `${fields.person.english} ${
                fields.not.english ? "don't" : ""
            } ${fields.want.english ? "want to" : ""} drink ${
                fields.drink.english
            }`,
            difficulty: 2,
        })
    ),

    // I am a _
    dependOn(
        {
            descriptor: pickOne(CANTO_DESCRIPTOR),
            not: pickOne(CANTO_NOT),
        },
        (fields) => ({
            canto: `or ${fields.not.canto} hai ${fields.descriptor.canto}`,
            english: `I am ${fields.not.english ? "not " : ""} a ${
                fields.descriptor.english
            }`,
            difficulty: 2,
        })
    ),
];

export function getPhrase(difficulty: number) {
    return pickOne(CANTO_TOTAL)(difficulty);
}
