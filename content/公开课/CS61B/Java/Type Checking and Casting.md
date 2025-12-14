# Type Checking
_**Compiler allows method calls and assignments based on compile-time type of variable.**_  
So if we define a variable with the name of its superclass, and we call its unique method, compiling will fail.  
Same as above, if we straightly assign `sl` to `vsl2`, it will not work, although they have same dynamic type.
![[IMG-20251214150214896.png]]

Expressions has compile-time type!
![[IMG-20251214150214922.png]]
A compile-time type of a function is the type of its return value.  
> But in run-time, the type could be its subclass, which is called covariant return types.
> So when coding, the return type could be the subclass but parameters should be the same, it also perceive as override. 

^hln5l8
![[IMG-20251214150214947.png]]

# Casting
_**Java has a special syntax for forcing the compile-time type of any expression.**_
![[IMG-20251214150214971.png]]
"A way to trick the compiler":  
If at runtime, the type is not right(e.g We try to cast a Malamute to a poodle), program will crush.
