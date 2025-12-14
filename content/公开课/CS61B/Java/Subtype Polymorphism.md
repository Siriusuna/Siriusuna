# Polymorphism
_**Providing a single interface to entities of different types.**_

![[IMG-20251214150214285.png]]

# Poly-Implements and Composition
How to compare a list of dog and find its biggest one? How about something else?
![[IMG-20251214150214313.png]]
![[IMG-20251214150214340.png]]

# Built-in Comparable Interface
```java
public interface Comparable<T> {
	public int compareTo(T obj);
}
```
![[IMG-20251214150214454.png]]
So we can use the existed libraries.

In fact, `max()` is ready for us in library called `Collection`.
![[IMG-20251214150214481.png]]
(And avoid ugly castings.)

# Comparator(HoFs)
_**From time to time, we maybe want to compare objects in different way.**_
![[IMG-20251214150214506.png]]

![[IMG-20251214150214629.png]]

The final codes:
![[IMG-20251214150214655.png]]
Or, more like Java code:
```java
import java.util.Comparator;

public class Dog implements Comparable<Dog> {
	···
	private static class NameComparator implements Comparator<Dog> {
		···
	}

	public Comparator<Dog> getNameComparator() {
		return new NameComparator();
	}
	···
}

···

Comparator<Dog> nc = Dog.getNameComparator();

···
```

# Callback
![[IMG-20251214150214759.png]]
