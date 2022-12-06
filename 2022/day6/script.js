const aocData = process.argv[2]
const aocDataArray = Array.from(aocData)
const aocDataLength = aocDataArray.length

function everyEntryUnique(arr) {
    return arr.length === [...new Set(arr)].length
}

for (let i = 0; i < aocDataLength; i++) {
    const start = i
    const end = i + 4
    const sliced = aocDataArray.slice(start, end)

    if (everyEntryUnique(sliced)) {
        console.log(end)
        break;

    }
}

for (let i = 0; i < aocDataLength; i++) {
    const start = i
    const end = i + 14
    const sliced = aocDataArray.slice(start, end)

    if (everyEntryUnique(sliced)) {
        console.log(end)
        break;

    }
}