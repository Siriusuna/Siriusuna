![](IMG-20251214141244315.png)

_**This is not [Graph](Graph.md), so how it is connected does not matter.**_
# Goal
![](IMG-20251214141244340.png)

# Structure
![](IMG-20251214141244358.png)

# Implementation

## Quick Find Variant
![](IMG-20251214141244385.png)

![](IMG-20251214141244413.png)
`find` and `isConnected` is very fast while `connect` is slow.

# Quick Union Variant
![](IMG-20251214141244447.png)

![](IMG-20251214141244473.png)
Defect: When tree is too tall, it may cost lots of time to `find`.

## Weighted(Ranked) Quick Union Variant
Link the smaller below the larger tree by _**tracking the tree size**_.

![](IMG-20251214141244497.png)

Improvement:
![](IMG-20251214141244523.png)
That is: when we link two tree, the depth of the node of tree incorporated will increase one. So what we need to do is incorporate the smaller one, lessening the increase of depth.

![](IMG-20251214141244549.png)
_**Attention:**_ In addition to weight(size), the height can also be rank, but the runtime is almost same and weight is more easy.

## Path Compression
![](IMG-20251214141244573.png)

![](IMG-20251214141244600.png)

The change: `find`
![](IMG-20251214141244644.png)


# Summary
![](IMG-20251214141244670.png)

![](IMG-20251214141244702.png)