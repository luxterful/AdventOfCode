import { inspect } from 'util'

const { AOC_INPUT } = process.env
const AOC_INPUT_ARRAY = AOC_INPUT.split(/\r?\n/)
AOC_INPUT_ARRAY.pop()

const tree = {
    "/": {}
}

let cursor = tree

function cd(dirname) {
    //console.log(`CD "${dirname}"`)
    if (dirname !== ".." && dirname !== "/" && !cursor[dirname][".."]) {
        cursor[dirname][".."] = cursor
    }
    cursor = cursor[dirname]
}

function parseLsOutput(lsRawArray) {
    const lsObject = {}
    for (const entry of lsRawArray) {
        const [identifier, value] = entry.split(" ")
        if (identifier === "dir") {
            lsObject[value] = {}
        } else {
            lsObject[value] = parseInt(identifier)
        }
    }
    return lsObject
}

function fillDir(lsResult) {
    const entries = Object.entries(lsResult)
    for (const [key, value] of entries) {
        cursor[key] = value
    }
}

//console.log("start")
let inputcursor = 0
while (true) {
    const nextLine = AOC_INPUT_ARRAY[inputcursor++]

    //console.log(tree)
    //console.log("Next", nextLine)
    if (!nextLine) {
        break;
    }

    if (nextLine.startsWith("$ cd ")) {
        const [, dir] = nextLine.split("$ cd ")
        cd(dir)
    } else {
        const entries = []
        while (true) {
            const nextEntry = AOC_INPUT_ARRAY[inputcursor++]
            //console.log(nextEntry)
            if (!nextEntry || nextEntry.startsWith("$")) {
                inputcursor--
                break;
            }
            entries.push(nextEntry)
        }
        const parsedLsOutput = parseLsOutput(entries)
        fillDir(parsedLsOutput)
    }
}

//console.log(inspect(tree, { depth: Infinity }))

function calculateSize(root) {
    const entries = Object.entries(root)
    let sum = 0
    for (const [key, value] of entries) {
        if (key === "..") {
            continue;
        }
        if (typeof value === "number") {
            sum += value
        } else {
            const size = calculateSize(value)
            root[key]["_size"] = size
            sum += size
        }
    }

    return sum
}

console.log(calculateSize(tree))
console.log(inspect(tree, { depth: Infinity }))

let sum = 0;
function traverseForSize(root) {
    const entries = Object.entries(root)
    for (const [key, value] of entries) {
        if (key === "_size" && value <= 100000) {
            sum += value
        } else if (key !== ".." && typeof value === "object") {
            traverseForSize(value)
        }
    }
}
traverseForSize(tree)
console.log(sum)

const AT_LEAST = 8381165
let smallest = AT_LEAST
function searchClosesToAtLeast(root) {
    const entries = Object.entries(root)
    for (const [key, value] of entries) {
        if (key === "_size") {

            if (value > AT_LEAST) {
                const diff = value - AT_LEAST
                if (diff < smallest) {
                    smallest = diff
                }
            }

        } else if (key !== ".." && typeof value === "object") {
            searchClosesToAtLeast(value)
        }
    }
}
searchClosesToAtLeast(tree)
console.log(AT_LEAST + smallest)