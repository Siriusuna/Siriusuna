# The Structure of an Interpreter
![[IMG-20251214150202867.png]]

# [[Fundamentals|Special Forms]]

The scheme_eval function dispatches on expression form:
- Symbols are bound to values in the current environment.
- Self-evaluating expressions(numbers and empty list) are returned.
- All other legal expressions are represented as Scheme lists, called _combinations_.
	- Special forms are identified by the first list element(if, lambda and define).
	- Any combination is not a special form is a call expression(built-in or self-defined).

## Logical Special Forms
_**Logical special forms are things that might involve in conditions.**_

**They only evaluate _some(not all)_ sub-expressions.**

- `if`
- `and` , `or`
- `cond`

for `if` expression:
- Evaluate the predicate.
- Choose a sub-expression: consequent or alternative
- Evaluate that sub-expression in place of the whole expression.

The first two tasks is what `do_if_form` does.

## Quotation
_**The quote special form evaluates to the quoted expression, which is <font color="Yellow">not</font> evaluated.**_

(`scheme_read` parser converts shorthand to a combination.)  
`'(1 2)` -> `(quote (1 2))`

## The `lambda` Special Form
_**Lambda expressions evaluate to user-defined procedures.**_

![[IMG-20251214150202890.png]]

### [[Environment|Frame and Environment]]
_**A frame represents an environment by having a parent frame.**_

Frames are python instances with methods **lookup** and **define**.

## `define` Expression

1. Define binds a symbol to a value in the first frame of the current environment.
	- `(define <name> <expression>)`
		1. Evaluate the `<expression>`.
		2. Bind `<name>` to its value in the current frame.
2. Procedure definition is shorthand of [[Fundamentals#^3c57gc.md]]. They should be handled in the same way.
```scheme
(define (<name> <formal parameters>) <body>)  
(define <name> (lambda (<formal parameters>) <body>)
```
We will convert the first into the second one.  
Then what we actually do is to take the procedure like 1, evaluating the lambda expression and then bind that procedure value to a name.

# Applying User-Defined Procedures

To apply a user-defined procedure, create a new frame in which formal parameters are bound to argument values, whose parent is the **`env`(an attribute of the procedure, where it is defined at the first)** of the procedure.

Evaluate the body of the procedure in the environment that starts with this new frame.

![[IMG-20251214150202911.png]]
