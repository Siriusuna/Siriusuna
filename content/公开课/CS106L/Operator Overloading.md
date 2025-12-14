![](IMG-20251214143547933.png)

# +=
![](IMG-20251214143547969.png)
![](IMG-20251214143548003.png)

# +
Do not do this!
```cpp
MyClass& badFunc() {
    MyClass obj;
    return obj;  // ❌ 返回了局部变量引用！
}

int main() {
    MyClass& ref = badFunc(); // ⚠️ 悬垂引用
}
```

![](IMG-20251214143548040.png)
or
![](IMG-20251214143548063.png)
# >> and <<
Cannot be a number function, but when we need to access private variable, we could use `friend`.  
![](IMG-20251214143548099.png)
![](IMG-20251214143548128.png)
![](IMG-20251214143548156.png)
# \[]
![](IMG-20251214143548186.png)
![](IMG-20251214143548216.png)

# General Rule of Thumb
![](IMG-20251214143548243.png)
![](IMG-20251214143548271.png)
# =
- Be used to do [copy assignment](Constructor%20and%20Destructor.md), a special member function which is define by default.
![](IMG-20251214143548299.png)
![](IMG-20251214143548326.png)

- Be used to do [move assignment](Move%20Semantics.md), another special member function which is define by default.

# POLA: Principle of Least Astonishment
_**Design operators primarily to mimic conventional usage.**_
![](IMG-20251214143548356.png)
![](IMG-20251214143548405.png)
![](IMG-20251214143548431.png)

# Something else
![](IMG-20251214143548468.png)
