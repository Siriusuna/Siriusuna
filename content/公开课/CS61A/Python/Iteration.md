_**Sequential data can be represented implicitly using an iterator.**_

An container can provide an iterator that provides access to its elements in some order.

- `iter(iterable)`: Return an iterator over the elements of an iterable value.
- `next(iterator)`: Return the next element in an iterator.

>- An iterable value is any value that can be passed to `iter` to produce an iterator  
>- An iterator is returned from `iter` and can be passed to next; all iterators are mutable  

In fact, an iterator knows the content of a sequence and has a <font color="Red">marker</font> for what's next.  
So, it is like a position of a sequence giving us access to the element of the position and everything after it.

```python
s = [3, 4, 5]
t = iter(s)
next(t) # 3
next(t) # 4
u = iter(s)
next(u) # 3
next(t) # 5
```
So, `t` and `u` share the same sequence but have different position.
```python
list(u) # [4, 5]
```
If we want to all the values in an iterator, we can also list them out.

When an iterator has run to the end, we can't call `next()`, which will cause an error.

# Dictionary Iteration

_**There are three different views of a Dictionary, keys, values and items.**_

A dictionary, its keys, its values, and its items are all iterable values 
- The order of items in a dictionary is the order in which they were added (Python 3.6+)
- Historically, items appeared in an arbitrary order (Python 3.5 and earlier)
```python
d = {'one': 1, 'two': 2, 'three': 3}
d['zero'] = 0
k = iter(d.keys())  # or iter(d)
print(next(k)) # 'one'
print(next(k)) # 'two'
print(next(k)) # 'three'
print(next(k)) # 'zero'

v = iter(d.values())
print(next(v)) # 1
print(next(v)) # 2
print(next(v)) # 3
print(next(v)) # 0

i = iter(d.items())
print(next(i)) # ('one', 1)
print(next(i)) # ('two', 2)
print(next(i)) # ('three', 3)
print(next(i)) # ('zero', 0)
```

Tips:
- If we change the size of dictionary, add or pop some pairs, our iterator will can not be used anymore, unless we create a new one.
- On the other hand if we just change the values of keys, it does not matter.

# [[Control Statement|For Statement]]

_**For statement also move the marker within an iterator, advancing it all the way to the end of the sequence.**_

But once we used an iterator in for statement, it will advance the iterator so we cannot use it again.  
On the other hand, if we work with an iterable object, every time we use for statement, we are able to go through the entire contents from the beginning to the end.

> Although it cannot do anything, it is should be notified that `for` a vacant iterator will not incur error, unlike `next`.

# Built-in Iterator Functions

_**A great deal of processing sequences and other iterable values uses built-in functions that takes an iterable value and return an iterator.**_

1. Many built-in sequence operations return iterators that compute results _**lazily**_, which means a result is only computed when it has been requested.

- `map(func, iterable)`: Iterate over `func(x)` for `x` in iterable  
- `filter(func, iterable)`: Iterate over `x` in iterable if `func(x)`  
- `zip(first_iter, second_iter)`: Iterate over co-indexed (x, y) pairs  
- `reversed(sequence)`: Iterate over x in a sequence in reverse order  

2. To view the contents of an iterator, place the resulting elements into a container  
- `list(iterable)`: Create a list containing all x in iterable  
- `tuple(iterable)`: Create a tuple containing all x in iterable  
- `sorted(iterable)`: Create a sorted list containing x in iterable

The iterator produced by functions above can be used as iterable argument to other functions.
```python
>>> m = map(double, range(3, 7))  
>>> f = lambda y: y >= 10  
>>> t = filter(f, m)  
>>> next(t)  
** 3 => 6 **  
** 4 => 8 **  
** 5 => 10 **  # the iterator will exactly compute to where is needed.
10  
>>> next(t)  
** 6 => 12 **  
12  
>>> list(t)  
[]  
>>> list(filter(f, map(double, range(3, 7))))  
** 3 => 6 **  
** 4 => 8 **  
** 5 => 10 **  
** 6 => 12 **  
[10, 12] # transforms to a list will make iterator do all the work
```

## Attention
1. Avoiding applying equality between a list and an iterator, or we will get False. Because one is a list, another is an iterator object.
2. If we have a dictionary, the elements come in any order, but when we iterate over them we get a consistent order each time.

# Generator - A Special Kinds of Iterator

_**The thing that is special about a generator is that it is returned from a generator function.**_

## Generator Expression
```python
itr = (s[i] in s[:i] + s[i + 1 :] for i in range(len(s)))
```
The `itr` is a iterator. In contrast to a list comprehension, as a iterator, it will not generate all the outcome at once.  
When it is used as a argument of a function, the parentheses can be omitted. 
## Generator Function

It is like a common function, but using the `yield` keyword instead of return.
```python
def plus_minus(x):
	yield x
	yield -x

t = plus_minus(3)
next(t) # 3
next(t) # -3
t # <generator object plus_minus ...>
```

A <font color="Blue">generator function</font> is a function that <font color="Green">yield</font>s values instead of <font color="Green">return</font>ing them  
A normal function <font color="Green">return</font>s once; a <font color="Blue">generator function</font> can <font color="Green">yield</font> multiple times  
A <font color="Red">generator</font> is an iterator created automatically by calling a <font color="Blue">generator function</font>  
When a <font color="Blue">generator function</font> is called, it returns a <font color="Red">generator</font> that iterates over its yields(sequentially, one by one.)

