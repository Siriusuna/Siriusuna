![[IMG-20251214150146706.png]]
![[IMG-20251214150146741.png]]

An example:
![[IMG-20251214150146776.png]]
0. Copy constructor
1. Default constructor
2. Normal constructor
3. _**A FUNCTION PROTOTYPE**_
4. Copy constructor
5. Default constructor
6. Copy constructor
7. 
	- Copy _constructor_
	- Copy _assignment_
	- Copy constructor(For return!)
![[IMG-20251214150146813.png]]
# Copy Operation
When we did not define our own copy constructor, cpp will generate one for us which just simply copy every single value.
![[IMG-20251214150146844.png]]
![[IMG-20251214150146902.png]]
![[IMG-20251214150146944.png]]
![[IMG-20251214150146984.png]]

_**So, what a copy constructor or assignment needs to do?**_
![[IMG-20251214150147026.png]]
- Copy constructor
![[IMG-20251214150147061.png]]
- Copy assignment
Not a constructor, but a [[Operator Overloading|Overloading of `=`]]!

## Prevent from Copying
![[IMG-20251214150147087.png]]

# When Own Special Member Function is Needed?
![[IMG-20251214150147117.png]]
![[IMG-20251214150147155.png]]
![[IMG-20251214150147189.png]]

# An Example
```cpp
class MyClass {
public:
    int* ptr;
    MyClass() { ptr = new int(42); }
    MyClass(const MyClass& other) { // 拷贝构造
        ptr = new int(*other.ptr);
    }
    MyClass& operator=(const MyClass& other) { // 拷贝赋值
        if (this != &other) {
            delete ptr;
            ptr = new int(*other.ptr);
        }
        return *this;
    }
    ~MyClass() { delete ptr; }
};

MyClass f() {
    MyClass tmp;
    return tmp;
}
```
```cpp
MyClass a;
a = f();
```
![[IMG-20251214150147219.png]]
But something is optimized after c++17 which called [[Move Semantics]].

# Move Operation
- [[Move Semantics|Move constructor]]
- [[Operator Overloading|Move assignment]]
