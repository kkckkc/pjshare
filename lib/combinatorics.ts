export const cartesianProduct = <T,>(...sets: T[][]) =>
  sets.reduce<T[][]>((accSets, set) => accSets.flatMap(accSet => set.map(value => [...accSet, value])), [[]]);

export const permutator = <T>(inputArr: T[]): T[][] => {
  let result: T[][] = [];

  const permute = (arr: T[], m = []) => {
    if (arr.length === 0) {
      result.push(m)
    } else {
      for (let i = 0; i < arr.length; i++) {
        let curr = arr.slice();
        let next = curr.splice(i, 1);
        permute(curr.slice(), m.concat(next as any));
      }
    }
  }

  permute(inputArr)

  return result;
}