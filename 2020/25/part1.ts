import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';


const findLoop = (t: number): number => {
  let a = 1;
  for (let i = 0; i < 20000000000; i++) {
    a = (a * 7) % 20201227;
    if (a === t) return i + 1;
  }
  return -1;
}

const transform = (subject: number, loopSize: number): number => {
  let a = 1;
  for (let i = 0; i < loopSize; i++) {
    a = (a * subject) % 20201227;
  }
  return a;
}


export const solve = (card: number, door: number): number => {
  const cardLoop = findLoop(card);
  const doorLoop = findLoop(door);

  console.log('--------------------------------------------');
  
  console.log(cardLoop);
  console.log(doorLoop);

  return transform(door, cardLoop);
}


console.log(solve(5764801, 17807724))
console.log(solve(13233401, 6552760))


//console.log(solve(parse(readFile(__dirname))));