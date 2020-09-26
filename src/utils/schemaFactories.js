import {nanoid} from "nanoid"

export function cardSchemaFactory(frontContent = "", backContent = "", learningRate = "", folder = "/main") {
    return {
        id: nanoid(30),
        frontContent,
        backContent,
        learningRate,
        folder,
        lastViewedDatetime: new Date().toISOString(),
        createdDatetime: new Date().toISOString(),
    }
}
