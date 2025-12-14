_**The interpreter is a program that take as input the code in a programming language and execute that code in order to create the behavior described by the program.**_

![](IMG-20251214140740692.png)
# Metalinguistic Abstraction
![](IMG-20251214140740722.png)

# Parsing
_**Parsing is the process of taking text input which represent a computer program or some other formal language expressions, and turns them into some sort of objects that represent the expressions and while validating its syntax.**_

A parser takes text and returns an expression.
![](IMG-20251214140740833.png)

## Recursive Syntactic Analysis

Syntactic analysis in Scheme expressions (and in programming language in general) can be parsed via predictive recursive descent.

A predictive recursive descent parser inspects only _k_ tokens to decide how to proceed, for some fixed _k_.

The key idea is that we make predictions about which grammar rule to apply next based on the lookahead symbol (the next token in the input stream). We don't need to backtrack in this approach (unlike general recursive descent parsing), because we can make these predictions deterministically.

> _The horse raced by stable fell._  
> A sentence is not predictive recursive descent, since when we read "raced", we may be think of it is a predicate, and to figure out what happened in fact, we should look back to "The horse raced by stable" when we see the word "fell".

What it does is to identifies the hierarchical structure of an expression, which may be nested.  
Each call to `scheme_read` consumes the input tokens for exactly one expression.

### [Mutual Recursion](Recursive%20Functions.md)
```python
def scheme_read(src):
    """Read the next expression from src, a Buffer of tokens.
    >>> lines = [['(+ 1 ', '(+ 23 4) (']
    >>> src = Buffer(tokenize_lines(lines))
    >>> print(scheme_read(src))
    (+ 1 (+ 23 4))
    """
    if src.current() is None:
        raise EOFError
    val = src.pop()
    if val == 'nil':
        return nil
    elif val not in DELIMITERS:  # ( ) ',
        return val
    elif val == '(':
        return read_tail(src)
    else:
        raise SyntaxError("unexpected token: {}".format(val))


def read_tail(src):
    """Read the remainder of a list in src, starting before an element or ).
    >>> read_tail(Buffer(tokenize_lines([')'])))
    nil
    >>> read_tail(Buffer(tokenize_lines(['2 3)'])))
    Pair(2, Pair(3, nil))
    >>> read_tail(Buffer(tokenize_lines(['2 (3 4)')])))
    Pair(2, Pair(Pair(3, Pair(4, nil)), nil))
    """
    if src.current() is None:
        raise SyntaxError("unexpected end of file")
    if src.current() == ')':
        src.pop()
        return nil
    first = scheme_read(src)
    rest = read_tail(src)
    return Pair(first, rest)
```
The Pair Class: [Here!](Calculator.md)
