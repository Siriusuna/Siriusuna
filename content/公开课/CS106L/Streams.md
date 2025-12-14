![[IMG-20251214150152888.png]]

# What is stream?
![[IMG-20251214150152931.png]]
![[IMG-20251214150152974.png]]
![[IMG-20251214150153026.png]]
![[IMG-20251214150153068.png]]
# String Stream
![[IMG-20251214150153102.png]]
![[IMG-20251214150153143.png]]
![[IMG-20251214150153174.png]]
![[IMG-20251214150153211.png]]
![[IMG-20251214150153255.png]]
![[IMG-20251214150153290.png]]
```cpp
#include <iostream>
#include <sstream>

int main()
{
    std::ostringstream oss("Hello", std::ostringstream::ate);
    std::cout << oss.str() << std::endl; // Hello
    oss << 100;
    std::cout << oss.str() << std::endl; // Hello100
    return 0;
}
```

![[IMG-20251214150153328.png]]
![[IMG-20251214150153368.png]]

**Types matters!**
![[IMG-20251214150153402.png]]
The operator returns the stream itself so that we can call them in a chain.

![[IMG-20251214150153447.png]]

# State Bit
![[IMG-20251214150153476.png]]
![[IMG-20251214150153540.png]]
![[IMG-20251214150153599.png]]
- `iss.good()` --> bool: true
- `iss.fail()` --> bool: false
- `iss.eof()`
- `iss.bad()` 
![[IMG-20251214150153670.png]]

```cpp
#include <iostream>
#include <sstream>
int main()
{
    std::ostringstream oss;
    std::istringstream iss;
    int a;
    std::cout << iss.eof() << std::endl; // 0
    iss >> a;
    std::cout << iss.fail() << " " << iss.eof() << std::endl; // 1 1
    return 0;
}
```
# `cout` and `cin`
![[IMG-20251214150153714.png]]
![[IMG-20251214150153771.png]]
![[IMG-20251214150153826.png]]

How to deal with?
![[IMG-20251214150153871.png]]
(The delimiter will be skipped and discarded)  
(Though, it will not skip a leading delimiter!)

## `std::endl`
`/n` + flush.
![[IMG-20251214150153918.png]]
![[IMG-20251214150153959.png]]
```cpp
std::istringstream iss("   hello");
std::string s;
iss >> std::ws >> s;   // 跳过前导空白字符
std::cout << s;        // 输出 "hello"
```
```cpp
std::cout << std::boolalpha;
std::cout << true << " " << false << std::endl;
// 输出：true false

std::cout << std::noboolalpha;
std::cout << true << " " << false << std::endl;
// 输出：1 0
```
```cpp
#include <iomanip> // 头文件！

double pi = 3.1415926535;
std::cout << std::setprecision(3) << pi << std::endl;
// 输出：3.14（默认是有效数字）

std::cout << std::fixed << std::setprecision(3) << pi << std::endl;
// 输出：3.142（保留小数位数）
```
![[IMG-20251214150154014.png]]

![[IMG-20251214150154054.png]]

![[IMG-20251214150154097.png]]