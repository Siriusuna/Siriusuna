# Canonicalization
What we’d really like is the ability to provide a _**canonical name**_ for everything.
- Canonical representation: A **unique representation** for a thing.
- Not-canonical: License plate number (can be reused, can change).
- Canonical: The VIN number JYA3AWC04VA071286 (refers to a specific motorcycle).

To address the fact that classes might share names:
In Java, we (attempt to) provide canonicity through by giving every a class a "package name".
- A package is a namespace that organizes classes and interfaces.
- Naming convention: Package name starts with website address (backwards).

## Creation
Two steps:
- At the top of every file in the package, put the package name.
- Make sure that the file is stored in a folder with the appropriate folder name.  
    For a package with name `ug.joshh.animal`, use folder `ug/joshh/animal`.

## Use
1. If used from the outside, use entire _**canonical name**_.  
2. By using an `import` statement, we can use the _**simple name**_ instead.
3. If used from another class in same package, can just use _**simple name**_.

## The Default Package
Any Java class without a package name at the top are part of the "default" package.

> You should avoid the default package except for very small example programs. 

_**Note: We cannot import code from the default package!**_

PS: [About import](https://www.doubao.com/chat/collection/14444561175946242?type=Thread)
# JAR Files
## Usage
Sharing dozens of `.class` files in special directories is annoy, we can instead share a single `.jar` file that contains all of `.class` files.  
In fact, JAR files are zip file with some extra information added.

_**Note:**_
- They do not keep our code safe!
- Easy to unzip and transform back into `.java` files.

