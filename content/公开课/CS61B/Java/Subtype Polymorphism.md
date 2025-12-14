# Polymorphism
_**Providing a single interface to entities of different types.**_

![](IMG-20251214141221662.png)

# Poly-Implements and Composition
How to compare a list of dog and find its biggest one? How about something else?
![](IMG-20251214141221725.png)
![](IMG-20251214141221773.png)

# Built-in Comparable Interface
```java
public interface Comparable<T> {
	public int compareTo(T obj);
}
```
![](IMG-20251214141221933.png)
So we can use the existed libraries.

In fact, `max()` is ready for us in library called `Collection`.
![](IMG-20251214141221979.png)
(And avoid ugly castings.)

# Comparator(HoFs)
_**From time to time, we maybe want to compare objects in different way.**_
![](IMG-20251214141222019.png)

![](IMG-20251214141222043.png)

The final codes:
![](IMG-20251214141222075.png)
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
![](IMG-20251214141222108.png)
