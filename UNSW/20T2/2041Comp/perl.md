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
| &    | subroutine | evaluate perl (subroutine)              |



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

**\\** when next to a variable acts like the **&** operator in C, it gives the address of a variable as well as the type of the varaible. `$r = \@a` will return `ARRAY(0x563abb...)`, and **$$r[3]** will return the 3rd value in array a.





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



We can also use the `qw` operator to quote words quickly.

```perl
@days = ("Sunday", "Monday", "Tuesday" ...);
@days = qw/Sunday Monday Tuesday Wednesday Thursday Friday Saturday/;
```



Use `rand` to get a random index in arrays, its useful sometimes, especially when generating synthetic data.

```perl
sub random_day {
	return $days[rand @days]l
}
push @random_days, random_day() foreach 1..5;
```





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



### Splitting and joining

Split is kinda like cut in the shell, it will split the string by some delimiter, but its a lot better because it splits with a regex, and not some char like cut.

Join will just join different strings into one with a delimiter.

```perl
@a = split("[,:;]+", "2,,,4;;;8::::16"); # a = [2,4,6,8]
```



### Array sizes

Unlike in C, we actually have access to the size of arrays from just the pointer to it. To get the size of an array from the pointer to it, we can just do `$#$aref`. Not true in C, if we wanna use the size of an array in C, we need to pass the size along into the function, and if we don't, we get a whole bunch of security errors related to overwriting values in memory.



## Sorting

sorting is very similar to the sort in the shell.

```perl
@lines = <STDIN>;
print sort @lines;
```



Now sorting in perl by default is by dictionary order, so if you did something like `@a = sort @ARGV;`, and gave it a bunch of words, it would dictionary sort them in `a`, but the trouble with perl is that there are no types, so when we give it a bunch of numbers, it will treat them as strings and sort them in dictionary order.

To deal with that, we need to give it some sort of comparison function like with `qsort` in C, but its much easier and shorter (but slower) in perl.

For numerical comparisons, we can use the `<=>` operator which treats two variables as numbers, compares their values, and returns it to the `sort` function.

The string counterpart to `<=>` for comparing strings (which perl chooses by default) is the `cmp` operator.

There are two special variables `$a` and `$b` which are the things perl will compare.

```perl
# numerical sort.
@a = sort {$a <=> $b} @ARGV;

# dictionary sort.
@a = sort @ARGV;  # or
@a = {$a cmp $b} @ARGV;

```



Both `<=>` and `cmp` will return a negative number if `second > first`, positive if `first > second`, and 0 if they're equal.

```perl
# run this to see whats going on behind the scenes.
@a = sort {print "a = $a | b = $b\n"; $a <=> $b} @ARGV;
```



Perl 5.6 and earlier used quicksort, but with some defences against the worst case O(N^2) case with some extra shuffling before sorting in perl 5.8. There's also a mergesort available from perl 5.8 on.



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



Always be very careful reading and writing from files, its very very easy to lose everything, so always keep backups ready.

Note when we write something like `open my $f, '>', $filename`, the '>' there is the linux truncate '>' which deletes everything in a file as soon as its executed.

Example: Swap every occurance of "Harry" to "Hermione".

```perl
# This here almost works, but it deletes everything in the files.
# Because on line 7, we open the file for output, and the '>' will truncate
# everything, and we won't have any input from the files.
# Everything is deleted as soon as line 7 executes.
foreach $filename (@ARGV) {
	open my $f, '<', $filename or die "can't open file";
	open my $g, '>', $filename or die "can't open file";
	
	while ($line = <$f>) {
		$line =~ s/Harry/Hermione/g;
		$line =~ s/Hermione/Harry/g;
		print $g $line;
	}
	close $f;
	close $g;
}
```



Always use temp files when you need to write to files, unless you're making a new file.

Now lets say we fixed the error and we're using temp files.

