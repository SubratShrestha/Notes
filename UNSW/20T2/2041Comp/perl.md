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

**<$stream>** will take the input from a stream, could be stdin, or we could open a file and make that the stream.

**$ sign** to indicate a scalar value, which is just a single value.

**Always quote your strings.** It does work unquoted but the warning system will say that the string could be a reseved word in the future and that will break the code, and this is a good warning.

**Single quotes** are for just strings, the variables within single quotes are not expanded.

**<>** is the diamond operator. Without a stream inside is special, it acts like a linux filter. If arguments are given to it, then it treats them like files and we can open them and what not. But when values are given in stdin, it defaults to using them as stdin.

**=~** is how we apply regex to a variable or a bare string. Depending on what we're doing with the regex, it may or may not affect the string. Like a normal matching wouldn't affect the variable or string `($string =~ /\S+/)` but we can also do replacement and what not, which will change the string.



### True and false in Perl.

Almost everything in Perl is set to true, strings, non-zero numbers, newline characters, etc. 

Empty strings in Perl are considered false, and anything that resembles a zero is also set to false.

Weirdly though `0, 0.0, "", "0"` are all false, but then `"0.0"` is true.

Be careful though because if someone enters 0 as a number from STDIN, that will be treated as false, that's why we need to use the `defined` keyword.

```perl
$a = 0.0;
print "a = $a\n"

if ($a) {
	print "This is true\n"; 
} else {
	print "This is false\n";
}
```



## Logical operators.

All the logical operators are the same as C but with some extra. We can use the words `and`, `or` and `not`, just like python. But they have different precedence.



## Arrays (lists).

They're very similar when accessing values of the array, but can differ when defining them.

The arrays in Perl are dynamic and don't need to be declared. They grow as needed. The missing values in an array are just undefined, and if you try and print it, we get an empty string.

Perl arrays are very well made, almost all operations on perl arrays are of O(1), so operations like push, pop, shift, unshift are all done in constant time, independent of the size of the array.

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



### Reversing arrays.

There is a reverse function that reverses an array for us.

```perl
@lines = <STDIN>;
print reverse @lines;

# we can also do:
print reverse <STDIN>;

# we can also do this with push and pop.

# yes, we could do this in one line, but a while loop is just so much more flexible.
# maybe we want to do something to the lines, maybe skip some, etc.
while ($line = <STDIN>) {
	push @lines $line;
}

while (@lines) {
	print pop @lines;				# shift would print the array in order.
}

# another way:
while ($line = <STDIN>) {
	unshift @lines, $line;			# inserting in reverse order.
}
print @lines;
```



### sorting arrays.

sorting is very similar to the sort in the shell.

```perl
@lines = <STDIN>;
print sort @lines;
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





## File Handling.

We need a variable that holds a stream of bytes, specify input or output, and then specify a pathname.

```perl
# input / output just like shell.
open my $in, '<', $ARGV[0];


# that's all good but always check if any request to the OS failed or succeeded.
# you will sleep better at night.
# to do that, we can use the 'or' operator, which btw is different to '||'.

open my $in, '<', $ARGV[0] or die "$0: open failed: $!";
while ($line = <$in>) {
	print $line;
}

# the die command exits the program with some message.
# $0 is the current filename (useful when dealing with multiple files).
# #! is a special variable that holds the error message given by the OS.
```

```perl
$infile = ARGV[0];
$outfile = ARGV[1];

open my $in, '<', $infile or die "$0: open of $infile failed: $!\n";

open my $out, '>', $outfile or die "$0: open of $outfile failed: $!\n";

while ($line = <$in>) {
	# printing every line from input into output file.
	print $out $line;
}

close $out;
close $in;
```



## External Programs.

We can run any external program we want from Perl, which is very powerful, because we have all the tools that unix provides.

Be very careful providing external strings (from other files you didn't write) being passed into the `system` keyword, because everything that's passed into the `system` keyword is passed into a shell.

Just don't put anything that's not trustworthy into the `system` keyword.

Another reason why script files are not executable by default.

```perl
system "date";
>> some date.

