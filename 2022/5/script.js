const aocData = process.argv[2]
const aocDataArray = aocData.split(/\r?\n/)

var rotateMatrix = function (matrix) {
    return flipMajorDiagonal(matrix.reverse());
}

var flipMajorDiagonal = function (matrix) {
    return matrix[0].map((column, index) => (
        matrix.map(row => row[index])
    ))
}

const table = []
let indexInstructionStart = 0
for (const [lineIndex, line] of aocDataArray.entries()) {
    if (line.length === 0) {
        indexInstructionStart = lineIndex + 1
        break;
    }

    const list = []
    for (const [index, char] of Array.from(line).entries()) {
        if ((index + 1) % 4 - 2 === 0) {
            list.push(char)
        }
    }

    table.push(list)
}

table.pop()

const rotated = rotateMatrix(table)

const containers = {}
for (const [index, containerStack] of rotated.entries()) {
    containers[index + 1] = containerStack.filter(x => x !== " ")
}
const containersCopy = JSON.parse(JSON.stringify(containers))

const regEx = /move (\d+) from (\d+) to (\d+)/
for (const instruction of aocDataArray.slice(indexInstructionStart)) {
    const [, amount, from, to] = instruction.match(regEx)
    for (let i = 0; i < amount; i++) {
        containers[to].push(containers[from].pop())
    }
}

let word1 = ""
for (const stack of Object.values(containers)) {
    word1 += stack.pop()
}

console.log("Part 1:", word1)

for (const instruction of aocDataArray.slice(indexInstructionStart)) {
    const [, amount, from, to] = instruction.match(regEx)
    const temp = []
    for (let i = 0; i < amount; i++) {
        temp.push(containersCopy[from].pop())
    }
    temp.reverse()
    containersCopy[to].push(...temp)
}

let word2 = ""
for (const stack of Object.values(containersCopy)) {
    word2 += stack.pop()
}

console.log("Part 2:", word2)