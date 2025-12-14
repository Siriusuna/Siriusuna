# Why Use Iterators
![[IMG-20251214150147917.png]]

![[IMG-20251214150147959.png]]
![[IMG-20251214150148030.png]]

# Common Functions
## begin
![[IMG-20251214150148098.png]]
`set<int>::iterator iter = mySet.begin();`

## *
![[IMG-20251214150148152.png]]

# ++
![[IMG-20251214150148220.png]]
Prefix and postfix are both OK. Same as the primitive value, same as the pointer, etc.
# end
![[IMG-20251214150148266.png]]

# Usage
![[IMG-20251214150148308.png]]

# Why it Powerful
![[IMG-20251214150148366.png]]
![[IMG-20251214150148425.png]]

# Map Iterator
![[IMG-20251214150148483.png]]
## Pair
![[IMG-20251214150148524.png]]

# Further Usage
![[IMG-20251214150148559.png]]
- `find`
- `lower_bound`: returns an iterator to the first element _not less_ than the given key 
- `upper_bound`: returns an iterator to the first element _greater_ than the given key
![[IMG-20251214150148594.png]]
![[IMG-20251214150148664.png]]
![[IMG-20251214150148714.png]]
- range based for loop
![[IMG-20251214150148753.png]]

# Iterator Type
![[IMG-20251214150148784.png]]
But some can't, e.g. list.

![[IMG-20251214150148821.png]]
![[IMG-20251214150148863.png]]
- input
![[IMG-20251214150148900.png]]
![[IMG-20251214150148937.png]]
- output
![[IMG-20251214150148974.png]]
![[IMG-20251214150149011.png]]
- forward
![[IMG-20251214150149059.png]]
![[IMG-20251214150149104.png]]
- Bidirectional
![[IMG-20251214150149139.png]]
![[IMG-20251214150149181.png]]
- Random
![[IMG-20251214150149221.png]]
![[IMG-20251214150149290.png]]

# Invalidate
![[IMG-20251214150149336.png]]
![[IMG-20251214150149374.png]]
All STL can be erased in this way.

# Stream Iterator
![[IMG-20251214150149423.png]]
