# L-Value and R-Value
![](IMG-20251214143540250.png)
![](IMG-20251214143540280.png)

![](IMG-20251214143540308.png)
![](IMG-20251214143540341.png)
![](IMG-20251214143540372.png)

# Move Semantics
![](IMG-20251214143540411.png)
## Move Constructor
![](IMG-20251214143540440.png)
![](IMG-20251214143540468.png)
![](IMG-20251214143540494.png)
_**When possible, steal it rather than copying.**_

## Move Assignment
[Another `=` overloading.](Operator%20Overloading.md)

![](IMG-20251214143540537.png)
![](IMG-20251214143540569.png)
_**Still imperfect, it does some copy, with `=`**_
![](IMG-20251214143540598.png)
L-Value! It has name and identity. Although `rhs` is a R-Value reference, but the variable `rhs` itself is a L-Value.
![](IMG-20251214143540625.png)

## The Final Code:
![](IMG-20251214143540654.png)

# Summary: Rules
![](IMG-20251214143540687.png)
![](IMG-20251214143540717.png)
# More Modern
![](IMG-20251214143540748.png)
![](IMG-20251214143540777.png)

# Universal Reference
![](IMG-20251214143540808.png)