import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: {
    from: number,
    to: number,
    character: string,
    password: string
  }[]
};

export const parse = (input: string[]): Input => {
  return { values: input.map(i => {
    const [_, from, end, character, password] = i.match(/^([0-9]+)-([0-9]+) ([a-z]): (.*)$/)!;
    return { password, character, from: Number(from), to: Number(end) };
  }) };
}

export const solve = (input: Input): string => {
  return input.values
    .filter((v) => {
      const count = v.password.split('').filter(k => k === v.character).length;
      return count >= v.from && count <= v.to;
    })
    .length.toString();
}


console.log(solve(parse(readFile(__dirname))));