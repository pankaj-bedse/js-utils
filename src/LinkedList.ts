import { AbstractList } from "./AbstractList";
import { Collection, HasEquals } from "./interfaces/Collection";
import { Deque } from "./interfaces/Deque";
import { Iterator } from "./interfaces/Iterator";
import { ComparatorFun, List } from "./interfaces/List";

export class Node<T> {
  public item: T
  public next: Node<T> | null
  public prev: Node<T> | null
  constructor(item: T) {
    this.item = item;
    this.prev = null;
    this.next = null;
  }
}
export class LinkedList<T> extends AbstractList<T> implements Deque<T> {
  protected length: number = 0;
  protected maxSize: number = Number.MAX_SAFE_INTEGER;
  protected head: Node<T> | null = null;
  protected tail: Node<T> | null = null;

  constructor(size?: number) {
    super();
    if (size) {
      this.maxSize = size;
    }
  }

  public size(): number {
    return this.length;
  }

  protected isInsertionAllows(): boolean {
    return this.length < this.maxSize;
  }

  public add(e: T): boolean {
    if (!this.isInsertionAllows()) {
      return false;
    }

    const item = new Node<T>(e);
    if (!this.head) {
      this.head = item;
    } else {
      item.prev = this.tail;
      this.tail!.next = item;
    }
    this.length++;
    this.tail = item;
    return true;
  }

  public getFirst(): T {
    if (!this.head) {
      throw 'No such element';
    }
    return this.head.item;
  }

  public getLast(): T {
    if (!this.tail) {
      throw 'No such element';
    }
    return this.tail.item;
  }

  public peekFirst(): T {
    return this.getFirst();
  }

  public peekLast(): T {
    return this.removeLast();
  }

  public push(e: T): void {
    this.addLast(e);
  }

  public pop(): T {
    if (!this.length) {
      throw 'No such element';
    }
    return this.removeLast();
  }

  public addFirst(e: T): void {
    if (!this.isInsertionAllows()) {
      throw 'IllegalStateException';
    }
    const item = new Node<T>(e);
    if (this.head) {
      this.head.prev = item;
    } else {
      this.tail = item;
    }
   
    item.next = this.head;
    this.head = item;
    this.length++;
  }

  public addLast(e: T): void {
    if (!this.isInsertionAllows()) {
      throw 'IllegalStateException';
    }
    const item = new Node<T>(e);
    if (this.tail) {
      item.prev = this.tail;
      this.tail.next = item;
      this.tail = item;
    } else {
      this.head = item;
      this.tail = item;
    }
    this.length++;
  }

