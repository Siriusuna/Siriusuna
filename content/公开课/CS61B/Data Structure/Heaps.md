# Priority Queue
_**A bag that can put things in, pick things out, peek things in it but only interact with the smallest(biggest, best whatever) one is allowed.**_  
That is, when there is a queue, there always is something has higher priority and should leave as soon as possible.
# Operation
![](IMG-20251214141248597.png)

# Data Structure Used to Implement: Heaps
## Definition
![](IMG-20251214141248747.png)

## Operation
![](IMG-20251214141248865.png)

## Storage
![](IMG-20251214141248957.png)
Same to [Disjoint Set](Disjoint%20Set.md), we use array and map.  
_**But for complete binary tree, the parent will be same.(Above all, this is how it is defined)**_

So,
![](IMG-20251214141249050.png)
the parent array is discarded.  
[The map between index and location](Tree.md#^3mtu7m.md)
> Similarly, the index of parent will be `(k - 1) / 2`

## Runtime
![](IMG-20251214141249205.png)

