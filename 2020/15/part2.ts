import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: number[]
};

export const parse = (input: string[]): Input => {
  return { values: input[0].split(',').map(i => Number.parseInt(i)) };
}

const findLastIndex = (arr: number[], target: number, start: number) => {
  for (let i = (arr.length - 1 - start); i >= 0; i--) {
    if (arr[i] === target) return i;
  }
  return undefined;
}


export const solve = (input: Input): number => {
  const lastPosition: Record<number, number[]> = {};

  for (let i = 0; i < input.values.length; i++) {
    lastPosition[input.values[i]] = [-1, i];
  }

  let last = input.values[input.values.length - 1];
  for (let i = input.values.length; i < 4000000; i++) {
    let [p, l] = lastPosition[last];

    if (i % 1000000 === 0) console.log(i, last, Object.keys(lastPosition).length);

    if (p != -1) {
      last = i - 1 - p;
    } else {
      last = 0;
    }
    const [_, b] = lastPosition[last] ?? [-1, -1];
    lastPosition[last] = [b, i];
  }

  return last;
}

//console.log(solve({ values: [0, 3, 6]}));
//console.log(solve({ values: [1, 2, 3]}));
//console.log(solve({ values: [1, 3, 2]}));

console.log(solve(parse(readFile(__dirname))));