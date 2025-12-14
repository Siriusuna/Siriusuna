# Type Parameter
[Wrapper Types](Type%20Conversion.md) should be used as specific type.

# Generic Method
![](IMG-20251214141124409.png)
Using a generic method require no special syntax, the compiler will deduce the type automatically.

## Type Upper Bounds
![](IMG-20251214141124441.png)
The `extends` here is just used as the fact of `K` is subclass of `Comparable`, not defining `K` and require `K` to implements all the methods `Comparable` has.  
Also, it will not change how `K` functions.

# Summary
![](IMG-20251214141124466.png)

