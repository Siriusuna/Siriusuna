# 什么是机器学习
![[IMG-20251214150217168.png]]

## 机器学习的任务
![[IMG-20251214150217198.png]]
![[IMG-20251214150217320.png]]
![[IMG-20251214150217451.png]]

## An Example
_**Concepts:**_
- Model
- Feature
- Weight
- Bias
- Label
- Error Surface
- Learning Rate
- Hyperparameter
1. 
![[IMG-20251214150217486.png]]
2. 
![[IMG-20251214150217515.png]]
![[IMG-20251214150217543.png]]
（Loss 越大，参数越糟糕）
![[IMG-20251214150217654.png]]
3. 
![[IMG-20251214150217688.png]]
![[IMG-20251214150217718.png]]
![[IMG-20251214150217922.png]]
![[IMG-20251214150217951.png]]
![[IMG-20251214150217981.png]]

Summary：
![[IMG-20251214150218127.png]]
![[IMG-20251214150218186.png]]
- Linear Model

## Improvement
_**Concept:**_
- Model bias
- Activation Function
	- (Hard) Sigmoid
	- ReLU
- Epoch
- Update
![[IMG-20251214150218216.png]]
![[IMG-20251214150218243.png]]
![[IMG-20251214150218355.png]]
![[IMG-20251214150218388.png]]
![[IMG-20251214150218494.png]]

Constant + (Sigmoid->)Hard Sigmoid -> Piecewise Function -> Continuous Curve

**_Sigmoid 调整_**
![[IMG-20251214150218524.png]]

![[IMG-20251214150218555.png]]

_**New Model**_
![[IMG-20251214150218582.png]]

矩阵表示：
![[IMG-20251214150218711.png]]
![[IMG-20251214150218740.png]]
![[IMG-20251214150218768.png]]
![[IMG-20251214150218795.png]]
![[IMG-20251214150218916.png]]
![[IMG-20251214150218947.png]]
1. 
![[IMG-20251214150218974.png]]
2. 
![[IMG-20251214150219182.png]]
3. 
![[IMG-20251214150219213.png]]
![[IMG-20251214150219240.png]]
![[IMG-20251214150219373.png]]
![[IMG-20251214150219401.png]]
![[IMG-20251214150219429.png]]
[[Batch and Momentum]]
## More Changes
![[IMG-20251214150219457.png]]
![[IMG-20251214150219576.png]]
- Add _**Layers**_
![[IMG-20251214150219603.png]]
此即 _**神经网络**_、 _**深度学习**_
![[IMG-20251214150219631.png]]
Deep = Many hidden layers

![[IMG-20251214150219747.png]]
_**隐藏层 = 线性变换 + 激活函数**_

## Overfitting（过拟合）
![[IMG-20251214150219865.png]]


为什么要把学习变深，而不是变“胖”，只加 ReLU 之类的数量，而不加层数？
—— 后续内容

# Summary
![[IMG-20251214150219896.png]]