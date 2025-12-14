# Principle
- Don't repeat yourself; use existing implementations.  
- Attributes that have been overridden are still accessible via class objects.  
- Look up attributes on instances whenever possible.

```python
class CheckingAccount(Account):
    """A bank account that charges for withdrawals."""
    withdraw_fee = 1
    interest = 0.01
    def withdraw(self, amount):
        return Account.withdraw(self, amount + self.withdraw_fee)
```
In the last line, although we have overridden withdraw, we can still access it by class `Account`.  
And we'd better use it instead of copy and paste so that we can keep consistent.  

And the third principle, we'd better to write `self.withdraw_fee` instead of `CheckingAccount.withdraw_fee`, in case that some instance may have a special withdraw_fee.(Either for further subclasses or giving an instance attribute to particular accounts.)  
By the way, we cannot write `withdraw_fee` only, because the withdraw_fee above appears as an attribute and if we use it directly, it is undefined.

[[Decomposition]] and modularization.
# [[Inheritance]] and Composition
_**Object - oriented programming shines when we adopt the metaphor.**_  

- Inheritance is best for representing _**is-a**_ relationships.  
	E.g., a checking account is a specific type of account.  
	So, `CheckingAccount` inherits from `Account`.  
- Composition is best for representing _**has-a**_ relationships.  
	E.g., a bank has a collection of bank accounts it manages.  
	So, A bank has a list of accounts as an attribute.
	_In this case, accounts do not inherit attributes from bank vice versa._

E.g.
```python
"""Composition"""
class Bank:
	def __init__(self):
	    self.accounts = []
	
	def open_account(self, holder, amount, kind=Account):
	    account = kind(holder)
	    account.deposit(amount)
	    self.accounts.append(account)
	    return account
	
	def pay_interest(self):
	    for a in self.accounts:
	        a.deposit(a.balance * a.interest)
	
	def too_big_to_fail(self):
	    return len(self.accounts) > 1
```

a little more complicated example:
![[IMG-20251214150203320.png]]
We should remember that: 
- When we create a new instance, we will call `__init__` first if it or one of its base class has one. So when `C` and `B` is created, `__init__` will be call while `A`'s instance will not.  
- When we call `__init__`, no matter which class this `__init__` method is belong to, the `self`'s class is what our instance is belong to, thus we look up its attribute from this class. So when we call `C(1)`, we call `__init__` in class `B`, and assign `self.z = self.f(y)`, the `f` there should be found in class `C` rather than from `B` and found in `A`.