# DAG
Direct acyclic graph  
Any such graph can be topological sorted(linearization)

## DAG SPT Algorithm
![](IMG-20251214141245411.png)
(Only pick bold arrows)
![](IMG-20251214141245433.png)
![](IMG-20251214141245454.png)
![](IMG-20251214141245480.png)
![](IMG-20251214141245506.png)
Traverse in sequence, relax weight and pick a smaller one when reach a node.

# Definition
![](IMG-20251214141245534.png)

# Longest Increasing Subsequence
![](IMG-20251214141245557.png)
![](IMG-20251214141245585.png)
![](IMG-20251214141245610.png)
![](IMG-20251214141245635.png)
(Actually, we can do DAG SPT, reverse the concept of relaxation)  
But twist the problem to fit algorithm is a better choice than changing algorithm.
![](IMG-20251214141245660.png)
That is _Reduction_.
![](IMG-20251214141245683.png)

## Improvement: Without Graph
![](IMG-20251214141245711.png)

![](IMG-20251214141245755.png)
We can use results for small Q to compute results for large Q.

### Implementation
![](IMG-20251214141245778.png)
Get rid of graph:
![](IMG-20251214141245803.png)
Just compare L and K instead of considering whether there's an edge.

