# [Iteration](Iteration.md)
# The Enhanced For Loop
![](IMG-20251214141133653.png)
The enhanced for loop is the shorthand of define a iterator and iterate it.

# Implementing an Iterator

## Two Interfaces
- `Iterable`:
![](IMG-20251214141133693.png)
- `Iterator`
![](IMG-20251214141133722.png)

Example:
![](IMG-20251214141133749.png)
But we did not implement `Iterator` and `Iterable` interface, for-each will not work.
![](IMG-20251214141133781.png)
And `KeyIterator` should `implements` `Iterator`.
