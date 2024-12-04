const aocData = process.env.AOC_INPUT;

const findPhrase = "XMAS";

const dat = aocData.split(/\r?\n/).map((row) => row.split(""));

let count = 0;
dat.map((row, y) =>
  row.map((_, x) => {
    if (dat[y][x] === findPhrase[0]) {
      [-1, 0, 1]
        .flatMap((xx) => [-1, 0, 1].map((yy) => ({ xx, yy })))
        .map((direction) => {
          (function next({ x, y }, { xx, yy }, phrase) {
            x = x + xx;
            y = y + yy;

            if (x < 0 || x > dat[0].length - 1 || y < 0 || y > dat.length - 1)
              return false;

            if (dat[y][x] === phrase[0]) {
              if (phrase.substring(1) === "") return true;
              return next({ x, y }, { xx, yy }, phrase.substring(1));
            }

            return false;
          })({ x, y }, direction, findPhrase.substring(1)) && count++;
        });
    }
  })
);

console.log(`Found ${count} times '${findPhrase}'`);
