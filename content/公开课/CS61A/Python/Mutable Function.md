_**Mutable functions are functions that have data associated with them that changes.**_  
Usually assignment statement will search for the variable from the current frame, it can not affect the parent frame.  
So, we need something to do that: [nonlocal](Names,_Assignment_and_User-Defined_Functions.md).

# Non-Local Statement and Persistent Local State
```python
def make_withdraw(balance):
	def withdraw(amount):
		nonlocal balance 
		if amount > balance:
			return "Insufficient funds"
		else:
			balance-=amount
			return balance
	return withdraw
```
The `nonlocal` declares that _**the changes to the name 'balance' will happen in the frame make_withdraw, instead of in the frame of withdraw.**_  
So when we use `nonlocal`, we look up the name from the first non-local frame to the global frame(exclusive), that means, between local and global frame.  

# Non-Local Assignment
## The Effect of Non-Local Statements
`nonlocal <name>, <name>,... ` 
- Effect: Future assignments to that name change its pre-existing binding in the first non-local frame of the current environment in which that name is bound.  
>_From the Python 3 language reference:_  
>- Names listed in a nonlocal statement must refer to pre-existing bindings in an enclosing scope(a non-local frame). **(These names must already be used)** 
>- Names listed in a nonlocal statement must not collide with pre-existing bindings in the local scope(the current frame).**(Cannot be nonlocal if it already exist in the current frame)**

### Python Particular
Python <font color="#5A7CC2">pre-computes</font> which frame contains each name before executing the body of a function.  
Within the body of a function, all instances of a name must refer to the same frame.
```python
def f():
	x = 10
	def g():
	    print(x)  # Try to visit nonlocal variable x
	    x = 20    # Create a local variable x，colliding with the nonlocal x
	    print(x)  # Error will occur.
	return g
test = f()
test()
```
This will happen to error, because the twice visiting to x in f function tries to visit x in different frame, defying the 2nd principle.  
`UnboundLocalError: cannot access local variable 'x' where it is not associated with a value`.  
Because it assume the x is in g's frame(pre-compute).

# Create Mutable Function with Mutable Values
Mutable values can be changed without a nonlocal statement.  
```python
def make_withdraw(balance):
	b = [balance]
	def withdraw(amount):
		if amount > b[0]:
			return "Insufficient funds"
		else:
			b[0]-=amount
			return b[0]
	return withdraw
```

It does not change what the name bound to, just change the mutable values.  
By contrast, we use a nonlocal statement because we do change what the name bound to, from a number to another.  


# Multiple Mutable Function
## Referential Transparency, Lost
- Expressions are _**referentially transparent**_ if substituting an expression with its value does not change the meaning of a program.
```python
mul(add(2, mul(4, 6)), add(3, 5))  
mul(add(2, 24 ), add(3, 5))  
mul( 26 , add(3, 5))
"""These expressions are equal."""
```    
- Mutation operations violate the condition of referential transparency because they do more than just return a value; <font color="5A7CC2">they change the environment.</font>
```python
def f(x):
	x = 4
	def g(y):
		def h(z):
			nonlocal x
			x += 1
			return x + y + z
		return h
	return g

a = f(1)
b = a(2)
"""When we call:"""
total = b(3) + b(4) # 12
"""10 + 12"""
"""But when we use 10 to substitute b(3), that is we call the expression below instead of above one."""
total = 10 + b(4) # 11
```
This is because we called a mutable function, which mutated the value of variable.  
_**REFERENTIAL TRANSPARENCY IS LOST.**_

