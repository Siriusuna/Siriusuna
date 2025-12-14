# [Mutable Variable](Mutable%20Variable.md), [Mutable Function](Mutable%20Function.md)

_**An immutable data type is one for which an instance cannot change in any observable way after instantiation.**_

Example:
- Mutable: ArrayDeque
- Immutable: Integer, String

**The `final` keyword will help the compiler ensure immutability.(But not necessary to have `final` to be immutable, maybe just there is no code, no method, etc. to change this value)**
![](IMG-20251214141130636.png)

(Month, day, year is `final` and contrived is private and no method to changes in outside nor inside)

_**Warning: Declaring a reference as `final` does not make object immutable.**_  
Example: `public final ArrayDeque<String> d = new ArrayDeque<>()`  
The `d` variable can never change, but the referenced deque can!  
_**Just like pointer constant in C:**_ `int * const p`
