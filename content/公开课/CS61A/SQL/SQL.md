# Declarative Programming
In declarative languages such as SQL & Prolog:  
- A "program" is a description of the desired result  
- The interpreter figures out how to generate the result

In imperative languages such as Python & Scheme:  
- A "program" is a description of computational processes  
- The interpreter carries out execution/evaluation rules

# Database Management Systems
_**Database is a collection of tables where we put our data. DBMS helps us keep track of those tables, creating, deleting or making updates.**_  

A table is a collection of records, which are rows that have a value for each column.
![[IMG-20251214150203372.png]]

A database can have multiple different tables with different structure.

# Structure Query Language(SQL)

## Brief:
A `SELECT` statement describes an output table based on input rows. To write one:
1. Describe the **input rows** using `FROM` and `WHERE` clauses.
2. **Group** those rows and determine which groups should appear as output rows using `GROUP BY` and `HAVING` clauses.
3. Format and order the **output rows** and columns using `SELECT` and `ORDER BY` clauses.
`SELECT` _(Step 3)_ `FROM` _(Step 1)_ `WHERE` _(Step 1)_ `GROUP BY` _(Step 2)_ `HAVING` _(Step 2)_ `ORDER BY` _(Step 3)_;  
Step 1 may involve joining tables (using commas) to form input rows that consist of two or more rows from existing tables.  
The `WHERE`, `GROUP BY`, `HAVING`, and `ORDER BY` clauses are optional.

## Introduction

![[IMG-20251214150203399.png]]

The SQL language is an ANSI and ISO standard, but DBMS's implement custom variants  
- A `select` statement creates a new table, either **from scratch** or **by projecting a table**  
- A `create table` statement gives a global name to a table  
- Lots of other statements exist: `analyze`, `delete`, `explain`, `insert`, `replace`, `update`, etc.  
- Most of the important action is in the `select` statement  
- The code for executing `select` statements fits on a single sheet of paper.


> Remember that all of our statement is take in rows, and return rows.

## Selecting Value Literals

A `select` statement always includes a comma-separated list of column descriptions  
A column description is an expression, optionally followed by `as` and a column name  
```SQL
select [expression] as [name], [expression] as [name];` 
```
Selecting literals creates a one-row table  
The `union` of two `select` statements is a table containing the rows of both of their results.(No guarantee about the order)
> (They must have the same number of columns and the same type of each column, but the same name is not necessary, the first name will be used as the name of column)

![[IMG-20251214150203431.png]]

## Naming Tables

SQL is often used as an interactive language  
The result of a `select` statement is displayed to the user, but _not stored_

A `create table` statement gives the result a name  
```sql
create table [name] as [select statement];
```
![[IMG-20251214150203459.png]]

## Projecting Tables

- A select statement can specify an input table using a `from` clause  
- A subset of the rows of the input table can be selected using a `where` clause(May be repeated)  
- An ordering over the remaining rows can be declared using an `order by` clause  
Column descriptions determine how each input row is projected to a result row  

`select [expression] as [name], [expression] as [name], ...;` all of these arguments are belong to `[columns]`, the full version is:  
`select [columns] from [table] where [condition] order by [order];`
![[IMG-20251214150203486.png]]

> `*` is the shorthand of all the rows.

# Arithmetic

In a select expression, column names evaluate to row values  
Arithmetic expressions can combine row values and constants

![[IMG-20251214150203530.png]]


# Joining Tables

Two tables A & B are joined by a _comma_ to yield all combos of a row from A & a row from B.

![[IMG-20251214150203639.png]]

```sql
select * from parents, dogs
		where child = name;
```
The joint will exhaust all the pairs of rows and it is up to `where` clause to define some relationship between them, filtering which rows with which rows are going to be joined.

**An easy way to think: Assume all the combination is generated and those disaccording with the condition will be gotten rid of. Then we select specific column as select's parameter.**

## Aliases and Dot Expressions
_**Some time, two different tables have the same column name, aliases and dot expressions can disambiguate column values.**_

![[IMG-20251214150203675.png]]
(We use "<" because so that it will not repeat.)

So that we can join a table with itself.

## Joining Multiple Tables
![[IMG-20251214150203707.png]]

# Numerical Expressions

In `where` and `order by`, we can use expressions, they can use:
- Combine values: +, -, \*, /(integer divide by default), %, and, or  
- Transform values: abs, round, not, -  
- Compare values: <, <=, >, >=, <>, !=, =

# String Expressions

String values can be combined to form longer strings
```sql
sqlite> select "Hello," || "World!";
Hello,World!
```

Basic string manipulation is built into SQL
```sql
sqlite> create table phrase as select "hello, world" as s;
sqlite> select substr(s, 4, 2) || substr(s, instr(s, " ")+1, 1) 
		from phrase;