```perl
foreach $filename (@ARGV) {
	$tmp_filename = "$filename.new";
	open my $f, '<', $filename or die "can't open file";
	open my $g, '>', $tmp_filename or die "can't open file";
	
	while ($line = <$f>) {
		$line =~ s/Harry/Hermione/g;
		$line =~ s/Hermione/Harry/g;
		print $g $line;
	}
	close $f;
	close $g;
	rename $tmp_filename, $filename or die "can't rename";
}
```

This will still not work, there will be 0 occurances of "Hermione". That's because we're changing "Harry" to "Hermione" on line 7, then changing all "Hermione" to "Harry" (incl. ones we just converted in previous line).

To avoid this, we just change "Harry" to something that doesn't occur in the text, change "Hermione" to "Harry", and change the temp to "Hermione".

```perl
foreach $filename (@ARGV) {
	$tmp_filename = "$filename.new";
	die "temp already exists" if -e $tmp_filename;
	open my $f, '<', $filename or die "can't open file";
	open my $g, '>', $tmp_filename or die "can't open file";
	
	while ($line = <$f>) {
		$line =~ s/Harry/shitcunt/ig;
		$line =~ s/Hermione/Harry/ig;
		$line =~ s/shitcunt/Harry/ig;
		print $g $line;
	}
	close $f;
	close $g;
	rename $tmp_filename, $filename or die "can't rename";
}
```



We can do this without temp files if by including the '>' line towards the end, so we only replace the file when we're done with computing our replacements and what not. We can also use an array to store the works of the novels, which may seem like a waste of memory, but its really no big deal with the amount of memory and processing power in our devices.

```perl
foreach $filename (@ARGV) {
	open my $f, '<', $filename or die "can't open file";
	@lines = <$f>;
	
	$novel = join "", @lines;

	$novel =~ s/Harry/shitcunt/ig;
	$novel =~ s/Hermione/Harry/ig;
	$novel =~ s/shitcunt/Harry/ig;
	
	open my $g, '>', "$filename" or die "can't open file";
	print $g, $novel;
	close $g;
}
```



We can go another step forward, and use a weird perl shortcut, which is the `-i` flag in perl, which can do some inplace changes to files. It makes temporary backups of files behind the scenes.

```perl
#!/usr/bin/perl -w -i

while ($line = <>) {
	$line =~ s/Harry/shitcunt/ig;
	$line =~ s/Hermione/Harry/ig;
	$line =~ s/shitcunt/Harry/ig; 
	print $line;
}
```



Going further, the variable `$_` is the default variable in perl, and when variables are missing, perl defaults to using `$_`.

 ```perl
#!/usr/bin/perl -w -i

while (<>) {
	s/Harry/shitcunt/ig;
	s/Hermione/Harry/ig;
	s/shitcunt/Harry/ig; 
	print;
}
 ```



`$_` is quite useful, not for readability though.

That loop we used to go through all of the data and print it using the `$_` variable is used very frequently, so much so that perl has a flag for it as well, `-p` writes the standard loop behind the scenes and we only need to provide the replacements, it also prints for us.

```perl
#!/usr/bin/perl -w -p -i

s/Harry/shitcunt/ig;
s/Hermione/Harry/ig;
s/shitcunt/Harry/ig;
```



We can just do this much in the command line.

```perl
perl -pi -e 's/Harry/shitcunt/ig;s/Hermione/Harry/ig;s/shitcunt/Harry/ig;' hp?.txt
```



There's also a way to do all that in one regex but that's quite complicated and unreadable, but -pi is right in the perldocs.



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

Perl regex by default uses 'greedy' solutions. That means it tries to match as much as possible without being incorrect.

Like the regex `(.*),(.*)` (the parenthesis are the capture characters, the thing in the brackets will be stored in variables `$1, $2, $3...`) for the string "1,2,3,4,5" will be `$1 = 1,2,3,4`, and `$2 = 5`.

The regex matched as many commas as it could without being incorrect, because its a greedy algorithm.

Often we want the opposite behaviour, we can use the symbol `?` to specify this.

`(.*?),(.*)` to string "1,2,3,4,5" will match `$1 = 1, $2 = 2,3,4,5`.

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