When we create a generator, the body is not executed yet, until requested.  
Then it will execute the body until a yield statement is reached.  
At that point, the next element is yield, as the next element in the iterator.  
Execution pauses at that yield but remembers all the environment of the function execution.  
So that the next time we request to compute, I can continue where it left off. 

### Another example:
```python
def evens(start,end):
	even += start + start % 2
	while start < end:
		yield even
		even += 2
```

## Generator & Iterator

A `yield from` statement yields all values from an iterator or iterable (Python 3.3)

```python
def a_then_b(a, b):  
	for x in a:  
		yield x  
	for x in b:  
		yield x
"""It is equivalent to"""
def a_then_b(a, b):  
	yield from a  
	yield from b

>>> list(a_then_b([3, 4], [5, 6]))  
[3, 4, 5, 6]

"""----------------------------------"""

def countdown(k):  
	if k > 0:  
		yield k  
		yield from countdown(k-1)
"""It is equivalent to"""
def countdown(k):
	if k > 0:
		yield k
		for x in countdown(k - 1):
			yield x

>>> list(countdown(5))  
[5, 4, 3, 2, 1]
```

**Attention:**  
If we use yield statement rather than yield from:
```python
def countdown(k):
	if k > 0:
		yield k
		yield countdown(k - 1)

>>> t = countdown(5)
>>> next(t)
5
>>> next(t)
<generator object countdown ...>
```

### More Examples:
```python
def prefixes(s):
    if s:
        yield from prefixes(s[:-1])
        yield s

def substrings(s):
    if s:
        yield from prefixes(s)
        yield from substrings(s[1:])
```


# Some Experience about Recursive Generator
```python
def stair_ways(n):
    """
    Yield all the ways to climb a set of n stairs taking
    1 or 2 steps at a time.
    
    >>> list(stair_ways(0))
    [[]]
    >>> s_w = stair_ways(4)
    >>> sorted([next(s_w) for _ in range(5)])
    [[1, 1, 1, 1], [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2]]
    >>> list(s_w) # Ensure you're not yielding extra
    []
    """
    if not n:
        yield []
    elif n == 1:
        yield [1]
    else:
        for step in stair_ways(n - 1):
            yield [1] + step
        for step in stair_ways(n - 2):
            yield [2] + step
```

```python
def yield_paths(t, value):
    """
    Yields all possible paths from the root of t to a node with the label
    value as a list.
  
    >>> t1 = tree(1, [tree(2, [tree(3), tree(4, [tree(6)]), tree(5)]), tree(5)])
    >>> print_tree(t1)
    1
      2
        3
        4
          6
        5
      5

    >>> next(yield_paths(t1, 6))
    [1, 2, 4, 6]
    >>> path_to_5 = yield_paths(t1, 5)
    >>> sorted(list(path_to_5))
    [[1, 2, 5], [1, 5]]

    >>> t2 = tree(0, [tree(2, [t1])])
    >>> print_tree(t2)
    0
      2
        1
          2
            3
            4
              6
            5
          5

    >>> path_to_2 = yield_paths(t2, 2)
    >>> sorted(list(path_to_2))
    [[0, 2], [0, 2, 1, 2]]
    """
    if label(t) == value:
        yield [label(t)]
    for b in branches(t):
        paths = yield_paths(b, value)
        for path in paths:
            yield [label(t)] + path
```

_**Look these program.**_  
When we want to construct a recursive generator, we must remember our function will return a iterator  
So if we want to incorporate our answer in this recursive call with another call, we should use `for` statement and `yield` every single time.  
So that, we can advance the iteration that next recursive call created and incorporate it will the answer in this layer, and yield it as one result of this time of recursive call.


# Iterator and Iterable

We should notice that iterator has a marker pointing to where we have iterated to, and the marker will not move with our modify.
## 1. Impact of Modifying a List While Iterating

- **Iterator Behavior**  
    We discussed that a Python list iterator holds a reference to the original list and an internal index. It does _not_ take a snapshot of the list’s contents when created, so any in-place changes to the list (inserts, deletes, or assignments) will affect what the iterator yields next.
    
- **Insertion**  
    Inserting elements shifts later items to the right. If you insert _after_ the iterator’s current index, the newly inserted items will still be visited; if you insert _before_, you may end up visiting items in an unexpected order.
    
- **Deletion**  
    Removing elements causes subsequent items to shift left. This often leads to “skipping” an element (because the next item moves into the index the iterator was about to read) or sometimes revisiting the same item twice.
    
- **Replacement**  
    Assigning to an existing index simply changes the element that the iterator will return when it reaches that position.
    

---

## 2. For-Loop Specific Issues and Best Practices

- **Why `for` Loops Are Affected**  
    A `for x in lst:` loop is built on the same iterator mechanism. Mutating `lst` inside the loop therefore leads to the same index-shift effects: skipped values or duplicates.
    
- **Demonstration**  
    We walked through an example where removing every even number inside a `for` loop on `[0,1,2,3,4]` results in unexpected behavior (some evens get skipped, odds get revisited).
    
- **Recommended Workarounds**
    
    1. **Iterate over a copy** (e.g., `for x in lst[:]`)
        
    2. **List comprehension or filtering** to build a new list
        
    3. **Reverse iteration** when deleting (so shifting doesn’t affect unvisited items)
        
    4. **Manual `while` loop** with explicit index management
        

These patterns keep iteration and modification separate, avoiding the pitfalls of in-place list changes during traversal.