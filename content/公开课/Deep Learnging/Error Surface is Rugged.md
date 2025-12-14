# 问题
![[IMG-20251214150216338.png]]
事实上，用一般的 Gradient Descent 方法，我们的训练往往走不到 Critical Point 就停止了。

学习率大了，步子太大，震荡；学习率小了，步子太小，训练不动
![[IMG-20251214150216365.png]]

因此要客制化 Learning Rate！

![[IMG-20251214150216394.png]]
$\sigma_{i}^{t}$ 代表其是由参数和迭代次数决定的。

# 计算方法
## 均方根：Adagrad
![[IMG-20251214150216511.png]]

![[IMG-20251214150216537.png]]

但是仍需要改进，就算是同一个参数，需要的 Learning Rate 也会因为 Gradient 大小改变而需要改变。
![[IMG-20251214150216564.png]]

## RMSProp
![[IMG-20251214150216697.png]]
我们可以自己决定算出来的 $\sigma$ 权重的占比，让他更看重最近新算出来的 Gradient
![[IMG-20251214150216723.png]]

## Adam = [[#RMSProp|RMSProp]] + [[Batch and Momentum|Momentum]]
![[IMG-20251214150216832.png]]

# Example
![[IMG-20251214150216863.png]]
爆炸是因为 $\sigma$ 过小，导致更新较大

可以依靠 _**Learning Rate Scheduling**_ 解决
- Learning Rate Decay
![[IMG-20251214150216985.png]]
- Warm Up
![[IMG-20251214150217010.png]]
![[IMG-20251214150217036.png]]
一个可能的原因是，由于 $\sigma$ 是一个统计数据，一开始并不准确，所以需要先缓慢移动，探索、收集数据，然后再逐步提升学习率，开始快速优化、Decay

