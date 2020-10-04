export function mergeArrayOfObjectsByKey(biggestArray, smallestArray, key) {
    const mergedArray = []

    for (const biggestArrayItem of biggestArray) {
        const smallestArrayItem = smallestArray.find((smallestArrayItem) => smallestArrayItem[key] === biggestArrayItem[key])
        if (smallestArrayItem) {
            mergedArray.push({...biggestArrayItem, ...smallestArrayItem})
        } else {
            mergedArray.push(biggestArrayItem)
        }
    }

    return mergedArray
}

