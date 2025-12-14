***HDL是描述数字硬件的快速方法，不是计算机程序***
# 模块
- 定义：包括输入、输出的硬件块
- 描述模块功能的主要形式：
	- 行为模型：模块做什么
	- 结构模型：模块怎样构造
```verilog
module test(input i1
			output	o1);
	// something
endmodule
```
# 功能
- 模拟、综合
- 代码分为*可综合模块*（描述硬件）和*测试程序*（将输入应用于模块的代码、检测输出正确性与差别等，只可模拟，不可综合）
# 风格
HDL有特定的方法描述各种逻辑，称之为风格（针对每一种模块采用合适的风格编写HDL代码）
# [[组合逻辑]]
## 行为建模
### 位运算
- 位运算符
- *连续*赋值语句：
```verilog
assign out = in1 <op> in2;
```
等号右边的输入值改变，等号左侧的值也随之重新计算。用于描述组合逻辑。
**`assign` 语句不能在 `always` 和 `initial` 块中使用**。
![[IMG-20251214150222682.png]]
- 缩位运算符
```verilog
module and8(input logic [7: 0] a
			output logic y);
	assign y = &a;
	
	// Equals to 
	// assign y = a[7] & a[6] ... & a[0];
endmodule
```
### 条件赋值（描述复用器）
```verilog
assign y = s ? d1 : d0;
```
三元运算符
- 多路复用器
```verilog
assign y = s[1] ? (s[0] ? d3 : d2)
				: (s[0] ? d1 : d0);
```
### 内部变量
类似于编程语言的局部变量，不是输入也不是输出
```verilog
module fulladder(input logic a, b, cin
				output logic s, cout);
	logic p, g;
	
	assign p = a ^ b;
	assign g = a & b;
	
	assign s = p ^ cin;
	assign cout = g | p & cin;
endmodule
```
HDL赋值语句是并行执行的，顺序并不重要  
***在右边输入信号改变时，赋值语句就会被计算，而不考虑其出现次序。***
### 数字
- 数字中间可以有\_作为分隔符;
- 格式：`N'Bvalue`
	- N为位数，B为说明基数的字母（b，d，o，h）
	- 为给出位数会根据表达式自动补全0
	- -8'd5 是正确的，Verilog 数字本身并不能添加负号，这一表述可以看作对数字的运算，因此合法。
### z与x
- z：浮空值
三态缓存器：
```verilog
module tristate(input logic [3:0] a,
				input logic       en
				output tri  [3:0] y);
	assign y = en ? a : 4'bz;
endmodule
```
（`tri`可以有多个驱动信号，而`logic`只能有一个）
- x：非法值
### 位混合
在总线的子集上操作，或者连接信号来构成总线  
```verilog
assign y = {c[2:1], {3{d[0]}}, c[0], 3'b101};
```
`{}`操作符用于连接总线  
`{3{d[0]}}`表示`d[0]`的3个拷贝
### 延迟
- 时间尺度设置语句：`'timescale unit/precision` ，默认unit和precision都是1ns
- 用#表示延迟单位数量，例如：`assign #1 n1 = ~ a;`
## 结构化建模
描述一个模块怎么由给简单的模块构成。
```verilog
module mux4(input  logic [3:0] d0, d1, d2, d3
			input  logic [1:0] s
			output logic [3:0] y);
	logic [3:0] low, high;
	
	mux2 lowmux(d0, d1, s[0], low);
	mux2 highmux(d2, d3, s[0], high);
	mux2 finalmux(low, high, s[1], y);
endmodule
```
2:1 复用器的每个拷贝称为一个实例。
![[IMG-20251214150222711.png]]

***复杂系统应该分层定义，实例化主要组件来结构化描述系统。应该避免或至少减少在一个模块里混合使用行为和结构描述。***
# [[时序逻辑]]
HDL可以识别某种风格，然后转换为特定时序电路。

`always`语句中，信号会保持不愿，直到敏感信号列表中的一个事件发生。  
一个有合适的敏感信号列表的代码，用于描述有记忆功能的时序电路。
## 寄存器
```verilog
module flop(input logic clk,
			input logic [3:0] d,
			output logic [3:0] q);
	always_ff@(posedge clk)
		q <= d;
endmodule
```
（触发器）
## 复位寄存器
```verilog
module flopr(input logic clk,
			 input logic reset,
			 input logic [3:0] d,
			 output logic [3:0] q);
	// asynchronous reset
	always_ff@(posedge clk, posedge reset)
		if (reset) q <= 4'b0;
		else       q <= d;
endmodule

module flopr(input logic clk,
			 input logic reset,
			 input logic [3:0] d,
			 output logic [3:0] q);
	// synchronous reset
	always_ff@(posedge clk)
		if (reset) q <= 4'b0;
		else       q <= d;
endmodule
```

## 带使能端的寄存器
```verilog
module flopr(input logic clk,
			 input logic reset,
			 input logic en,
			 input logic [3:0] d,
			 output logic [3:0] q);
	// asynchronous reset
	always_ff@(posedge clk, posedge reset)
		if (reset) q <= 4'b0;
		else  (en) q <= d;
endmodule
```
（异步复位使能寄存器）

## 多寄存器
一条`always`语句可以表述多个硬件。

```verilog
module sync(input logic clk,
			input logic d,
			input logic q);
	logic n1;
	always_ff@(posedge clk)
		begin
			n1 <= d;
			q <= n1;
		end
endmodule
```

## 锁存器
```verilog
module latch(input logic clk,
			 input logic [3:0] d,
			 input logic [3:0] q);
	always_latch
		if (clk) q <= d;
endmodule
```
综合工具不一定支持；且容易发生意外的事，减少、谨慎使用。