low -- The index starts with 1
```

strings can be used to represent structured values, but doing so is rarely a good idea
```sql
sqlite> create table lists as select "one" as car, "two,three,four" as cdr;
sqlite> select substr(cdr, 1, instr(cdr, ",")-1) as cadr from lists;
two
```

# Aggregation

Above this, all SQL expressions have referred to the values in a single row at a time.

An aggregate function in the `[column]` clause computes a value from a group of rows.

![[IMG-20251214150203736.png]]

- `max` is an aggregate function which take the "legs" column value of all the rows.
- `min`
- `sum`
- `avg`
- `count`: How many rows are there, can input any column's name, or `*`.
- `distinct`: `count(distinct legs)`, how many different rows are there. Other aggregate function can also use `distinct`.

## Mixing Aggregate Function and Single Values

An aggregate function also select a row in the table, which may be meaningful.(`avg` and `sum` do not, `max` or `min` just return one row of those corresponding to)
```sql
select max(weight), kind from animals;
select max(legs), kind from animals;
select min(kind), kind from animals;
select avg(weight), kind from animals;
```
Select aggregate expression means to select the row where aggregate value is calculate from, so if we add some column names behind it, we will get the value of the specific row.

## Groups

Rows in a table can be grouped, and aggregation is performed on each group.  
If not, all the rows belong to one big group by default.

```sql
select [columns] from [tables] group by [expression] having [expression];
```

### `group`
The number of groups is the number of unique values of an expression.

![[IMG-20251214150203767.png]]

More examples:
```sql
select legs, count(*) from animals group by legs;
select legs, weight from animals group by legs, weight;
select max(kind), weight/legs from animals group by weight/legs;
```
It's possible to group by more than one expression at a time.  
And arbitrary expression is valid, too.

### `having`
_**Keep track of some of those divided groups and get rid of others.**_

A `having` clause filters the set of groups that are aggregated.

`where` is to filter individual rows, but `having` clause can even include aggregation itself.

![[IMG-20251214150203798.png]]

```sql
CREATE TABLE low_variance AS
  SELECT d.fur AS fur, MAX(d.height) - MIN(d.height) AS height_range
  FROM dogs AS d
  GROUP BY d.fur
  HAVING MIN(d.height) >= AVG(d.height) * 0.7 AND MAX(d.height) <= AVG(d.height) * 1.3;
```
Remember that `having` check the aggregation property, so _do not write individual rows in it._  
It is FALSE that:  
```sql
CREATE TABLE low_variance AS
  SELECT d.fur AS fur, MAX(d.height) - MIN(d.height) AS height_range
  FROM dogs AS d
  GROUP BY d.fur
  HAVING d.height >= AVG(d.height) * 0.7 AND d.height <= AVG(d.height) * 1.3;
```
This has no meaning! We do not know which row will be chosen to compare with average.  
`having` _will not_ check every row as `where` does.

# Create Table and Drop Table

## Create
We can already create a table using [[#Naming_Tables.md|create as]] statement.
There's an alternative way that can create an empty table.

![[IMG-20251214150203835.png]]

![[IMG-20251214150203871.png]]

Example:
```sql
CREATE TABLE numbers (n, note);
CREATE TABLE numbers (n UNIQUE, note);
CREATE TABLE numbers (n, note DEFAULT "No comment");
```

## Drop
![[IMG-20251214150203992.png]]

# Modifying Tables
## Insert
![[IMG-20251214150204024.png]]
For a table t with two columns...  
To insert into one column:  
```sql
INSERT INTO t(column) VALUES (value);
```
And the default value will fill in the other column.

To insert into both columns:
```sql
INSERT INTO t VALUES (value0, value1);
```

Example:
![[IMG-20251214150204060.png]]

## Update
![[IMG-20251214150204090.png]]

Update sets all entries in certain columns to new values, just for some subset of rows.

## Deleting
![[IMG-20251214150204120.png]]

Without `where`, we will delete all the rows, but the table will still exist, not equivalent to `drop`.

# Python and SQL
_**A python program can construct and then execute SQL statements.**_

## Module: `sqlite3`
1. Class: `Connection`, pass in the name of database file and construct connections between python program and database.
2. methods:
	1. `execute(<SQL statement>)`
		- It can combine with python.
		- `db.execute("INSERT INTO nums VALUE (?),(?),(?);",range(4,7))`
		- `"SELECT ..."` will return a cursor object which has a method called `fetchall` which will fetch the contents of the result table as [[List|a list of]][[Tuple|tuples]].
		- Take one statement.
	2. `executescript()`
		- Take as many statements as we want and execute them all.
	3. `commit()`
		- It commits the modification to the database.

## SQL Injection Attack
![[IMG-20251214150204174.png]]

_**How to prevent?**_
```python
db.execute("INSERT INTO Students VALUES (?)",[name])
```

# Database Connection
_**There may be multiple programs connected to the same database at the same time. They can all be inserting values and reading values from the same table.**_

_**DBMS can handle that multiple different connections are made to the same database and multiple clients are trying to change the same table.**_

