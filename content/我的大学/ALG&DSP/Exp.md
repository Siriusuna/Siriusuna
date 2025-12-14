# Notes

## 数组

**注意：** 如果把一个二维数组作为参数，则在函数定义中，形参数组的说明中必须指
明列的数目，而行的数目可空着不写。以此类推，对于三维及以上数组，其作为参
数传递时，形参说明中只能省略`最内层`的维数。

## `fgetc`

**注意：** 最好把该函数的值赋给整型变量。因为` fgetc` 会在文件末尾返回 EOF(-1)。

## KMP 算法


## DFS 注意事项

```c
void dfs(int dif, int num, int depth)
{
    for (int i = depth; i < n; i++)
        if (!used[i])
        {
            used[i] = 1, dif += set[i];
            dfs(dif, num + 1, i + 1);
            used[i] = 0, dif -= set[i];
        }
}
```

如果搜索的内容不要求顺序，也即不同顺序视为同种排列，则可以每次令深度(depth)等于本层选择的序号+1，下一次就从后一个开始扫，做到不走回头路。见`Codeforces 306 div2 B.c`。

## 回文串

**有关于回文串，要记住：**

- 单个字符一般也是回文串。
- 回文串分两种:有心的(奇数长度)、无心的(偶数长度)。
  > 所以判断的时候分两种：如果和邻位相同，就考虑判断是不是无心的；但无论如何都尝试一下有心的，即从所指向两边判断。否则`ccc`会被误判。

Codes：

```c
if (s[1] == 0)
    return s;
for (int i = 0; s[i] != 0; i++)
{
    if (s[i] == s[i + 1])
    {
        int j = i, k = i + 1;
        while (j > 0 && s[k + 1] != 0 && s[j - 1] == s[k + 1])
            j--, k++;
        if (k - j + 1 > length)
        {
            length = k - j + 1;
            strncpy(ret, &s[j], length);
        }
    }
    int j = i, k = i;
    while (j > 0 && s[k + 1] != 0 && s[j - 1] == s[k + 1])
        j--, k++;
    if (k - j + 1 > length)
    {
        length = k - j + 1;
        strncpy(ret, &s[j], length);
    }
}
```

### 括号串

```c
bool canBeValid(char* s, char* locked) {
    int length = strlen(s);
    if (length % 2 != 0)
        return false;
    else if ((s[0] == ')' && locked[0] == '1') ||
             (s[length - 1] == '(' && locked[length - 1] == '1'))
        return false;
    int i = 0;
    int balan = 0;
    while (i < length) {
        if (locked[i] == '1' && s[i] == ')')
            balan--;
        else
            balan++;
        i++;
        if (balan < 0)
            return false;
    }
    i = length - 1, balan = 0;
    while (i >= 0) {
        if (locked[i] == '1' && s[i] == '(')
            balan--;
        else
            balan++;
        i--;
        if (balan < 0)
            return false;
    }
    return true;
}
```

这是有技巧的。括号串要求的也是对称性，因此可以循环两次判断是否满足左比右多且右比左多。  
还有一件事就是：注意检查的时效性，我们需要任意字串要么是平衡的，要么是多一个'('。  
因此要在`每次`循环中检查。