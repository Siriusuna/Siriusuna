# Batch
- Shuffle: 使得每次 Batch 内含有的资料，在每一个 epoch 都不一样
![](IMG-20251214143759901.png)

# Why Batch?
![](IMG-20251214143759957.png)

但是时间消耗也不尽如此。
![](IMG-20251214143759995.png)
由于 GPU 的平行计算能力一定范围内，小的 Batch size 可能花费更久的时间。
![](IMG-20251214143800043.png)

那么大的 Batch 更好吗？并非，Noisy 的 Gradient 可能帮助 Optimization 取得更好效果。
![](IMG-20251214143800073.png)

为什么？

![](IMG-20251214143800115.png)

并且，小的 Batch 有利于 Testing 哦！
![](IMG-20251214143800142.png)
小的 Batch 可以防止走到不好的 Sharp Minima，导致由于测试和训练样本的偏差，产生非常坏的结果。

![](IMG-20251214143800169.png)
![](IMG-20251214143800197.png)

# Momentum
一般的梯度下降：
![](IMG-20251214143800224.png)

加上 Momentum
![](IMG-20251214143800253.png)
$$
\begin{aligned}
m^0 &= 0, \\
m^t &= \lambda m^{t-1} - \eta g^{t-1}, \\
\theta^t &= \theta^{t-1} + m^t
\end{aligned}
$$
也就是考虑过去所有 Gradient 的总和。
![](IMG-20251214143800280.png)

# Summary
![](IMG-20251214143800307.png)
