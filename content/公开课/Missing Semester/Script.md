### Declare a Variable
e.g. `foo=bar`
**NO SPACES.**

### Programming
`vim`

### About `$`
- `$0` - Name of the script
- `$1` to `$9` - Arguments to the script. `$1` is the first argument and so on.
- `$@` - All the arguments
- `$#` - Number of arguments
- `$?` - Return code of the previous command. `0` for OK and `1` for ERROR.
- `$$` - Process identification number (PID) for the current script
- `!!` - Entire last command, including arguments.
	- A common pattern is to execute a command only for it to fail due to missing permissions; you can quickly re-execute the command with `sudo` by doing `sudo !!`
- `$_` - Last argument from the last command. 
	- If you are in an interactive shell, you can also quickly get this value by typing `Esc` followed by `.` or `Alt+.`
### Logical operator

```bash
false || echo "Oops, fail"
# Oops, fail

true || echo "Will not be printed"
#

true && echo "Things went well"
# Things went well

false && echo "Will not be printed"
#

true ; echo "This will always run"
# This will always run

false ; echo "This will always run"
# This will always run
```

### Get the output of a command as a variable
-`$()`:
```bash
zhonghan-wang@zhonghan-wang-VMware-Virtual-Platform:~$ foo=$(ls)
zhonghan-wang@zhonghan-wang-VMware-Virtual-Platform:~$ echo $foo
1.txt 2.txt Desktop Documents Downloads mcd.sh Music Pictures Public snap Templates Videos
```
-`<()`:
Place the output in a _temporary file_ and substitute the `<()` with that file’s name.
Handy when a command need a file as argument or input from files instead of `stdin`.
```bash
zhonghan-wang@zhonghan-wang-VMware-Virtual-Platform:~$ cat <(ls) <(ls ..)
1.txt
2.txt
Desktop
Documents
Downloads
mcd.sh
Music
Pictures
Public
snap
Templates
Videos
zhonghan-wang
```
