_**A function is called recursive if the body of that function calls itself, either directly or indirectly.**_

---
##### Parts:
- The def statement header is similar to other functions
- Conditional statements check for base cases
- Base cases are evaluated without recursive calls
- Recursive cases are evaluated with recursive calls
---
##### Is function implemented correctly? 
_**Mathematical induction!**_
1. Verify the base case. 
2. Treat f as a functional abstraction! 
3. Assume that f(n-1) is correct. 
4. Verify that f(n) is correct, assuming that f(n-1) correct.
---
# Mutual Recursion
_**it occurs when two different functions call each other.**_
There is a concise example:
```python
def split(n): 
	return n // 10, n % 10 

def sum_digits(n): 
	if n < 10: 
		return n 
	else: 
		all_but_last, last = split(n) 
		return sum_digits(all_but_last) + last 
		
def luhn_sum(n): 
	if n < 10: 
		return n 
	else: 
		all_but_last, last = split(n) 
		return luhn_sum_double(all_but_last) + last 
		
def luhn_sum_double(n): 
	all_but_last, last = split(n) 
	luhn_digit = sum_digits(2 * last) 
	if n < 10: 
		return luhn_digit 
	else: 
		return luhn_sum(all_but_last) + luhn_digit
```


# Convert

_**Converting Recursion to Iteration**_
- Can be tricky: Iteration is a special case of recursion.   
- _**Idea:**_ Figure out what state must be maintained by the iterative function.

_**Converting Iteration to Recursion**_
- More formulaic: Iteration is a special case of recursion.   
- _**Idea:**_ The state of an iteration can be passed as arguments.  
That is: From updates via assignment to arguments to a recursive call.

# The Order of Recursive Call
_**When you make a function call, you have to wait for it to return before you can anything else.**_

# [[Trees|Tree]] Recursion
_**whenever executing the body of a recursive function makes more than one recursive call to that function.**_  

The process of executing is a post-order traversal of a tree.  
It often involves exploring choices.

---
If you need to keep track of more than one value across recursive calls, consider writing [[Higher-Order Function|a helper function]].
E.g.
```python
def interleaved_sum(n, odd_func, even_func):
 """Compute the sum odd_func(1) + even_func(2) + odd_func(3) + ..., up
    to n."""
    def helper(x, is_odd):
        if x > n: # track N because the parent of helper is f:I_S
            return 0
        elif is_odd:
            return odd_func(x) + helper(x + 1, False)
        else:
            return even_func(x) + helper(x + 1, True)
    return helper(1, True)
```

---
# Two methods of Recursion

###### Build up result by manipulating the return value of a recursive call
```python
def fact(n):
	return n * fact(n - 1)
```

###### Build up result by pass information into the recursive call as an argument or with [[Mutable Function|nonlocal variable]].
```python
def fact(n, k = 1)
	if not n:
		return k
	else:
		return fact(n - 1,k * n)
```
Another example: [[Trees]]: `print_sum`

Both are useful and convenient in some situation.

One more example:  
Return the number of nodes whose label is bigger than any of its ancestor's.
```python
"""1st Method:"""
def bigs(t):
    def f(a, x):
        if label(a) > x:
            return 1 + sum([f(bs, label(a)) for bs in branches(a)])
        else:
            return sum([f(bs, x) for bs in branches(a)])
    return f(t, -float("inf"))

"""2nd Method:"""
def bigs(t):
    n = 0
    def f(a, x):
        nonlocal n
        if label(a) > x:
            n += 1
        for bs in branches(a):
            f(bs, max(label(a), x))
    f(t, -float("inf"))
    return n
```

