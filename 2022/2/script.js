const { AOC_INPUT } = process.env
const AOC_INPUT_ARRAY = AOC_INPUT.split(/\r?\n/)
AOC_INPUT_ARRAY.pop()
/* 
Column 1
A for Rock
B for Paper
C for Scissors
*/

/*
Colum 2
X for Rock
Y for Paper
Z for Scissors 
*/

/*
Mapped
R for Rock
P for Paper
S for Scissors 
*/

const shapeMapper = {
    "A": "R",
    "B": "P",
    "C": "S",
    "X": "R",
    "Y": "P",
    "Z": "S"
}

const shapePointsMapper = {
    "R": 1,
    "P": 2,
    "S": 3
}

/*
Results
0 if you lost
3 if the round was a draw
6 if you won
*/
const resultMapper = {
    "RP": 6,
    "PS": 6,
    "SR": 6,
    "PR": 0,
    "SP": 0,
    "RS": 0,
    "RR": 3,
    "PP": 3,
    "SS": 3
}
function play(opponent, you) {
    const opponentShape = shapeMapper[opponent]
    const yourShape = shapeMapper[you]

    return resultMapper[`${opponentShape}${yourShape}`]
}

let sum = 0
for (const entry of AOC_INPUT_ARRAY) {
    const [opponent, you] = entry.split(" ")
    const resultPoints = play(opponent, you)
    const shapePoints = shapePointsMapper[shapeMapper[you]]
    sum += resultPoints + shapePoints
}
console.log("Part 1:", sum)

/*
X means you need to lose
Y means you need to end the round in a draw
Z means you need to win.
*/

const expectationShapeMapper = {
    "RX": "S",
    "RY": "R",
    "RZ": "P",
    "PX": "R",
    "PY": "P",
    "PZ": "S",
    "SX": "P",
    "SY": "S",
    "SZ": "R"
}

const resultPointsMapper = {
    "X": 0,
    "Y": 3,
    "Z": 6
}

let sum2 = 0
for (const entry of AOC_INPUT_ARRAY) {
    const [opponent, expectedResult] = entry.split(" ")
    const opponentShape = shapeMapper[opponent]

    const shapeToPlay = expectationShapeMapper[`${opponentShape}${expectedResult}`]
    const resultPoints = resultPointsMapper[expectedResult]

    sum2 += resultPoints + shapePointsMapper[shapeToPlay]
}
console.log("Part 2:", sum2)
