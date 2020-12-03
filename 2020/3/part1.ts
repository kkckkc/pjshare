import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: number[][],
  rowLength: number
};

export const parse = (input: string[]): Input => {
  return { 
    values: input.map(i => i.split('').map(c => c === '.' ? 0 : 1)),
    rowLength: input[0].length
  };
}

export const solve = (input: Input): string => {
  let row = 0, column = 0, sum = 0;
  while (row < input.values.length) {
    sum += input.values[row][column];
    row++;
    column = (column + 3) % input.rowLength;
  }
  return sum.toString()
}


console.log(solve(parse(readFile(__dirname))));