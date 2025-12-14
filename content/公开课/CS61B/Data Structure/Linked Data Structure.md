_**In contrast to an array which is of fixed size , a list is able to grow arbitrarily large.**_

# IntList
## [[Linked Lists]]
### Two Variable:
- `int first;`
- `IntList rest;`
Strange, naked for Java.
# SLList(Single Linked List)
```java
public class IntNode {
    public int item;
    public IntNode next;

    public IntNode(int i, IntNode n) {
        item = i;
        next = n;
    }
}
```

```java
public class SLList {
	public IntNode first;

	public SLList(int x) {
		first = new IntNode(x, null);
	}
}
```
![[IMG-20251214150209791.png]]
![[IMG-20251214150209819.png]]

## SLList vs IntList
![[IMG-20251214150209848.png]]
![[IMG-20251214150209951.png]]

### Cache
Set a variable keeping track of the size of list, we `size()` is called, return it.  
-> Save time.

### Easy to Use(Data Abstraction Barrier)
### Be Able to Represent Empty List
### More Optimize: Sentinel Node
![[IMG-20251214150209979.png]]
![[IMG-20251214150210015.png]]
![[IMG-20251214150210043.png]]

No need for special cases!

## The Final Code
```java
 /** An SLList is a list of integers, which hides the terrible truth
   * of the nakedness within. */
public class SLList {	
	private static class IntNode {
		public int item;
		public IntNode next;

		public IntNode(int i, IntNode n) {
			item = i;
			next = n;
		}
	} 

	/* The first item (if it exists) is at sentinel.next. */
	private IntNode sentinel;
	private int size;

	/** Creates an empty SLList. */
	public SLList() {
		sentinel = new IntNode(63, null);
		size = 0;
	}

	public SLList(int x) {
		sentinel = new IntNode(63, null);
		sentinel.next = new IntNode(x, null);
		size = 1;
	}

 	/** Adds x to the front of the list. */
 	public void addFirst(int x) {
 		sentinel.next = new IntNode(x, sentinel.next);
 		size = size + 1;
 	}

 	/** Returns the first item in the list. */
 	public int getFirst() {
 		return sentinel.next.item;
 	}

 	/** Adds x to the end of the list. */
 	public void addLast(int x) {
 		size = size + 1; 		

 		IntNode p = sentinel;

 		/* Advance p to the end of the list. */
 		while (p.next != null) {
 			p = p.next;
 		}

 		p.next = new IntNode(x, null);
 	}
 	
 	/** Returns the size of the list. */
 	public int size() {
 		return size;
 	}
}
```
![[IMG-20251214150210071.png]]

## Invariant 
An invariant is a condition that is guaranteed to be true during code execute (assuming there are no bugs in your code).  

An SLList with a sentinel node has at least the following invariants:  
- The sentinel reference always points to a sentinel node.
- The first node (if it exists), is always at sentinel.next.
- The size variable is always the total number of items that have been added.

Invariants make it easier to reason about code:
- Can assume they are true to simplify code (e.g. `addLast` doesn’t need to worry about nulls).
- Must ensure that methods preserve invariants.

# DLList(Double Link List)(with Circular)
![[IMG-20251214150210097.png]]

# Generic List

- In the .java file implementing your data structure, specify your "generic type" only once at the very top of the file.
- In .java files that use your data structure, specify desired type once:
    - Write out desired type during declaration.
    - Use the empty diamond operator <> during instantiation.
- When declaring or instantiating your data structure, use the reference type.
    - int: Integer
    - double: Double
    - char: Character
    - boolean: Boolean
```java
public class DLList<BleepBlorp> {
    private IntNode sentinel;
    private int size;

    public class IntNode {
        public IntNode prev;
        public BleepBlorp item;
        public IntNode next;
        ...
    }
    ...
}


DLList<String> d2 = new DLList<>("hello");
d2.addLast("world");
```

# AList(Array Based List)

Arrays are a special kind of object which consists of a numbered sequence of memory boxes.

