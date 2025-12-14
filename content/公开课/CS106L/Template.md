[Generic](Generic.md) in cpp.
![](IMG-20251213231201593.png)

![](IMG-20251213231202775.png)

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
![](IMG-20251213231203783.png)

Example:
![](IMG-20251213231204653.png)
Why Integer? It can't be something else?  
Let's relax this constraint!
![](IMG-20251213231205439.png)
![](IMG-20251213231206250.png)
![](IMG-20251213231207298.png)
![](IMG-20251213231208242.png)
![](IMG-20251213231209098.png)

# Implicit Interface and Concept
A template function defines an implicit interface that each template parameter must satisfy.
![](IMG-20251213231209778.png)
![](IMG-20251213231210269.png)
concept:
```cpp
template <typename C, typename T>
concept IndexableContainer = requires(C c, size_t i, T val) {
    { c.size() } -> std::convertible_to<size_t>;
    { c[i] } -> std::convertible_to<T>;
    { c[i] == val } -> std::convertible_to<bool>;
};
```
![](IMG-20251213231210748.png)

We can make it more generalized by [Lambda and Function](Lambda%20and%20Function.md)!

# Overload Resolution
![](IMG-20251213231211110.png)

# Varadic templates