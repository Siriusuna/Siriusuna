### A Textual Interface 

When we use a shell, we open a terminal to communicate with it. Shell is a program typically without graphic interface, running in the back of computer, while terminal is another program with a visualized interface. It has a prompt where we can input commands. These command will be interpreted and conducted by shell. Furthermore, the output of the commands will be shown in the terminal. (That is: Terminal is a program, a function, which accept the commands of user and show display the output from operating system.)


### Some Functions And Program

**The shell parses the command by `splitting it by whitespace`, and then runs the program indicated by `the first word`, supplying each subsequent word as an argument that the program can access.**
- `date`
- `echo`
	 If you want to input an argument containing more than one word(word separated by whitespace), you could quote it or use '\'to escape.
  e.g. `echo "Hello,World"`
- `which`
	Find out which file will be executed for a given program name.
- `chmod`:Change mode.

 **How does it know what these program are?**  
The shell is a programming environment, just like Python or Ruby, and so it has _variables, conditionals, loops, and functions_  
So when we run command actually we run a piece of code on it and shell interpret it.  
Computer are chipped with these centric applications and they are stored somewhere.  
If the shell is asked to execute a command that doesn’t match one of its programming keywords, it consults an _environment variable_ called `$PATH` that lists which directories the shell should search for programs when it is given a command. 

### Navigating in the Shell&&Traverse the File System

**Command:**  
- `pwd`: Print Work Directory.
- `cd`: Change Directory.
	- `~`:Home
	- `-`:Directory previously in
	- `\`:Root
- `ls`: List what lives in a given directory.
		- `-l`: Detailed information.	```
```bash
zhonghan-wang@zhonghan-wang-VMware-Virtual-Platform:~$ ls -l
drwxr-xr-x 2 zhonghan-wang zhonghan-wang 4096 Apr 10 02:36 Desktop
```
`d` for directory. 

---
### 1. 第一个字符：文件类型
`d` 表示这是一个**目录（directory）**。其他常见类型：
- `-`：普通文件
- `l`：符号链接（软链接）
- `b`：块设备文件（如硬盘）
- `c`：字符设备文件（如键盘）
### 2. 后 9 个字符：权限分组（3 组 ×3 位）
后 9 个字符分为 3 组，每组 3 位，分别对应三类用户的权限：
- 第 1-3 位：**文件所有者（user）** 的权限
- 第 4-6 位：**文件所属组（group）** 的权限
- 第 7-9 位：**其他用户（others）** 的权限
### 3. 每组权限的具体含义（r/w/x）
每组的 3 个字符分别代表 **读（read）、写（write）、执行（execute）** 权限，对应位置为字母表示有该权限，`-` 表示无权限：
- `r`（read）：可读权限（对文件可查看内容，对目录可列出内容）
- `w`（write）：可写权限（对文件可修改内容，对目录可增删文件）
- `x`（execute）：可执行权限（对文件可运行，对目录可进入）

---

| Permission | for File | for Directory        |
| ---------- | -------- | -------------------- |
| w          | Write    | i.e.add/remove files |
| x          | Execute  | Search(`cd` to it.)  |
| r          | Read     | List content(`ls`)   |
		
- `mv`: Move a file / Rename a file.
- `cp`: Copy.
- `mkdir`: Make a new Directory.
- `man`: Take an argument as the name of program and show its manual. Press `q` to quit.


Most command receiver _flag and option(flag with values)_ starting with `-` , which can modify their behavior.
`.` for current directory and `.. `to its parent directory.

**With these commands we can [Script](Script.md) with bash.**