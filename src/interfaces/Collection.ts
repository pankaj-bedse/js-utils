import { Iterator } from "./Iterator"

// Create a type guard to check if 'a' has an equals method
export  type HasEquals<T> = { equals?(other: T): boolean };

export interface Collection<T> { // extends IterableIterator<T>
  /**
    * Returns the number of elements in this collection.  If this collection
    * contains more than <tt>Integer.MAX_VALUE</tt> elements, returns
    * <tt>Integer.MAX_VALUE</tt>.
    *
    * @return the number of elements in this collection
    */
  size(): number

  /**
   * Returns <tt>true</tt> if this collection contains no elements.
   *
   * @return <tt>true</tt> if this collection contains no elements
   */

  isEmpty(): boolean

  /**
   * Returns <tt>true</tt> if this collection contains the specified element.
   * More formally, returns <tt>true</tt> if and only if this collection
   * contains at least one element <tt>e</tt> such that
   * <tt>(o==null&nbsp;?&nbsp;e==null&nbsp;:&nbsp;o.equals(e))</tt>.
   *
   * @param o element whose presence in this collection is to be tested
   * @return <tt>true</tt> if this collection contains the specified
   *         element
   */

  contains(o: T): boolean


  /**
   * Returns an iterator over the elements in this collection.  There are no
   * guarantees concerning the order in which the elements are returned
   * (unless this collection is an instance of some class that provides a
   * guarantee).
   *
   * @return an <tt>Iterator</tt> over the elements in this collection
   */

  iterator(): Iterator<T>


  /**
   * Returns an array containing all of the elements in this collection.
   * If this collection makes any guarantees as to what order its elements
   * are returned by its iterator, this method must return the elements in
   * the same order.
   *
   * <p>The returned array will be "safe" in that no references to it are
   * maintained by this collection.  (In other words, this method must
   * allocate a new array even if this collection is backed by an array).
   * The caller is thus free to modify the returned array.
   *
   * <p>This method acts as bridge between array-based and collection-based
   * APIs.
   *
   * @return an array containing all of the elements in this collection
   */

  toArray(): T[]



  // Modification Operations


  /**

   * Ensures that this collection contains the specified element (optional

   * operation).  Returns <tt>true</tt> if this collection changed as a

   * result of the call.  (Returns <tt>false</tt> if this collection does

   * not permit duplicates and already contains the specified element.)<p>

   *

   * Collections that support this operation may place limitations on what

   * elements may be added to this collection.  In particular, some

   * collections will refuse to add <tt>null</tt> elements, and others will

   * impose restrictions on the type of elements that may be added.

   * Collection classes should clearly specify in their documentation any

   * restrictions on what elements may be added.<p>

   *

   * If a collection refuses to add a particular element for any reason

   * other than that it already contains the element, it <i>must</i> throw

   * an exception (rather than returning <tt>false</tt>).  This preserves

   * the invariant that a collection always contains the specified element

   * after this call returns.

   *

   * @param e element whose presence in this collection is to be ensured

   * @return <tt>true</tt> if this collection changed as a result of the

   *         call

   * @throws UnsupportedOperationException if the <tt>add</tt> operation

   *         is not supported by this collection

   * @throws ClassCastException if the class of the specified element

   *         prevents it from being added to this collection

   * @throws NullPointerException if the specified element is null and this

   *         collection does not permit null elements

   * @throws IllegalArgumentException if some property of the element

   *         prevents it from being added to this collection

   * @throws IllegalStateException if the element cannot be added at this

   *         time due to insertion restrictions

   */

  add(e: T): boolean

  /**

   * Removes a single instance of the specified element from this

   * collection, if it is present (optional operation).  More formally,

   * removes an element <tt>e</tt> such that

   * <tt>(o==null&nbsp;?&nbsp;e==null&nbsp;:&nbsp;o.equals(e))</tt>, if

   * this collection contains one or more such elements.  Returns

   * <tt>true</tt> if this collection contained the specified element (or

   * equivalently, if this collection changed as a result of the call).

   *

   * @param o element to be removed from this collection, if present

   * @return <tt>true</tt> if an element was removed as a result of this call

   * @throws ClassCastException if the type of the specified element

   *         is incompatible with this collection

   *         (<a href="#optional-restrictions">optional</a>)

   * @throws NullPointerException if the specified element is null and this

   *         collection does not permit null elements

   *         (<a href="#optional-restrictions">optional</a>)

   * @throws UnsupportedOperationException if the <tt>remove</tt> operation

   *         is not supported by this collection

   */

