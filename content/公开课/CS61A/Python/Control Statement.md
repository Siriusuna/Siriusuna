**Statement**
	_Clause_
		Suite
``` python
<header>: #C
	<statement> #S
	<statement>
	... ...
<separating header>:
	<statement>
	<statement>
	... ...
```

## Bool
- False values: False, 0, '',  None
- True values: Anything else  
The outcome of compare is `Bool`,`True` or `False`.

## Logical Operators

- and
- or  
Have _**short-circuit**_ behavior.  
In `and` If the first number is True, it will return second one, otherwise the first one.
By parity of reasoning for `or`.

# Conditional
### if Statement
Why we use if statement instead of a call expression?
Like this one:
```python
def if_(c,t,f):
	if c:
		return t
	else:
		return f
```
_**Because when we call a call expression, it will evaluate all the operands.**_  
_**But if statement gives us a choice whether to evaluate it or not, avoid some errors.**_
```python
if_(-4, sqrt(x), 0.0)
#error. Because it evaluate the sqrt(-4) and we just choose the value.
```

### if expression
_**Put the behavior of if statement on an expression.**_
```python
<consequent> if <predicate> else <alternative>

x if x > 0 else -x # abs(x)
sqrt(x) if x > 0 else 0.0
```
It is an expression so that it can be used as an argument.

# Iteration(Repeating)
### while Statement
**POINT**
- What to follow, or we say, keep track of?
### For Statement
_**It can iterate an iterable value and also [Iteration](Iteration.md) itself.**_
```python
for <name> in <expression>:  
	<suite>
```
  
1. Evaluate the header expression, which must yield an iterable value (a sequence)
2. For each element in that sequence, in order:  
	- Bind name to that element in the _current frame_  
    - Execute the suite
#### Ranges - Another Sequence Type
- Including starting value and excluding the end value
`range(-2, 2)`
- Length: ending value – starting value 
- Element selection: starting value + index
- Use a built-in function `list` to convert it to a list.
```python
 list(range(-2, 2)) # [-2, -1, 0, 1] 
 list(range(4)) # [0, 1, 2, 3]
 """If we just specify one number it will be defaulted to the end value."""
 ```

It is not an iterator , range can be call repeatedly, but it is [iterable](Iteration.md).
