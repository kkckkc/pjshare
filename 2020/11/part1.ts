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

export const clone = (v: string[][]) => v.map(e => e.slice(0));

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
          current[row - 1]?.[col - 1], current[row - 1]?.[col], current[row - 1]?.[col + 1],
          current[row]?.[col - 1], /*current[row][col], */ current[row]?.[col + 1],
          current[row + 1]?.[col - 1], current[row + 1]?.[col], current[row + 1]?.[col + 1]];
        if (current[row][col] === 'L' && adjacent.filter(e => e === '#').length === 0) {
          dest[row][col] = '#';
          changed = true;
        } else if (current[row][col] === '#' && adjacent.filter(e => e === '#').length >= 4) {
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

console.log(solve(parse(readFile(__dirname))));