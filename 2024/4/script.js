const aocData = process.env.AOC_INPUT;

const findPhrase = "XMAS";

const matrix = aocData
  .split(/\r?\n/)
  .filter((row) => row.trim() !== "")
  .map((row) => row.split(""));

const maxY = matrix.length - 1;
const maxX = matrix[0].length - 1;

let count = 0;
for (let y = 0; y < matrix.length; y++) {
  for (let x = 0; x < matrix[y].length; x++) {
    if (matrix[y][x] === findPhrase[0]) {
      const remainingPhrase = findPhrase.substring(1);

      const directions = [-1, 0, 1].flatMap((x) =>
        [-1, 0, 1].map((y) => ({ x, y }))
      );

      for (const direction of directions) {
        const foundPhrase = foundNextCharacter(
          { x, y },
          direction,
          remainingPhrase
        );
        if (foundPhrase) count++;
      }
    }
  }
}

console.log(`Found ${count} times '${findPhrase}'`);

function foundNextCharacter(pos, direction, phrase) {
  pos = { x: pos.x + direction.x, y: pos.y + direction.y };

  if (pos.x < 0 || pos.x > maxX || pos.y < 0 || pos.y > maxY) return false;

  if (matrix[pos.y][pos.x] === phrase[0]) {
    const remainingPhrase = phrase.substring(1);

    if (remainingPhrase === "") return true;

    return foundNextCharacter(
      { x: pos.x, y: pos.y },
      direction,
      phrase.substring(1)
    );
  }

  return false;
}

