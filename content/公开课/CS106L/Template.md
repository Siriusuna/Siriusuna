[[Generic]] in cpp.
![[IMG-20251214150154137.png]]

![[IMG-20251214150154192.png]]

# How to Deal with Ambiguity?
- 1
```cpp
auto [min, max] = my_minimax(std::string("A"), std::string("C-String"));
```
- 2

```cpp
auto [min, max] = my_minimax<std::string>("A", "C-String");
```

# Concept Lifting
![[IMG-20251214150154258.png]]

Example:
![[IMG-20251214150154329.png]]
Why Integer? It can't be something else?  
Let's relax this constraint!
![[IMG-20251214150154371.png]]
![[IMG-20251214150154405.png]]
![[IMG-20251214150154453.png]]
![[IMG-20251214150154509.png]]
![[IMG-20251214150154556.png]]

# Implicit Interface and Concept
A template function defines an implicit interface that each template parameter must satisfy.
![[IMG-20251214150154599.png]]
![[IMG-20251214150154644.png]]
concept:
```cpp
template <typename C, typename T>
concept IndexableContainer = requires(C c, size_t i, T val) {
    { c.size() } -> std::convertible_to<size_t>;
    { c[i] } -> std::convertible_to<T>;
    { c[i] == val } -> std::convertible_to<bool>;
};
```
![[IMG-20251214150154701.png]]

We can make it more generalized by [[Lambda and Function]]!

# Overload Resolution
![[IMG-20251214150154742.png]]

# Varadic templates