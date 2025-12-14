![[IMG-20251214150150958.png]]

# +=
![[IMG-20251214150150999.png]]
![[IMG-20251214150151027.png]]

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

![[IMG-20251214150151111.png]]
or
![[IMG-20251214150151152.png]]
# >> and <<
Cannot be a number function, but when we need to access private variable, we could use `friend`.  
![[IMG-20251214150151185.png]]
![[IMG-20251214150151229.png]]
![[IMG-20251214150151264.png]]
# \[]
![[IMG-20251214150151302.png]]
![[IMG-20251214150151338.png]]

# General Rule of Thumb
![[IMG-20251214150151367.png]]
![[IMG-20251214150151402.png]]
# =
- Be used to do [[Constructor and Destructor|copy assignment]], a special member function which is define by default.
![[IMG-20251214150151435.png]]
![[IMG-20251214150151462.png]]

- Be used to do [[Move Semantics|move assignment]], another special member function which is define by default.

# POLA: Principle of Least Astonishment
_**Design operators primarily to mimic conventional usage.**_
![[IMG-20251214150151491.png]]
![[IMG-20251214150151541.png]]
![[IMG-20251214150151582.png]]

# Something else
![[IMG-20251214150151608.png]]
