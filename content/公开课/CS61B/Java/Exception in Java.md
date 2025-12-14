# Throw Exception
Syntax:  
```java
throw new IllegalArgumentException(String: "Exception message");
```
Create new object of type Exception.  
So exceptions are instance of classes.
# Catch Exception
Thrown exceptions cause code to crash, but `catch` exceptions instead, preventing program from crashing.  
Syntax:
```java
try {
	doSomething();
} catch(Exception e) {
	doSomethingElse();
}
```

# The Philosophy of Exceptions
_**Allows us to keep error handling code separate from 'real' code.**_
![[IMG-20251214150212237.png]]

# Exceptions and the Call Stack
When an exception is thrown, it descends the call stack.  
If exceptions reach the bottom of the stack, the program will crash and Java provides a message of call stack for the user.
![[IMG-20251214150212263.png]]

# Checked Exceptions
_**When compiling, compile may yell: "must be caught or declared to be thrown", these are exceptions disgusting by the compiler that we MUST handle them somehow.**_
![[IMG-20251214150212289.png]]
If any checked exception may occur, we must `catch` or `specify` these exceptions, or program will not be compiled.

- `catch`: We handle the problem.
- `specify`(`throws`): We ask others to handle the problem.
![[IMG-20251214150212314.png]]
![[IMG-20251214150212339.png]]
![[IMG-20251214150212367.png]]