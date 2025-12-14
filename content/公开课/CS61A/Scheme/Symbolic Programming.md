_**Manipulating lists of symbols which represent things in the world as structured objects.**_  

Symbols normally refers to values; it also can refer to symbols:  
Quotation is used to refer to symbols directly in Lisp.
```scheme
> (define a 1)
> (define b 2)
> (list a b)
(1 2) 
> (list 'a 'b)
(a b)
> (list 'a b)
(a 2)
```
(Short for `(quote <expression>)`)

Quotation can also be applied to combinations to form lists.
```scheme
> '(a b c)
(a b c) ; This means, '(1 2) == (list 1 2)
> (car '(a b c))
a
> (cdr '(a b c))
(b c)
```
