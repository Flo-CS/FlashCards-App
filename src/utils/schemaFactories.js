import {nanoid} from "nanoid"
import {ALL_FOLDER_ID} from "../constants/folders";

export function cardSchemaFactory(frontContent = "", backContent = "", learningRate = "", folderId = ALL_FOLDER_ID) {
    return {
        id: nanoid(30),
        frontContent,
        backContent,
        learningRate,
        folderId,
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