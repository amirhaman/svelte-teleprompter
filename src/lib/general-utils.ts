// place files you want to import through the `$lib` alias in this folder.
export const rotateLeft = (arr: [], k: number) => {
  k = k % arr.length;
  return [...arr.slice(k), ...arr.slice(0, k)];
};
export const rotateRight = (arr: [], k: number) => {
  const n = arr.length;
  k = k % n;
  return [...arr.slice(n - k), ...arr.slice(0, n - k)];
};