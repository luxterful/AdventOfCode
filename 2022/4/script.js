const aocData = process.argv[2]
const aocDataArray = aocData.split(/\r?\n/)

console.log(aocDataArray)

let sum1 = 0
let sum2 = 0
for (const entry of aocDataArray) {
    const [range1, range2] = entry.split(",")
    const [r1low, r1high] = range1.split("-").map(entry => parseInt(entry))
    const [r2low, r2high] = range2.split("-").map(entry => parseInt(entry))

    if ((r1low >= r2low && r1high <= r2high) || (r2low >= r1low && r2high <= r1high)) {
        sum1 += 1
    }

    if ((r2low <= r1low && r1low <= r2high)
        || (r2low <= r1high && r1high <= r2high) 
        || (r1low <= r2low && r2low <= r1high)
        || (r1low <= r2high && r2high <= r1high)) {
        sum2 += 1
    }
}
console.log("Part 1:", sum1)
console.log("Part 2:", sum2)