import {nanoid} from "nanoid";
import {ALL_FOLDER_ID} from "../constants/folders";

export function cardSchemaFactory(frontContent = "", backContent = "", learningRate = "", folderId = ALL_FOLDER_ID) {
    return {
        id: nanoid(30),
        frontContent,
        backContent,
        learningRate,
        folderId,
        lastLearnedDatetime: new Date().toISOString(),
        createdDatetime: new Date().toISOString(),
    };
}

export function folderSchemaFactory(name) {
    const id = nanoid(10);
    return {
        id: id,
        name,
        path: id,
    };
}