  remove(o: T): boolean



  // Bulk Operations


  /**

   * Returns <tt>true</tt> if this collection contains all of the elements

   * in the specified collection.

   *

   * @param  c collection to be checked for containment in this collection

   * @return <tt>true</tt> if this collection contains all of the elements

   *         in the specified collection

   * @throws ClassCastException if the types of one or more elements

   *         in the specified collection are incompatible with this

   *         collection

   *         (<a href="#optional-restrictions">optional</a>)

   * @throws NullPointerException if the specified collection contains one

   *         or more null elements and this collection does not permit null

   *         elements

   *         (<a href="#optional-restrictions">optional</a>),

   *         or if the specified collection is null.

   * @see    #contains(Object)

   */

  containsAll(c: Collection<T>): boolean


  /**

   * Adds all of the elements in the specified collection to this collection

   * (optional operation).  The behavior of this operation is undefined if

   * the specified collection is modified while the operation is in progress.

   * (This implies that the behavior of this call is undefined if the

   * specified collection is this collection, and this collection is

   * nonempty.)

   *

   * @param c collection containing elements to be added to this collection

   * @return <tt>true</tt> if this collection changed as a result of the call

   * @throws UnsupportedOperationException if the <tt>addAll</tt> operation

   *         is not supported by this collection

   * @throws ClassCastException if the class of an element of the specified

   *         collection prevents it from being added to this collection

   * @throws NullPointerException if the specified collection contains a

   *         null element and this collection does not permit null elements,

   *         or if the specified collection is null

   * @throws IllegalArgumentException if some property of an element of the

   *         specified collection prevents it from being added to this

   *         collection

   * @throws IllegalStateException if not all the elements can be added at

   *         this time due to insertion restrictions

   * @see #add(Object)

   */

  addAll(c: Collection<T>): boolean


  /**

   * Removes all of this collection's elements that are also contained in the

   * specified collection (optional operation).  After this call returns,

   * this collection will contain no elements in common with the specified

   * collection.

   *

   * @param c collection containing elements to be removed from this collection

   * @return <tt>true</tt> if this collection changed as a result of the

   *         call

   * @throws UnsupportedOperationException if the <tt>removeAll</tt> method

   *         is not supported by this collection

   * @throws ClassCastException if the types of one or more elements

   *         in this collection are incompatible with the specified

   *         collection

   *         (<a href="#optional-restrictions">optional</a>)

   * @throws NullPointerException if this collection contains one or more

   *         null elements and the specified collection does not support

   *         null elements

   *         (<a href="#optional-restrictions">optional</a>),

   *         or if the specified collection is null

   * @see #remove(Object)

   * @see #contains(Object)

   */

  removeAll(c: Collection<T>): boolean


  /**

   * Removes all of the elements of this collection that satisfy the given

   * predicate.  Errors or runtime exceptions thrown during iteration or by

   * the predicate are relayed to the caller.

   *

   * @implSpec

   * The default implementation traverses all elements of the collection using

   * its {@link #iterator}.  Each matching element is removed using

   * {@link Iterator#remove()}.  If the collection's iterator does not

   * support removal then an {@code UnsupportedOperationException} will be

   * thrown on the first matching element.

   *

   * @param filter a predicate which returns {@code true} for elements to be

   *        removed

   * @return {@code true} if any elements were removed

   * @throws NullPointerException if the specified filter is null

   * @throws UnsupportedOperationException if elements cannot be removed

   *         from this collection.  Implementations may throw this exception if a

   *         matching element cannot be removed or if, in general, removal is not

   *         supported.

   * @since 1.8

   */

  removeIf(filter: Function): boolean


