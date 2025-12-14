![[IMG-20251214150145797.png]]
![[IMG-20251214150145834.png]]
![[IMG-20251214150145865.png]]
`multimap` 和 `multiset` 是 C++ 标准库 (STL) 中的两种**有序关联容器**，它们是 `map` 和 `set` 的“多重 (multi)”版本。(允许重复)

# Which to Use?
![[IMG-20251214150145896.png]]

# Map
![[IMG-20251214150145935.png]]
![[IMG-20251214150145962.png]]
A faster one
```cpp
auto i = std::find(m.begin(), m.end(), elemToFind);
if(i == m.end())
	std::cout << "Non-Exist" << std::endl;
else
	std::cout << "Is Found" << std::endl;
```

```cpp
#include <iostream>
#include <vector>
#include <map>

int main()
{
    std::map<int, int> m;
    std::cout << m.count(1) << std::endl; // 0
    m[1];
    std::cout << m[1] << std::endl; // 0
    std::cout << m.count(1) << std::endl; // 1
    std::cout << m.count(2) << std::endl; // 0
    m.at(2); 
/*terminate called after throwing an instance of 'std::out_of_range'
  what():  map::at*/
    std::cout << m.count(2) << std::endl; // Not be run
    return 0;
}
```
![[IMG-20251214150145994.png]]

# Set
![[IMG-20251214150146039.png]]

# Multimap
![[IMG-20251214150146068.png]]
```cpp
auto range = scores.equal_range("Alice");
for (auto it = range.first; it != range.second; ++it) {
    cout << it->first << " = " << it->second << endl;
}
```
