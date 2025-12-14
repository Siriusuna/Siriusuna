About: [MVC](MVC.md)

_**Cross-cutting concerns: Logically centralized but may appear multiple places in implementation.**_

How to share cross-cutting concerns in program.
## Aspect-Oriented Programming

_Advice_ is a specific piece of code that implements a cross-cutting concern.  
_Pointcuts_ are the places we want to "inject" _advice_ at runtime.

_**Advice + Pointcut = Aspect**_

### Rails Examples
#### Validation (for model)
[Validation](Active_Record#Validation.md) is _advice_ in AOP sense, specifying declaratively in model class. 
![](IMG-20251214143628916.png)
![](IMG-20251214143628957.png)
![](IMG-20251214143628997.png)
Rails 的验证（validation）是固定阶段自动运行的，而回调（callback）是我们可以在各个阶段插入自定义行为的钩子。

![](IMG-20251214143629032.png)
#### Controller filter (for controller)
![](IMG-20251214143629070.png)

![](IMG-20251214143629122.png)
Compare to validation, a filter can take the power of controller and stop the show immediately.

![](IMG-20251214143629159.png)
![](IMG-20251214143629188.png)

Example:  
![](IMG-20251214143629240.png)
![](IMG-20251214143629269.png)

_**NOTE: Use `:only` and `:except` symbol to specify the action you want to filter.**_

# Summary
![](IMG-20251214143629307.png)
![](IMG-20251214143629338.png)
#### Partial (for view)
![[MVC#Reuse Partials]]

#### Building Queries with Reusable Scopes
![](IMG-20251214143629372.png)
![](IMG-20251214143629407.png)
![](IMG-20251214143629436.png)
The one below is recommended.
![](IMG-20251214143629470.png)

# Summary
![](IMG-20251214143629503.png)
