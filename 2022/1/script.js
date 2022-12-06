const aocData = process.argv[2]
const aocDataArray = aocData.split(/\r?\n/)
aocDataArray.push("")

let sum = 0
let list = []
let max = 0
for (const cal of aocDataArray) {
    if(cal !== "") {
        sum += parseInt(cal)
        continue;
    }
    list.push(sum)
    if(max < sum) {
        max = sum
    }
    sum = 0
}

console.log("Part 1:", max)

list.sort(function(a, b){return b - a})

const top3 = list[0] + list[1] + list[2]
console.log("Part 2:", top3)