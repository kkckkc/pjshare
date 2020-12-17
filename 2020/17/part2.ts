import { readFile } from '../../lib/readFile';
import { cartesianProduct } from '../../lib/combinatorics';

type Point = {
  x: number,
  y: number;
  z: number,
  w: number
}

type Input = {
  values: Set<string>,
  w: number,
  h: number
};

const enc = (p: Point): string => `${p.x}_${p.y}_${p.z}_${p.w}`;

export const parse = (input: string[]): Input => {
  const d: Set<string> = new Set();
  for (let row = 0; row < input.length; row++) {
    input[row].split('').forEach((el, idx) => {
      if (el === '#') d.add(enc({ x: idx, y: row, z: 0, w: 0 }));
    })
  }
  return { values: d, w: input[0].split('').length, h: input.length };
}

let ort = cartesianProduct([-1, 0, 1], [-1, 0, 1], [-1, 0, 1], [-1, 0, 1]).filter(a => !a.every(k => k === 0));

export const solve = (input: Input): number => {
  let xDim = [0, input.w];
  let yDim = [0, input.h];
  let zDim = [0, 0];
  let wDim = [0, 0];
  let s = new Set(input.values);
  for (let i = 0; i < 6; i++) {
    let d: Set<string> = new Set();
    xDim = [xDim[0] - 1, xDim[1] + 1];
    yDim = [yDim[0] - 1, yDim[1] + 1];
    zDim = [zDim[0] - 1, zDim[1] + 1];
    wDim = [wDim[0] - 1, wDim[1] + 1];

    for (let x = xDim[0]; x <= xDim[1]; x++) {
      for (let y = yDim[0]; y <= yDim[1]; y++) {
        for (let z = zDim[0]; z <= zDim[1]; z++) {
          for (let w = wDim[0]; w <= wDim[1]; w++) {
            let activeNeighbours = ort.filter(([xd, yd, zd, wd]) => s.has(enc({ x: x + xd, y: y + yd, z: z + zd, w: w + wd}))).length;

            if (activeNeighbours === 3 || (s.has(enc({x, y, z, w})) && activeNeighbours === 2)) {
              d.add(enc({x, y, z, w}));
            }
          }
        }   
      }  
    }

    s = d;
  }

  return s.size;
}

console.log(solve(parse(`.#.
..#
###`.split('\n'))));

console.log(solve(parse(readFile(__dirname))));