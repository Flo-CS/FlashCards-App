import {nanoid} from "nanoid"

export function cardSchemaFactory(frontContent = "", backContent = "", learningRate = "", folderPath = "/main") {
    return {
        id: nanoid(30),
        frontContent,
        backContent,
        learningRate,
        folderPath,
        lastViewedDatetime: new Date().toISOString(),
        createdDatetime: new Date().toISOString(),
    }
}

export function folderSchemaFactory(name, path) {
    return {
        id: nanoid(25),
        name,
        path
    }
}