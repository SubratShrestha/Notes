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



Another thing that catches a lot of people is when we run other scripts from a script file.

```shell
# in /some/dir/set
cat a.sh
#!/bin/sh
./b.sh

cat b.sh
#!/bin/sh
echo hello

./a.sh
>> hello


# renaming directory "set" to "scripts"
./a.sh
>> set/b.sh not found.


# fixing it
```





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



## Passing variables within shell files.

To set some variable between shell scripts, we use the `export` program. Every shell file used after this program will have the same variables as the current shell.



## Variable Scope.

By default, the variables in functions are actually **global**. This is not good at all, but it is what it is.

```shell
even() {
	n=$1
	remainder=$((n % 2))
	if test $remainder = 0
	then
		return 0
	else
		return 1
	fi
}

remainder=42

even $2

echo $remainder                     # this will print 0
```



We can use a widely accepted keyword `local` to make a variable local to the function.

```shell
even() {
	n=$1
	local remainder
	remainder=$((n % 2))
	if test $remainder = 0
	then
		return 0
	else
		return 1
	fi
}

remainder=42

even $2

echo $remainder                     # this will print 42
```





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

A special thing to remember is that loops in shell can also be piped, which can come in handy.

One thing to be very careful of while doing this is that since all the programs in a pipeline run on seperate shells, the variables we create don't transfer over.



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
# Program to monitor a certain file, and check if it exists every 2s 
# (of course a real program would check a lot less often)
#!/bin/sh

while test -r file.c
do
	echo file.c is still there # a better indicator would be -> echo -n .
	sleep 2
done

echo Argh!! its gone!


# example for piping after a loop.
# notice the value of i in the end.
#!/bin/sh

i=0
while [ $i -lt 40 ]
do
	echo $i
	i=$((i + 1))
done |
grep -E '[6-9]' |
sort -r 

echo i = $i  # i = 0, this is because the value of i will not transfer over.

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



Although if we need to do a lot of arithmetic, we should probably shift to using a much more powerful scripting language like python.

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



Testing usually involves making test data that we work on. Something that's very useful for this is the `<<eof`. This means until you see the `eof` string, everything that's within is outputted into a file.

Here the 'eof' can be anything, it doesn't matter at all but the quotes around it does.

**When there is a quote around it, the variables inside ($i) will not be expanded.**

but without quotes, everything with the $ sign will be expanded and treated like a shell variable.

```shell
cat >main.c <<'eof'
#include <stdio.h>
int main(void) {
	return 0;
}
eof
```



## Functions.

Very similar syntax to C. They have return values, but they are quite simple being non-zero for error and 0 for success with `return` but if there is no return statement, the return value is the return value of the last command in the function.

```shell
#!/bin/sh

repeat_message() {
	n=$1
	message=$2
	
	for i in $(seq 1 in $n)
	do
		echo "$i: $message"
	done
}

repeat_message 5 "Hello."
```



* function to determine odd or even.

```shell
#!/bin/sh

even() {
	n=$1
	remainder=$((n % 2))
	if test $remainder = 0
	then
		return 0
	else
		return 1
	fi
}

## even could be:
even() {
	return $(($1 % 2))
}

for i in $(seq 1 20)
do
	if even $i
	then
		echo $i is even
	else
		echo $i is odd
	fi
done
```



We cannot return a string or something, only numbers. To return strings, we just need to use `echo`.

```shell
#!/bin/sh

even() {
	if test $(expr $1 % 2) -eq 0
	then
		echo even
	else
		echo odd
	fi
}

for i in $(seq 1 20)
do
	echo $i is $(even $i)
done
```





## Examples.

* Program to compile every single `.c` file in directory and save the executable name as filename but without the `.c`

* also deals with case when some files don't have a main function, and when there is a seperate `.h` file that the `.c` file includes.

```shell
#!/bin/sh

for c_file in *.c
do
	if grep -w main "$c_file" >/dev/null
	then
		binary="$(basename "$c_file" .c)"
		arguments="$c_file"
		if grep some_h_file.h "$c_file" >/dev/null
		then
			arguments="$arguments some_h_file.h"
		fi
		
		gcc $arguments -o "$binary"
	fi
done
```



