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



Variables in shell are typeless, at least in POSIX shell. All data is essentially strings. So theres no difference between `x=1` and `x="1"`. 

But when we need to put spaces or tabs into a variable for ex., then we need to use quotes.

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
```



