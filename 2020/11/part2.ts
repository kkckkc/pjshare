import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: string[][],
  colCount: number
};

export const parse = (input: string[]): Input => {
  return { values: input.map(i => i.split('')), colCount: input[0].length };
}

const clone = (v: string[][]) => v.map(e => e.slice(0));

const findFirst = (arr: string[][], row: number, col: number, rowD: number, colD: number): string | undefined => {
  let r = row + rowD;
  let c = col + colD;

  while (arr[r]?.[c] !== undefined) {
//    console.log(r, c, arr[r]?.[c]);
    if (arr[r]?.[c] !== '.') return arr[r]?.[c];
    r += rowD;
    c += colD;
  }

  return undefined;
}

export const solve = (input: Input): number => {
  let changed = false;
  let current = input.values;
  do {
    changed = false;
    
//    console.log('--------------------------------------------');    
//    console.log(current.map(e => e.join('')).join('\n'));

    const dest = clone(current); 

    for (let col = 0; col < input.colCount; col++) {
      for (let row = 0; row < input.values.length; row++) {
        let adjacent = [ 
          findFirst(current, row, col, -1, -1), findFirst(current, row, col, -1, 0), findFirst(current, row, col, -1, +1),
          findFirst(current, row, col, 0, -1), /*findFirst(current, row, col, 0, 0), */findFirst(current, row, col, 0, +1),
          findFirst(current, row, col, 1, -1), findFirst(current, row, col, 1, 0), findFirst(current, row, col, 1, +1)];
        if (current[row][col] === 'L' && adjacent.filter(e => e === '#').length === 0) {
          dest[row][col] = '#';
          changed = true;
        } else if (current[row][col] === '#' && adjacent.filter(e => e === '#').length >= 5) {
          dest[row][col] = 'L';
          changed = true;
        }
      }
    }

    current = dest;
  } while (changed);

  return current.map(e => e.join('')).join('').split('').filter(e => e === '#').length;
}

console.log(solve(parse(`L.LL.LL.LL
LLLLLLL.LL
L.L.L..L..
LLLL.LL.LL
L.LL.LL.LL
L.LLLLL.LL
..L.L.....
LLLLLLLLLL
L.LLLLLL.L
L.LLLLL.LL`.split('\n'))));


/*console.log(findFirst(parse(`.......#.
...#.....
.#.......
.........
..#L....#
....#....
.........
#........
...#.....`.split('\n')).values, 4, 3, -1, 0));*/


console.log(solve(parse(readFile(__dirname))));