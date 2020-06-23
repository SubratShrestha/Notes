# Perl.

Perl was an interpretted language made by Larry wall and he wanted to just make a language that combined all the things he liked from other languages, and that worked out quite well for him.

Its a replacement for things like `awk, sed, grep` and other programs, but its mainly been very influential in the creation of languages like python PHP and Ruby. Its a superset of sed.

Very useful for scripting, and in smaller hardware, its very difficult to get python or ruby into it, but perl is just much lighter and is usually already installed on unix machines, and can also be used in the command line.

Shell can also be used, and its amazing at that as well. But Perl is just more useful because it can make more complex scripts.

The Perl philosophy is quite different. In other languges if something doesn't fit the design principles of that language, it would be treated as an error to increase readablility and have more consistent code, which is definitely not a bad thing. Perl is different in that there are hundreds and hundreds of ways the same script could have been written. 

We cover Perl 5 and not Perl 6, but Perl 6 is not really adopted because the developers took way too long to come out and people just moved on. But Perl 5 is still more used that Perl 6, and Perl 6 is just very very different to Perl 5.

The really amazing thing about Perl was the very efficient interpreter for Perl right from the start.



## Running Perl.

Its already installed in most Unix systems.

```shell
perl something.pl

# to run on command line
perl -e 'print "Hello world\n"; '
```

Its always advisable to use the `-w` to switch warnings on, and this is something that could be switched off and not something that could be switched on. We can also use strict mode.

Very interesting feature of the warning system is that it can detect possible typos of the programmer. Not foolproof though of course.



## Syntax.

**We can also always install and run perldoc to get more information about some command in perl.**

**Special characters.**

| Char | kind       | desc                                    |
| ---- | ---------- | --------------------------------------- |
| #    | comment    | comment                                 |
| $    | scalar     | variable containing a single value      |
| @    | array      | list of values, integer indexed         |
| %    | hash       | set of values, string indexed (hashmap) |
| &    | subroutine | callable perl code                      |



**Semicolons** after statements.

**Brackets** on function calls are optional.

<STDIN> to get input from stdin. Like all languages, there is a special character at the end of these variables to indicate the end (`\n` for most), and some languages keep them, some don't. Perl keeps them and this is the better choice for more subtle things.

To get rid of those endlines, we use the `chomp $var;` command.

**$ sign** to indicate a scalar value, which is just a single value.

**Always quote your strings.** It does work unquoted but the warning system will say that the string could be a reseved word in the future and that will break the code, and this is a good warning.

**Single quotes** are for just strings, the variables within single quotes are not expanded.



## Logical operators.

All the logical operators are the same as C but with some extra. We can use the words `and`, `or` and `not`, just like python. But they have different precedence.



## Arrays (lists).

They're very similar when accessing values of the array, but can differ when defining them.

The arrays in Perl are dynamic and don't need to be declared. They grow as needed. The missing values in an array are just undefined, and if you try and print it, we get an empty string.

```perl
@a = ("first thing", "second one", 123);

print $a[0];

# this is to get the last element of an array.
print "The number of elements in this array = ", $#a+1, "\n";
```

```perl
# this program will just accept a value into any index and the array grows as needed.
# this can happen until it runs out of memory in which case "Out of memory!" will printed.
while (1) {
	print "Enter array index: ";
	$n = <STDIN>
	# when STDIN can't read the input (ctrl+D), that will be "undefined".
	# if (!$n) would also work but then a 0 with no newline is treated as false as well.
	if (!defined $n) {
		# this is the same as break in C.
		last;
	}
	
	chomp $n;
	$a[$n] = 42;
	print "Array element in $n now contains $a[$n]\n";
	printf ("Array size is now %d\n", $#a+1);
}
```

```perl
# this will re-assign the first 4 values of the array.
@nums = (4, 12, 5, 7, 2, 9);
($a, $b, $c, $d) = @nums;
```

```perl
# this will swap the values of x and y.
($x, $y) = ($y, $x);
```



### Slicing:

There is array slicing in Perl, much like python, only the syntax is different.

```perl
@list = (1, 3, 5, 7, 9);
print "@list[0,2]"			# "1 5"
print "@list[0..2]"			# "1 3 5"
print "@list[4, 2, 3]"		# "9 5 7"
```



### push/pop and shift/unshift.

there's support for push and pop like a lot of other languages.

```perl
@nums = (1, 2, 3);
push @nums, 7;			# array becomes: 1, 2, 3, 7
$x = pop @nums;			# x = 7

shift(@nums);			# x = 1
unshift(@a, 23);		# array becomes: 23, 1, 2, 3 
```



### argv / argc:

argv and argc are similar to shell than to C, the name of the program is stored in `$0` and the array of arguments is stored in `@ARGV`.

Of course since we're no longer in C, we can just use `$#ARGV +1` or even something like `scalar(@ARGV)`



## Loops in Perl.

Loops have the same syntax as any other language, just with some special characters for varibles and stuff. But there is the `foreach` which was new at the time, and this works just like the for loops in python, where we have a variable for each instance of a "list".

```perl
foreach $arg (@ARGV) {
	print "$arg ";
}
print "\n";

# this is kinda dumb because it can be written as:
print "@ARGV\n";			# because the default delimiter in this case is space.



# Perl also comes with the join function, also taken by python.
$string = join ", ", @ARGV;
print "$string\n";

# something like this would also work just fine.
print join(", ", @ARGV), "\n";
```





## Context.

This is a rather strange feature of Perl, and its that the value of something depends on the context of the line.

```perl
# the context is the left hand side of a line.
@a = ("abc", 123, "x");

# scalar context gives length of array.
$n = @a;							# gives 3

# scalar context gives space seperated elements.
$s = "@a"							# gives "abc 123 x"

# we can also concatenate strings with the dot operator.
$t = @a.""							# gives "3". Here the array is concatenated with empty string.

# list context gives joined elements.
print @a;							# gives "abc123x"
```





## Examples.

```perl
## Pythagoras theorem in Perl.

#!/usr/bin/perl -w
print "Enter x: ";
$x = <STDIN>
chomp $x;

print "Enter y: ";
$y = <STDIN>
chomp $y;

$pyth = sqrt $x * $x + $y * $y;
print "The root of $x squared + $y squared is $pyth\n";

__________________________________________________________
## program to sum up everything in stdin using while loops.

#!/usr/bin/perl -w
while ($line = <STDIN>) {
	$sum += $line;
}
print "sum = $sum\n";


## strings vs. numbers in Perl.

#!/usr/bin/perl

# all of this will print 42.
# the last one only works without warnings.
$sum =  "22" + '20';
$sum =  "22" + 20;
$sum = "22" + "20 cause error?";

__________________________________________________________
## Program to just count the number of lines in input.

$count = 0;
while (1) {
	$line = <STDIN>
	# backwards form of an if statement, also taken by python.
	last if !defined $line;
	$count++
}
print "$count lines.\n";

## this can be shortened by a lot.
@lines = <STDIN>;
print $#lines +1, " lines\n";

## this can also be written as:
() = <STDIN>;
print "$. lines\n";				# the $. here is just a count of how many inputs have been collected.
							  # weird syntax.
```

