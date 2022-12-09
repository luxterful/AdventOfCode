const { AOC_INPUT } = process.env
const AOC_INPUT_ARRAY = AOC_INPUT.split(/\r?\n/).map(arr => arr.split("").map(n => parseInt(n)))
AOC_INPUT_ARRAY.pop()

const HEIGHT = AOC_INPUT_ARRAY.length
const WIDTH = AOC_INPUT_ARRAY[0].length

const TREE_MAP = Array.from(Array(WIDTH), () => new Array(HEIGHT));
const SCENIC_MAP = Array.from(Array(WIDTH), () => new Array(HEIGHT));


console.log({ HEIGHT, WIDTH })

let count = 0
let highestScenicScore = 0

for (let y = 0; y < HEIGHT; y++) {
    for (let x = 0; x < WIDTH; x++) {
        const treeHeight = AOC_INPUT_ARRAY[y][x]

        const row = AOC_INPUT_ARRAY[y]
        const column = AOC_INPUT_ARRAY.map(val => val[x])

        const ABOVE = column.slice(0, y)
        const BELOW = column.slice(y + 1)
        const LEFT = row.slice(0, x)
        const RIGHT = row.slice(x + 1)

        const isHighestFromAbove = ABOVE.every(height => height < treeHeight)
        const isHighestFromBelow = BELOW.every(height => height < treeHeight)
        const isHighestFromLeft = LEFT.every(height => height < treeHeight)
        const isHighestFromRight = RIGHT.every(height => height < treeHeight)

        const isHighesFromAnyDirection = [
            isHighestFromAbove,
            isHighestFromBelow,
            isHighestFromLeft,
            isHighestFromRight
        ].some(bool => bool)

        TREE_MAP[y][x] = isHighesFromAnyDirection ? "x" : "."

        count += isHighesFromAnyDirection

        ABOVE.reverse()
        LEFT.reverse()

        let scenicScore = 1
        for (const arr of [ABOVE, BELOW, LEFT, RIGHT]) {
           
            let scene = 0
            for (const tree of arr) {
                scene++
                if (tree >= treeHeight) {
                    break
                }
                
            }
            scenicScore *= scene
        }

        //console.log(scenicScore)
        SCENIC_MAP[y][x] = scenicScore
        if (highestScenicScore < scenicScore) {
            highestScenicScore = scenicScore
        }
    }
}
console.log("Part 1:", count)

function drawMap(map) {
    for (const row of map) {
        console.log(row.join(" "))
    }
}

drawMap(TREE_MAP)
//drawMap(SCENIC_MAP)


console.log("Part 2:", highestScenicScore)