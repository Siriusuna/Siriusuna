# L-Value and R-Value
![[IMG-20251214150149887.png]]
![[IMG-20251214150149964.png]]

![[IMG-20251214150149997.png]]
![[IMG-20251214150150036.png]]
![[IMG-20251214150150083.png]]

# Move Semantics
![[IMG-20251214150150120.png]]
## Move Constructor
![[IMG-20251214150150153.png]]
![[IMG-20251214150150188.png]]
![[IMG-20251214150150229.png]]
_**When possible, steal it rather than copying.**_

## Move Assignment
[[Operator Overloading|Another `=` overloading.]]

![[IMG-20251214150150278.png]]
![[IMG-20251214150150312.png]]
_**Still imperfect, it does some copy, with `=`**_
![[IMG-20251214150150354.png]]
L-Value! It has name and identity. Although `rhs` is a R-Value reference, but the variable `rhs` itself is a L-Value.
![[IMG-20251214150150388.png]]

## The Final Code:
![[IMG-20251214150150424.png]]

# Summary: Rules
![[IMG-20251214150150454.png]]
![[IMG-20251214150150502.png]]
# More Modern
![[IMG-20251214150150575.png]]
![[IMG-20251214150150610.png]]

# Universal Reference
![[IMG-20251214150150645.png]]