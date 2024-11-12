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

    test('should peek the smallest value', () => {
      expect(minHeap.peek()).toBe(1);
    });

    test('should poll values in sorted order', () => {
      const sorted = [1, 2, 3, 4, 5];
      sorted.forEach(value => {
        expect(minHeap.poll()).toBe(value);
      });
      expect(minHeap.size()).toBe(0);
    });

    test('should return null when polling an empty queue', () => {
      expect(minHeap.poll()).toBeNull();
    });

    test('should return true if the queue contains a value', () => {
      minHeap.add(3);
      expect(minHeap.contains(3)).toBe(true);
      expect(minHeap.contains(4)).toBe(false);
    });

    test('should remove a specific value', () => {
      minHeap.add(4);
      expect(minHeap.remove(3)).toBe(true);
      expect(minHeap.contains(3)).toBe(false);
    });

    test('should convert to array', () => {
      minHeap.add(2);
      minHeap.add(1);
      
      expect(minHeap.toArray()).toEqual([1, 2, 4]);
    });

    test('should remove elements based on a filter', () => {
      minHeap.add(5);
      minHeap.add(6);
      expect(minHeap.removeIf((item: number) => item > 4)).toBe(true);
      expect(minHeap.toArray()).toEqual([1, 2, 4]);
    });

    test('should add all elements from another collection', () => {
      const anotherQueue = new PriorityQueue<number>();
      anotherQueue.add(7);
      anotherQueue.add(8);
      expect(minHeap.addAll(anotherQueue)).toBe(true);
      expect(minHeap.toArray()).toEqual([1, 2, 4, 7, 8]);
    });

    test('should iterate over the elements', () => {
      const iterator = minHeap.iterator();
      const elements = [];
      
      while (iterator.hasNext()) {
        elements.push(iterator.next());
      }
      expect(elements).toEqual([1, 2, 4, 7, 8]);
    });
  });

  describe('max heap', () => {
    const maxHeap = new PriorityQueue<number>(5, new Comparator<number>((a, b) => b - a));
    
    test('should be able to add 5 values', () => {
      const data = [1, 2, 3, 4, 5];
      data.forEach(d => {
        maxHeap.add(d);
        expect(maxHeap.element()).toBe(d);
      });
      expect(maxHeap.size()).toBe(5);
      expect(() => maxHeap.add(6)).toThrowError('Queue is full');
    });

    test('should peek the largest value', () => {
      expect(maxHeap.peek()).toBe(5);
    });

    test('should poll values in sorted order', () => {
      const sorted = [5, 4, 3, 2, 1];
      sorted.forEach(value => {
        expect(maxHeap.poll()).toBe(value);
      });
      expect(maxHeap.size()).toBe(0);
    });

    test('should return null when polling an empty queue', () => {
      expect(maxHeap.poll()).toBeNull();
    });

    test('should return true if the queue contains a value', () => {
      maxHeap.add(3);
      expect(maxHeap.contains(3)).toBe(true);
      expect(maxHeap.contains(4)).toBe(false);
    });

    test('should remove a specific value', () => {
      maxHeap.add(4);
      expect(maxHeap.remove(3)).toBe(true);
      expect(maxHeap.contains(3)).toBe(false);
    });

    test('should convert to array', () => {
      maxHeap.add(2);
      maxHeap.add(1);
      expect(maxHeap.toArray()).toEqual([4, 2, 1]);
    });

    test('should remove elements based on a filter', () => {
      maxHeap.add(5);
      maxHeap.add(6);
      expect(maxHeap.removeIf((item: number) => item > 4)).toBe(true);
      
      expect(maxHeap.toArray()).toEqual([4, 2, 1]);
    });

    test('should add all elements from another collection', () => {
      const anotherQueue = new PriorityQueue<number>();
      anotherQueue.add(7);
      anotherQueue.add(8);
      expect(maxHeap.addAll(anotherQueue)).toBe(true);
      expect(maxHeap.toArray()).toEqual([8, 7, 4, 2, 1]);
    });

    test('should iterate over the elements', () => {
      const iterator = maxHeap.iterator();
      const elements = [];
      while (iterator.hasNext()) {
        elements.push(iterator.next());
      }
      expect(elements).toEqual([8, 7, 4, 2, 1]);
    });
  });
});
