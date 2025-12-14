# Overloading
_**Java allows multiple methods with same name, but different parameters or different signatures.**_

**shorthand:**  
It need repeating a method many times, which is verbose and terrible for us to maintain our codes.

# [[Inheritance]](is-a)
_**Hypernym**_

## `interface`: Keyword instead of class
Idea: interface is a specification of what a class should do, not how to do it.

![[IMG-20251214150212601.png]]
Every method in interface should be public so `public` is redundant.

## `implements`: Keyword to tell compiler that it is a hyponym of interface(a subclass)

![[IMG-20251214150212629.png]]

 A class or an interface can implements more than one interface.[[Subtype Polymorphism]]  
# Overriding vs. Overloading
## Definition
If a subclass has a method with the exact same signature as in the superclass, we say the subclass overrides the method, which happens only in the situation of inheritance.  

![[IMG-20251214150212742.png]]
> But in the subclass extending this class, when overriding, return type could be the subclass of the return type of the superclass method.  
> ([[Type Checking and Casting#^hln5l8.md]])
```java
class Parent { 
	public Number getNumber() { // 父类返回Number 
		return 0; 
	} 
} 

class Child extends Parent {
	@Override 
	public Integer getNumber() { // 子类返回Integer（Number的子类） 
		return 1; 
	} 
}
```

On the other hand, method with the same name but different signatures are overloaded.
![[IMG-20251214150212772.png]]
The conception of overload can be also applied in the situation without inheritance.

## `@Override`(Optional, but Recommended)
An annotation marks that the method is an overriding method, the only effect is that the code won't compile if it is not actual an overriding method.

- Even if you don’t write @Override, subclass still overrides the method.
- @Override is just an optional reminder that you’re overriding.

Why use `@Override`?
- Main reason: Protects against typos.
    - If you say @Override, but it the method isn’t actually overriding anything, you’ll get a compile error.
    - e.g. `public void addLats(Item x)`
- Reminds programmer that method definition came from somewhere higher up in the inheritance hierarchy.

# Interface inheritance(What can do?)
Specifying the capabilities of a subclass using the implements  
keyword is known as interface inheritance.
- Interface: The list of all method signatures.
- Specifies what the subclass can do, but not how.
- Classes must override all of these methods!
    - Will fail to compile otherwise.
- Can provide variables, but they should be `public static final`.  
	- `final` means never changing, constant value(`const` in C).
![[IMG-20251214150212878.png]]

---
(A variable of superclass can hold addresses of a variable of subclass and the variable can call the method of this exact subclass)
![[IMG-20251214150213022.png]]
This phenomenon is a key manifestation of **polymorphism** in Java. Here's the breakdown:

### Compile-time: Focus on the declared type (Parent class)
When we write code like `List61B<String> someList = new SLList<String>();`, during compilation, the compiler only cares about the **declared type of the variable** (here, `List61B`). As long as the `addFirst` method is declared in `List61B` (regardless of its actual implementation), the compiler considers the call `someList.addFirst("elk")` legal and won't report an error.  
In other words, at compile - time, it [[Type Checking and Casting|"follows the contract of the parent class"]].

### Run-time: Focus on the actual object (Child class)
When the code actually runs, the JVM will detect that `someList` **actually points to an `SLList` object**. So, when calling the method, it will dynamically find the specific implementation of `addFirst` in `SLList` (even if the parent class `List61B` only declares this method without a real implementation).  
That is, at run - time, it "follows the implementation of the child class".

In short:  
- At compile - time, it depends on the **declared type of the variable** (the parent class constrains whether a method call is "legal").
- At run - time, it depends on the **actually created object** (the child class determines how a method is "executed").

This is the power of polymorphism:  
We can write code using a unified parent class interface, yet flexibly invoke the specific logic of child classes. This makes the program more extensible. For example, if we want to replace `SLList` with another child class of `List61B` (say `AnotherList` which also implements `addFirst`), we just need to change `new SLList()` to `new AnotherList()`, without modifying the calling logic.

---

# Implementation Inheritance(How to do?)
_**For better or worse, Java also allows implementation inheritance: Subclasses can inherit signature AND implementation.(like Python)**_

That is, we can have a body for the methods in a interface!  
Use the `default` keyword to specify a method that subclasses should inherit from an interface.
![[IMG-20251214150213054.png]]
And we can override the default method as well. Same as above, when we store a variable of subclass in a variable of superclass, we will still call the method of overriding method of the subclass.

<font color="blue">So methods in interface can be divided into two kinds: abstract methods(without verbose keyword) and default method(with keyword default).</font>

## `Extends`
_**If we want one class to be hyponym of another class, use it.**_
![[IMG-20251214150213083.png]]
Because of `extends`, `RotatingSLList` inherits all members of SLList:
- All instance and static variables.
- All methods.
- All nested classes.
But members may be private and inaccessible.  
Constructors are not inherited.

![[IMG-20251214150213114.png]]
### [[Abstract Classes]]
### `super`
A keyword that can call private methods or attributes of the superclass.

### Constructor Behavior Between Superclass and Subclass
Constructors are not inherited.  
However, the rules of Java say that all constructors must start with a call to one of the super class’s constructors.
- Idea: If every `VengefulSLList` is-a `SLList`, every `VengefulSLList` must be set up like an `SLList`.
    - If you didn’t call `SLList` constructor, sentinel would be null. Very bad.
- You can explicitly call the constructor with the keyword super (no dot).
- If you don’t explicitly call the constructor, Java will automatically do it for you.
![[IMG-20251214150213222.png]]

If we want to use a super constructor other than the no-argument constructor, can give parameters to super. In other word, call `super(x)` explicitly.
![[IMG-20251214150213253.png]]

# Dynamic Method Selection
![[IMG-20251214150213358.png]]
So if the run-time type overrides the method of compile-time type, the run-time type's method will be used instead.

[A typical scenario.](https://www.doubao.com/thread/cDJPv68P6rNg)
![[IMG-20251214150213400.png]]

![[IMG-20251214150213431.png]]
Actually, if there are many layers of inheritance, Java will search for overridden method from the dynamic type until the root - the biggest superclass.  
Just like how python find variables, methods, attributes in [[Environment|frames]].

# Summary

Interface Inheritance (a.k.a. what):
- Allows you to generalize code in a powerful, simple way.  

Implementation Inheritance (a.k.a. how):
- Allows code - reuse: Subclasses can rely on superclasses or interfaces.
    - Example: print() implemented in List61B.java.
    - Gives another dimension of control to subclass designers: Can decide whether or not to override default implementations.

Important: In both cases, we specify "is-a" relationships, not "has-a"(composition).
- Good: Dog implements Animal, SLList implements List61B.
- Bad: Cat implements Claw, Set implements SLList.

[[Encapsulation]], [[Type Checking and Casting]] are also related to this notes.
![[IMG-20251214150213460.png]]

![[IMG-20251214150213602.png]]


---
# The Object Class
_**Every type in Java is a descendant of the Object class.**_

Every class without using `extends` explicitly actually `extends` `Object` class implicitly.  
But interface does not extend the Object class.
![[IMG-20251214150213629.png]]
- `equals`
- `hashCode`
- `toString`
