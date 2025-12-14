# Purpose
_**Compound objects combine objects together**_
- A date: a year, a month, and a day
- A geographic position: latitude and longitude
- A rational number: a numerator and a denominator.
_**An abstract data type lets us manipulate compound objects as units**_
- Isolate two parts of any program that uses data:
    - How data are represented (as parts) (e.g. use [Container](Container.md).) 
    - How data are manipulated (as units)  
    _Between them is the **abstraction barrier**._<font color="Red">(Lec.11)</font>
- Data abstraction: A methodology by which functions enforce an abstraction barrier between **representation** and **use**.

# Constructor and Selector
A _data abstraction_ is a set of functions that compose and decompose compound values. 
- One function called the _constructor_ puts together two or more parts into a whole (such as a rational number; also known as a fraction).
- other functions called _selectors_ return parts of that whole (such as the numerator or denominator).

# What is Data?
- We need to guarantee that [#Constructor_and_Selector](#Constructor_and_Selector.md) functions work together to specify the right behavior
- Behavior condition: If we construct rational number x from numerator n and denominator d, then `numer(x) / denom(x)` must equal n/d
- Data abstraction uses selectors and constructors to define behavior
- If behavior conditions are met, then the representation is valid  

_**You can recognize data abstraction by its behavior.**_

# Example
```python
# Rational arithmetic
def add_rational(x, y):
    """Add rational numbers x and y."""
    nx, dx = numer(x), denom(x)
    ny, dy = numer(y), denom(y)
    return rational(nx * dy + ny * dx, dx * dy)

def mul_rational(x, y):
    """Multiply rational numbers x and y."""
    return rational(numer(x) * numer(y), denom(x) * denom(y))

def rationals_are_equal(x, y):
    """Return whether rational numbers x and y are equal."""
    return numer(x) * denom(y) == numer(y) * denom(x)

def print_rational(x):
    """Print rational number x."""
    print(numer(x), "/", denom(x))
    
"""-----------------------Abstraction Barrier----------------------------"""

# Constructor and selectors
def rational(n, d):
    """Construct a rational number x that represents n/d."""
    return [n, d]

def numer(x):
    """Return the numerator of rational number x."""
    return x[0]

def denom(x):
    """Return the denominator of rational number x."""
    return x[1]
```
Things above the barrier don't assume anything about how a rational number represent.  
Things below don't care about how a list implement, either.

**Then, if we change how it is represented:**
```python
# Constructor and selectors
def rational(n, d):
    """Construct a rational number x that represents n/d."""
    def select(name):
        if name == 'n':
            return n
        elif name == 'd':
            return d
    return select

def numer(x):
    """Return the numerator of rational number x."""
    return x('n')

def denom(x):
    """Return the denominator of rational number x."""
    return x('d')
```
It behaves just like before, so it is valid and we do not need to change anything above the barrier.