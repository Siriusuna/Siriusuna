# Critical Point
![](IMG-20251214143836290.png)

## Which One?
![](IMG-20251214143836322.png)
 ![](IMG-20251214143836352.png)
 ![](IMG-20251214143836398.png)

### If Saddle Point
![](IMG-20251214143836420.png)
找出负的 Eigen vector，沿这个 Eigen vector 的方向更新即可

_**Example:**_
![](IMG-20251214143836449.png)
![](IMG-20251214143836477.png)
![](IMG-20251214143836505.png)
（但是运算量大，实际很少用，还有别的办法）

# About Local Minima
![](IMG-20251214143836534.png)
Yes!
![](IMG-20251214143836565.png)
实际 Local Minima 并没有那么常见，很多时候我们是卡在了一个 Saddle Point

# More Solutions
[Batch and Momentum](Batch%20and%20Momentum.md)
- 在优化过程中，鞍点可以通过 Hessian 矩阵的特征值分析来识别：若 Hessian 同时具有正负特征值，则该点为鞍点。理论上，可以根据负特征值对应的方向调整优化方向（例如牛顿法中利用二阶信息），但由于 Hessian 的计算与存储代价极高，深度学习中通常不直接使用。实践中，mini-batch 的随机噪声与 momentum 等方法能够在一定程度上帮助优化器跳出鞍点和平坦区域。