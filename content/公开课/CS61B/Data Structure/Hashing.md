# Using Data as Index
![](IMG-20251214141247490.png)

# Implementation
## Prototype
![](IMG-20251214141247572.png)
## Advance
### Generalizing to Other Than Integer
#### Method:（二进制编码法）
![](IMG-20251214141247636.png)
Perceiving strings as a number with base 27(because of 26 letters)
###### Improvement
![](IMG-20251214141247736.png)

![](IMG-20251214141247819.png)
![](IMG-20251214141247831.png)

#### Problem
![](IMG-20251214141247973.png)

##### Handling Collisions
![](IMG-20251214141248093.png)
![](IMG-20251214141248200.png)
(Buckets)

Modulo primes:[为什么哈希函数要模质数](https://www.cnblogs.com/cryingrain/p/11144225.html)
[What if modulo a negative number?](https://www.doubao.com/chat/collection/59869219752463?type=Thread)

_**Runtime:**_
![](IMG-20251214141248212.png)
![](IMG-20251214141248311.png)
![](IMG-20251214141248324.png)

# Hash Table
![](IMG-20251214141248451.png)
`Math.floorMod` is more recommended because it can handle negative `hashCode`.
![](IMG-20251214141248469.png)

# Hash Function
[31 is usually used.](https://www.doubao.com/chat/collection/16134957978791938?type=Thread)
![](IMG-20251214141248634.png)
![](IMG-20251214141248793.png)
![](IMG-20251214141248888.png)

![](IMG-20251214141248987.png)
[Why `hashCode` must be overridden before `equals`?](https://www.doubao.com/chat/collection/58131868468495?type=Thread)
