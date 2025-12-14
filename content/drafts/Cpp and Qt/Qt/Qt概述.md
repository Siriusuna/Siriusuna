# 数据类型

头文件：`<QtTypes>` in `<QtGlobal>`

![[IMG-20251214150140907.png]]
![[IMG-20251214150140941.png]]

# Log 调试
![[IMG-20251214150140975.png]]
![[IMG-20251214150141014.png]]

# Qt 字符串
# `QByteArray`
![[IMG-20251214150141046.png]]
![[IMG-20251214150141079.png]]
![[IMG-20251214150141132.png]]
![[IMG-20251214150141164.png]]
![[IMG-20251214150141198.png]]

## `QString`
![[IMG-20251214150141233.png]]
- 方法和 `QByteArray` 大同小异
- 查找替换多了大小写敏感性参数
![[IMG-20251214150141267.png]]
- 内带编码格式

## 格式化
![[IMG-20251214150141311.png]]
![[IMG-20251214150141360.png]]
![[IMG-20251214150141415.png]]
![[IMG-20251214150141452.png]]

# `QVariant`
![[IMG-20251214150141489.png]]
![[IMG-20251214150141535.png]]
![[IMG-20251214150141598.png]]
-  `q.canConvert<int>();`
![[IMG-20251214150141637.png]]
- `q.value<>()`
## 自定义类
要想装在 `QVariant` 里，要 `Q_DECLARE_METATYPE`
![[IMG-20251214150141707.png]]

# 位置与尺寸
## `QPoint`
![[IMG-20251214150141761.png]]
- `[static]: dotProduct()`

# `QLine`
![[IMG-20251214150141791.png]]
- `translate()`: 偏移（有副作用，`translated`无副作用）
![[IMG-20251214150141833.png]]

# `QSize`
![[IMG-20251214150141867.png]]
`void scale(int width, int height,  Qt::AspectRatioMode mode)`
同样有 `scaled` 无副作用版本
![[IMG-20251214150141910.png]]
![[IMG-20251214150141957.png]]

# `QRect`
![[IMG-20251214150141999.png]]
![[IMG-20251214150142031.png]]
![[IMG-20251214150142076.png]]

***以上类还有浮点版本 `QPointF`, etc***

