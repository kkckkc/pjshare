export const findSmallest = <T>(arr: T[], fn: ((el: T, idx: number) => number)) => {
  let smallest = 100000000, smallestIdx = -1;
  arr.forEach((e, idx) => {
    let n = fn(e, idx);
    if (n < smallest) {
      smallest = n;
      smallestIdx = idx;
    }
  });
  return {
    index: smallestIdx,
    value: smallest
  }
}

export const findBiggest = <T>(arr: T[], fn: ((el: T, idx: number) => number)) => {
  let biggest = 0, biggestIdx = -1;
  arr.forEach((e, idx) => {
    let n = fn(e, idx);
    if (n > biggest) {
      biggest = n;
      biggestIdx = idx;
    }
  });
  return {
    index: biggestIdx,
    value: biggest
  }
}