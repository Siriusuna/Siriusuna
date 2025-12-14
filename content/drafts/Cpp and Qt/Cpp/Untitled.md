## C++ 中的左值（Lvalues）和右值（Rvalues）

C++ 中有两种类型的表达式：

- **左值（lvalue）：**指向内存位置的表达式被称为左值（lvalue）表达式。左值可以出现在赋值号的左边或右边。
- **右值（rvalue）：**术语右值（rvalue）指的是存储在内存中某些地址的数值。右值是不能对其进行赋值的表达式，也就是说，右值可以出现在赋值号的右边，但不能出现在赋值号的左边。

变量是左值，因此可以出现在赋值号的左边。数值型的字面值是右值，因此不能被赋值，不能出现在赋值号的左边。下面是一个有效的语句：
```cpp
int g = 20;
```
但是下面这个就不是一个有效的语句，会生成编译时错误：
```cpp
10 = 20;
```

# Casting
![](IMG-20251214140712300.png)
```cpp
struct Base { virtual ~Base(){} };
struct Derived : Base { int x; };

const Base* cb = new Derived();

// 1️⃣ const_cast：去掉 const
Base* b = const_cast<Base*>(cb);

// 2️⃣ static_cast：编译期类型转换
Derived* d1 = static_cast<Derived*>(b);   // 不安全

// 3️⃣ dynamic_cast：运行时安全检查
Derived* d2 = dynamic_cast<Derived*>(b);  // 安全（若b指向Derived）

// 4️⃣ reinterpret_cast：彻底无视类型系统
long addr = reinterpret_cast<long>(b);
```

# Const and Mutable
![](IMG-20251214140712414.png)

# Copy
![](IMG-20251214140712581.png)

# `typename` and `class`
![](IMG-20251214140712746.png)
![](IMG-20251214140712927.png)