* Example to check for vacancies in the unsw website for 2041.
* This will search the site every 20 seconds for a number that's not 0 in the 
* COMP2041 part of the site. 20s here is a bit too often and of course, we need
* to look through the html formatting to find the best way to extract info..

```shell
#!/bin/sh

course="$1"
url="$2"

while true
do
	if curl -s "$url" | egrep "$course" | egrep -v ">0<" >/dev/null
	then
		echo You can enroll now.
		exit
	fi
	sleep 20
done
```



* Example to rename all upper case filenames to lower case in a directory.
* this probably won't work in wsl or macOS because of case insensitivity, works fine on linux though.

```shell
#!/bin/sh

for file in "$@"
do
	new_filename=$(echo "$file" | tr A-Z a-z)
	test "$file" = "$new_filename" && continue
	
	if test -e "$new_filename"rm *
	then
		echo "$new_filename already exists, exiting program."
		exit 1
	fi
	
	# The double dash after any command in unix means everything that follows is an argument and not flags. 
	# Its here to prevent mv from treating a file named "-some_name" as an argument and not a flag.
	mv -- "$file" "$new_filename"
done
```



* Example for a plagiarism detector which goes through a directory of C files and determines which two files are the same.

```shell
#!/bin/sh

# this transform to get rid of all comments (lines starting with /), and replacing all things that look 
# like variable names to 'var'.
transform='s/\/\/.*//g;s/[a-zA-Z_0-9]*/var/g'

# temporary files within the tmp directory to store the two files in question in.
# the $$ indicates the process number the program is currently running with, and this to prevent a clash when 
# two instances of the same program are run at the same time.
TMP1=/tmp/find_copies$$
TMP2=/tmp/find_copies2$$

for file1 in "$@"
do
	for file2 in "$@"
	do
		test "$file1"="$file2" && continue
		# since the order of the functions don't really matter, and can be interchanged, we sort the lines.
		sed "$transform" "$file1" | sort >$TMP1
		sed "$transform" "$file2" | sort >$TMP2
		if diff -iBw $TMP1 $TMP2 >/dev/null
		then
			echo "$file1 "$file2" are the same
		fi
	done
done

rm $TMP1 $TMP2

# ========= A better approach.
# Something to note beforehand is that the hash of two files that are the same will be the same.
# We can first remove variables and comments and sort the file like before but then instead of doing an
# O(n^2) search, we can hash the files and if their hashes are the same, we know the contents of 
# the files are also the same.

#!/bin/sh

transform='s/\/\/.*//g;s/[a-zA-Z_0-9]*/var/g'

for file in "$@"
do
	# md5sum is the hashing algorithm, not the most secure hashing algorithm in terms of cryptography now, but 
	# it produces a hash that can't be replicated very easily, so it gets the job done just fine.
	hash=$(sed "$transform" "$file" | sort | md5sum)
	echo $hash $filename
done |
sort |

# this uniq command is off the man page, it compares the first 32 chars of the previous output (only the hash)
# and also reports duplicates seperately.
uniq -w32 -d -all-repeated=seperate
```



*  Shell script to make 100,000 C program files for testing.

```shell
#!/bin/sh

n_files=99
# creating 100 files with a function and a return.
for i in $(seq -w 0 $n_files)
do
	cat >file$i.c <<eof
int f$i(int a) {
return a;
}
eof
done

cat >main.c <<'eof'
#include <stdio.h>
int main(void) {
int i = 0;
eof

for $i in $(seq -w 0 $n_files)
do
	cat >>main.c <<eof
extern int f$i(int);
eof
done

for $i in $(seq -w 0 $n_files)
do
	# notice here that we use the append sign (>>).
	cat >>main.c <<eof
	# getting rid of leading 0s. But we can't do 's/^0*//' because it will turn the number '0' to nothing.
	$j=$(sed 's/^0*\([1-9]\)/\1/')
i += f$i($j);
eof
done

cat >>main.c <<'eof'
	printf("%d\n", i);
	return 0;
}
eof
```

