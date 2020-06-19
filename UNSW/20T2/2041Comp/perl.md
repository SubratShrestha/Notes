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
```

