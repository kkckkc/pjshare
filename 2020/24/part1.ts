import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Direction = 'e'|'se'|'sw'|'w'|'nw'|'ne';

type Input = {
  values: Direction[][]
};

const parseDirections = (s: string): Direction[] => {
  const d: Direction[] = [];
  
  let r = s;

  while (r.length > 0) {
    if (r.startsWith('se')) { d.push('se'); r = r.slice(2); }
    else if (r.startsWith('sw')) { d.push('sw'); r = r.slice(2); }
    else if (r.startsWith('nw')) { d.push('nw'); r = r.slice(2); }
    else if (r.startsWith('ne')) { d.push('ne'); r = r.slice(2); }
    else if (r.startsWith('e')) { d.push('e'); r = r.slice(1); }
    else if (r.startsWith('w')) { d.push('w'); r = r.slice(1); }
    else throw new Error(`Cannot parse ${r}`)
  }

  return d;
} 

export const parse = (input: string[]): Input => {
  return { values: input.map(s => parseDirections(s)) };
}

export const solve = (input: Input): number => {
  const blackTiles: Set<string> = new Set();

  for (const line of input.values) {
    let row = 0, col = 0;

    for (const d of line) {
      if (d === 'e') col += 2;
      else if (d === 'w') col -= 2;
      else if (d === 'sw') { col--; row++; }
      else if (d === 'se') { col++; row++; }
      else if (d === 'nw') { col--; row--; }
      else if (d === 'ne') { col++; row--; }
    }

    const coord = `${row}:${col}`;
    if (blackTiles.has(coord)) {
      blackTiles.delete(coord);
    } else {
      blackTiles.add(coord);
    }
  }

  return blackTiles.size;
}

console.log(solve(parse(`sesenwnenenewseeswwswswwnenewsewsw
neeenesenwnwwswnenewnwwsewnenwseswesw
seswneswswsenwwnwse
nwnwneseeswswnenewneswwnewseswneseene
swweswneswnenwsewnwneneseenw
eesenwseswswnenwswnwnwsewwnwsene
sewnenenenesenwsewnenwwwse
wenwwweseeeweswwwnwwe
wsweesenenewnwwnwsenewsenwwsesesenwne
neeswseenwwswnwswswnw
nenwswwsewswnenenewsenwsenwnesesenew
enewnwewneswsewnwswenweswnenwsenwsw
sweneswneswneneenwnewenewwneswswnese
swwesenesewenwneswnwwneseswwne
enesenwswwswneneswsenwnewswseenwsese
wnwnesenesenenwwnenwsewesewsesesew
nenewswnwewswnenesenwnesewesw
eneswnwswnwsenenwnwnwwseeswneewsenese
neswnwewnwnwseenwseesewsenwsweewe
wseweeenwnesenwwwswnew`.split('\n'))));

console.log(solve(parse(readFile(__dirname))));