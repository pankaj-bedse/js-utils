import { AbstractCollection } from "./AbstractCollection";
import { Iterator } from "./interfaces/Iterator";
import { ComparatorFun, List } from "./interfaces/List";

export abstract class AbstractList<T extends { equals?: (T) => boolean }> extends AbstractCollection<T> implements List<T> {
  public add(e: T): boolean {
    this.addAtIndex(this.size(), e);
    return true;
  }

  public abstract get(index: number): T;

  public abstract sort(c: ComparatorFun<T>): void;

  public set(index: number, element: T): T {
    throw 'UnsupportedOperation';
  }

  public addAtIndex(index: number, element: T): void {
    throw 'UnsupportedOperation';
  }

  public removeAtIndex(index: number): T {
    throw 'UnsupportedOperation';
  }

  public iterator(): Iterator<T> {

    let s = 0, p = -1, current: T;
    return ({
      next: () => {
        console.log(s, this.size());
        debugger;
        if (s < this.size()) {
          // p = this.get(s++);
          // p++;
          current = this.get(s);
          s += 1;
          return current;
        }
        throw 'No more items';
      },
      hasNext: () => {
        return s < this.size() - 1;
      },
      remove: () => {
        if (s <= 0) {
          throw 'Illegal coperation';
        }
        this.removeAtIndex(s - 1);
        s--;
        current = this.get(s);
        return true;
      },
      current: () => current
    });
  }

  public indexOf(o: T): number {
    let it: Iterator<T> = this.iterator();
    let index = 0;
    while (it.hasNext()) {
      index++;
      const e = it.next();
      if (e.hasOwnProperty('equals') && e.equals(o) ||
        e === o
      ) {
        return index;
      }
    }
    return -1;
  }

  public lastIndexOf(o: T): number {
    let it: Iterator<T> = this.iterator();
    let index = -1, c = 0;
    while (it.hasNext()) {
      c++;
      const e = it.next();
      if (e.hasOwnProperty('equals') && e.equals(o) ||
        e === o
      ) {
        index = c;
      }
    }
    return index;
  }

  public checkBounds(fromIndex: number, toIndex?: number) {
    if (fromIndex < 0) {
      throw 'Index out of bound';
    }
    if (toIndex > this.size()) {
      throw 'Index out of bound';
    }
    if (fromIndex > toIndex) {
      throw 'Illegal arguments: Start can not be after end';
    }
  }

  public abstract subList(fromIndex: number, toIndex?: number): List<T>;
}
