export interface Queue<T> {
  /**
    * Inserts the specified element into this queue if it is possible to do so
    * immediately without violating capacity restrictions, returning
    * {@code true} upon success and throwing an {@code IllegalStateException}
    * if no space is currently available.
    *
    * @param e the element to add
    * @return {@code true} (as specified by {@link Collection#add})
    * @throws IllegalStateException if the element cannot be added at this
    *         time due to capacity restrictions
    */
  add(E: T): boolean


  /**
   * Retrieves and removes the head of this queue,
   * or returns {@code null} if this queue is empty.
   *
   * @return the head of this queue, or {@code null} if this queue is empty
   */

  poll(): T | null

  /**
   * Retrieves, but does not remove, the head of this queue.  This method
   * differs from {@link #peek peek} only in that it throws an exception
   * if this queue is empty.
   *
   * @return the head of this queue
   * @throws NoSuchElementException if this queue is empty
   */
  element(): T

  /**
   * Retrieves, but does not remove, the head of this queue,
   * or returns {@code null} if this queue is empty.
   *
   * @return the head of this queue, or {@code null} if this queue is empty
   */
  peek(): T | null
}
