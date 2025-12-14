# DAG
Direct acyclic graph  
Any such graph can be topological sorted(linearization)

## DAG SPT Algorithm
![[IMG-20251214150205357.png]]
(Only pick bold arrows)
![[IMG-20251214150205382.png]]
![[IMG-20251214150205485.png]]
![[IMG-20251214150205511.png]]
![[IMG-20251214150205538.png]]
Traverse in sequence, relax weight and pick a smaller one when reach a node.

# Definition
![[IMG-20251214150205562.png]]

# Longest Increasing Subsequence
![[IMG-20251214150205587.png]]
![[IMG-20251214150205611.png]]
![[IMG-20251214150205636.png]]
![[IMG-20251214150205739.png]]
(Actually, we can do DAG SPT, reverse the concept of relaxation)  
But twist the problem to fit algorithm is a better choice than changing algorithm.
![[IMG-20251214150205765.png]]
That is _Reduction_.
![[IMG-20251214150205792.png]]

## Improvement: Without Graph
![[IMG-20251214150205816.png]]

![[IMG-20251214150205842.png]]
We can use results for small Q to compute results for large Q.

### Implementation
![[IMG-20251214150205866.png]]
Get rid of graph:
![[IMG-20251214150205890.png]]
Just compare L and K instead of considering whether there's an edge.

