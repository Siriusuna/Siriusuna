# Wrapper Type
![](IMG-20251214141228775.png)
For each primitive type, there is a corresponding [reference type](公开课/CS61B/Java/Types.md) called wrapper type.

_**Auto-(Un)Boxing:**_ Implicit conversions between wrapper/primitives.
![](IMG-20251214141228815.png)

_**Notice:**_
1. Array are never autoboxed/unboxed(an Integer\[] cannot be used in place of an int\[], or vice versa)
2. Autoboxing/unboxing incurs a measurable performance impact.
3. Wrapper types use much more memory than primitive types.

# Primitive Widening

# Be Care for Ambiguous Conversion
![](IMG-20251214141228840.png)
or, call `long` version:
```java
assertEquals((long)expected, am.get(2));
```
etc
