export interface Iterator<T> {
  // iterator(): Iterator<T>
  hasNext(): boolean
  next(): T
  remove(): boolean
  current(): T
};
