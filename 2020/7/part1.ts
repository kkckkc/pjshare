import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Input = {
  values: {
    from: string,
    to: string[]
  }[]
};

const parseLine = (s: string) => {
  const a = s.split(/bags?/)
    .filter(e => e !== '.')
    .map(e => e.replace(',', ''))
    .map(e => e.replace('contain', ''))
    .map(e => e.trim())

  return {
    from: a[0],
    to: a.slice(1).map(e => e.replace(/^[0-9]+ /, ''))
  }
}

const reachable = (graph: Record<string, string[]>, start: string, end: string) => {
  console.log('--------------------------------------------');
  
  const visited = new Set<string>();
  let current = [ start ];

  while (current.length > 0) {
    const c = current[0];
    current = current.slice(1);
    if (visited.has(c)) continue;

    console.log(c);

    visited.add(c);

    if (c === end) return true;

    current = [...current, ...(graph[c] ?? [])];
  }

  return false;
}


// dotted blue bags contain 3 wavy bronze bags, 5 clear tomato bags.
export const parse = (input: string[]): Input => {
  return { values: input.map(parseLine) };
}

export const solve = (input: Input): number => {
  const graph: Record<string, string[]> = {};
  for (const e of input.values) {
    graph[e.from] = [...(graph[e.from] ?? []), ...e.to];
  }

  let count = 0;
  for (const start of Object.keys(graph)) {
    if (start !== 'shiny gold' && reachable(graph, start, 'shiny gold')) {
      count++;
    }
  }

  return count;
}

/*
console.log(solve(parse(`light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`.split('\n'))));*/

console.log(solve(parse(readFile(__dirname))));