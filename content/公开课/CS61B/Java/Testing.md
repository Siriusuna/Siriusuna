# Ad Hoc Testing vs. JUnit
## Ad Hoc Testing
```java
public static void testSort() {
    String[] input = {"i", "have", "an", "egg"};
    String[] expected = {"an", "egg", "have", "i"};

    Sort.sort(input);

    for (int i = 0; i < input.length; i += 1) {
        if (!input[i].equals(expected[i])) {
            System.out.println("Mismatch in position " + i + ", expected: " + expected[i] + ", but got: " + input[i]);
        }
    }
}
```

## JUnit: A Simpler Way
```java
public static void testSort() {
    String[] input = {"i", "have", "an", "egg"};
    String[] expected = {"an", "egg", "have", "i"};

    Sort.sort(input);

	org.junit.Assert.assertArrayEquals(expected, input);
}
```

## Simpler Junit Tests
1. Annotate each test with `@org.junit.Test`
	- So that these tests can be run independently.
	- **Need to change all test methods to non-static.**
2. `import org.junit.Test` and `import static org.junit.Assert.*`
	- Eliminate the need to type org. blah, blah.