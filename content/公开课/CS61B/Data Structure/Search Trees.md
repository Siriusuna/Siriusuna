List -> Tree
# Representation of Tree
![[IMG-20251214150210531.png]]
![[IMG-20251214150210561.png]]
![[IMG-20251214150210586.png]]

# Categories
![[IMG-20251214150210611.png]]

# Binary Search Tree(BST)
## Definition
1. BSTs are [[Trees]] with **some property**.
![[IMG-20251214150210634.png]]
![[IMG-20251214150210661.png]]
![[IMG-20251214150210687.png]]

## Runtime: log N

## Method
### `search`
### `insert`
![[IMG-20251214150210789.png]]
![[IMG-20251214150210818.png]]
(A common rookie bad habit to avoid)
### `delete`
- No child: delete it.
- One child: delete it, and link its child to its parent.
- Two child:
![[IMG-20251214150210847.png]]
Find its precursor or successor in in-order.(The biggest one in left child tree _(has no right child)_ or smallest one in right child tree _(has no left child)_)
![[IMG-20251214150210872.png]]

## Red-Black Trees
_**Isometric with a 2-3 tree**_
![[IMG-20251214150210898.png]]
![[IMG-20251214150210924.png]]

# Balanced Search Tree
## Tree Rotation
![[IMG-20251214150210949.png]]

## B-Tree
_**Balanced and no require rotations.**_
![[IMG-20251214150210976.png]]
![[IMG-20251214150211097.png]]
![[IMG-20251214150211127.png]]
![[IMG-20251214150211165.png]]
![[IMG-20251214150211190.png]]



![[IMG-20251214150211215.png]]
M is the number of children a node could have and M-1 is the item cap.  
(For M = 4, 2-3-4 Tree; For M = 3, 2-3 Tree)  
A B-Tree of order n is a tree whose M = n.


# [[Traversal]]