## Functions

Functions are defined by keyword `sub`, short for `subroutine` which is a very old term for functions. They return the value of the last evaluated expression by default, which shouldn't ever be used. There is a regualar `return` keyword.

Passed arguments will be stored in special variable `@_`. Passing the arguments in doesn't need the parenthesis, but its just good practice to include them for functions that are user defined. Make sure to give the array of args sensible names with a list assignment, because `$_[2]` is just unreadable.

Be careful with functions in perl, the default scope of a variable is global, no clue why. But we fix this with the `my` keyword before a variable name, but this is pretty much broken as well because the `$my` vaiable makes the scope until the next closing brace (like let in js).

Another thing to note is the the mapping inside functions (like line 5 in below example). That works really well and its pretty, but we can run into problems if we try and assign two arrays simultaneously, like:

```perl
sub f {
	(@a, @b) = @_;
}

@a = (1,2,3,4,5);
@b = (6,7,8,9,0);
f(@a, @b)
```

All of the `@_` will be assigned to `@a` and nothing to `@b`.

That's a problem with passing multiple arrays into a function in perl, the `@_` will actually combine both of the arrays into one, instead of having an array of 2 arrays.

Many ways to avoid problem, a clean way is to pass the address of an array instead. We can get the address using the `\` operator, and we can derefernce an array with `@`.

```perl
sub f {
    ($aref, $bref) = @_;
    print "a = @$aref\n";	  # dereferencing.
    print "b = @$bref\n"; 
}

@a = (1,2,3,4,5);
@b = (6,7,8,9,0);
f(\@a, \@b);				# passing addresses to arrays.
```

Also note that the order is very important:

```perl
# this will cause an error because all the values in @a and the value $b
# is in one array, all of which will go into @arr, and $b will be uninitialized.
sub f {
    (@arr, $b) = @_;
    print "a = @arr\n";
    print "b = $val\n"; 
}

@a = (1,2,3,4,5)
$b = -23;
f(@a, $b);


# this will work just fine.
sub f {
    ($val, @arr) = @_;
    print "a = @arr\n";
    print "b = $val\n"; 
}

@a = (1,2,3,4,5);
$b = -23;
f($b, @a);
```





```perl
sub f {
	print "values passed: $_[0], $_[1], $_[2]";
}

($a, $b, $c) = (1, 2, 3);
f($a, $b, $c);


## more readable version.
sub f {
	($x, $y, $z) = @_;
	print "values passed: $_[0], $_[1], $_[2]";
}

($a, $b, $c) = (1, 2, 3);
f($a, $b, $c);
```



Another great reason not to directly use the `@_` variable is

```perl
sub f {
	$_[0] = 42;
}

$a = 15;
f($a);

# this will print "a = 42"
print "a = $a\n";
```



Program to sum a list of numbers

```perl
# this is result in a warning because the variable total will be
# used only once because the closing brace after line 9 would be used only once.
# treats the total in line 11 as a seperate global variable.
# always initialize in the beginning anyway though.
sub sum_list {
	my @numbers = @_;
	
	foreach $x (@numbers) {
		my $total += $x;
	}
	return $total;
}

@a = (1..1000);
$sum = sum_list(@a);
print "sum = $sum";

#### fixed.
sub sum_list {
	my @numbers = @_;
	my $total = 0;
	foreach $x (@numbers) {
		$total += $x;
	}
	return $total;
}

@a = (1..1000);
$sum = sum_list(@a);
print "sum = $sum";

### recursive approach.
sub sum_list {
	my @numbers = @_;
	return 0 if !@numbers;
	my $n = shift @numbers;           # whole lot of bugs if my isn't used.
	return $n + sum_list(@numbers);
}

@a = (1..1000);
$sum = sum_list(@a);
print "sum = $sum";


