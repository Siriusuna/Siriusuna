_**An object should know how to present itself to the world as a string.**_

An object value should behave like the kind of data it is meant to represent  
For instance, by producing a string representation of itself

_**Strings are important: they represent language and programs**_(That is something really interesting that our codes is also strings, our variable, our expression, etc. and in a specific way computer can read it and run it, especially in [[Programs as Data|a language like lisp]] where we can symbolic programming.)

In Python, all objects produce two string representations:  
- The `str` is legible to humans  
- The `repr` is legible to the Python interpreter  
The `str` and `repr` strings are often the same, but not always.

# `repr`
The `repr` function returns a python expression (a string) that evaluates to an equal object.  
- `eval(repr(obj)) == obj`  
The result of calling `repr` on a value is what python prints in an interactive session.  
```python
>>> 12e2
1200.0
>>> repr(12e2)
'1200.0'
>>> print(repr(12e2))
1200.0
>>> repr("Hello,World!")
"'Hello,World!'"
```
Some object do not have a simple python-readable string.  
It is typically true for compound things, such as functions or classes.
```python
>>> repr(min)
'<built-in function min>' # A proxy, it can't be written a single expression, using angled bracket to indicate it is not a python expression.
```

# `str`
_**Human interpretable strings are useful as well.**_
```python
>>> half = Fraction(1, 2)
>>> repr(half)
'Fraction(1, 2)'
>>> str(half)
'1/2'
```
**The result of calling str on the value of an expression is what Python prints using the print function:**  
**Also how it is transformed into a string.**
```python
>>> print(half)  
1/2
```

# Polymorphic Functions
_**Polymorphic function is a function that applies to many(poly) different forms(morph) of data.**_  

`str` and `repr` are both polymorphic: they apply to any object.

- `repr` invokes a zero-argument method `__repr__` on its argument.
```python
>>> half.__repr__()
'Fraction(1, 2)'
```
- `str` invokes a zero-argument method `__str__` on its argument.
```python
>>> half.__str__()
'1/2'
```

_**Tips: We can do things like `str` and `repr` that don't have much logic, just deferring to the argument to decide what to do by invoking a method on it with the particular name.**_  

In fact, they are a bit more complicated.
This is how `__repr__` implement:
```python
def repr(x):
	return type(x).__repr__(x)
```
Manage to skip an instance attribute called `__repr__` and only find class attributes.  

This is `str`:
- An instance attribute called `__str__` is ignored
- If no `__str__` attribute is found, uses `repr` string.  
_**Attention: `str` is a class, not a function, when we call it we use a constructor. But we can regard `str` as below roughly.**_  
```python
def str(x):
	t = type(x)
	if hasattr(t, '__str__'):
		return t.__str__(x)
	else:
		return repr(x)
```

```python
class Bear:
    """A Bear."""
    def __init__(self):
        self.__repr__ = lambda: 'oski'
        self.__str__ = lambda: 'this bear'
    def __repr__(self):
        return 'Bear()'
    def __str__(self):
        return 'a bear'

oski = Bear()
print(oski) # a bear
print(str(oski)) # a bear
print(repr(oski)) # Bear()
print(oski.__str__()) # this bear
print(oski.__repr__()) # oski
```

# Interface
_**How objects interact each other is by passing message, and how they passing message is by looking up attributes and methods.**_  

The attribute look-up rules allow different data types to respond to the same message by having the _**same attribute name**_(`__repr__`, `__str__`, etc.)

_**A shared message (same attribute name)**_ that elicits similar behavior from different object classes is a powerful method of abstraction  

An interface is _**a set of shared messages**_, along with a specification of what they mean  

**Example:**  
Classes that implement `__repr__` and `__str__` methods that return Python-interpretable and human-readable strings implement an interface for producing string representations.

# Special Method Names
_**Likewise, there are other special method names having built-in behavior in python.**_  
These name always start and end with two `_`.

