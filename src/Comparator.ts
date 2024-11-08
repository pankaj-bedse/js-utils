export class Comparator<T> {
  private reverseOrder: boolean = false;

  constructor(compareFn?: (a: T, b: T) => number, reversed?:boolean) {
    if (typeof compareFn === 'function') {
      this.defaultCompare = compareFn.bind(this);
    }
    if (reversed) {
      this.reverseOrder = reversed;
    }
  }

  defaultCompare(a: T, b: T): number {
    if (a < b) {
      return -1;
    } else if (a > b) {
      return 1;
    }
    return 0;
  }

  compare(a: T, b: T): number {
    if (this.reverseOrder) {
      return this.defaultCompare(b, a);
    }
    return this.defaultCompare(a, b);
  }

  reversed(): (a:T, b:T) => number {
    return (a:T, b: T) => {
      return this.compare(b, a);
    }
  }
}
