# 什么是机器学习
![](IMG-20251214143810773.png)

## 机器学习的任务
![](IMG-20251214143810803.png)
![](IMG-20251214143810836.png)
![](IMG-20251214143810873.png)

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
![](IMG-20251214143810907.png)
2. 
![](IMG-20251214143810938.png)
![](IMG-20251214143810967.png)
（Loss 越大，参数越糟糕）
![](IMG-20251214143810997.png)
3. 
![](IMG-20251214143811031.png)
![](IMG-20251214143811059.png)
![](IMG-20251214143811090.png)
![](IMG-20251214143811125.png)
![](IMG-20251214143811150.png)

Summary：
![](IMG-20251214143811181.png)
![](IMG-20251214143811222.png)
- Linear Model

## Improvement
_**Concept:**_
- Model bias
- Activation Function
	- (Hard) Sigmoid
	- ReLU
- Epoch
- Update
![](IMG-20251214143811250.png)
![](IMG-20251214143811302.png)
![](IMG-20251214143811330.png)
![](IMG-20251214143811370.png)
![](IMG-20251214143811397.png)

Constant + (Sigmoid->)Hard Sigmoid -> Piecewise Function -> Continuous Curve

**_Sigmoid 调整_**
![](IMG-20251214143811438.png)

![](IMG-20251214143811475.png)

_**New Model**_
![](IMG-20251214143811513.png)

矩阵表示：
![](IMG-20251214143811547.png)
![](IMG-20251214143811583.png)
![](IMG-20251214143811612.png)
![](IMG-20251214143811648.png)
![](IMG-20251214143811683.png)
![](IMG-20251214143811719.png)
1. 
![](IMG-20251214143811759.png)
2. 
![](IMG-20251214143811792.png)
3. 
![](IMG-20251214143811827.png)
![](IMG-20251214143811865.png)
![](IMG-20251214143811904.png)
![](IMG-20251214143811935.png)
![](IMG-20251214143812080.png)
[Batch and Momentum](Batch%20and%20Momentum.md)
## More Changes
![](IMG-20251214143812137.png)
![](IMG-20251214143812173.png)
- Add _**Layers**_
![](IMG-20251214143812206.png)
此即 _**神经网络**_、 _**深度学习**_
![](IMG-20251214143812241.png)
Deep = Many hidden layers

![](IMG-20251214143812273.png)
_**隐藏层 = 线性变换 + 激活函数**_

## Overfitting（过拟合）
![](IMG-20251214143812308.png)


为什么要把学习变深，而不是变“胖”，只加 ReLU 之类的数量，而不加层数？
—— 后续内容

# Summary
![](IMG-20251214143812342.png)