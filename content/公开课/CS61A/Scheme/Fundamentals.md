[Scheme Specification](https://insideempire.github.io/CS61A-Website-Archive/articles/scheme-spec/)

# Call Expression

Scheme programs consist of expressions, which can be:  
- Primitive expressions: 2, 3.3, true, +, quotient, ...  
- Combinations: (quotient 10 2), (not true), ...  ^bmog31

Numbers are self-evaluating; symbols are bound to values  
Call expressions include an operator and 0 or more operands in parentheses

![[IMG-20251214150204207.png]]

question mark:
```scheme
> (integer? 2.2)
#f
> (integer? 2)
#t
```

# Special Forms
_**A combination that is not a call expression is a special form.**_

- `if` expression:  
	- `(if <predicate> <consequent> <alternative>)`
		1. Evaluate the predicate expression
		2. Evaluate either the consequent or alternative
- `and` and `or`:  
	- `(and <e1> <e2> ...)` `(or <e1> <e2> ...)`  
		It also have short circuit property.
- Binding symbols:
	- `(define <symbol> <expression>)`
- New procedure:
	- `(define (<symbol> <formal parameters>) <body>)`
```scheme
(define (abs x)
	(if (< x 0)
		(- x)
		x))
```
_**Scheme's environment system is same to Python.**_

Example:
```scheme
(define (average x y)
		(/ (+ x y) 2))

(define (sqrt x)
  (define (update guess)
    (if (= (square guess) x)
        guess
        (update (average guess (/ x guess)))))
  (update 1))
```
So we can create a recursive procedure in Scheme.

- `cond` special form:
	- `(cond (<condition> <consequent>)(<condition> <consequent>)...(else <alternative>)`  
		1. Only one will be chosen.  
		2. It does have a value that can be printed etc.
- `begin` special form: combine multiple expressions into one.  
	- `(begin <subexpression> <subexpresion> ...)`  
		1. All of them will be evaluated and called.
		2. Return the value of last expression.
- `let` special form: bind symbols to values temporarily(just for one expression)
	- `(let ((<symbol> <expression>) (<symbol> <expression>)...<body>))`
![[IMG-20251214150204317.png]]
# Lambda Expressions
_**Lambda expressions evaluate to anonymous procedure.**_

`(lambda (<formal-parameters>) <body>)`

Example: Two equivalent expression to define a `plus4` procedure. ^3c57gc
```scheme
(define (plus4 x) (+ x 4))
(define plus4 (lambda (x) (+ x 4)))
```
(Shorthand)

An operator can be a call expression, too:
```scheme
((lambda (x y z)
		(+ x y (square z)))
		 1 2 3)
```

We can also repeat:
```scheme
(define (f x total)
	(if (< x 10)
		(f (+ x 2) (+ total (* x x)))
	total
	)
)
```

`define` doesn't return the function, but `lambda` does.

## `mu` Expressions

It is not standard in Scheme but appears in other variants of Lisp.
```lisp
(mu ([param] ...) <body> ...)
```

Creates a new mu procedure with `param`s as its parameters and the `body` expressions as its body. When the procedure this form creates is called, the call frame will extend the environment the mu is called in.

# Lists
_**Linked list.**_ ^2gccw8
- `cons`: Two-argument procedure that creates a linked list
	- The second one must be a linked list, so that we connect the first with the existed argument linked list. So it actually create linked list from the end. 
	- Or it is an ill list, and will be presented as Pair:
```scheme
		(cons 1 '(2 3)) ; OK：return (1 2 3)
		(cons '(2 3) 1) ; ：return ((2 3) . 1)，not a well-formed list.
```
- `car`: Procedure that returns the first element of a list  
- `cdr`: Procedure that returns the rest of a list  
- `nil`: The empty list
- `list`: Create a list, shorthand of `(cons ... (cons ... (...)))`
![[IMG-20251214150204345.png]] 

# Macros
_**Macros allow us to define new special forms in the language.**_  

A macro is an operation performed on the source code of a program before evaluation.

## `define-macro` Special Form

```scheme
(define-macro (twice expr)
		(list 'begin expr expr))

> (twice (print 2))
; 2
; 2
```
Evaluation procedure of a macro call expression:  
- Evaluate the operator sub-expression, which evaluates to a macro  
- Call the macro procedure on the operand expressions _**without evaluating them first**_  
- Evaluate the expression returned from the macro procedure

So a macro take in expressions and return expressions instead of taking in values and returning values.

## For Macro
```scheme
(define-macro (for sym vals expr)
	(list 'map (list 'lambda (list sym) expr) vals)
)
```
