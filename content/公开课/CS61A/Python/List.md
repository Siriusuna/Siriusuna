_**A built-in data type in python.**_  

# Features
```python
digits = [1, 8, 2, 8]
[2, 7] + digits * 2  """HERE! ATTENTION!!!"""
add([2, 7], mul(digits, 2))
# [2, 7, 1, 8, 2, 8, 1, 8, 2, 8]
```
1. We can concatenate or repeat a list by simply add it to another list or multiply it.
---
## ATTENTION: Multiplying a List Will
In Python, when creating a list using the `[ ] * n` notation, it is a _**shallow copy**_. 

​In Python, when you multiply a list by an integer using the `*` operator (e.g., `new_list = original_list * n`), it creates a **shallow copy** of the list. This means that the new list is a new object, but it contains references to the same elements as the original list.​

**Example:**
```python
original = [1, 2, 3]
new_list = original * 3
print(new_list)  # Output: [1, 2, 3, 1, 2, 3, 1, 2, 3]`
```
In this example, `new_list` is a new list object, but it contains _**references to the same elements**_ as `original`.​

**Important Note on Nested Lists:**

When dealing with nested lists (lists containing other lists), using the `*` operator can lead to unexpected behavior because it copies references to the same inner lists.​

**Example:**
```python
nested_list = [[]] * 3 
nested_list[0].append('a')
print(nested_list)  # Output: [['a'], ['a'], ['a']]`
```
In this case, all three elements in `nested_list` refer to the same inner list. Therefore, appending `'a'` to one of them affects all of them.​

**Best Practice:**

If you need to create a list of independent inner lists, use a list comprehension
```python
independent_lists = [[] for _ in range(3)] independent_lists[0].append('a') print(independent_lists)  # Output: [['a'], [], []]`
```
This approach ensures that each inner list is a separate object, preventing unintended side effects.

---
# Shallow and Deep
### 🔹 Shallow Copy

- **Definition**: A shallow copy creates a new object, but it only copies references to the nested objects within the original. This means that while the outer object is a new instance, the inner objects are shared between the original and the copy.​
    
- **Implication**: Modifying mutable nested objects (like inner lists) in the copy will affect the original, since both share the same references to these nested objects.​
    
- **Common Methods**:
    - `copy.copy()` from the `copy` module
    - List slicing: `new_list = old_list[:]`
    - Using the `list()` constructor: `new_list = list(old_list)`
    - List's `copy()` method: `new_list = old_list.copy()`
- **Example**:
```python
import copy
original = [[1, 2], [3, 4]]
shallow = copy.copy(original)
shallow[0][0] = 99
print(original)  # Output: [[99, 2], [3, 4]]`
```
In this example, modifying `shallow[0][0]` also changes `original[0][0]` because both lists share the same inner lists.​​

---
### 🔸 Deep Copy

- **Definition**: A deep copy creates a new object and recursively copies all nested objects within the original. This results in a completely independent copy with no shared references.
    
- **Implication**: Modifying any part of the deep copy does not affect the original object.​
    
- **Method**:
    - `copy.deepcopy()` from the `copy` module
- Example:
```python
import copy
original = [[1, 2], [3, 4]]
deep = copy.deepcopy(original)
deep[0][0] = 99
print(original)  # Output: [[1, 2], [3, 4]]
```
Here, modifying `deep[0][0]` does not affect `original[0][0]` because the inner lists are also copied.

---

### ⚠️ Assignment (`=`) Is Not a Copy

Using the assignment operator (`=`) does not create a copy of the object. Instead, it creates a new reference to the same object.​

- **Example**:
```python
original = [1, 2, 3]
assigned = original
assigned[0] = 99
print(original)  # Output: [99, 2, 3]`
```
In this case, both `assigned` and `original` refer to the same list object.​

---
### ✅ Summary

| Operation        | Copies Outer Object | Copies Nested Objects | Shared References |
| ---------------- | ------------------- | --------------------- | ----------------- |
| Assignment (`=`) | ❌                   | ❌                     | ✅                 |
| Shallow Copy     | ✅                   | ❌                     | ✅                 |
| Deep Copy        | ✅                   | ✅                     | ❌                 |

Example:
```python
def reduce_health(self, amount):
	for bee in self.place.bees[:]:
		if self.health - amount <= 0:
			bee.reduce_health(self.damage + amount)
		else:
			bee.reduce_health(amount)
	super().reduce_health(amount)
```
There we use slicing, a swallow copy. So that we can have a same list as begin, but the content, `Bee` object is the same one. What we operate to these object will do affect the object in original list. But we just delete the bees in original one so that our iterate will not be influenced.
^fxmjvk

All in all, there will not be any problems if it does not have a nested [[Mutable Variable]], but if so, we should consider whether we want it to refer a same object or not and decide to have a shallow or deep copy.


---
## Feature Continue:
```python
pairs = [[10, 20], [30, 40]]
pairs[1] # [30, 40]
pairs[1][0] # 30
```
2. The element of a list could be lots of things, even another lists.

```python
digits = [1, 8, 2, 8]
1 in digits # True
8 in digits # True 
5 not in digits # True 
not(5 in digits) # True
```
3. We can use some built-in operators for testing whether an element appears in a compound value(e.g. list).
```python
'1' in digits # False
[1, 8] in digits # False
[1, 2] in [3, [1, 2], 4] # True
[[1,_2.md|1, 2]], 4] # False
```
4. A string is different from an integer.
5. `in` is used to find an individual element, not subsequence. So it is a simply operator, doesn't search for everything that matches, but goes element by element and sees whether is equal to what it is looking for.
```python
digits[-1] # 8
digits[-2] # 2
```
6. Select a negative index is valid, which mean count from the end and begin with -1
# Manipulate or Iterate over Subsequences
## For Statement
_**[[Control Statement|For statement]] is used to help us manipulate or iterate over subsequences.**_ ^2bi6wh
### Unpacking
Works with a sequence of **fixed-length sequences**
```python
pairs = [[1, 2], [2, 2], [3, 2], [4, 4]]
same_count = 0
for x, y in pairs: # 1, 2 and 2, 2 and so on.
	if x == y: 
	same_count = same_count + 1
# 2 
```
`x` and `y` each is a name for each element in a fixed-length sequence.  
Each name is bound to a value, as in multiple assignment.

## Sequence Processing
### Comprehension(推导式)
_**Take an existing list and compute a new list from it according some expression.**_
1. Evaluating a fixed expression for each element in a sequence and collecting the resulting values in a result sequence.
```python
odds = [1, 3, 5, 7, 9]
[x + 1 for x in odds] # [2, 4, 6, 8, 10]
```
>The for keyword above is not part of a for statement, but instead part of a list comprehension because it is contained within square brackets.

2. Select a subset of values that satisfy some condition.
```python
[x for x in odds if 25 % x == 0] # [1, 5]
```
The general form of a list comprehension is:
```python
[<map expression> for <name> in <sequence expression> if <filter expression>]
```

### Slice
```python
odd = [1, 3, 5, 7, 9]
[odd[i] for i in range(1,3)] # [3, 5]
"""Equals to"""
odd[1: 3] # [3, 5]
```
- The start and end all can be omitted and will be defaulted to the very beginning(or end).
- _**It is not [[#ATTENTION_Multiplying_a_List_Will.md|swallow copy]].**_ When slicing, there's actually a new list be created and when we change the new one, old one will not be influenced.

# 