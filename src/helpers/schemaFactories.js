import NanoId from "nanoid"

function cardSchemaFactory(frontContent, backContent, learningRate, lastViewedDatetime, folder) {
    return {
        id: NanoId.random(20),
        frontContent,
        backContent,
        learningRate,
        lastViewedDatetime,
        createdDatetime: new Date().toISOString(),
        folder,
    }
}
