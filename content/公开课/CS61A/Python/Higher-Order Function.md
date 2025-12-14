### We have learnt [[Print and None]].

### Characteristic of Function
- **Domain**: The set of all inputs it might possibly take as arguments.  
- **Range**: The set of output values it might possibly return.  
- A pure function's behavior is the relationship it creates between input and output.

## The Guide to Design a Function
###### Give each function exactly one job.  
###### Don’t repeat yourself **(DRY)**. Implement a process just once, but execute it many times.  
###### Define functions generally.

# Higher-Order Functions

### Generalize Patterns with Arguments
_And do not repeat yourself_

- `assert`: If the expression evaluates a False value, will give an error.
```python
import pi,sqrt from math

def area(r,shape):
	assert r > 0 , 'A length must be positive'
	return r * r * shape

def area_square(r):
	return area(r,1)

def area_circle(r):
	return area(r,pi)

def area_hexagon(r):
	return area(r,3 * sqrt(3) / 2)
```

#### Take a function's name as an argument
_**We can also generalize not only a number but an expression by doing so.**_  

```python
def identity(k): 
	return k 

def cube(k):
	return pow(k, 3)

def summation(n, term):
	total, k = 0, 1 
	while k <= n: 
		total, k = total + term(k), k + 1 
	return total 

def sum_naturals(n): 
	return summation(n,identity)

def sum_cubes(n):
	return summation(n,cube)
```

#### Also, functions can be returned value
```python
def add_maker(n):
	def adder(k):
		return n + k
	return adder
```
_**This is [[Environment|Nested Function]].**_ 

when it return itself:
```python
def print_all(x):
	print(x)
	return print_all
```

```python
def print_sums(n): 
	print(n) 
	def next_sum(k): 
		return print_sums(n+k) 
	return next_sum
```
This is [[Self-Reference]].
### The Purpose
  
**_Functions are first-class:_**  
- Functions can be manipulated as values in our programming language.   
	
_**Higher - order function:**_   
- A function that takes a function as an argument value or returns a function as a return value 

Higher - order functions: 
- [[Higher-Order Function#Give_each_function_exactly_one_job..md]] among functions
- [[#Don’t_repeat_yourself_**(DRY|Remove repetition]]**._Implement_a_process_just_once,_but_execute_it_many_times..md) from programs 
- [[#Define_functions_generally..md|Express general methods of computation]] 

## Practice: Newton's Method
```python
def newton_update(f, df):
    def update(x):
        return x - f(x) / df(x)
    return update

def approx_eq(guess, value, tolerance=1e-15):
    return abs(guess - value) < tolerance

def improve(close, update, guess=1):
    while not close(guess):
        guess = update(guess)
    return guess

def find_zero(f, df):
    def near_zero(x):
        return approx_eq(f(x), 0)
    return improve(near_zero, newton_update(f, df))

def sqrt_find_zero(a):
    def f(x):
        return x**2 - a
    def df(x):
        return 2 * x
    return find_zero(f, df)
```


## Function Decorators
_**The essential of decorator is a higher-order function.**_
```python
>>> def trace(fn):
        def wrapped(x):
            print('-> ', fn, '(', x, ')')
            return fn(x)
        return wrapped

>>> @trace
    def triple(x):
        return 3 * x

>>> triple(12)
->  <function triple at 0x102a39848> ( 12 )
36
```

**Which means:**  
When we call `triple`, we actually call its decorator. Its decorator is a higher-order function of it, so that in the decorator, our function is called and some extra effects happened, too.
```python
trace(triple)(12) 
# The operator evaluates wrapped(x), a function print and return 3 times of argument.
---->wrapped(12)
```

_**So a decorator: A function with a function as argument and a wrapped function in it.**_ 

### [[Object-Oriented Programming(OOP|OOP]].md) and Decorators
```python
def transact(f):
    def register(self, amount):
        before = self.balance
        ret = f(self, amount)
        after = self.balance
        self.transactions.append(Transaction(len(self.transactions), before, after))
        return ret
    return register
```
We can do things like this to decorate a method.
But we cannot write `ret = self.f(amount)` , or it regards `f` as an attribute of the instance we passed in and it will look up `f`, instead of use the `f` we want to decorate.

## `*args`
Instead of listing formal parameters for a function, you can write `*args`, which represents **all** of the arguments that get passed into the function.  
We can then call another function with these same arguments by passing these `*args` into this other function. For example:

```python
>>> def printed(f):
...     def print_and_return(*args):
...         result = f(*args)
...         print('Result:', result)
...         return result
...     return print_and_return
>>> printed_pow = printed(pow)
>>> printed_pow(2, 8)  # *args represents the arguments (2, 8)
Result: 256
256
>>> printed_abs = printed(abs)
>>> printed_abs(-10)  # *args represents one argument (-10)
Result: 10
10
```

Here, we can pass any number of arguments into `print_and_return` via the `*args` syntax. We can also use `*args` inside our `print_and_return` function to make another function call with the same arguments.  
We would like to write a function that accepts an arbitrary number of arguments, and then calls another function using exactly those arguments.

_**That is:**_ We can call the function passed as an argument in the higher order function, although we are not sure what function will be passed in and how many arguments it needs.

### \*[[List]]
If we don't know the exact number of arguments, use `*args` notation: `f(1, 2, 3)` is equivalent to `f(*[1, 2, 3]`), but it is different from `f([1, 2, 3])`, which passed in a list, not a group of numbers.
