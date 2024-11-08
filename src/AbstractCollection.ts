import { Collection } from "./interfaces/Collection";
import { Iterator } from "./interfaces/Iterator";

export abstract class AbstractCollection<T> implements Collection<T> {
  public abstract iterator(): Iterator<T>;
  public abstract size(): number;
  public abstract offer(e: T): boolean;

  public abstract removeIf(filter: Function): boolean;
  // public abstract equals(o: any): boolean;
  // public abstract hashCode(): number;

  /** @inheritdoc */
  public isEmpty(): boolean {
    return this.size() === 0;
  }

  /**
   * @inheritdoc
   * <p>This implementation iterates over the elements in the collection,
    * checking each element in turn for equality with the specified element.
   */
  public contains(o: T): boolean {
    let it: Iterator<T> = this.iterator();
    while (it.hasNext()) {
      const e = it.next();
      if (this.equals(e, o)) {
        return true
      }
    }
    return false;
  }

  /**
   * @inheritdoc
   */
  public toArray(): T[] {
    const r: T[] = [];
    let it = this.iterator();
    while (it.hasNext()) {
      r.push(it.next());
    }
    return r;
  }

  public add(e: T): boolean {
    throw "UnsupportedOption";
  }

  public remove(o: T): boolean {
    let it = this.iterator();
    while (it.hasNext()) {
      const e = it.next();
      if (this.equals(e, o)) {
        it.remove();
        return true;
      }
    }
    return false;
  }

  public containsAll(c: Collection<T>): boolean {
    let it = c.iterator();
    while (it.hasNext()) {
      const e = it.next();
      if (!this.contains(e)) {
        return false;
      }
    }
    return true;
  }

  public addAll(c: Collection<T>): boolean {
    let modified = false;
    let it = c.iterator();
    while (it.hasNext()) {
      if (this.add(it.next())) {
        modified = true;
      }
    }
    return modified;
  }

  public removeAll(c: Collection<T>): boolean {
    let it = this.iterator();
    let modified = false;
    while (it.hasNext()) {
      if (c.contains(it.next())) {
        it.remove();
        modified = true;
      }
    }
    return modified;
  }

  public retainAll(c: Collection<T>): boolean {
    let it = this.iterator();
    let modified = false;
    while (it.hasNext()) {
      if (!c.contains(it.next())) {
        it.remove();
        modified = true;
      }
    }
    return modified;
  }

  public clear(): void {
    let it = this.iterator();
    while (it.hasNext()) {
      it.next();
      it.remove();
    }
  }

  public equals(a: T, b: T): boolean {
    return (a.hasOwnProperty('equals') && a["equals"](b) || a === b);
  }

  public toString(): string {
    let it = this.iterator();

    if (!it.hasNext()) {
      return '[]';
    }
    let s = '[';
    while (1) {
      const e = it.next();
      if (e instanceof Date) {
        s += e;
      } else if (typeof e === 'object') {
        s += JSON.stringify(e);
      } else {
        s += e;
      }
      if (!it.hasNext()) {
        s += ']'
        return s;
      }
      s += ', ';
    }
  }
}