- `__init__`: Invoked automatically when an object is constructed.
- `__repr__`: Invoked to display an object as a python expression(used in an interactive python session to display value)
- `__add__`: Invoked to add one object to another.(`__radd__`: Invoked to be added.)
- `__bool__`: Invoked to convert an object to True or False.
- `__float__`: Invoked to convert an object to a float (real number).
```python
>>> zero, one, two = 0, 1, 2
>>> one + two
3
>>> bool(zero), bool(one)
(False, True)
"""Have same behavior."""
>>> zero, one, two = 0, 1, 2
>>> one.__add__(two)
3
>>> zero.__bool__(), one.__bool__()
(False, True)
```

_**With special names and interfaces, we can manage to do something interesting.**_  
```python
class Ratio:
    def __init__(self, n, d):
        self.numer = n
        self.denom = d

    def __repr__(self):
        return 'Ratio({}, {})'.format(self.numer, self.denom)

    def __str__(self):
        return '{}/{}'.format(self.numer, self.denom)

    def __add__(self, other):
        if isinstance(other, int):
            n = self.numer + self.denom * other
            d = self.denom
        elif isinstance(other, Ratio):
            n = self.numer * other.denom + self.denom * other.numer
            d = self.denom * other.denom
        elif isinstance(other, float):
	        return float(self) + other
		g = gcd(n, d)
		return Ratio(n/g, d/g)
    
    __radd__ = __add__

	def __float__(self):
		return self.numer / self.denom

def gcd(n, d):
    while n != d:
        n, d = min(n, d), abs(n-d)
    return d
```
This self-defined class `Ratio` behaves well when we add them together, add an integer(or float) to it or add it to an integer(or float).

# Multiple Representations
_**For one thing, there might be more than one useful representation for a data object, and we might like to design systems that can deal with multiple representations.**_  

In addition to the data-abstraction barriers that isolate representation from use, we need abstraction barriers that isolate different design choices from each other and permit different choices to coexist in a single program.

```python
class Number:
	def __add__(self, other):
		return self.add(other)
	def __mul__(self, other):
		return self.mul(other)

class Complex(Number):
	def add(self, other):
		return ComplexRI(self.real + other.real, self.imag + other.imag)
	def mul(self, other):
		magnitude = self.magnitude * other.magnitude
		return ComplexMA(magnitude, self.angle + other.angle)

class ComplexRI(Complex):
	def __init__(self, real, imag):
		self.real = real
		self.imag = imag
	@property
	def magnitude(self):
		return (self.real ** 2 + self.imag ** 2) ** 0.5
	@property
	def angle(self):
		return atan2(self.imag, self.real)
	def __repr__(self):
		return 'ComplexRI({0:g}, {1:g})'.format(self.real, self.imag)

class ComplexMA(Complex):
	def __init__(self, magnitude, angle):
		self.magnitude = magnitude
		self.angle = angle
	@property
	def real(self):
		return self.magnitude * cos(self.angle)
	@property
	def imag(self):
		return self.magnitude * sin(self.angle)
	def __repr__(self):
		return 'ComplexMA({0:g}, {1:g} * pi)'.format(self.magnitude, self.angle/pi)
```
This is how to manage to do that. To have a superclass and different represent as subclass.  
`@property`: The requirement that two or more attribute values maintain a fixed relationship with each other is a new problem. The `@property` decorator allows functions to be called without call expression syntax (parentheses following an expression). 

# Generic Functions
_**Using interfaces and message passing is only one of several methods used to implement generic functions. We will consider two others in this section: type dispatching and type coercion.**_ ^59svd7

## [[#Interface.md|#Interface]]
## Dispatching
_**To write functions that inspect the type of arguments they receive, then execute code that is appropriate for those types.**_
## Coercion
_**By designing coercion functions that transform an object of one type into an equivalent object of another type.**_

They all used in the example of `Ratio`.