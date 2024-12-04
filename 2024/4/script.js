const aocData = process.env.AOC_INPUT;

const findPhrase = "XMAS";

function create2DArray(data) {
  const rows = data.split(/\r?\n/).filter((row) => row.trim() !== "");
  const array2D = rows.map((row) => row.split(""));
  return array2D;
}

const matrix = create2DArray(aocData);
const maxY = matrix.length - 1;
const maxX = matrix[0].length - 1;

console.log(maxX, maxY);

function find(data, phrase) {
  let count = 0;
  for (const row_index in data) {
    for (const col_index in data[row_index]) {
      const char = data[row_index][col_index];
      if (char === phrase[0]) {
        const remainingPhrase = phrase.substring(1);

        const searchDirections = [
          { x: 1, y: 0 },
          { x: 1, y: -1 },
          { x: 0, y: -1 },
          { x: -1, y: -1 },
          { x: -1, y: 0 },
          { x: -1, y: 1 },
          { x: 0, y: 1 },
          { x: 1, y: 1 },
        ];

        for (const direction of searchDirections) {
          const foundPhrase = foundNextCharacter(
            { x: parseInt(col_index), y: parseInt(row_index) },
            direction,
            remainingPhrase
          );
          if (foundPhrase) count++;
        }
      }
    }
  }

  console.log(`Found ${count} times '${phrase}'`);
}

function foundNextCharacter(position, searchDirection, phrase) {
  if (phrase === "") {
    return true;
  }

  const newX = position.x + searchDirection.x;
  const newY = position.y + searchDirection.y;

  if (newX < 0 || newX > maxX || newY < 0 || newY > maxY) return false;

  const lookForNextCharacter = phrase[0];
  const remainingPhrase = phrase.substring(1);

  const foundCharacter = matrix[newY][newX];

  if (foundCharacter === lookForNextCharacter) {
    return foundNextCharacter(
      { x: newX, y: newY },
      searchDirection,
      remainingPhrase
    );
  }

  return false;
}

find(matrix, findPhrase);
