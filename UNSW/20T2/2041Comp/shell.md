# Shell / Command Interpreters.

A Command Interpreter is just one program that executes other programs, and allows users to execute commands on a computer. Its basically the terminal.

They can be **graphical** as well as **command-line**. The **graphical** ones are much easier to learn and understand and they're basically the GUI operating systems we use, the **command-line** ones are the terminals that make the GUI possible - like the unix shell. They are programmable and very powerful. Ex. Bash which has almost become the standard shell.

There are hundreds, thousands of shells.



# How it works.

A shell has a dual purpose, in that it is interactive, and this is its main purpose, but it can also be used as a programming language to write shell scripts. So its mainly desined to be interactive, so it has weaknesses while writing programs.

All shells have the same basic mode of operation.

```pseudocode
loop
	if (interactive) print a prompt
	read a line from user input						// This line could be from the user or it could be from a script file.
	apply transformations to line
	split line into words
	use first word in line as command name
	execure that command using the other words as args.
end
```

The "reading line from user" bit could also be reading from a file that has a bunch of commands in it, and this is how it could be used as a programming language interpreter because its reading a "script" of commands.



## Transformations.

In the loop, there is the line that says "apply transformations to line". These are some instructions that are applied to the input lines.

These transformations can include:

*   variable expansion

    It just expands all the uses of variables, ie replaces the variables with the value we've assigned to it.

    Ex. When we say `${x-20}`, it replaces all the uses of `x` to 20.

    

*   file name expansion

    The shell uses something like regex for file systems, but its not regex, some commands are different, some similar.

    Ex. when we say `*.c`, it expands `*` as all the file names in that directory.

The exact transformations can be seen with `set -x`. This just shows what you put into the command, along with what the shell transforms that into. So all the variable expansions, pathname expansions, etc.



# Writing Shell.

The very first thing we need to do is let the OS know that what follows is not machine code, and that the commands or lines are scripts which need to be read by another program (the shell).

To do this, we say `#!` followed by the path to the interpreter we want to use.

The OS will know that the commands are for some program in some location, and will pass it on to that program.

For shell, that would be:

```shell
#!/bin/sh
```

Could also be for python or perl:

```shell
#!/usr/bin/python or #!/usr/bin/perl
```



## Permissions.

By default, when we make a shell script file (.sh), we only have permission to read/write, but we don't have permission to execute it for security reasons - suppose if we had a dangerous but necessary script that the OS must run, which could damage the system when used incorrectly. This kind of file shouldn't be executed by the user willy-nilly.

We can change this, and we need to change this with the `chmod` command.

```shell
chmod u+x filename.sh    or
chmod 755 filename.sh
```

Also by default, all the lines that follow `#!` will be set to execute immediately. 



## Path.

When we put in commands to the shell, it needs to execute those commands which are seperate programs in the computer, and the shell can't search the entire computer every time we mention some command or program.

The shell has a default PATH which is a list of different directories where the shell will serach for the comands we mention. When it can't find it in all those directories, it will return an error. This path is a variable, a variable that contains a list of directories.

We can see this variable with:

```shell
echo $PATH
```



The programs that are in one of these directories can be run from anywhere, like for ex. the date command (which is a program).

A handy side effect of this is that we can just move some our custom scripts into one of these directories and they can be run from anywhere on the computer.



### Pathname Expansion (GLOB).

The pathname in shell uses GLOB for pathnames which is similar to regex but not quite and much simpler. Only a couple symbols to know.

| symbol | function                                 |
| ------ | ---------------------------------------- |
| *      | matches zero or more of any character.   |
| ?      | matches any one character.               |
| []     | matches any one character between the [] |



## Variables.

Very easy to assign variables, we just put in `var=value`.

To read variables in, we use `read var`.

To use the variable, we use the dollar sign `$`. Wherever we want the variable to be expanded later, we use the dollar sign.

```shell
read x			// read value into x.
y=John			// assign value to y.
echo $x			// display the value of x.
z="$y $y"		// assign two copies of y to z.
```

*** spaces matter in shell, putting a space before and after assignment will not work.**



Variables in shell are typeless, at least in POSIX shell. All data is essentially strings. So theres no difference between `x=1` and `x="1"`. Although these two are different, **there will be variable expansion with double quotes, but no variable expansion with single quotes.**

But when we need to put spaces or tabs into a variable for ex., then we need to use quotes.

We put braces `{}` when we want to specify what part of our command is the variable.

```shell
something interesting.

animal="cat      dog"
echo $animal
>> cat dog            // we put in 4 spaces but it returned the string with one space
					// this is because when shell expanded animals, it gave 2 args to echo
					// and echo just prints all the args that it gets, putting a space between everything.
					// to get the space, we need to mention to echo that it is 1 argument were providing.
echo "$animal"
>> cat       dog

Braces.
// when we want to print something23, with x = something.

x=something
echo ${something}23
```



