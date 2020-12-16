import { assertEquals } from '../../lib/assert';
import { readFile } from '../../lib/readFile';
import { range } from '../../lib/arrays';
import { cartesianProduct, nTuples} from '../../lib/combinatorics';

type Field = {
  name: string,
  intervals: {
    from: number,
    to:number
  }[]
}

type Input = {
  fields: Field[],
  yourTicket: number[],
  nearbyTickets: number[][]
};

export const parse = (input: string[]): Input => {
  let fields: Field[] = [];
  let yourTicket: number[] = [];
  let nearbyTickets: number[][] = [];

  let state = 0;

  for (let idx = 0; idx < input.length; idx++) {
    if (input[idx].trim() === '') continue;

    if (input[idx].trim() === 'your ticket:') {
      state = 1;
      continue;
    }

    if (input[idx].trim() === 'nearby tickets:') {
      state = 2;
      continue;
    }

    if (state === 0) {
      fields.push({
        name: input[idx].split(':')[0],
        intervals: input[idx].split(':')[1].trim().split(' or ').map(iv => ({ from: Number(iv.split('-')[0]), to: Number(iv.split('-')[1]) }))
      });
    } else if (state === 1) {
      yourTicket = input[idx].split(/,/g).map(a => Number(a));
    } else {
      nearbyTickets.push(input[idx].split(/,/g).map(a => Number(a)));
    }
  }

  return { fields, nearbyTickets, yourTicket };
}

export const solve = (input: Input): number => {
  const validTickets = input.nearbyTickets.filter(ticket => 
    ticket.every(v => 
      input.fields.some(f => 
        f.intervals.some(iv => v >= iv.from && v <= iv.to))));

  const validFields = validTickets[0].map(_ => new Set(input.fields.map(f => f.name)));

  for (let fieldIdx = 0; fieldIdx < validTickets[0].length; fieldIdx++) {
    for (const ticket of validTickets) {
      const v = ticket[fieldIdx];
      for (const fn of validFields[fieldIdx]) {
        const f = input.fields.find(a => a.name == fn)!;
        if (! f.intervals.some(iv => v >= iv.from && v <= iv.to)) {
          validFields[fieldIdx].delete(f.name);
        }
      }
    }
  }


  let assignment = new Array(validTickets[0].length); 

  for (let i = 0; i < assignment.length; i++) {
    const oneIdx = validFields.findIndex(a => a.size === 1);
    assignment[oneIdx] = Array.from(validFields[oneIdx].values())[0]

    validFields.forEach(vf => vf.delete(assignment[oneIdx]));
  }

  return assignment.reduce((acc, c, idx) => c.startsWith('departure') ? input.yourTicket[idx] * acc : acc, 1)
}


console.log(solve(parse(`class: 0-1 or 4-19
row: 0-5 or 8-19
seat: 0-13 or 16-19

your ticket:
11,12,13

nearby tickets:
3,9,18
15,1,5
5,14,9`.split('\n'))));

console.log(solve(parse(`class: 1-3 or 5-7
row: 6-11 or 33-44
seat: 13-40 or 45-50

your ticket:
7,1,14

nearby tickets:
7,3,47
40,4,50
55,2,20
38,6,12`.split('\n'))));

console.log(solve(parse(readFile(__dirname))));