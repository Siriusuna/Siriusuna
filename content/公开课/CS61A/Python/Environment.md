# Diagrams
_**To keep up what is going on within the python interpreter when it execute an program we typed in.**_

[[https://pythontutor.com/cp/composingprograms.html#mode=edit]]

#### Frame :
_"帧"_.  
It records the value of all the variables in this time (last sentence is executed while next not yet)  ^x350xn

#### Every expression is evaluated in the context of an environment.  
- The global frame alone. 
- A local frame, then the global frame.
- Or, we have [[Higher-Order Function#^oiib41.md]], local, parent, parent...then global.

_**All in all, find its parent.**_

### Most important two things :  
- An environment is a sequence of frames.  
- A name evaluates _to the value bound to that name in the earliest frame_ of the current environment in which that name is found.  
_E.g., to look up some name in the body of the square function:_  
- Look for that name in the local frame.  
- If not found, look for it in the global frame.  
	(Built - in names like “max” are in the global frame too, but we don’t draw them in environment diagrams.)

# Multiple Environment

_**A call expression and the body of it are evaluate in different environment.**_

# The Environment of [[Higher-Order Function]]

The rule above is still effective.

# The Environment of Nested Definition

```python
def add_maker(n):
	def adder(k):
		return n + k
	return adder
```
_**This is <font color="#77BBDD">Nested Function</font>. When the function created in it is returned, it will bind to a name in the environment where we call the `adder_maker` function. Then we can get access to this `adder` function.**_ 

_**So when we return this function, it is a special category of Higher-Order Function.**_

_**Lecture 5**_: 27:04

-------------------------------------------------------------------
###### When a function is defined:  
1. Create a function value: `func <name>(<formal parameters>) [parent=<parent>]  ` ^oiib41
2. Its parent is the current frame.    
3. Bind `<name>` to the function value in the current frame  

###### When a function is called:
1. Add a local frame, titled with the `<name>` of the function being called.
2. _**Copy the parent of the function to the local frame: `[parent=<label>]`**_
3. Bind the `<formal parameters>` to the arguments in the local frame.
4. Execute the body of the function in the environment that starts with the local frame.
-------------------------------------------------------------------
##### Summary:
-------------------------------------------------------------------
- Every user-defined function has a parent frame (often global).
- The parent of a function is the frame in which it was defined.
- Every local frame has a parent frame (often global).
- The parent of a frame is the parent of the function called.
-------------------------------------------------------------------
_**Follow the frame according the priority, so we can find the correct value bound to the name we search for, writing down frame correctly.**_

##### _**So its status will remain. What if there's a variable in it, the outer function?**_

Function defined within another function bodies are bound to a name in a _local_ frame. For variables in outer one, we could use [[Names,_Assignment_and_User-Defined_Functions#^67c4ed.md]] to use that variable. When use it and return it, it is called _**closure**_. ^zbjuho

_**Attention: The parent environment of a function is where it was defined rather than where it is called, so we have a [[Names,_Assignment_and_User-Defined_Functions#^67c4ed.md]] keyword in a function defined in a function, which indicate to use the variable in its parent environment - The Higher-Order Function where it is defined.**_

# The Environment of [[Recursive Functions]]

- The same function fact is called multiple times. 
- Different frames keep track of the different arguments in each call. 
- What n evaluates to depends upon which is the current environment. 
- Each call to function solves a simpler problem than the last.  
And when a function is called, we can't continue next statement until it is returned.
