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

const slopeTotal = (input: Input, rowDelta: number, colDelta: number) => {
  let row = 0, column = 0, sum = 0;
  while (row < input.values.length) {
    sum += input.values[row][column];
    row += rowDelta;
    column = (column + colDelta) % input.rowLength;
  }
  return sum;
}

export const solve = (input: Input): string => {
  return (slopeTotal(input, 1, 1) * slopeTotal(input, 1, 3) * slopeTotal(input, 1, 5) * slopeTotal(input, 1, 7) * slopeTotal(input, 2, 1)).toString()
}


console.log(solve(parse(readFile(__dirname))));