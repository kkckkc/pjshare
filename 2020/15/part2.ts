import { range } from 'lib/arrays';
import { readFile } from '../../lib/readFile';

type Input = {
  values: number[]
};

export const parse = (input: string[]): Input => {
  return { values: input[0].split(',').map(i => Number.parseInt(i)) };
}

export const solve = (input: Input): number => {
  const lastPosition: Map<number, number> = new Map<number, number>();

  for (let i = 0; i < input.values.length; i++) {
    lastPosition.set(input.values[i], i);
  }

  let last = input.values[input.values.length - 1];
  let lp = -1;
  for (let i = input.values.length; i < 30000000; i++) {
    //if (i % 1000000 === 0) console.log(i, last, Object.keys(lastPosition).length);

    if (lp != -1) {
      last = i - 1 - lp;
    } else {
      last = 0;
    }
    const b = (lastPosition.has(last) ? lastPosition.get(last) : -1)!;
    lp = b;
    lastPosition.set(last, i);
  }

  return last;
}

//console.log(solve({ values: [0, 3, 6]}));
//console.log(solve({ values: [1, 2, 3]}));
//console.log(solve({ values: [1, 3, 2]}));

console.log(solve(parse(readFile(__dirname))));