# note that perl meta characters are expressed in the quotes.
system "date;echo hi perl.";
>> some date.
>> hi perl.
```



## Pipe mode.

We can also use the pipes from the shell in a perl script. 

We use `-|` to say take the stream of bytes coming the stdout of some program, and we use `|-` to get the stream of bytes that will go into the stdin of some program. That would let us give some stream of bytes that get put into the stdin of the program.

Doing both introduces some problems, so the best way to handle that is to write all our inputs into a file and run the program taking input from that file. 

The problem is called "deadlock", research that when you get some time.

```perl
# something more complex can easily be put here since its passed to a shell.
open my $f, "-|", "date";
$date = <$f>;
print "Date is $date\n"
```





## Associative Arrays (Hashes).

Perl calls this hashes, python calls it dicts, objects in js, they're hashmaps with key-value pairs.

```perl
%days = ( "Sun" => "Sunday",
		 "Mon" => "Monday");

$days{"Sun"}
$days{"hello"}                             # undefined (interpreted as "").
$days{"hello"} = "hello and welcome";      # adding pairs.
```



use `keys` to get the keys for a hash.

```perl
foreach $x (keys %g) {
	print "$x => $g{$x}\n";				# prints Anne => red or something.
}
```

Note that when using the `keys` keyword, we get a non-deterministic order of keys, so almost random order, so using just `keys` isn't the best idea. Always use `sort keys` to get deterministic output. 





getting only keys or values

```perl
foreach $key (keys %myHash) {
	print "($key)\n";
}

foreach $val (values %myHash) {
	print "($val)\n";
}
```







## Perl Regex.

They are very important to the language, and they can be used anywhere like conditional statements or loops.

```perl5
if ($name =~ /[0-9]/) {
	print "name contains a digit."
}
```



sed and tr are also back.

```perl
$name =~ s/Mc/Mac/;
$string =~ tr/a-z/A-Z/;
```



Perl also extends the POSIX standard with character classes.

```perl
\d                  # matches any digit.
\D                  # matches any non-digit.
\w                  # matches any "word" char like [a-zA-Z_0-9].
\W                  # matches any non "word" char like [^a-zA-Z_0-9].
\s                  # matches any whitespace like [\t\n\r\f].
\S                  # matches any non-whitespace.

\b                  # is a word boundry, like 
                    # \bi -> starts with i
                    # i\b -> ends with i
                    # \bi\b -> matches words with just i 
                    # (all this is wordwise so -i counts because 
                    # '-' is not a word char) (look at \w for word chars).
```



misc. additions

```perl
patt*               # will match 0+ occurances of patt.
patt+               # will match 1+ occurances of patt.
patt?               # will match 0 or 1 occurance of patt.
patt{n, m}          # will match between n and m occurances of patt.
```



capture groups in perl are just `()`, without escape characters like in `sed`.

```perl
# matches anything with 8 word chars, followed by some whitespace (whatever that may be), followed by anything really.
# also always put `die` after pattern matches because pattern matches almost always fail at some point.
$line =~ /(\w{8})\s+(.*)/ or die "help";
```





## Examples.

* Pythagoras theorem in Perl.

```perl
#!/usr/bin/perl -w
print "Enter x: ";
$x = <STDIN>
chomp $x;

print "Enter y: ";
$y = <STDIN>
chomp $y;

$pyth = sqrt $x * $x + $y * $y;
print "The root of $x squared + $y squared is $pyth\n";
```



* program to sum up everything in stdin using while loops.

```perl
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



* Program to just count the number of lines in input.

```perl
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



* Program like cp that copies every line from one file to another.

* note the use of context here, since @ARGV (entire array) is being compared to a scalar, perl treats @argv as a scalar which ends up being the number of elements.

```perl
die "Usage: cp.pl <source> <destination>\n" if @ARGV != 2;

$infile = ARGV[0];
$outfile = ARGV[1];

open my $in, '<', $infile or die "$0: open of $infile failed: $!\n";

open my $out, '>', $outfile or die "$0: open of $outfile failed: $!\n";

while ($line = <$in>) {
	# printing every line from input into output file.
	print $out $line;
}

close $out;
close $in;

