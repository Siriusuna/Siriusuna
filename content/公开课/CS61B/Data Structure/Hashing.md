# Using Data as Index
![[IMG-20251214150208924.png]]

# Implementation
## Prototype
![[IMG-20251214150208952.png]]
## Advance
### Generalizing to Other Than Integer
#### Method:（二进制编码法）
![[IMG-20251214150208977.png]]
Perceiving strings as a number with base 27(because of 26 letters)
###### Improvement
![[IMG-20251214150209000.png]]

![[IMG-20251214150209102.png]]
![[IMG-20251214150209129.png]]

#### Problem
![[IMG-20251214150209168.png]]

##### Handling Collisions
![[IMG-20251214150209194.png]]
![[IMG-20251214150209220.png]]
(Buckets)

Modulo primes:[为什么哈希函数要模质数](https://www.cnblogs.com/cryingrain/p/11144225.html)
[What if modulo a negative number?](https://www.doubao.com/chat/collection/59869219752463?type=Thread)

_**Runtime:**_
![[IMG-20251214150209245.png]]
![[IMG-20251214150209270.png]]
![[IMG-20251214150209373.png]]

# Hash Table
![[IMG-20251214150209403.png]]
`Math.floorMod` is more recommended because it can handle negative `hashCode`.
![[IMG-20251214150209431.png]]

# Hash Function
[31 is usually used.](https://www.doubao.com/chat/collection/16134957978791938?type=Thread)
![[IMG-20251214150209456.png]]
![[IMG-20251214150209481.png]]
![[IMG-20251214150209507.png]]

![[IMG-20251214150209532.png]]
[Why `hashCode` must be overridden before `equals`?](https://www.doubao.com/chat/collection/58131868468495?type=Thread)
