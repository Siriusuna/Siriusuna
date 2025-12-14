# Types
![](IMG-20251214141246401.png)

_**Dense and sparse**_:
![](IMG-20251214141246432.png)
![](IMG-20251214141246461.png)

# Terminology
![](IMG-20251214141246493.png)

# Problems
![](IMG-20251214141246532.png)

# API
![](IMG-20251214141246561.png)

# Representation
## Adjacency Matrix
![](IMG-20251214141246589.png)

## Adjacency List
![](IMG-20251214141246635.png)

## Runtime
![](IMG-20251214141246660.png)
(In fact, the runtime of `for(w : adj(v))` in adjacency list is `theta(E)`)

# Implementation
![](IMG-20251214141246693.png)

# Traversal
## Kinds
![](IMG-20251214141246722.png)
## Depth-First
![](IMG-20251214141246753.png)
![](IMG-20251214141246786.png)
![](IMG-20251214141246827.png)
![](IMG-20251214141246860.png)
![](IMG-20251214141246890.png)

### Topological Sort
![](IMG-20251214141246944.png)
In fact, it's not a must that start from vertex with indegree 0, it's OK from any vertex as long as every vertex is visited in the last.

---
## 利用 DFS 的「三色标记法」/「递归栈」
我们通常给每个节点维护一个 **访问状态**，常见的有三种：
- **0 = 未访问**（white）
- **1 = 正在访问（在递归栈中）**（gray）
- **2 = 已完成访问**（black）
### 具体规则：
1. 如果 DFS 到一个未访问的点，就继续递归。
2. 如果 DFS 碰到一个「正在访问」的点（即还没回溯完），说明形成了 **回边**，即有环。
3. 如果 DFS 碰到一个「已完成」的点，说明已经拓扑排序过了，直接跳过。
---
Example:
![](IMG-20251214141247003.png)
方法二：Kahn 算法 
4. 初始化：计算所有顶点的入度，将入度为 0 的顶点加入队列（作为起点）。
5. 迭代：从队列中取出一个入度为 0 的顶点，将其加入排序结果；然后减少其所有邻接顶点的入度，若邻接顶点入度变为 0，则加入队列。
6. 重复步骤 2，直至所有顶点被处理（若图中存在环，则无法完成排序）。

![](IMG-20251214141247052.png)
Not a ordering sort like quick sort.
#### Implementation
![](IMG-20251214141247100.png)

### Comparison
![](IMG-20251214141247167.png)

## Breadth-First
![](IMG-20251214141247200.png)
Handy for finding shortest paths.
### Implementation
![](IMG-20251214141247235.png)

# The Shortest Path
We will get a tree which contains the shortest way to every reachable vertex from source.
## The Dijkstra Algorithm
![](IMG-20251214141247267.png)
If there's a graph with V vertices and w edges and every vertex is reachable, there will be V-1 edges in the shortest path tree.

### Implementation
#### Relaxation: 
_**Use it if better.**_
**松弛操作**指的是：对于图中的一条边 `(u, v)`（从节点`u`到节点`v`），如果当前已知从起点到`v`的距离，大于 “从起点到`u`的距离 + 边`(u, v)`的权重”，则更新 “起点到`v`的距离” 为后者。  
简单说，就是**检查是否能通过中转节点`u`，找到一条到`v`的更短路径，如果可以就更新路径长度**。  
例如：
- 假设当前起点到`v`的距离是 10，
- 起点到`u`的距离是 3，边`u→v`的权重是 5，
- 那么通过`u`到`v`的总距离是 3+5=8，小于 10，此时就 “松弛” 这条路径，将起点到`v`的距离更新为 8。

#### Best-First
Visit vertices in order of best-known distance from source, relaxing each edge from the visited vertex.

If a node is selected by best-first and added in the result array, it will never be changed.

## Fringe(PQ)
Maintain a heap(PQ) to find the closest vertex, so that we will not waste our time to search for `distTo` array.
![](IMG-20251214141247309.png)

## Pseudocode
![](IMG-20251214141247354.png)
![](IMG-20251214141247410.png)
(pq is fringe)

## Runtime
![](IMG-20251214141247478.png)
![](IMG-20251214141247531.png)
也就是说，对于松弛操作，由于更改距离后要维护堆，堆优化的时间从E变成了Elog(V)，因此对于稠密图，松弛次数多，会浪费时间。

## Navigation(A*)
![](IMG-20251214141247598.png)
![](IMG-20251214141247659.png)
In this example, we can use the straight distance between two city as `h`.  
It does not change the algorithm but use `h + distTo` instead of only `dist`.

Wrong heuristic will lead to wrong path.
![](IMG-20251214141247681.png)
_**So we should set `h(v) <= actual distance from v to destination`**_
![](IMG-20251214141247762.png)
![](IMG-20251214141247781.png)

# The Minimum Spanning Trees
_**Cycle:**_
![](IMG-20251214141247866.png)
See in Kruskal

## Definition
![](IMG-20251214141247898.png)

## MST VS SPT
![](IMG-20251214141248024.png)

## Implementation
### Prim's Algorithm
#### Cut Property
![](IMG-20251214141248133.png)
Proof:
![](IMG-20251214141248160.png)


![](IMG-20251214141248252.png)
(According to cut property, if there's cross edges with same weight, at least one in the MST, and _maybe_ MST is not unique.)

#### Improvement: PQ
![](IMG-20251214141248271.png)
![](IMG-20251214141248364.png)
![](IMG-20251214141248383.png)
![](IMG-20251214141248517.png)
![](IMG-20251214141248541.png)
So that we can consider less edges possible to be added.

Comparison:
![](IMG-20251214141248670.png)
![](IMG-20251214141248694.png)
![](IMG-20251214141248823.png)

### Pseudocode
![](IMG-20251214141248922.png)
![](IMG-20251214141249014.png)

### Runtime
![](IMG-20251214141249102.png)

### Kruskal's Algorithm
![](IMG-20251214141249123.png)
Data structure: PQ, WQU
![](IMG-20251214141249272.png)
![](IMG-20251214141249363.png)
![](IMG-20251214141249416.png)
![](IMG-20251214141249452.png)
![](IMG-20251214141249508.png)

Principle:
![](IMG-20251214141249563.png)
#### Pseudocode
![](IMG-20251214141249603.png)
#### Runtime
![](IMG-20251214141249651.png)

## Summary
![](IMG-20251214141249721.png)
