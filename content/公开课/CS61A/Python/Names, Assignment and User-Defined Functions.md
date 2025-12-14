### Three Ways to bind names to values 

_**This is the way to [abstract](Abstraction.md).**_
#### **`import`**: Built-in functions. 

#### **Assignment:**

	 We can assign a function to a variable, just like this:
```python
f = max
f(1 , 2)   # 2
max(1 , 2) # 2
```
Execution rule for assignment statements:
	1. [Evaluate](Expression.md#^5jxb0f.md) all expressions to the right of = from left to right.
	2. Bind all names to the left of = to the resulting values in the current [frame](Environment.md#^x350xn.md).
	_**Every expression is evaluated in the context of an environment.**_  
	_**And the changes is in the current frame. When you find the name in parent/global frame, the changes WILL NOT affect the variable.**_

###### Keywords in defining a variable
- `nonlocal`:   
It is used to work with [variables inside nested functions](Higher-Order%20Function.md), where the variable should not belong to the outer function instead of inner function and can be changed by [inner function](Mutable%20Function.md).  
Use the keyword `nonlocal` to declare that the variable is **the one in the outer function**.
Then it will be monopolized by the function created by the outer function. Every time it be called, the `nonlocal` variable will remind the value of this  variable. ^67c4ed

>In the other hand, variable in other functions could not be accessed in other function unless it is nested. _Because they are in different [Environment](Environment.md)._

There is an example:
```python
def make_test_dice(*outcomes):
    assert len(outcomes) > 0, 'You must supply outcomes to make_test_dice'
    for o in outcomes:
        assert type(o) == int and o >= 1, 'Outcome is not a positive integer'
    index = len(outcomes) - 1
    def dice():
        nonlocal index
        index = (index + 1) % len(outcomes)
        return outcomes[index]
    return dice
```
Every time we call `make_test_dice` to create a new function, it will have its `index` with it.   
Every time we call the same `dice` created by `make_test_dice`, it will record the change of `index`.  
_**So this is called [closure](Higher-Order%20Function.md#^zbjuho.md).**_

#### Create own [Higher-Order Function](Higher-Order%20Function.md).
- `def`: **Define.** 
```python
def <name> (<formal parameters>): # signiture (How many argument it takes)
	return <ret expression> # body (what to do)
```
- Execution procedure for def statements:
	1. Create a function with signature `<name>(<formal parameters>)`.It let us knows how create a struct _local_ [frame](Environment.md#^x350xn.md) when we [|call](Expression.md#^q3hafs.md) it(name and parameter(s)).Call multiple, create multiple frame.
	2. Set the body of that function to be everything indented after the first line
	3. Bind `<name>` to that function in the current frame
- [lambda expression](Lambda%20Expression.md): Define some easy function.

- Similarity and difference between `def` and `lambda`:
  
	- Both create a function with the same domain, range, and behavior.
	- Both functions have as their parent the frame in which they were defined.
	- Both bind that function to the name square.
	- Only the `def` statement gives the function an intrinsic name, whereas the `lambda` do not until assigning it to a name.