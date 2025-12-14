# 数据类型

头文件：`<QtTypes>` in `<QtGlobal>`

![](IMG-20251214140712321.png)
![](IMG-20251214140712421.png)

# Log 调试
![](IMG-20251214140712608.png)
![](IMG-20251214140712767.png)

# Qt 字符串
# `QByteArray`
![](IMG-20251214140712790.png)
![](IMG-20251214140712956.png)
![](IMG-20251214140713102.png)
![](IMG-20251214140713215.png)
![](IMG-20251214140713303.png)

## `QString`
![](IMG-20251214140713409.png)
- 方法和 `QByteArray` 大同小异
- 查找替换多了大小写敏感性参数
![](IMG-20251214140713528.png)
- 内带编码格式

## 格式化
![](IMG-20251214140713634.png)
![](IMG-20251214140713752.png)
![](IMG-20251214140713767.png)
![](IMG-20251214140713856.png)

# `QVariant`
![](IMG-20251214140713938.png)
![](IMG-20251214140714023.png)
![](IMG-20251214140714044.png)
-  `q.canConvert<int>();`
![](IMG-20251214140714134.png)
- `q.value<>()`
## 自定义类
要想装在 `QVariant` 里，要 `Q_DECLARE_METATYPE`
![](IMG-20251214140714150.png)

# 位置与尺寸
## `QPoint`
![](IMG-20251214140714221.png)
- `[static]: dotProduct()`

# `QLine`
![](IMG-20251214140714285.png)
- `translate()`: 偏移（有副作用，`translated`无副作用）
![](IMG-20251214140714374.png)

# `QSize`
![](IMG-20251214140714445.png)
`void scale(int width, int height,  Qt::AspectRatioMode mode)`
同样有 `scaled` 无副作用版本
![](IMG-20251214140714511.png)
![](IMG-20251214140714573.png)

# `QRect`
![](IMG-20251214140714637.png)
![](IMG-20251214140714655.png)
![](IMG-20251214140714725.png)

***以上类还有浮点版本 `QPointF`, etc***