Arrays consist of:
- A fixed integer length (cannot change!)
- A sequence of N memory boxes where N=length, such that:
    - All of the boxes hold the same type of value (and have same # of bits).
    - The boxes are numbered 0 through length-1.

Like instances of classes:
- You get one reference when its created.
- If you reassign all variables containing that reference, you can never get the array back.

_**Unlike classes, arrays do not have methods.**_

![[IMG-20251214150210125.png]]

## Array Copy
![[IMG-20251214150210242.png]]

## 2D Array
_**Rather than 2D array in C, it is more similar to pointer array in C.**_

Syntax:  
```java
int[][] twoDimension = new int[4][];
```
It creates an array whose length is 4 and each box can contain a 64 bits reference of another array of integer.
![[IMG-20251214150210272.png]]

```java
int[][] matrix = new int[4][4];
```
It creates an array of 4 boxes and each one contains an array of 4 boxes fixed. _**Not only the array integer reference but actual integer array.**_
![[IMG-20251214150210298.png]]
![[IMG-20251214150210324.png]]
Initialize:
![[IMG-20251214150210348.png]]

## Array vs Class
Arrays and Classes can both be used to organize a bunch of memory boxes.
- Array boxes are accessed using \[] notation.
- Class boxes are accessed using dot notation.
- Array boxes must all be of the same type.
- Class boxes may be of different types.
- Both have a fixed number of boxes.
- Array indices can be computed at runtime.
- Class member variable names can't be computed and used at runtime.(The only way to access a member of a class is with hard-code dot notation)
![[IMG-20251214150210374.png]]

## "Resizing" Arrays
```java
int[] a = new int[size + 1];
System.arraycopy(a, 0, item, 0, size);
a[size] = ...;
item = a;
size++;
```
![[IMG-20251214150210400.png]]

### Trade-off Between Time and Memory Efficiency
#### Speed Up
```java
public void insertBack(int x) {
	if(size == item.length) {
		resize(size * 2);
	}
	...
}
```

#### Memory Efficiency
An AList should not only be efficient in time, but also efficient in space.
- Define the “usage ratio” R = size / items.length;
- Typical solution: Half array size when R < 0.25.

## Generic

Creating generic arrays are not allowed in Java, instead we use `Object` and cast.
```java
public class AList<Item> {
	private Item[] items;
	private int size;
	public AList() {
		items = (Item[]) new Object[100];
		...
	}
	...
	{
		Item[] a = (Item[]) new Object[capacity];
		...
	}
	...
}
```

**Another fix:**
![[IMG-20251214150210503.png]]

---
> **基本类型（如 `int`、`boolean`）**
	在 Java 中，`int`、`boolean` 等属于基本数据类型，它们不是引用类型。当数组存储这些基本类型的数据时，数组元素直接存储的就是具体的值，而不是指向某个对象的引用。
	当从数组中 “删除” 一个基本类型元素（比如通过改变数组的有效长度来实现逻辑删除），虽然被 “删除” 位置上的值还在数组的内存空间中，但由于基本类型数据本身占用的空间是固定且直接存储值的，不存在对象引用导致的内存无法回收问题， 并且当后续对数组进行操作（比如重新赋值等），原有的值就会被覆盖。从内存占用的角度来说，不需要将其显式设置为类似 `null` 的值（基本类型也没有 `null` 这种状态 ），也不会造成内存浪费，因为它们没有引用其他对象，不存在游离对象的情况。  

> **引用类型（对象）**
	当数组存储的是对象这种引用类型的数据时，数组元素存储的是对象的引用，即指向对象在堆内存中地址的指针。
	如果只是进行 “假删除”，比如仅仅更改表示数组有效长度的索引，而不将对应位置的引用设置为 `null` ，那么这个被 “删除” 的对象依然会被数组中的引用指向。由于 Java 的垃圾回收机制只有在对象的所有引用都被释放（即没有任何变量指向该对象）时，才会回收该对象所占用的内存，所以此时这个对象虽然在逻辑上已经不属于数组要管理的数据了，但依然无法被垃圾回收，从而造成内存的浪费，这种情况就是所谓的 “对象游离（loitering）” 。只有将数组中对应位置的引用设置为 `null` ，切断对该对象的引用，垃圾回收器才能够在合适的时机回收该对象占用的内存。