system
## we could also do this instead of lines 14-18.
# but of course this wouldn't work for large files like TBs worth of text. 
@lines = <$in>;
print $out @lines;

```



* storing every course code and name in `course_codes`.

```perl
#!/usr/bin/perl -w

open my $f, '<', "course_codes" or die "$0 cannot open: $!\n";

while ($line = <$f>) {
	chomp $line
	$code = substr($line, 0, 8);        # slicing string from 0 - 8th character.
	$name = substr($line, 9);           # slicing string from 9th - last character.
	$course{$code} = $name;
}

while ($enrollment = <>) {              # reading from file.
	$code = substr($enrollment, 0, 8);
	$enrollments{$code}++;
}

for $code (sort keys %enrollments) {    # almost always use sort keys because below.
	print "$code $enrollments{$code}\n";
}
```

We almost always use `sort keys` because using just `keys` produces indeterminant outputs because the location in memory is always shuffled around to prevent malicious behaviour that depends on knowing exactly where something will be stored.





* Example to make a hashmap out of enrollment data.

	```perl
	open my $f, '<', "course_codes" or die "$0: cannot open file: $!\n";
	
	while ($line = <$f>) {
		chomp $line;
		$line = /(\w{8})\s+(.*)/
		$course{$1} = $2;
	}
	```



* Example to get all the firstnames in enrollment data either from stdin or from a file, avoid duplicates.

	```perl
	# the data:
	#    COMP9999|5123456|Lastname, Firstname, Middlenames|3778|COMPA1|WAM|...
	
	while ($enrollment = <>) {
		@fields = split(/\|/, $enrollment);  # careful, '|' is a metacharacter for alteration.
		$zid = $fields[1];
		
		next if $seen{$zid};
		$seen{$zid}++;
		
		$name = $fields[2];                  # like cut, but index of arrays.
		$name =~ /, (\S+)/;                  # anything but whitespace.
		$firstname = $1;                     # first thing we captured.
		
		print "name = $name\n";
		print "first name = $firstname\n";
	}
	```

	

* Example to get the count of occurances of a firstname in every course, print the names that occur more than once in a course code.

	```perl
	# same data as last example.
	
	while ($enrollment = <>) {
		@fields = split(/\|/, $enrollment);  # careful, '|' is a metacharacter for alteration.
		$zid = $fields[1];
		$name = $fields[2];                  # like cut, but index of arrays.
		$course_code = $fields[0];
		
		next if $seen{$zid};
		$seen{$zid}++;
		
		$name =~ /, (\S+)/;                  # anything but whitespace.
		$firstname = $1;                     # first thing we captured.
		
		$nc{$course_code}{$firstname}++;
	}
	
	foreach $code (sort keys %nc) {
		foreach $fn (sort keys %{$nc{$code}}) { # the %{  } is a cast into hash.
			next if $nc{$code}{$fn} < 2;
			printf("%s has %4d students named %s\n", $code, $nc{$code}{$fn}, $fn);
		}
	}
	
	
	```



* Example to find all numbers from a string with words (or just plain numbers), and get the mean and total of them.

	```perl
	@lines = <>;
	$input = join "", @lines;
	
	@numbers = $input =~ /-?\d+\.\d+?/g;
	# I used some whacko shit like:
	# @nums = $line =~ /[+-]?\d+\.?\d*/g;
	# that was much more elaborate though, with +-, decimals, etc.
	
	foreach $number (@numbers) {
		next if $number eq "";
		$total += $number;
		$n++;
	}
	
	exit if !$n;
	printf "$n numbers: total = $total, mean = %s\n", $total/$n;
	```
	



* Example to find the last number in a line and print it out.

	```perl
	# input: 32 hello there you look about 46.
	# >> 46
	
	# Normal loop:
	while ($line = <>) {
		@numbers = $line =~ /-?\d+\.?\d+?/g;
		print "$numbers[$#numbers]" if @numbers;
	}
	
	# We can even do this with a single regex.
	while ($line = <>) {
	# if there are some numbers, followed by 0 or more non-digit chars, 
	# and then end of line, then capture it.
		if ($line =~ /(-?\d+\.?\d+?)\D*$/) {
			print "$1";
		}
	}
	```

	