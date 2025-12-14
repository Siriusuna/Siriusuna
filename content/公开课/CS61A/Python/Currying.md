_**Transforming a multi-argument function into a single-argument, higher-order function.**_

As we know, when we evaluate, [[Expression|we evaluate the operator first]].
```python
add_maker(1)(2)
```
`add_maker(1)` is an operator which is another call expression. ^dcx251

##### This is What is called Currying.
```python
>>> def curry2(f):
        """Return a curried version of the given two-argument function."""
        def g(x):
            def h(y):
                return f(x, y)
            return h
        return g

>>> def uncurry2(g):
        """Return a two-argument version of the given curried function."""
        def f(x, y):
            return g(x)(y)
        return f
        
"""We can also use lambda."""
curry2 = lambda f : lambda x : lambda y : f(x,y)
```

```python
pow_ = curry2(pow)
pow(2)(5) # 32
POW = uncarry2(curry2(pow))(2,5) # 32
```

> _**Every time we curry a function, we return a function which takes the rest of argument(s).**_

So we know the effect is same between `make_adder` and `add`.
```python
make_adder(3)(5) # 8
add(3,5) # 8
```
_**So do `f(x,y)` and `g(x)(y)`**_
The difference:
- One receive an argument and return a function.
- One receive two arguments and return a value.