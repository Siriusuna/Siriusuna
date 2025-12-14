_**Separate data type and abstract date type.**_  

_**We should know which ADT will make our life easier and which implementation will make our implementation faster.**_

We should notice that there are three fundamental structures: map, set and list(queue, deque, stack, etc.).  
And things we know as tree, hash table, array and so on is how it implement in different way or with different constraint.  
也就是说，所谓抽象数据结构，只是规定了数据之间的关系、可以进行的操作，但是具体底层如何实现，可以在这个规则下，使用不同的组织形式，树、数列等等实现。
![](IMG-20251214141243231.png)
[Data structure - Wikipedia](https://en.wikipedia.org/wiki/Data_structure)
**Syntax:**
```java
Map<String, Integer> m = new HashMap<>();
```
That is: abstract data type equals data type.
# Examples

## Deque
## Stack
## List
## [Set](Set.md)
## Map(Associative Array, Symbol tables and [dictionaries](Dictionary.md))(映射)
The difference between set and map is that when you give a key, set will return boolean and map will return some other values.
## ArrayMap
![](IMG-20251214141243259.png)


# Hierarchies
![](IMG-20251214141243284.png)
More details:
![](IMG-20251214141243312.png)
![](IMG-20251214141243339.png)
![](IMG-20251214141243365.png)

# Search
## Some Way Representing Set and Map
### [Disjoint Set](Disjoint%20Set.md)

### [Search Trees](Search%20Trees.md)
#### [QuadTree](Traversal.md)
#### KD Tree

### [Hashing](Hashing.md)

## [Heaps](Heaps.md) for PQ

![](IMG-20251214141243389.png)
_**ADTs and its Implementation Data Structure**_
![](IMG-20251214141243416.png)
![](IMG-20251214141243442.png)
也就是，这些抽象数据结构，是一种带有规则的特定数据组织形式，不止一种实现方式，而每种实现方式，也是一种数据组织方式，为了实现其规则，底层代码实现也不尽相同。
![](IMG-20251214141243470.png)

# Skip List

# [Graph](Graph.md)

