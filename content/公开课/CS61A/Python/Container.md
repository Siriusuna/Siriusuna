1. [[List]]
2. [[String]]
3. [[Dictionary]]
4. [[Tuple]]
5. [[Set]]

# Sequence Aggregation
_**Several built-in functions take iterable arguments and aggregate them into a value**_
###### `sum(iterable[, start]) -> value`  
Return the sum of an iterable of numbers (NOT strings) plus the value of parameter 'start' (which defaults to 0). When the iterable is empty, return start.  
We can also evaluate a sum of a list consisting of lists.
```python
lists=[[1 ,4], [9, 10]]
sum(lists, []) # [1, 4, 9, 10]
```
  

###### `max(iterable[, key=func]) -> value ` 
or `max(a, b, c,...[, key=func]) -> value  `
With a single iterable argument, return its largest item.    
With two or more arguments, return the largest argument.

`min` is the complement, in like manner.


###### `all(iterable) -> bool`  
Return True if bool(x) is True for all values x in the iterable.  
If the iterable is empty, return True.
```python
all([1, 2, 3, 4, 5]) # True
all([0, 1, 2, 3, 4]) # False
```

`any` is the complement, in like manner.