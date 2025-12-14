# 操作数
## 寄存器
![[IMG-20251214150223647.png]]

## 存储器
- 字节寻址
- 小端存储

## 立即数

# 指令
## R类型
R for register，寄存器类型。

但是注意机器代码格式：（尤其是三个寄存器的顺序，和一般的写法顺序不同）
![[IMG-20251214150223787.png]]

op为0，由funct决定操作；  
rs、rt为源，rd为目的。

## I类型
I for immediate，立即数类型。

机器代码：
![[IMG-20251214150223812.png]]

rs、imm为源，rt为目的/源；  
imm以补码表示。

## J类型
J for jump，跳转指令。

机器代码：
![[IMG-20251214150223835.png]]

`addr`为26位，但是由于指令字对齐，末了两位为0（4的倍数），而前面4位由PC + 4最高4位决定。  
因此j
J类型的指令跳转范围有限，为256MB。

因此，jr，jalr为R类型，跳转到寄存器存储的地址，32位，可跳4GB。

# 编程
## 算术/逻辑
### 逻辑
- `and`, `or`, `xor`, `nor`  
- `not`: `nor $s1 $s1 $0`

- `andi`, `ori`, `xori`
- `nori`: `ori $s1 $s1 imm    nor $s1 $s1 $0`  
(都是进行0扩展)

### 移位
- `sll`, `srl`, `sra` (虽然有数字，但是是R类型，数字对应shamt位)  
- `sllv`, `srlv`, `srav` （可变移位指令）（`sllv rd rt rs`， 顺序和大多R指令不同）

### 生成常数
- 16位常数赋值： `addi`
`addi $s0 $0 0x4f3c`
- 32位常数赋值：`lui` then `ori`
```asm
lui $s0, 0x6d5e      # $s0 = 0x6d5e0000
ori $s0, $0, 0x4f3c  # $s0 = 0x6d5e4f3c  
```
（`lui`：加载立即数到高位）
### 乘除法
- `mult`, `div`  
- `multu`, `divu`
乘法中，`hi`装高位，`lo`装低位；  
除法中，`hi`装余数，`lo`装商。

## 分支
### 条件分支
- `beq`：相等跳转
- `bne`：不相等跳转
- `bgez`：大于等于0时跳转
- `bgtz`：大于0时跳转
- `blez`：小于等于0时跳转
- `bltz`：小于0时跳转  
这里的跳转是根据offset，`PC = (PC + 4) + signed_extend(offset << 2)`
### 跳转指令
- `j`：跳转
- `jal`：跳转并链接（将返回地址保存到$ra中）
- `jr`：跳转寄存器

## 量值比较
- `slt`, `sltu`, `slti`, `sltiu`：小于置1

# 数组
## 字节/字符
- `lb`, `lbu`：将字节装入寄存器，进行有/无符号扩展
- `sb`：将寄存器最低字节装入存储器指定地址

# 函数调用
## 调用与返回
- 调用：`jal`
- 返回：`jr`
## 传入参数与返回值
- 参数：
	- $a0 ~ $s3
	- 不足时，开辟栈空间存储，caller负责
- 返回值：$v0 ~ $v1（低32位和高32位）
## 栈
函数分配栈空间存储局部变量，并在返回前回收栈空间。

结构：
![[IMG-20251214150223862.png]]

$sp寄存器存储栈顶位置指针，指向栈顶。需要栈空间时缩小栈指针，使得栈向下增长。

应用：保存和恢复函数使用的寄存器。  
分为受保护和不受保护寄存器，分别又对应callee-save和caller-save寄存器。  
![[IMG-20251214150223975.png]]

局部变量存在s寄存器，需要恢复保存；如果局部变量过多，也开辟栈空间存储，尤其是局部数组。

步骤：
1. Makes space on the stack to store the values of one or more registers. 
2. Stores the values of the registers on the stack. 
3. Executes the function using the registers. 
4. Restores the original values of the registers from the stack. 
5. Deallocates space on the stack

## 递归函数调用
![[IMG-20251214150224004.png]]
![[IMG-20251214150224028.png]]

递归函数这样来看、写，分为三部分。

# 寻址方式
## 读写操作数
- 寄存器寻址：R类型
- 立即数寻址：部分I类型，如`addi`, `lui`
- 基地址寻址：存储器访问指令，如`lw`, `sw`
## 写PC的方式
- PC相对寻址：条件分支语句，[[MIPS_Assembly#条件分支.md]]
![[IMG-20251214150224154.png]]
- 伪直接寻址：[[MIPS_Assembly#J类型.md]]

# 内存映射
![[IMG-20251214150224182.png]]

# 伪指令
在转换为机器代码的时候，伪指令将转化为一条或者多条MIPS指令。

# 异常
- 硬件引发：中断
- 软件引发：自陷

# 有无符号
有无u  
u for unsigned

# 浮点指令
