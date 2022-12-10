// addx V takes two cycles to complete. After two cycles, the X register is increased by the value V. (V can be negative.)
// noop takes one cycle to complete. It has no other effect.
// For now, consider the signal strength (the cycle number multiplied by the value of the X register) during the 20th cycle and every 40 cycles after that (that is, during the 20th, 60th, 100th, 140th, 180th, and 220th cycles).
// signal = cycle * REG_X

const { AOC_INPUT } = process.env
const AOC_INPUT_ARRAY = AOC_INPUT.split(/\r?\n/)
AOC_INPUT_ARRAY.pop()

const CYCLE_COST = {
    "addx": 2,
    "noop": 1
}

let REG_X = 1

const READ_CYCLES = [20, 60, 100, 140, 180, 220]

let cycle = 1
let strength = 0

const HEIGHT = 6
const WIDTH = 40

const SCREEN = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill("."));

for (const instruction of AOC_INPUT_ARRAY) {
    let [operation, value] = instruction.split(" ")
    value = parseInt(value)

    const cycles = CYCLE_COST[operation]

    for (let y = 0; y < cycles; y++) {
        const spritePositions = getSpritePositions(REG_X)

        const x = (cycle - 1) % 40
        const y = Math.floor((cycle - 1) / 40)

        if(spritePositions.includes(x)) {
            SCREEN[y][x] = "#"
        }
        

        console.log(cycle, REG_X, getSpriteRow(spritePositions).join(""))

        if (READ_CYCLES.includes(cycle)) {
            strength += cycle * REG_X
        }

        cycle++
    }
    if (operation === "addx") {
        REG_X += value
    }

    //console.log(operation, "->", value)
}

function getSpritePositions(number) {
    const spritePositions = [number - 1, number, number + 1]
    return spritePositions
}

function getSpriteRow(spritePositions) {
    const spriteRow = Array.from(Array(40), () => ".");
    for(const pos of spritePositions) {
        if(pos >= 0 && pos < 40) {
            spriteRow[pos] = "#"
        }
    }
    return spriteRow
}

function drawScreen(screen) {
    for (const row of screen) {
        console.log(row.join(""))
    }
}

console.log(strength)
drawScreen(SCREEN)