# General Guide
![[IMG-20251214150220966.png]]
## Large Loss in Training
![[IMG-20251214150221083.png]]
![[IMG-20251214150221112.png]]

### Which One?
![[IMG-20251214150221236.png]]
![[IMG-20251214150221262.png]]

如果是 Model Bias，那么就换成更大、更有弹性的 Model，如果是 Optimization 的问题，那么...... [[When Gradient is Small]].

## Small Loss in Training
### Large Loss in Test: Overfitting
![[IMG-20251214150221288.png]]
![[IMG-20251214150221311.png]]
为什么更弹性的模型更容易过拟合？

#### Solution for Overfitting
1. More Training Data / Data Augmentation
![[IMG-20251214150221426.png]]
2. Constrain Model
![[IMG-20251214150221450.png]]
![[IMG-20251214150221475.png]]
不要过度限制！否则会回到 Model Bias
![[IMG-20251214150221596.png]]
![[IMG-20251214150221621.png]]

#### How to Select Model
![[IMG-20251214150221727.png]]
用 Cross Validation 挑选模型，不要过度关注 public Test，防止过拟合在测试上

![[IMG-20251214150221851.png]]

### Mismatch
![[IMG-20251214150221880.png]]

## [[Loss Function May Affect]]



# Training Tips
## [[Batch and Momentum]]
## [[Error Surface is Rugged|Adaptive Learning Rate]]
## Summary
![[IMG-20251214150221908.png]]
现在最常用的 Optimizer 是 Adam，但是关于衰减需要自己考虑、指定，Adam 并不包括衰减。

