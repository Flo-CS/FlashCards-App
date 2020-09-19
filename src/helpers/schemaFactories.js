import {nanoid} from "nanoid"

export function cardSchemaFactory(frontContent, backContent, learningRate, lastViewedDatetime, folder) {
    return {
        id: nanoid(25),
        frontContent,
        backContent,
        learningRate,
        lastViewedDatetime,
        createdDatetime: new Date().toISOString(),
        folder,
    }
}
