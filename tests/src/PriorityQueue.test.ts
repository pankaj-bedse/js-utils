import { PriorityQueue } from '../../src/PriorityQueue';
import { Comparator } from '../../src/Comparator';

describe('PriorityQueue', () => {
  describe('min heap', () => {
    const minHeap = new PriorityQueue<number>(5);
    test('should be able to add 5 values', () => {
      const data = [5, 4, 3, 2, 1];
      data.forEach(d => {
        minHeap.add(d);
        expect(minHeap.element()).toBe(d);
      });
      expect(minHeap.size()).toBe(5);
      expect(() => minHeap.add(6)).toThrowError('Queue is full');
    });
  });

  describe('max heap', () => {
    const minHeap = new PriorityQueue<number>(5, new Comparator<number>((a, b) => {
      return b - a;
    }, true));
    test('should be able to add 5 values', () => {
      const data = [5, 4, 3, 2, 1];
      let prev = 5;
      data.forEach(d => {
        minHeap.add(d);
        expect(minHeap.element()).toBe(d);
      });
      expect(minHeap.size()).toBe(5);
      expect(() => minHeap.add(6)).toThrowError('Queue is full');
    });
  })
})
