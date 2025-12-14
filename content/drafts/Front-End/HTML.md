# Structure
![[IMG-20251214150144922.png]]
`<title>`是标签页显示的内容。

# 标签
## HTML元素语法
- HTML 元素以**开始标签**起始
- HTML 元素以**结束标签**终止
- **元素的内容**是开始标签与结束标签之间的内容
- 某些 HTML 元素具有**空内容（empty content）**
- 空元素**在开始标签中进行关闭**（以开始标签的结束而结束）
- 大多数 HTML 元素可拥有**属性**

- 标题标签：h1~6
- 段落标签：p
	- 加粗：b、strong
	- 斜体：i、em
	- 下划线：u
	- 删除线：s
- 换行：br
- 分割线：hr
- 列表：
	- 无序列表：ul
	- 有序列表：ol
	- 元素：li
- 表格标签：
	- 根：table
	- 行：tr
	- 列标题：th
	- 内容：td
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
  </head>
  <body>

    <h1>Level 1 Heading</h1>

    <h2>Level 2 Heading</h2>

    <h3>Level 3 Heading</h3>

    <h4>Level 4 Heading</h4>

    <h5>Level 5 Heading</h5>

    <h6>Level 6 Heading</h6>
    
    <p>This is a paragragh.</p>

    <p>
      Change text style:
      <b>bold</b>
      <i>italic</i>
      <u>underline</u>
      <s>strickout</s>
    </p>

    <ul>
      <li>unorder list element1</li>
      <li>unorder list element2</li>
      <li>unorder list element3</li>
    </ul>
    
    <ol>
      <li>order list element1</li>
      <li>order list element2</li>
      <li>order list element3</li>
    </ol>

    <p><b>tr for table row</b></p>
    <p><b>td for table date</b></p>
    <p><b>th for table header</b></p>

    <table>
      <tr>
        <th>column title 1</th>
        <th>column title 2</th>
        <th>column title 3</th>
      </tr>
      <tr>
        <td>element11</td>
        <td>element12</td>
        <td>element13</td>
      </tr>
      <tr>
        <td>element21</td>
        <td>element22</td>
        <td>element23</td>
      </tr>
      <tr>
        <td>element31</td>
        <td>element32</td>
        <td>element33</td>
      </tr>
    </table>
  </body>
</html>
```

# 属性
## HTML 属性
- HTML 元素可以设置**属性**
- 属性可以在元素中添加**附加信息**
- 属性一般描述于**开始标签**
- 属性总是以名称/值对的形式出现，**比如：name="value"**。
![[IMG-20251214150144959.png]]
![[IMG-20251214150144988.png]]

- a标签：
	- `href`：链接目标：url，文件路径……
	- `target`：打开方式
---
在 HTML 中，`<a>`标签的`target`属性用于指定链接打开的位置，常见的四个特殊关键字（也是最常用的四种）及其区别如下：
1. **`_self`（默认值）**
    - 含义：在**当前窗口 / 框架**中打开链接，替换当前页面内容。
    - 场景：如果不指定`target`属性，默认就是`_self`，适用于希望在当前页面跳转的情况。
2. **`_blank`**
    - 含义：在**新的浏览器窗口或标签页**中打开链接，当前页面保持不变。
    - 注意：为了安全（防止新页面通过`window.opener`访问原页面），建议搭配`rel="noopener noreferrer"`使用
3. **`_parent`**
    - 含义：在**当前框架的父级框架**中打开链接。
    - 场景：仅在页面使用了框架（如`frameset`或`iframe`）时有效。如果当前页面没有父框架（即顶级页面），则效果等同于`_self`。
4. **`_top`**
    - 含义：在**整个浏览器窗口**中打开链接，直接跳出所有嵌套的框架（无论多少层），替换整个页面。
    - 场景：用于打破框架嵌套，强制链接在顶级窗口显示。例如，若页面被嵌套在多层`iframe`中，`_top`会直接在最外层窗口打开链接。
---
- img标签
	- `<img src="" alt="" />`
	- `src`：路径、url
	- `alt`：图像替代文本，如果图片无法加载显示。
	- `width`, `height`
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Property</title>
  </head>
  <body>
    <a href="https://www.baidu.com">Baidu</a>
    <a href="https://www.baidu.com" target="_parent">Baidu</a>
    <a href="https://www.baidu.com" target="_top">Baidu</a>
    <a href="https://www.baidu.com" target="_blank">Baidu</a>
    <img src="/Nonexistence" alt="This image is not existed." />
  </body>
</html>
```
# HTML区块
![[IMG-20251214150145018.png]]
![[IMG-20251214150145053.png]]
- div：无语义，用于组织内容，作为承载其他元素的容器。
- span：无语义，行内元素，用于内联链接、样式
- 行内块：例如img
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Block && Inline</title>
  </head>

  <body>
    <div class="nav">
      <a href="#">link 1</a>
      <a href="#">link 2</a>
      <a href="#">link 3</a>
      <a href="#">link 4</a>
    </div>

    <div class="content">
      <h1>Heading</h1>
      <p>content 1</p>
      <p>content 2</p>
      <p>content 3</p>
      <p>content 4</p>
    </div>
    <span>span 1</span>
    <span>span 2</span>
    <span>span 3</span>
    <span>span 4</span>
    <hr />
    <span>This is a <a href="#">link</a></span>
  </body>
</html>
```

# HTML表单
- form：类似于表格，把内容包含于标签内
	- 属性：
		- action：数据发送到哪里，url
		- method
	- label：与input对应使用
		- for：可以把他绑定到input元素，一般与input的id一致，一一对应。
	- input：单标签
		- id
		- name
		- type：
			- text
			- radio：单选框，name属性一致的只能选一个
			- password：密文
			- checkbox：多选，name一致的为一组
			- submit：提交至action处，value为上面显示的字。
		- placeholder：占位提示
		- value：input的值
![[IMG-20251214150145089.png]]
![[IMG-20251214150145135.png]]