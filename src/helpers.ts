export {};

declare global {
  interface Array<T> {
    distinct(): Array<T>;
  }
}

Array.prototype.distinct = function <T>() {
  var results: T[] = [];

  this.forEach((x) => {
    if (!results.includes(x)) results.push(x);
  });

  return results;
};