### another weird way, not a good way though, horribly slow as well.
sub sum_list {
	my @numbers = @_;
	my $s = join "+", @numbers;
	return eval $s;
}
```



### Prototypes in perl.

There are function prototypes in perl, and its not used too often, but it is there, and it will provide some error checking, but not much. 

We can specify the prototype by including the sigils for the kind of data we are expecting.

```perl
# function expecting 2 scalars.
sub f ($$) {}
```

The actual use of prototypes is not the error checking, but for casting.

```perl
sub f (\@\@) {
	...
}

# here, we're putting in the two arrays normally, but the function will take 
# the address of these arrays.
@p = f @a @b;
```





### Function pointers (kinda).

We can pass in subroutines in perl, and we can execute them using the `&`.

```perl
sub print_odd {
	my ($selector, @list) = @_;
	
	foreach $val (@list) {
		$_ = $val;
		print "$val\n" if &$selector;
	}
}

@numbers = (1..10);
print_odd sub {$_ % 2 == 1}, @numbers;
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


​	

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

​	

* Example to sort the first name enrollment data by the number of occurances of the first names.

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
		# difference here.
		foreach $fn (sort {$nc{$code}{$a} <=> $nc{$code}{$b}} %{$nc{$code}}) { 
			next if $nc{$code}{$fn} < 2;
			printf("%s has %4d students named %s\n", $code, $nc{$code}{$fn}, $fn);
		}
	}
	
	## in a more readable way in multiple lines:
	foreach $code (sort keys %nc) {
		@names = keys %{$nc{$code}};
		# swap a and b for reverse sort.
		@sorted_names = sort {$nc{$code}{$a} <=> $nc{$code}{$b}} @names;
		foreach $fn (@sorted_names) { 
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


​	

* Example to sort the days in the order -> sun, mon, tue, wed, thu, fri, sat.

	```perl
	#!/usr/bin/perl -w
	
	@days = qw/Sunday Monday Tuesday Wednesday Thursday Friday Saturday/;
	
	# the much more readable way of forming a hash of days and their numbers:
	%d = (Sunday => 0, Monday => 1, Tuesday => 2, 
	      Wednesday => 3, Thursday => 4, Friday => 5, Saturday => 6);
	
	# a shorter, much prettier way to do this mapping is with a slice
	# of a hash, given by symbol "@", not to be confused for an array,
	# its not an array.
	@d{@days} = (0..6);
	
	sub random_day {
	    return $days[rand @days];
	}
	
	push @random_days, random_day() foreach 1..5;
	print "Random days:\n @random_days\n";
	
	@sorted_days = sort {$d{$a} <=> $d{$b}} @random_days;
	
	print "\nSorted days:\n@sorted_days\n";
	```

	

* Make your own join function

	```perl
	sub my_join {
		# be careful here, if you have two arrays in the paranthesis, perl
		# will assign all values to one, and none to the other.
		my ($separator, @list) = @_;
		
		# if this line is missing, the first char will be a separator,
		# we can use a hacky fix and remove the first char of the string
		# before returning, but that will fail for regex's or multiple 
		# separators, only problem with shift is for the empty case which
		# should be handled explicitly.
		return "" if !@list;
		my $s = shift @list;
		
		foreach $e (@list) {
			$s = $s . $separator . $e;
		}
	}
	
	$s = my_join(",", 1..5);
	```

	

* Make your own split function

	```perl
	sub my_split {
		my ($regex, $str) = @_;
		my @list;
		
		# notice the '?' in the regex to disable greedy.
		# the solution by matching the string
		while ($str =~ /(.*?)$regex(.*)/) {
			push @list, $1;
			$str = $2;
		}
		push @list, $string; # don't forget to flush the last bit into the list.
		
		# the solution by destroying the string.
		while ($str =~ s/(.*?)$regex//) {
			push @list, $1;
		}
		push @list, $str if $str ne "";
		
		return @list;
	}
	
	@a = my_split("[,:;]+", "2,,,4;;;8::::16");
	```

	

* Make your own push function.

	```perl
	sub my_push(\@@) {
		my ($aref, @values) = @_;
		@$aref = (@$aref, @values);
	}
	
	@a = (1..5);
	my_push @a, 10..15;
	print "new array: @a\n";
	```

	