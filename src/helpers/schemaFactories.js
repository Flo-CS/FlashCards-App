import {nanoid} from "nanoid"

export function cardSchemaFactory(frontContent, backContent, learningRate, folder) {
    return {
        id: nanoid(30),
        frontContent,
        backContent,
        learningRate,
        lastViewedDatetime: new Date().toISOString(),
        createdDatetime: new Date().toISOString(),
        folder,
    }
}
