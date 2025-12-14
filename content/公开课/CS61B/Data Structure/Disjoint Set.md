![[IMG-20251214150204777.png]]

_**This is not [[Graph]], so how it is connected does not matter.**_
# Goal
![[IMG-20251214150204806.png]]

# Structure
![[IMG-20251214150204908.png]]

# Implementation

## Quick Find Variant
![[IMG-20251214150204937.png]]

![[IMG-20251214150204965.png]]
`find` and `isConnected` is very fast while `connect` is slow.

# Quick Union Variant
![[IMG-20251214150204991.png]]

![[IMG-20251214150205018.png]]
Defect: When tree is too tall, it may cost lots of time to `find`.

## Weighted(Ranked) Quick Union Variant
Link the smaller below the larger tree by _**tracking the tree size**_.

![[IMG-20251214150205045.png]]

Improvement:
![[IMG-20251214150205073.png]]
That is: when we link two tree, the depth of the node of tree incorporated will increase one. So what we need to do is incorporate the smaller one, lessening the increase of depth.

![[IMG-20251214150205200.png]]
_**Attention:**_ In addition to weight(size), the height can also be rank, but the runtime is almost same and weight is more easy.

## Path Compression
![[IMG-20251214150205228.png]]

![[IMG-20251214150205256.png]]

The change: `find`
![[IMG-20251214150205283.png]]


# Summary
![[IMG-20251214150205307.png]]

![[IMG-20251214150205333.png]]