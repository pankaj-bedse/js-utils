import exp from "constants";
import { LinkedList } from "../../src/LinkedList"
describe('LinkedList', () => {
  describe("Stack methods", () => {
    let list = new LinkedList<number>();
    const data = [4, 5, 6];
    test.each([
      [4, 4],
      [5, 5]
    ])('.push(%i)', (input, expected) => {
      expect(input).toBe(expected);
    });

    test.each([
      [5, 5],
      [4, 4]
    ])('.pop(%i)', (input, expected) => {
      expect(input).toBe(expected);
    });

    test('expect exception', () => {
      expect(() => list.pop()).toThrowError('No such element');
    })

  });

  describe("Queue methods", () => {
    let list = new LinkedList<number>();
    const data = [4, 5, 6];
    test('add', () => {
      [4, 5].forEach(n => {
        expect(list.add(n)).toBe(true);
      });
    })

    test('poll(), element() & peek()', () => {
      expect(list.element()).toBe(4);
      expect(list.peek()).toBe(4);
      expect(list.poll()).toBe(4);
      expect(list.element()).toBe(5);
      expect(list.peek()).toBe(5);
      expect(list.poll()).toBe(5);
      expect(list.poll()).toBe(null);
    })

  });

  describe('Sort', () => {
    let list = new LinkedList<string>();
    describe('test sort', () => {

      test('string sort', () => {
        let a = ['x', 'y', 'z', 'b', 'a', 'c'];
        a.forEach(c => list.add(c));
        list.sort((a, b) => a.localeCompare(b));
        expect(list.toArray()).toMatchObject(['a', 'b', 'c', 'x', 'y', 'z']);
      })
    })

    describe('test sort with object', () => {
      type obj = { id: number, name: string };
      let list = new LinkedList<obj>();
      test('object sort', () => {
        let o: obj[] = [{ id: 1, name: 'test' }, { id: 3, name: 'test 3' }, { id: 0, name: 'test 0' }, { id: 2, name: 'test 2' }];
        o.forEach(c => list.add(c));
        list.sort((a, b) => a.id - b.id);
        expect(list.toArray()).toMatchObject([
          { id: 0, name: 'test 0' }, { id: 1, name: 'test' }, { id: 2, name: 'test 2' }, { id: 3, name: 'test 3' }
        ]);
      });
    })
  })
})

