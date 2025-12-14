![[IMG-20251214150155305.png]]
JavaScript is single-threaded.

![[IMG-20251214150155340.png]]

# Class, Function and Constructors
![[IMG-20251214150155381.png]]

![[IMG-20251214150155409.png]]

# Abstraction and Encapsulation
![[IMG-20251214150155445.png]]

![[IMG-20251214150155473.png]]

# Idioms
_**[[Higher-Order Function]]**_
- Passing a function
- immediate application / calling closure
- passing function around a iterator
![[IMG-20251214150155513.png]]
![[IMG-20251214150155543.png]]

![[IMG-20251214150155606.png]]  
（mermaid source）
```
flowchart LR
    subgraph JS["🧠 JavaScript 主线程"]
        A["执行同步代码
	    (Call Stack 调用栈)"]
    end

    subgraph API["🌐 Web APIs / Node APIs"]
        B["注册异步任务
        (setTimeout / fetch / 事件监听等)"]
        C["等待结果 / 计时 / IO操作"]
        D["完成后放入任务队列
        (附带回调函数)"]
    end

    subgraph Queue["📬 任务队列(Callback Queue / Microtask Queue)"]
        E["等待执行的回调函数们"]
    end

    subgraph Loop["♻️ 事件循环 (Event Loop)"]
        F["不断检查栈是否为空"]
        G["若空，从队列取一个任务
        放入调用栈执行"]
    end

    A -->|遇到异步操作| B
    B --> C
    C -->|任务完成| D
    D --> E
    A -->|执行完所有同步代码| F
    F -->|发现栈空| G
    G -->|取任务执行| A
    E -->|取出任务| G
```
