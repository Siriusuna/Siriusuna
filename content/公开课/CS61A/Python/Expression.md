_**All expressions can use function call notation.**_

## Evaluate:
求（方程式，公式，函数）的数值.  
_**Expression can be evaluate differently in different [[Environment]].**_
##### Evaluation procedure for call expressions: 
1.  Evaluate the [[Higher-Order Function#^dcx251.md]] and then the operand subexpressions .
2.  Apply the function that is the value of the operator subexpression to the arguments that are the values of the operand subexpression. ^5jxb0f
##### Procedure for calling/applying user-defined functions:
1. Add a local frame, titled with the `<name>` of the function being called.
2. _**Copy the parent of the function to the local frame: `[parent=<label>]`**_
3. Bind the `<formal parameters>` to the arguments in the local frame.
4. Execute the body of the function in the environment that starts with the local frame. ^q3hafs

##### To evaluate a dot expression:

`<expression>. <name>`  
1. Evaluate the `<expression>` to the left of the dot, which yields the object of the dot expression.
2. `<name>` is matched against the instance attributes of that object; if an attribute with that name exists, its value is returned.
3. If not, `<name>` is looked up in the class, which yields a class attribute value.
4. That value is returned <font color="Red">unless it is a function</font>, in which case a bound method is returned instead.