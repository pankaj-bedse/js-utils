This is js-util equivalent of java.utils

## LinkedList Methods
- **iterator()**: Returns an iterator over the elements in this collection.
- **toArray()**: Returns an array containing all of the elements in this collection.
- **addAll(collection)**: Adds all of the elements in the specified collection to this collection.
- **removeAll(collection)**: Removes all of this collection's elements that are also contained in the specified collection.
- **retainAll(collection)**: Retains only the elements in this collection that are contained in the specified collection.
- **containsAll(collection)**: Returns true if this collection contains all of the elements in the specified collection.
- **equals(object)**: Compares the specified object with this collection for equality.
- **hashCode()**: Returns the hash code value for this collection.
- **subList(fromIndex, toIndex)**: Returns a view of the portion of this list between the specified fromIndex, inclusive, and toIndex, exclusive.
- **listIterator()**: Returns a list iterator over the elements in this list.
- **listIterator(index)**: Returns a list iterator over the elements in this list, starting at the specified position in the list.
- **iterator()**: Returns an iterator over the elements in this list.
- **add(element)**: Appends the specified element to the end of the list.
- **add(index, element)**: Inserts the specified element at the specified position in the list.
- **remove(index)**: Removes the element at the specified position in the list.
- **get(index)**: Returns the element at the specified position in the list.
- **set(index, element)**: Replaces the element at the specified position in the list with the specified element.
- **size()**: Returns the number of elements in the list.
- **clear()**: Removes all elements from the list.
- **isEmpty()**: Returns true if the list contains no elements.
- **contains(element)**: Returns true if the list contains the specified element.

## PriorityQueue Methods

- **add(element)**: Inserts the specified element into the priority queue.
- **offer(element)**: Inserts the specified element into the priority queue.
- **remove()**: Retrieves and removes the head of the queue.
- **poll()**: Retrieves and removes the head of the queue, or returns null if the queue is empty.
- **peek()**: Retrieves, but does not remove, the head of the queue, or returns null if the queue is empty.
- **size()**: Returns the number of elements in the queue.
- **clear()**: Removes all elements from the queue.
- **isEmpty()**: Returns true if the queue contains no elements.
- **contains(element)**: Returns true if the queue contains the specified element.
## Sample Code

### LinkedList Example

```javascript
let linkedList = new LinkedList();
linkedList.add('A');
linkedList.add('B');
linkedList.add(1, 'C');
console.log(linkedList.get(1)); // Output: C
linkedList.set(1, 'D');
console.log(linkedList.get(1)); // Output: D
console.log(linkedList.size()); // Output: 3
linkedList.remove(1);
console.log(linkedList.contains('D')); // Output: false
linkedList.clear();
console.log(linkedList.isEmpty()); // Output: true
```

### PriorityQueue Example

```javascript
let priorityQueue = new PriorityQueue();
priorityQueue.add('A');
priorityQueue.offer('B');
console.log(priorityQueue.peek()); // Output: A
console.log(priorityQueue.size()); // Output: 2
console.log(priorityQueue.poll()); // Output: A
console.log(priorityQueue.contains('B')); // Output: true
priorityQueue.clear();
console.log(priorityQueue.isEmpty()); // Output: true
```
### LinkedList Example in TypeScript

```typescript

let linkedList = new LinkedList<string>();
linkedList.add('A');
linkedList.add('B');
linkedList.addAt(1, 'C');
console.log(linkedList.get(1)); // Output: C
linkedList.set(1, 'D');
console.log(linkedList.get(1)); // Output: D
console.log(linkedList.size()); // Output: 3
linkedList.remove(1);
console.log(linkedList.contains('D')); // Output: false
linkedList.clear();
console.log(linkedList.isEmpty()); // Output: true
```

### PriorityQueue Example in TypeScript

```typescript

let priorityQueue = new PriorityQueue<string>();
priorityQueue.add('A');
priorityQueue.offer('B');
console.log(priorityQueue.peek()); // Output: A
console.log(priorityQueue.size()); // Output: 2
console.log(priorityQueue.poll()); // Output: A
console.log(priorityQueue.contains('B')); // Output: true
priorityQueue.clear();
console.log(priorityQueue.isEmpty()); // Output: true
```
### LinkedList as Queue Example in TypeScript

```typescript

let queue = new LinkedList<string>();
queue.enqueue('A');
queue.enqueue('B');
console.log(queue.peek()); // Output: A
console.log(queue.size()); // Output: 2
console.log(queue.dequeue()); // Output: A
console.log(queue.isEmpty()); // Output: false
```

### Stack Example in TypeScript

```typescript

let stack = new LinkedList<string>();
stack.push('A');
stack.push('B');
console.log(stack.peek()); // Output: B
console.log(stack.size()); // Output: 2
console.log(stack.pop()); // Output: B
console.log(stack.isEmpty()); // Output: false
```

### Deque Example in TypeScript

```typescript

let deque = new LinkedList<string>();
deque.addFront('A');
deque.addBack('B');
console.log(deque.peekFront()); // Output: A
console.log(deque.peekBack()); // Output: B
console.log(deque.size()); // Output: 2
console.log(deque.removeFront()); // Output: A
console.log(deque.isEmpty()); // Output: false
```

### LinkedList Iterator Example in TypeScript

```typescript
let linkedList = new LinkedList<string>();
linkedList.add('A');
linkedList.add('B');
linkedList.add('C');

let iterator = linkedList.iterator();
while (iterator.hasNext()) {
  console.log(iterator.next());
}
// Output: A B C
```