### Special variables.

| variable | function                                 |
| -------- | ---------------------------------------- |
| $0       | name of the command.                     |
| $1       | first command line argument.             |
| $2       | second command line argument.            |
| $3       | third command line argument.             |
| $#       | number of command line arguments.        |
| $*       | all command line arguments (together).   |
| $@       | all command line arguments (seperately). |
| $?       | exit status of most recent command.      |
| $$       | process ID of this shell.                |





## Conditional operators.

There are the same conditional operators in shell as in C, the conditional AND is what strikes out as most useful. The notation is still the same, for ex.

```shell
gcc filename.c && ./a.out
```





## Exit status and control.

Not too many applications of exit status and returns when using the shell interactively, but when writing scripts..

*   zero exit -> command successful -> true.
*   non-zero -> error occurred -> false.



It can and is used with conditional operators like AND lists or OR lists.

*   `cmd1 && cmd2 && ... && cmdn`. Here the commands after `cmd1` only run if it exits with status 0.
*   `cmd1 || cmd2 || ... || cmdn`. Here the commands after `cmd1` only run if it exits with some error. So run 1 and if it fails, run 2, and so on.



If we want to run some commands sequentially, regardless of its exit status, without passing a program's stdout into the next program's stdin (with pipes), then we just seperate the commands with semicolons, or just execute them one by one with newlines (which is generally encouraged because its more readable).

```shell
cmd1; cmd2; cmd3;
```





## If, then, elif.

Everything in shell are commands or programs, and that's something that catches us off guard. In programming languages, the if statement takes in expressions like `1 < 2` or something. In shell, it takes in a program, and if that program exits with 0 status, the `then` part is executed, or else the `else` part is.

Every if statement starts with an `if` and ends with a `fi`.

```shell
if testList{1}
then
	commandList{1}
elif testList{2}
then
	commandList{2}
    ...
else
	commandList{n}
fi
```

```shell
if ls fred.c 2> /dev/null
then
	if dcc fred.c
	then
		./a.out
	fi
else
	echo hey go ahead and create fred.c
fi
```





## Loops.

Very much like loops in python.



### For loops.

```shell
# program to compile and run every .c file in directory.
#!/bin/sh

for c_file in *.c
do
	gcc "$c_file" && ./a.out
done

# program to see how many lines in every filename passed in as arg.
#!/bin/sh

for arg in "$@"
do
	echo "$arg" has $(wc -l <"$arg") lines
	# the little < symbol is there because wc -l will actually also print the file 
    # name and we get the filename twice. To avoid this, we just pass the contents
    # of that file directly into wc so that it won't know the filename.
done
```





### while loops.

```shell
# program to monitor a certain file, and check if it exists every 2s (of course a real program would check a lot less often)
#!/bin/sh

while test -r file.c
do
	echo file.c is still there # a better indicator would be -> echo -n .
	sleep 2
done

echo Argh!! its gone!

```



With incrementors.

```shell
#!/bin/sh

i=1
while test $i -lt 11
do
	echo $i
	i=$(expr $i + 1)
done
echo finished

# OR this is a newer way of writing expressions.
#!/bin/sh

i=1
while test $i -lt 11
do
	echo $i
	i=$((i + 1))
done
echo finished.

# OR in bash, we can have the < symbol (this is not allowed in POSIX).
# change here.
#!/bin/bash	

i=1
while ((i < 11))
do
	echo $i
	i=$((i + 1))
done
echo finished

# Somthing that's very cool is that there's actually a program called '['.
# this program has the same content as the 'test' program, and so we can write ...
#!/bin/sh

i=1
while [ $i -lt 11 ]		# the '[' program also ignores the extra argument ']'.
do
	echo $i
	i=$((i + 1))
done
echo finished

# we can see where this program is located with 
which [
>> /usr/bin/[
```



Although if we need to do a lot of arithmetic 

# Testing.

`Test` is another program/command and it performs a test or combination of tests and ...

*   0 if test succeeds
*   non-zero if test fails.



Many testing features available. There are many many more features available [here](https://www.linuxtopia.org/online_books/advanced_bash_scripting_guide/tests.html) 

*   string comparison (`= or !=`)

    Exactly what you think.

*   numeric comparison (`-eq -ne -lt`)

    `-eq` if its equal, `-ne` not equal, `-lt` less than,`-le` less or equal, `-gt, ge`, etc.

*   checks on files (`-f -x -r`)

    `-f` if file is a file and not a dir, `-x` if file is executable, `-r` readable, `-e` if file exists.

*   boolean operators (`-a -o !`)