export const toDigitArray = (a: number) => {
  const dest: number[] = [];
  while (a >= 10) {
    dest.push(a % 10);
    a = Math.floor(a / 10);
  }
  dest.push(a);
  return dest.reverse();
}