import { readFile } from '../../lib/readFile';

type Input = {
  values: number[]
};

export const parse = (input: string[]): Input => {
  return { values: input.map(i => Number.parseInt(i)) };
}

export const solve = (input: Input): number => {
  const arr = [0, ...input.values.sort((a, b) => a - b)];

  const numberOfWays = []; 

  for (let idx = arr.length - 2; idx >= 0; idx--) {
    let sum = 0;
    for (let i = idx + 1; i < arr.length && (arr[i] - arr[idx]) <= 3; i++) {
      sum += numberOfWays[i] ?? 1;
    }
    numberOfWays[idx] = sum;
  }

  return numberOfWays[0];
}


console.log(solve(parse(`16
10
15
5
1
11
7
19
6
12
4`.split('\n'))))

console.log(solve(parse(`28
33
18
42
31
14
46
20
48
47
24
23
49
45
19
38
39
11
1
32
25
35
8
17
7
9
4
2
34
10
3`.split('\n'))));

console.log(solve(parse(readFile(__dirname))));