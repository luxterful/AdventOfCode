const { AOC_INPUT } = process.env
const AOC_INPUT_ARRAY = AOC_INPUT.split(/\r?\n/)
AOC_INPUT_ARRAY.pop()

const MAXIMUM = {
    U: 0,
    R: 0,
    L: 0,
    D: 0
}

const CURRENT_POSITION = {
    X: 0,
    Y: 0
}
for (const instruction of AOC_INPUT_ARRAY) {
    const [direction, amount] = instruction.split(" ")
    const amountNumber = parseInt(amount)

    if (direction === "U") {
        CURRENT_POSITION.Y += amountNumber
    } else if (direction === "D") {
        CURRENT_POSITION.Y -= amountNumber
    } else if (direction === "L") {
        CURRENT_POSITION.X -= amountNumber
    } else if (direction === "R") {
        CURRENT_POSITION.X += amountNumber
    }

    if (CURRENT_POSITION.Y > MAXIMUM.U) {
        MAXIMUM.U = CURRENT_POSITION.X
    }
    if (CURRENT_POSITION.Y < MAXIMUM.D) {
        MAXIMUM.D = CURRENT_POSITION.Y
    }
    if (CURRENT_POSITION.X > MAXIMUM.R) {
        MAXIMUM.R = CURRENT_POSITION.X
    }
    if (CURRENT_POSITION.X < MAXIMUM.L) {
        MAXIMUM.L = CURRENT_POSITION.X
    }
}
console.log(MAXIMUM)
console.log(CURRENT_POSITION)

const WIDTH = Math.abs(MAXIMUM.L) + MAXIMUM.R + 1;
const HEIGHT = Math.abs(MAXIMUM.D) + MAXIMUM.U + 1

console.log(WIDTH, HEIGHT)

const PATH_MAP = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill("."));
const TAIL_MAP = Array.from(Array(HEIGHT), () => new Array(WIDTH).fill("."));

function calcDelta(h, t) {
    return [Math.abs(t.X - h.X), Math.abs(t.Y - h.Y)]
}

const POS_H = {
    X: Math.abs(MAXIMUM.L),
    Y: Math.abs(MAXIMUM.D)
}

const POS_T = {
    X: POS_H.X,
    Y: POS_H.Y
}

PATH_MAP[POS_H.Y][POS_H.X] = "■"
TAIL_MAP[POS_T.Y][POS_T.X] = "■"

for (const instruction of AOC_INPUT_ARRAY) {
    const [direction, amount] = instruction.split(" ")
    const amountNumber = parseInt(amount)

    for (let y = 0; y < amountNumber; y++) {

        const oldPosition = {
            X: POS_H.X,
            Y: POS_H.Y
        }

        if (direction === "U") {
            POS_H.Y++
        } else if (direction === "D") {
            POS_H.Y--
        } else if (direction === "L") {
            POS_H.X--
        } else if (direction === "R") {
            POS_H.X++
        }

        const delta = calcDelta(POS_H, POS_T)

        if (delta.some(d => d > 1)) {
            POS_T.X = oldPosition.X
            POS_T.Y = oldPosition.Y
        }

        PATH_MAP[POS_H.Y][POS_H.X] = "■"

        TAIL_MAP[POS_T.Y][POS_T.X] = "■"

    }
}

function drawMap(map) {
    for (const row of map) {
        console.log(row.join(" "))
    }
}

//drawMap(PATH_MAP)
//console.log()
//drawMap(TAIL_MAP)

let count = 0
for (const row of TAIL_MAP) {
    for (const col of row) {
        if (col === "■") {
            count++
        }
    }

}
console.log(count)