_**Lambda expressions are the expressions evaluate to [functions](Higher-Order%20Function.md).**_

```python
square = lambda x : x * x
```
`lambda x : x * x` is an expression evaluates to a function with parameter formal `x` and returns `x * x` as value.  
_We can also use lambda expression as a call expression, too_
```python
(lambda x : x * x)(3) # 9
```
The return must be a single expression, as the body of lambda expression.

>It can also have more than two arguments or no argument.
>Lambdas can return other lambdas.
>They can have functions as arguments as well.
#### An Interesting Way to Find Inverse Function
```python
def search(f):
	x = 0
	while not f(x):
		x += 1
	return x

def inverse(f):
	return lambda y : search((lambda x : f(x) == y ))
```

#### Another Interesting Example of Defining a Recursive Function
```python
def make_anonymous_factorial():
    return (lambda f: lambda k: f(f, k))(
        lambda f, k: 1 if k == 1 else mul(k, f(f, sub(k, 1)))
    )
```
**THAT IS REALLY ABSTRACT!!!**  
_Let's figure out what happened!_  
1. The lambda front created a function which receive a function as an argument `f` and return another function.
> _Yes, it is a higher-order function._
2. The returned function takes one argument `k`, then return `f(f, k)`.
> _It shows that the function_ `f`_, the outer lambda's argument, is self-referred._
3. So we define lambda for third time: a function which takes two argument,`f` and `k`. In this case, `f` is a function and `k` is a variable to calculate factorial.
> _OK, let's shorten "the third lambda" as `f`. And yes, every `f` is exactly this function._
4. `f` is the argument for the first lambda.
> _So no the third lambda is self-referred._
5. So the only one argument should input is `k`, for the second lambda.
6. When `k` input, we will call `f(f, k)`. 
>_Do you still remember_ `f` _has TWO arguments, one is_ `f` _and one is `k`?_
>_That why_ `f` _has two arguments, because so that it can call itself in it._

_**Let's convert it to a more easy version.**_
```python
fact = lambda f, k : 1 if k == 1 else k * f(f, k - 1)
self_refer = lambda f : lambda k : f(f, k)
tfwra = self_refer(fact) # This is the return of first lambda
# Abbreviation for the_function_we_return_above
"""tfwar == fact(fact, )"""
tfwar(5)
=="""fact(fact, 5)"""
==fact, 5 : 1 if k == 1 else k * fact(fact, k - 1)
```
Without the first lambda, we can't take `f` as the argument for `f` itself, that the purpose to define it.