  public removeFirst(): T {
    if (!this.head) {
      throw 'No such element';
    }
    const item = this.head.item;
    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = this.head.next;
    }
    this.length--;
    return item;
  }

  public removeLast(): T {
    if (!this.tail) {
      throw 'No such element';
    }
    const item = this.tail.item;
    if (this.tail === this.head) {
      this.tail = null;
      this.head = null;
    } else {
      const prev = this.tail.prev;
      // this.tail.prev.next = null;
      this.tail.prev = null;
      this.tail = prev;
      prev!.next = null;
    }
    this.length--;
    return item;
  }

  public offerFirst(e: T): boolean {
    this.addFirst(e);
    return true;
  }

  public offerLast(e: T): boolean {
    this.addLast(e);
    return true;
  }

  public pollFirst(): T | null {
    return this.head ? this.removeFirst() : null
  }

  public pollLast(): T | null {
    return this.tail ? this.removeLast() : null
  }

  public poll(): T | null {
    if (this.head) {
      return this.removeFirst();
    }
    return null;
  }

  public element(): T {
    if (!this.length) {
      throw 'No such element';
    }
    return this.peekFirst();
  }

  public peek(): T | null {
    return this.head ? this.peekFirst() : null;
  }

  public offer(e: T): boolean {
    if (!this.isInsertionAllows()) {
      return false;
    }
    this.addFirst(e);
    return true;
  }

  public get(index: number): T {
    if (index < 0 || index >= this.length) {
      throw 'IndexOutOfBoundsException';
    }
    let i = 0, node = this.head;
    while (i < index) {
      node = node!.next;
      i++;
    }
    return node!.item;
  }

  public addBefore(a: Node<T>, e: T): void {
    const n = new Node<T>(e);
    if (this.head === a) {
      n.next = this.head;
      this.head = n;
    } else {
      n.next = a;
      n.prev = a.prev;
      a.prev!.next = n;
      a.prev = n;
    }
    this.length++;
  }

  public addAfter(a: Node<T>, e: T): void {
    const n = new Node<T>(e);

    if (this.tail === a) {
      this.tail.next = n;
      n.prev = this.tail;
      this.tail = n;
    } else {
      n.next = a.next;
      a.next = n;
      n.prev = a;
    }
    this.length++;
  }

  public removeNode(n: Node<T>): T {
    if (!n) {
      throw 'Illegal operation';
    }
    const item = n.item;
    if (n === this.head) {
      this.head = n.next;
      n.prev = null;
      if (this.length === 1) {
        this.head = this.tail = null;
      }
    } else if (n === this.tail) {
      this.tail = n.prev;
      this.tail!.next = null;
      n.prev = null;
    } else {
      n.prev!.next = n.next;
      n.next!.prev = n.prev;
      n.next = null;
      n.prev = null
    }
    this.length--;

    return item;
  }

  public addAtIndex(index: number, element: T): void {
    if (index > this.length) {
      throw 'IndexOutOfBoundsException';
    }
    if (!this.isInsertionAllows()) {
      throw 'IllegalStateException';
    }

    if (index === this.length) {
      this.addLast(element);
    } else {
      let i = 0, node = this.head;
      while (node && i < index -1) {
        node = node.next;
        i++;
      }
      this.addAfter(node!, element);
    }
  }

  public removeAtIndex(index: number): T {
    if (index > this.length || index < 0) {
      throw 'IndexOutOfBoundsException';
    }
    if (index === this.length -1) {
      return this.removeLast();
    } else if (index === 0) {
      return this.removeFirst()
    } else {
      let i = 0, node = this.head;
      while (node && i < index) {
        node = node.next;
        i++;
      }
      return this.removeNode(node!);
    }
  }

  public remove(o: T): boolean {
    let node = this.head;
    while (node) {
      if (this.equals(node.item, o)) {
        this.removeNode(node);
        return true;
      }
    }
    return false;
  }

  public removeIf(filter: Function): boolean {
    let node = this.head;
    let removed = false;
    while (node) {
      if (filter(node.item)) {
        this.removeNode(node);
        removed = true;
      }
    }
    return removed;
  }

  private split(head: Node<T>): Node<T> | null {
    let fast = head, slow:Node<T> | null = head;
    while (fast.next !== null && fast.next.next !== null) {
      fast = fast.next.next;
      slow = slow?.next ?? null;
    }
    const temp = slow!.next;
    slow!.next = null;

    return temp;
  }

  private mergeSort(node: Node<T> | null, c: ComparatorFun<T>): Node<T> | null {
    if (node === null || node.next === null) {
      return node;
    }
    let second = this.split(node);
    // Recur for left and right
    node = this.mergeSort(node, c);
    second = this.mergeSort(second, c);

    return this.merge(node, second, c);

  }

  private merge(first: Node<T> | null, second: Node<T> | null, c: ComparatorFun<T>): Node<T> | null {
    if (first === null) {
      return second;
    }
    if (second === null) {
      return first;
    }
    if (c(first.item, second.item) < 0) {
      first.next = this.merge(first.next, second, c);
      if (first.next) {
        first.next.prev = first;
      }
      first.prev = null;
      return first;
    } else {
      second.next = this.merge(first, second.next, c);
      if (second.next) {
        second.next.prev = second;
      }
      second.prev = null;
      return second;
    }
  }

  private updateTailRef() {
    let tail = this.head;
    while (tail !== null && tail.next !== null) {
      tail = tail.next;
    }
    this.tail = tail;
  }

  public sort(c: ComparatorFun<T>): void {
    this.head = this.mergeSort(this.head, c);
    this.updateTailRef();
  }

  public subList(fromIndex: number, toIndex: number): LinkedList<T> {
    if (fromIndex > toIndex || fromIndex < 0 || toIndex > this.length) {
      throw 'Illegal arguments';
    }
    const sublist = new LinkedList<T>();
    let node = this.head, index = 0;
    while (node && index < fromIndex) {
      node = node.next;
      index++;
    }
    while (node && index < toIndex) {
      sublist.add(node.item);
      node = node.next;
      index++;
    }
    return sublist;
  }

  public iterator(): Iterator<T> {

    let s = this.head, prev, current: Node<T> | null;
    return ({
      next: () => {
        // console.log(s, this.size());
        // debugger;
        if (s) {
          // p = this.get(s++);
          // p++;
          current = s;
          s = s.next;
          return current.item;
        }
        throw 'No more items';
      },
      hasNext: () => {
        return s !== null;
      },
      remove: () => {
        if (!s) {
          throw 'Illegal operation';
        }
        const temp = current!.next;
        this.removeNode(current!);

        current = temp;
        return true;
      },
      current: () => {
        if (!current) {
          throw 'No current item';
        }
        return current.item;
      }
    });
  }

  // for of operator
  [Symbol.iterator]() {
    let head = this.head;

    return ({
      next: () => {
        let value = null, done = true;
        if (head) {
          value = head.item;
          head = head.next;
          done = false;
        }
        return {
          value,
          done
        };
      }
    })
  }
}
