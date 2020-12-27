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

const adjacent = [
  [2, 0], 
  [1, 1], 
  [-1, 1],
  [-2, 0],
  [-1, -1],
  [1, -1]
]

export const solve = (input: Input): number => {
  let blackTiles: Set<string> = new Set();

  let maxRow = 0;
  let maxCol = 0;

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

    maxRow = Math.max(maxRow, Math.abs(row));
    maxCol = Math.max(maxCol, Math.abs(col));
  }

  maxRow+=2;
  maxCol+=2;

  for (let day = 0; day < 100; day++) {
    const newSet: Set<string> = new Set();

    for (let r = -maxRow; r < maxRow; r++) {
      for (let c = -maxCol; c < maxCol; c++) {
        if (r % 2 === 0 && c % 2 === 1) continue;

        const count = adjacent.map(([x, y]) => [r + y, c + x])
          .map(([r, c]) => `${r}:${c}`)
          .filter(coord => blackTiles.has(coord)).length;

        const coord = `${r}:${c}`;
        if (blackTiles.has(coord)) {
          if (! (count === 0 || count > 2)) {
            newSet.add(coord);
          }
        } else if (count === 2) {
          newSet.add(coord);
        } 
      }
    }

    console.log(`Day ${day + 1}: ${newSet.size}`);
    blackTiles = newSet;
    maxRow+=2;
    maxCol+=2;
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