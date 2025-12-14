# Access Control
_**Users of our class might be tempted to try to manipulate our instance in a uncouth way.**_

We can prevent programmers from making such mistakes with the `private` keyword to prevent code in other classes from using members (or constructors) of a class.

Hide implementation details from users of your class.
- Less for user of class to understand.
- Safe for you to change private methods (implementation).(Because there's nothing depend on it. So we'd better not to remove those `public` because something may rely on it.)
This is [Abstraction Barrier](Data%20Abstraction.md).

# Nested Classes
[Codes from Linked Data Structure](Linked%20Data%20Structure.md).

```java
public class SLList {
	private static class IntNode {
	    public int item;
	    public IntNode next;
	    public IntNode(int i, IntNode n) {
	        item = i;
	        next = n;
	    }
	}

	private IntNode first;

	public SLList(int x) {
		first = new IntNode(x, null);
	}
}
```
Nested Classes are useful when a class doesn't stand on its own and is obviously subordinate to another class.
- Make the nested class private if other classes should never use the nested class.

>In my opinion, probably makes sense to make `IntNode` a nested private class.
> - Hard to imagine other classes having a need to manipulate `IntNode`s.

## About Static
If the nested class never uses any instance variables or methods of the outer class, declare it static.
- Static classes cannot access _outer class's_ instance variables or methods.
- Results in a minor savings of memory.

We can declare `IntNode` static, since it never uses any of `SLList`'s instance variables or methods.  
Unimportant note: For private nested classes, access modifiers are irrelevant.


# More about Implementation in Java
Sometimes, it is tricky to write a program that do not break the abstraction barrier. We'll use a common pattern that is used with middleman classes like `SLList` -- we'll create a private helper method that interacts with the underlying naked recursive data structure.
```java
/** Returns the size of the list starting at IntNode p. */
private static int size(IntNode p) {
    if (p.next == null) {
        return 1;
    }

    return 1 + size(p.next);
}

public int size() {
    return size(first);
}
```
