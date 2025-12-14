- Every method is associate with some class. Every file contains a class.
- To run a class, we must define a main method.
	- Not all the classes have a main method!(But we can have a test drive class for it.)
![[IMG-20251214150211963.png]]
(Dependent files will be [[Compile]]d automatically.)
# Terminology
![[IMG-20251214150211991.png]]
1. Instance variable: [[Object-Oriented Programming(OOP|instance attribute]].md).
2. [[Data Abstraction|Constructor]](name should be same as class name).
3. [[#Static_and_Non-Static.md|Non-static method or static method]]: Belong to instance or class.

![[IMG-20251214150212018.png]]

![[IMG-20251214150212043.png]]
4. To create an array of objects:  
	- First use the `new` keyword to create the array.  
	- Then use `new` again for each object that you want to put in the array.
> _So the creation of array in Java needs `new` and so does the creation of instances._
（By the way,when defining an array, the length could be a variable.）

# Static and Non-Static
![[IMG-20251214150212068.png]]
A class may have a mix of static and non-static **members**.

- A variable or method defined in a class is also called a member of that class.
- _Static_ members are accessed using class name, e.g. `Dog.binomen.`
- _Non-static_ members **cannot** be invoked using class name: ~~`Dog.makeNoise()`~~
- _Static_ methods must access instance variables via a specific instance, e.g. d1.

```java
public class Dog {
    public int weightInPounds;
    public static String binomen = "Canis familiaris";

    public Dog(int startingWeight) {
        weightInPounds = startingWeight;
    }

    public static Dog maxDog(Dog d1, Dog d2) {
        if (d1.weightInPounds > d2.weightInPounds)
            return d1;
        return d2;
    }

    public void makeNoise() {
        if (weightInPounds < 10)
            System.out.println("yipyipyip!");
        else if (weightInPounds < 30)
            System.out.println("bark.");
        else
            System.out.println("woof. woof.");
    }
}
```
All in all, different from Python, the class attribute and instance attribute in Java should be declared with different keyword: `static`. And they can't be called by another, static is for class, vice versa.

By the way, the Java version `self` is `this` and can be omitted if there's no variable in same name.  
One more thing is that `this` in Java's method is seen as constant so we can't change it.

