function charToNumber(char) {
    const num = char.charCodeAt()

    if (char === char.toLowerCase()) {
        return num - 96
    }
    return num - 64 + 26
}

function getCommonChar(arr1, arr2) {
    for (const entry1 of arr1) {
        if (arr2.find(entry2 => entry1 === entry2)) {
            return entry1
        }
    }
    return null
}

function getCommonCharOfThree(arr1, arr2, arr3) {
    for (const entry1 of arr1) {
        if (arr2.find(entry2 => entry1 === entry2) && arr3.find(entry2 => entry1 === entry2)) {
            return entry1
        }
    }
    return null
}

function splitInHalf(string) {
    const len = string.length
    const arr1 = Array.from(string.slice(0, len / 2))
    const arr2 = Array.from(string.slice(len / 2))
    return { arr1, arr2 }
}

const aocData = process.argv[2]
const aocDataArray = aocData.split(/\r?\n/)

console.log(aocDataArray)
let sum = 0
for (const entry of aocDataArray) {
    const { arr1, arr2 } = splitInHalf(entry)
    const common = getCommonChar(arr1, arr2)

    sum += charToNumber(common)
}

console.log("Part 1:", sum)

function chunk(array, size) {
    const chunked_arr = [];
    for (let i = 0; i < array.length; i++) {
        const last = chunked_arr[chunked_arr.length - 1];
        if (!last || last.length === size) {
            chunked_arr.push([array[i]]);
        } else {
            last.push(array[i]);
        }
    }
    return chunked_arr;
}

let sum2 = 0
for (const chunked of chunk(aocDataArray, 3)) {
    const [arr1, arr2, arr3] = chunked
    const common = getCommonCharOfThree(Array.from(arr1), Array.from(arr2), Array.from(arr3))

    sum2 += charToNumber(common)
}
console.log("Part 2:", sum2)
