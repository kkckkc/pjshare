import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: {
    from: string,
    to: string[],
    toCount: number[]
  }[]
};

const parseLine = (s: string) => {
  const a = s.split(/bags?/)
    .filter(e => e !== '.')
    .filter(e => e.indexOf('no other') < 0)
    .map(e => e.replace(',', ''))
    .map(e => e.replace('contain', ''))
    .map(e => e.trim())

  return {
    from: a[0],
    to: a.slice(1).map(e => e.replace(/^[0-9]+ /, '')),
    toCount: a.slice(1).map(e => Number(e.split(' ')[0])),
  }
}

const count = (graph: Record<string, string[]>, weight: Record<string, number>, start: string) => {
  type Entry = { node: string, multiplier: number };

  let current: Entry[] = [ { node: start, multiplier: 1 } ];

  let count = 0;

  while (current.length > 0) {
    const c = current[0];
    current = current.slice(1);

    count += c.multiplier;

    for (const t of graph[c.node]) {
      current.push({ node: t, multiplier: c.multiplier * weight[`${c.node}~${t}`]});
    }
  }

  return count - 1;
}

type Edge = { to: string, weight: number };

export const parse = (input: string[]): Input => {
  return { values: input.map(parseLine) };
}

export const solve = (input: Input): number => {
  const graph: Record<string, string[]> = {};
  const weight: Record<string, number> = {};

  for (const e of input.values) {
    graph[e.from] = [...(graph[e.from] ?? []), ...e.to];
    for (let i = 0; i < e.to.length; i++) {
      weight[`${e.from}~${e.to[i]}`] = e.toCount[i];
    }
  }

  return count(graph, weight, 'shiny gold');
}


console.log(solve(parse(`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.split('\n'))));

console.log(solve(parse(`shiny gold bags contain 2 dark red bags.
dark red bags contain 2 dark orange bags.
dark orange bags contain 2 dark yellow bags.
dark yellow bags contain 2 dark green bags.
dark green bags contain 2 dark blue bags.
dark blue bags contain 2 dark violet bags.
dark violet bags contain no other bags.`.split('\n'))));

console.log(solve(parse(readFile(__dirname))));