## 关于`always`与组合逻辑
`always`可以描述组合逻辑的行为，敏感信号列表包括所有输入的响应，正文描述每一种组合的输出值即可。
```verilog
module inv(input logic [3:0] a,
		   output logic [3:0] y);
	always_comb
		y = ~a;
endmodule
```
`always_comb`等同于`always@(*)`

`assign`不能出现在`always`中，而`case`、`if`只能出现在`always`中，对于复杂组合逻辑，这两者会很方便。
### `case`语句
通过输入值执行不同操作。  
如果所有可能的输入组合都被定义，则表示组合逻辑；否则就是时序逻辑，输出在输入未定义情况下保持原来值。  
可以用`default`确保产生组合逻辑。

普通译码器一般也用`case`语句。
```verilog
module decoder3_8(input logic [2:0] a,
				  output logic [7:0] y);
	always_comb
		case(a)
			3'b000: y = 8'b0000_0001;
			...
			3'b111: y = 8'b1000_0000;
			default: y = 8'bxxxxxxxx;
		endcase
endmodule
```

#### `casez`
与`case`效果一样，但是可以识别表示无关项的`?`。
```verilog
module priority_casez(input logic [3:0] a,
					  output logic [3:0] y);
	always_comb
		casez(a)
			4'b1???: y <= 4'b1000;
			...
		endcase
endmodule
```
### `if`语句
`if`后还可以有`else`语句。  
如果所有可能的输入组合都处理了，就表示组合逻辑；否则表示时序逻辑（如前面的锁存器）

***以上两个语句只能出现在过程块（比如 `initial`、`always`、`task`、`function`）中***

### 阻塞赋值与非阻塞赋值
- `=`为阻塞赋值，将以出现顺序计算，适合组合逻辑
- `<=`将并行计算，适合时序逻辑
- 两者与连续赋值语句`assign`是不同概念
>这两种赋值方式被称为过程赋值，通常出现在 `initial` 和 `always` 块中，**为 `reg` 型变量赋值**。这种赋值类似 C 语言中的赋值，不同于 `assign` 语句，赋值仅会在一个时刻执行。由于 Verilog 描述硬件的特性，Verilog程序内会有大量的并行，因而产生了这两种赋值方式。

如果不按照以下准则，可能模拟正确，但是综合不到正确硬件。
![[IMG-20251214150222739.png]]

## 有限状态机
状态机的HDL描述分成三部分：
- 状态寄存器
- 下一个状态逻辑
- 输出逻辑
***注意，在下一个状态逻辑和输出逻辑使用阻塞赋值或连续赋值描述组合逻辑，在状态寄存器中使用非阻塞赋值描述时序逻辑。***
![[IMG-20251214150222849.png]]
![[IMG-20251214150222875.png]]
### 模板
#### Moore
![[IMG-20251214150222985.png]]
### Mealy
![[IMG-20251214150223143.png]]

# Verilog数据类型
![[IMG-20251214150223170.png]]
![[IMG-20251214150223198.png]]
Verliog主要用两种类型：`reg`和`wire`  
与SystemVerilog有诸多不同
![[IMG-20251214150223225.png]]
> `reg`不一定和寄存器有关系

- 如果一个变量出现在`always`模块中`<=`或`=`的左边，则必须被声明为`reg`，否则为`wire`
- 输入输出端口默认为`wire`
- 我们可以通过对 `reg` 型变量建立数组来对存储器建模，例如 `reg [31:0] mem [0:1023];`，其中**前面的中括号内为位宽，后面的中括号内为存储器数量**

Verilog的一个例子
```verilog
module flop(input clk,
			input [3:0] d,
			output [3:0] q);
	always@(posedge clk)
		q <= d;
endmodule
```

多信号源驱动的要用`tri`变量。
![[IMG-20251214150223337.png]]

# 参数化模块
使用参数化模块，HDL允许可变位宽度，增强复用性
```verilog
module mux2
	#(parameter width=8) // 默认参数8
	(input logic [width-1:0] d0, d1,
	 input logic s,
	 output logic [width-1:0] y);
	 assign y = s ? d1 : d0;
endmodule
```
实例化：
```verilog
mux2 a(d0, d1, s, y); // 默认位宽8的mux2
mux2 (#12) b(e0, e1, t, z); // 位宽设置为12的mux
```

参数化解码器：
```verilog
module decoder
	#(parameter N=3)
	(input logic [N-1:0] a,
	 output logic [2**N-1:0] y);
	always_comb
		begin
			y = 0;
			y[a] = 1;
		end
endmodule
```

## `generate`语句
`generate`支持`if`和`for`，决定产生怎样、产生多少的硬件。
```verilog
module andN
	#(parameter width=8)
	(input logic [width-1:0] a,
	output logic y);
	
	genvar i;
	logic [width-1:0] x;
	
	generate
		assign x[0] = a[0];
		for(i=1; i<width; i=i+1) begin: forloop
			assign x[i] = a[i] & x[i-1];
		end
	endgenerate
	
	assign y = x[width-1];
endmodule
```

# 测试程序(testbench)
测试程序包括向北侧设备提供输入的语句，以便检查输出。  
输入和期待的输出模式称为*测试向量*。

实例化被测设备，随后提供输入。阻塞式赋值和延迟用于提供合适输入顺序
![[IMG-20251214150223364.png]]
关键字：`initial`，用于初始化时运行一次块中指令。***不可综合。***

## 自检测试程序
可以自动检查是否符合输出向量
![[IMG-20251214150223389.png]]
> `==` and `===`
![[IMG-20251214150223507.png]]

可以把测试向量卸载单独文件中，测试程序读取、输入、判断输出。
![[IMG-20251214150223536.png]]
