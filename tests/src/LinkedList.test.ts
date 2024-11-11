import { LinkedList } from "../../src/LinkedList";

describe("LinkedList", () => {
  let list: LinkedList<number>;

  beforeEach(() => {
    list = new LinkedList<number>();
  });

  it("should add elements to the list", () => {
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.size()).toBe(3);
    expect(list.getFirst()).toBe(1);
    expect(list.getLast()).toBe(3);
  });

  it("should remove elements from the list", () => {
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.removeFirst()).toBe(1);
    expect(list.removeLast()).toBe(3);
    expect(list.size()).toBe(1);
  });

  it("should handle addFirst and addLast correctly", () => {
    list.addFirst(1);
    list.addLast(2);

    expect(list.getFirst()).toBe(1);
    expect(list.getLast()).toBe(2);
  });

  it("should handle peekFirst and peekLast correctly", () => {
    list.add(1);
    list.add(2);

    expect(list.peekFirst()).toBe(1);
    expect(list.peekLast()).toBe(2);
  });

  it("should handle offerFirst and offerLast correctly", () => {
    list.offerFirst(1);
    list.offerLast(2);

    expect(list.getFirst()).toBe(1);
    expect(list.getLast()).toBe(2);
  });

  it("should handle pollFirst and pollLast correctly", () => {
    list.add(1);
    list.add(2);

    expect(list.pollFirst()).toBe(1);
    expect(list.pollLast()).toBe(2);
  });

  it("should handle iterator correctly", () => {
    list.add(1);
    list.add(2);
    list.add(3);

    const iterator = list.iterator();
    expect(iterator.hasNext()).toBe(true);
    expect(iterator.next()).toBe(1);
    expect(iterator.next()).toBe(2);
    expect(iterator.next()).toBe(3);
    expect(iterator.hasNext()).toBe(false);
  });

  it("should handle for-of loop correctly", () => {
    list.add(1);
    list.add(2);
    list.add(3);

    const result: number[] = [];
    for (const item of list) {
      result.push(item as unknown as number);
    }

    expect(result).toEqual([1, 2, 3]);
  });

  it("should handle removeAtIndex correctly", () => {
    list.add(1);
    list.add(2);
    list.add(3);

    expect(list.removeAtIndex(1)).toBe(2);
    expect(list.size()).toBe(2);
  });

  it("should handle addAtIndex correctly", () => {
    list.add(1);
    list.add(3);
    list.addAtIndex(1, 2);
    
    expect(list.get(1)).toBe(2);
    expect(list.size()).toBe(3);
  });

  it("should handle sort correctly", () => {
    list.add(3);
    list.add(1);
    list.add(2);

    list.sort((a, b) => a - b);

    expect(list.get(0)).toBe(1);
    expect(list.get(1)).toBe(2);
    expect(list.get(2)).toBe(3);
  });

  it("should handle subList correctly", () => {
    list.add(1);
    list.add(2);
    list.add(3);
    list.add(4);

    const sublist = list.subList(1, 3);

    expect(sublist.size()).toBe(2);
    expect(sublist.get(0)).toBe(2);
    expect(sublist.get(1)).toBe(3);
  });
});
