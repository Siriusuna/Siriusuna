# General Guide
![](IMG-20251214143830321.png)
## Large Loss in Training
![](IMG-20251214143830350.png)
![](IMG-20251214143830379.png)

### Which One?
![](IMG-20251214143830414.png)
![](IMG-20251214143830443.png)

如果是 Model Bias，那么就换成更大、更有弹性的 Model，如果是 Optimization 的问题，那么...... [When Gradient is Small](When%20Gradient%20is%20Small.md).

## Small Loss in Training
### Large Loss in Test: Overfitting
![](IMG-20251214143830482.png)
![](IMG-20251214143830512.png)
为什么更弹性的模型更容易过拟合？

#### Solution for Overfitting
1. More Training Data / Data Augmentation
![](IMG-20251214143830541.png)
2. Constrain Model
![](IMG-20251214143830570.png)
![](IMG-20251214143830596.png)
不要过度限制！否则会回到 Model Bias
![](IMG-20251214143830625.png)
![](IMG-20251214143830653.png)

#### How to Select Model
![](IMG-20251214143830681.png)
用 Cross Validation 挑选模型，不要过度关注 public Test，防止过拟合在测试上

![](IMG-20251214143830711.png)

### Mismatch
![](IMG-20251214143830742.png)

## [Loss Function May Affect](Loss%20Function%20May%20Affect.md)



# Training Tips
## [Batch and Momentum](Batch%20and%20Momentum.md)
## [Adaptive Learning Rate](Error%20Surface%20is%20Rugged.md)
## Summary
![](IMG-20251214143830771.png)
现在最常用的 Optimizer 是 Adam，但是关于衰减需要自己考虑、指定，Adam 并不包括衰减。

