import { AbstractCollection } from "./AbstractCollection";
import { Collection, HasEquals } from "./interfaces/Collection";
import { Queue } from './interfaces/Queue';
import { Comparator } from './Comparator';
import { Iterator } from "./interfaces/Iterator";

export class PriorityQueue<T> extends AbstractCollection<T> implements Queue<T>{

  private length: number = 0;
  private maxLength: number = 50;
  private comparator: Comparator<T> = new Comparator<T>();
  private queue: (T | null)[] = [];

  constructor(size?: number, comparator?: Comparator<T>) {
    super();
    if (typeof size !== 'undefined' && size < 1) {
      throw 'IllegalArguments';
    }
    if (size) {
      this.maxLength = size;
    }
    if (comparator) {
      this.comparator = comparator;
    }
  }

  protected isInsertionAllowed(): boolean {
    return this.queue.length < this.maxLength;
  }

  public size() {
    return this.queue.length;
  }

  /**
   * Inserts item x at position k, maintaining heap invariant by
   * promoting x up the tree until it is greater than or equal to
   * its parent, or is the root.
   *
   * To simplify and speed up coercions and comparisons. the
   * Comparable and Comparator versions are separated into different
   * methods that are otherwise identical. (Similarly for siftDown.)
   *
   * @param k the position to fill
   * @param x the item to insert
   */
  private siftUp(k: number, x:T): void {
    while (k > 0) {
            let parent = (k - 1) >>> 1;
            let e:T = this.queue[parent] as T;
      if (this.comparator.compare(x, e) >= 0)
        break;
      this.queue[k] = e;
      k = parent;
    }
    this.queue[k] = x;
  }

  /**
     * Inserts item x at position k, maintaining heap invariant by
     * demoting x down the tree repeatedly until it is less than or
     * equal to its children or is a leaf.
     *
     * @param k the position to fill
     * @param x the item to insert
     */
  private siftDown(k: number, x: T): void {
    let half = this.length >>> 1;
    while (k < half) {
            let child = (k << 1) + 1;
            let c: T | null = this.queue[child];
            let right = child + 1;
      if (right < this.length &&
        this.queue[right] !== null && this.comparator.compare(c as T, this.queue[right] as T) > 0)
        c = this.queue[child = right];
      if (c !== null && this.comparator.compare(x, c) <= 0)
        break;
      this.queue[k] = c;
      k = child;
    }
    this.queue[k] = x;
  }

  private heapify():void {
    for (let i = (this.length >>> 1) - 1; i >= 0; i--)
    this.siftDown(i, this.queue[i] as T);
  }


  public offer(e: T): boolean {
    if (!this.isInsertionAllowed()) {
      throw 'Queue is full';
    }
    let i = this.length;
    this.length = i + 1;
    if (i === 0) {
      this.queue[0] = e;
    } else {
      this.siftUp(i, e);
    }

    return true;
  }

  public add(e: T): boolean {
    return this.offer(e);
  }

  public peek(): T | null {
    return (this.length > 0) ? this.queue[0] : null;
  }

  public poll(): T | null {
    if (this.length === 0) {
      return null;
    }
    let s = --this.length;

    let result = this.queue[0];
    let x = this.queue[s];
    this.queue[s] = null;
    if (s != 0)
      this.siftDown(0, x as T);

    return result;
  }

  public element(): T{
    if (this.length === 0) {
      throw 'NoSuchElement';
    }
    return this.peek() as T;
  }

  public remove(o: T): boolean {
    let index = this.indexOf(o);
    if (index >= 0) {
      this.removeAt(index);
      return true;
    }
    return false;
  }

  public removeIf(filter: Function): boolean {
    const removeItemIndexs: number[] = [];
    this.queue.forEach((item, index) => {
      if (filter(item)) {
        removeItemIndexs.push(index);
      }
    });

    removeItemIndexs.forEach(i => this.removeAt(i));
    return removeItemIndexs.length > 0;
  }

  public contains(o: T): boolean {
    return this.indexOf(o) !== -1;
  }

  public toArray(): T[] {
    // for deep copy ?? should we just use map?
    return JSON.parse(JSON.stringify(this.queue));
  }

  private removeAt(i: number) {
    if (i < 0 || i > this.length) {
      throw 'IllegalOperation';
    }
    let s = --this.length;

    if (s === i) {
      // last element make it null
      this.queue[i] = null;
    } else {
      let moved: T = this.queue[i] as T;
      this.queue[s] = null;
      this.siftDown(i, moved);
      if (this.queue[i] == moved) {
        this.siftUp(i, moved);
        if (this.queue[i] !== moved) {
          return moved;
        }
      }
    }
    return null;
  }

  private indexOf(o:T): number {
    if (o != null) {
      for (let i = 0; i < this.length; i++)
        
        if (this.hasEquals(o) && this.queue[i] !== null && o.equals!(this.queue[i] as T) ||
          this.queue[i] === o)
        return i;
    }
    return -1;
  }

  // public add(e: T): boolean {
  //   if (this.offer())
  // }

  public addAll(c: Collection<T>): boolean {
    if (c === this) {
      throw 'IllegalArguments';
    }
    let modified = false;
    let it = c.iterator();
    while (it.hasNext()) {
      if (this.add(it.next())) {
        modified = true;
      }
    }
    return modified;
  }

  public iterator(): Iterator<T> {
    let s = 0, current: T;
    return ({
      next: () => {
        if (s < this.queue.length) {
          const item = this.queue[s++];
          if (item === null) {
            throw 'Unexpected null value';
          }
          current = item;

          return current;
        }
        throw 'No more items';
      },
      hasNext: () => s < this.queue.length,
      remove: () => {
        if (s >= this.queue.length) {
          throw 'Illegal operation';
        }
        this.removeAt(s);
        return true;
      },
      current: () => current
    })
  }
}
