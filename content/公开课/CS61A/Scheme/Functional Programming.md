All functions are pure functions.  
No re-assignment and no mutable data types.  
Name-value bindings are permanent.  

Advantages of functional programming:
- The value of an expression is independent of the order in which sub - expressions are evaluated.
- Sub - expressions can safely be evaluated in parallel or on demand (lazily).
- Referential transparency: The value of an expression does not change when we substitute one of its subexpression with the value of that subexpression. 

But... no for/while statements! Can we make basic iteration efficient? Yes!