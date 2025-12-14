List -> Tree
# Representation of Tree
![](IMG-20251214141250786.png)
![](IMG-20251214141250825.png)
![](IMG-20251214141250855.png)

# Categories
![](IMG-20251214141250891.png)

# Binary Search Tree(BST)
## Definition
1. BSTs are [Trees](Trees.md) with **some property**.
![](IMG-20251214141250917.png)
![](IMG-20251214141250980.png)
![](IMG-20251214141251016.png)

## Runtime: log N

## Method
### `search`
### `insert`
![](IMG-20251214141251042.png)
![](IMG-20251214141251079.png)
(A common rookie bad habit to avoid)
### `delete`
- No child: delete it.
- One child: delete it, and link its child to its parent.
- Two child:
![](IMG-20251214141251103.png)
Find its precursor or successor in in-order.(The biggest one in left child tree _(has no right child)_ or smallest one in right child tree _(has no left child)_)
![](IMG-20251214141251135.png)

## Red-Black Trees
_**Isometric with a 2-3 tree**_
![](IMG-20251214141251166.png)
![](IMG-20251214141251194.png)

# Balanced Search Tree
## Tree Rotation
![](IMG-20251214141251230.png)

## B-Tree
_**Balanced and no require rotations.**_
![](IMG-20251214141251261.png)
![](IMG-20251214141251295.png)
![](IMG-20251214141251364.png)
![](IMG-20251214141251446.png)
![](IMG-20251214141251496.png)



![](IMG-20251214141251540.png)
M is the number of children a node could have and M-1 is the item cap.  
(For M = 4, 2-3-4 Tree; For M = 3, 2-3 Tree)  
A B-Tree of order n is a tree whose M = n.


# [Traversal](Traversal.md)


