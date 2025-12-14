![](IMG-20251213231152495.png)
![](IMG-20251213231152699.png)
## An Example
![](IMG-20251213231153855.png)
[Implementation of `method_missing` in Ruby](https://www.doubao.com/chat/collection/21359509812961026?type=Thread)
# Open Classes in Ruby (Reopen a Class)
![](IMG-20251213231154993.png)

# [Iteration](Iteration.md)
![](IMG-20251213231156052.png)
_**Iterator allows objects to manage their own traversal.**_
# Some Thought of Functional Programming
![](IMG-20251213231156944.png)
When we write Ruby, `a.b.c.d`, we actually call method b to object a and return a value perceived as expression and evaluated to another object to call method c... so forth.
Just like what we do at [Scheme](Programs%20as%20Data.md).

Methods calling always do not modify object except those end with `!`, that also reflects the thought of without side-effects.

# Duck Typing
_**Ruby emphasizes "What methods do you respond to" over "What class do you belong to"**_

## Module
A bit like interface in Java, but more handy and useful.
![](IMG-20251213231157874.png)
Ruby provides a lot of useful functionality to already do the work you need to do. Your job is to do the least amount of new work possible to get the functionality you need. 

When you have behaviors you want to reuse, you can put them into a module. That module can be mixed into many classes as long as you make clear what does the module expect from the classes that you're mixing it into.

If you want to reuse implementation, then you'd use the traditional thing. Classes have ancestors, they have sub-classes.

![](IMG-20251213231158701.png)
# Closure and Metaprogramming
## Block (Lambda and FP)
![](IMG-20251213231159508.png)
![](IMG-20251213231200423.png)
### [Yield](Iteration.md), Block and Closure(Set of All the Variable bindings Can be Seen at Given Time([Environment](Environment.md)))

`yield` means transfer the control back to the thing that called me because it has a block waiting for me.
![](IMG-20251213231200980.png)
![](IMG-20251213231201959.png)
![](IMG-20251213231203027.png)
(btw, iterator is only one of usages of `yield`)
# Summary
![](IMG-20251213231203934.png)