  /**

   * Retains only the elements in this collection that are contained in the

   * specified collection (optional operation).  In other words, removes from

   * this collection all of its elements that are not contained in the

   * specified collection.

   *

   * @param c collection containing elements to be retained in this collection

   * @return <tt>true</tt> if this collection changed as a result of the call

   * @throws UnsupportedOperationException if the <tt>retainAll</tt> operation

   *         is not supported by this collection

   * @throws ClassCastException if the types of one or more elements

   *         in this collection are incompatible with the specified

   *         collection

   *         (<a href="#optional-restrictions">optional</a>)

   * @throws NullPointerException if this collection contains one or more

   *         null elements and the specified collection does not permit null

   *         elements

   *         (<a href="#optional-restrictions">optional</a>),

   *         or if the specified collection is null

   * @see #remove(Object)

   * @see #contains(Object)

   */

  retainAll(c: Collection<T>): boolean


  /**

   * Removes all of the elements from this collection (optional operation).

   * The collection will be empty after this method returns.

   *

   * @throws UnsupportedOperationException if the <tt>clear</tt> operation

   *         is not supported by this collection

   */

  clear(): void

  /**
     * Inserts the specified element into this queue if it is possible to do
     * so immediately without violating capacity restrictions.
     * When using a capacity-restricted queue, this method is generally
     * preferable to {@link #add}, which can fail to insert an element only
     * by throwing an exception.
     *
     * @param e the element to add
     * @return {@code true} if the element was added to this queue, else
     *         {@code false}
     * @throws ClassCastException if the class of the specified element
     *         prevents it from being added to this queue
     * @throws NullPointerException if the specified element is null and
     *         this queue does not permit null elements
     * @throws IllegalArgumentException if some property of this element
     *         prevents it from being added to this queue
     */
    offer(e:T): boolean;


  // Comparison and hashing


  // /**

  //  * Compares the specified object with this collection for equality. <p>

  //  *

  //  * While the <tt>Collection</tt> interface adds no stipulations to the

  //  * general contract for the <tt>Object.equals</tt>, programmers who

  //  * implement the <tt>Collection</tt> interface "directly" (in other words,

  //  * create a class that is a <tt>Collection</tt> but is not a <tt>Set</tt>

  //  * or a <tt>List</tt>) must exercise care if they choose to override the

  //  * <tt>Object.equals</tt>.  It is not necessary to do so, and the simplest

  //  * course of action is to rely on <tt>Object</tt>'s implementation, but

  //  * the implementor may wish to implement a "value comparison" in place of

  //  * the default "reference comparison."  (The <tt>List</tt> and

  //  * <tt>Set</tt> interfaces mandate such value comparisons.)<p>

  //  *

  //  * The general contract for the <tt>Object.equals</tt> method states that

  //  * equals must be symmetric (in other words, <tt>a.equals(b)</tt> if and

  //  * only if <tt>b.equals(a)</tt>).  The contracts for <tt>List.equals</tt>

  //  * and <tt>Set.equals</tt> state that lists are only equal to other lists,

  //  * and sets to other sets.  Thus, a custom <tt>equals</tt> method for a

  //  * collection class that implements neither the <tt>List</tt> nor

  //  * <tt>Set</tt> interface must return <tt>false</tt> when this collection

  //  * is compared to any list or set.  (By the same logic, it is not possible

  //  * to write a class that correctly implements both the <tt>Set</tt> and

  //  * <tt>List</tt> interfaces.)

  //  *

  //  * @param o object to be compared for equality with this collection

  //  * @return <tt>true</tt> if the specified object is equal to this

  //  * collection

  //  *

  //  * @see Object#equals(Object)

  //  * @see Set#equals(Object)

  //  * @see List#equals(Object)

  //  */

  // equals(o: any): boolean


  // /**
  //  * Returns the hash code value for this collection.  While the
  //  * <tt>Collection</tt> interface adds no stipulations to the general
  //  * contract for the <tt>Object.hashCode</tt> method, programmers should
  //  * take note that any class that overrides the <tt>Object.equals</tt>
  //  * method must also override the <tt>Object.hashCode</tt> method in order
  //  * to satisfy the general contract for the <tt>Object.hashCode</tt> method.
  //  * In particular, <tt>c1.equals(c2)</tt> implies that
  //  * <tt>c1.hashCode()==c2.hashCode()</tt>.
  //  *
  //  * @return the hash code value for this collection
  //  *
  //  * @see Object#hashCode()
  //  * @see Object#equals(Object)
  //  */

  // hashCode(): number
}
