[Logisim 使用教程 - Digital Lab 2024](https://soc.ustc.edu.cn/Digital/2024/lab0/logisim/)  
[The Guide to Being a Logisim User](https://www.cburch.com/logisim/docs/2.7/en/html/guide/index.html)  
# 文件组成
在 Logisim 中，项目以电路库的形式呈现。`电路库` 是一个抽象的概念，它表示具有特定功能的电路资源的集合。

为了便于大家的理解，我们可以用 C 语言的项目结构类比 Logisim 中的项目结构。一般来说，每个 Logisim 项目都对应一个 .circ 文件，包含了整个项目中所用到的电路文件。每个电路文件对应一种特定的模块功能，由若干不同的电路元件构成，而电路文件本身也可以被封装成一个电路元件。除了用户自定义的电路文件，Logisim 项目中还会提供一些自带的组件，用户也可以自行添加相应的内部组件与外部组件。

# 快捷键
![[IMG-20251214150224428.png]]
