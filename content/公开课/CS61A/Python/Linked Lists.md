_**A linked list is either empty of a first value and the rest of the linked list.**_

![](IMG-20251214140811556.png)

# Linked List Processing
```python
def range_link(start, end):
    """
    >>> range_link(3, 6)
    Link(3, Link(4, Link(5)))
    """
    if start >= end:
        return Link.empty
    else:
        return Link(start, range_link(start + 1, end))


def map_link(f, s):
    """Return a Link that contains f(x) for each x in Link s.

    >>> map_link(square, range_link(3, 6))
    Link(9, Link(16, Link(25)))
    """
    if s is Link.empty:
        return s
    else:
        return Link(f(s.first), map_link(f, s.rest))


def filter_link(f, s):
    """Return a Link that contains only the elements x of Link s for which f(x)
    is a true value.

    >>> filter_link(odd, range_link(3, 6))
    Link(3, Link(5))
    """
    if s is Link.empty:
        return s
    filtered_rest = filter_link(f, s.rest)
    if f(s.first):
        return Link(s.first, filtered_rest)
    else:
        return filtered_rest
```

# Linked Lists Mutation
![](IMG-20251214140811602.png)

```python
class Link:

    empty = ()

    def __init__(self, first, rest=empty):
        assert rest == Link.empty or isinstance(
            rest, Link
        ), "The rest of a linked list must be a linked list"
        self.first = first
        self.rest = rest
  

    @classmethod
    def range_link(cls, start, end):
        """
        >>> range_link(3, 6)
        Link(3, Link(4, Link(5)))
        """
        if start >= end:
            return Link.empty
        else:
            return Link(start, Link.range_link(start + 1, end))
  

    @classmethod
    def map_link(cls, f, s):
        """Return a Link that contains f(x) for each x in Link s.
        >>> map_link(square, range_link(3, 6))
        Link(9, Link(16, Link(25)))
        """
        if s is Link.empty:
            return s
        else:
            return Link(f(s.first), Link.map_link(f, s.rest))
  

    @classmethod
    def filter_link(cls, f, s):
        """Return a Link that contains only the elements x of Link s for which f(x) is a true value.
        >>> filter_link(odd, range_link(3, 6))
        Link(3, Link(5))
        """
        if s is Link.empty:
            return s
        filtered_rest = Link.filter_link(f, s.rest)
        if f(s.first):
            return Link(s.first, filtered_rest)
        else:
            return filtered_rest
  

    def __str__(self):
        ret = "< "
        while self.rest != Link.empty:
            ret += f"{self.first} -> "
            self = self.rest
        ret += f"{self.first} >"
        return ret


    def __add__(self, other):
        if isinstance(other, int):
            if self.first < other:
                if not self.rest == Link.empty:
                    self.rest + other
                else:
                    self.rest = Link(other)
            elif self.first > other:

                self.first, self.rest = other, Link(self.first, self.rest)
            return self


    __radd__ = __add__
```
