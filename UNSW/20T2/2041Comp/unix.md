# UNIX

Unix was an operating system that was developed to replace the OS at the time which were heavy and used assembly, and every manufacturer would provide a different OS with their systems.

Unix used assembly in the beginning and then switched to a higher level language which was C. It was successful and much lighter than the ones before it.

It was hugely popular right away just because it came out of Bell Labs, which was very popular. Leaked out to universities because Bell Labs didn't think of an OS to be something profitable. The 3rd or something university it came out to was actually UNSW. The unis started changing the OS. Bell Labs realised it was actually profitable and it was not given out so easily anymore, and things started to stagnate.

A third year or so decided to recreate this OS himself in his Mom's basement, and released it to the internet, this version became even more popular and it was named after himself - Linux.

Became so popular that when anyone bought some hardware, the first thing they would do is install UNIX and make the system understand C.

Now all sorts of devices use Linux - TVs, androids, servers, supercomputers, etc.



## Unix processes.

A unix process executes in a certain environment. That is - 

we get the input with maybe standard input, or command line arguments, or environment variables, etc.

we have the actual unix process which does something to this provided data

then we have the outputs of this data with maybe standard output, or standard error

we also have a exit status - return or the exit.



## Return / exit.

Any program that gets terminated returns some bit of data. Conventionally if the program exited successfully or with some errors - 0 for success, non-zero for failure.





# Commands.

Something special with these commands is that they can be combined with the pipe ( | ) notation which basically takes whatevers returned by one program and passes that into the second. We're not limited to just 2, we can pipe as many programs together as we want.

Another thing we can do is **redirection** and this is just when the output of some command is given to some file. This is writing to the file though. `>` will truncate the first file and overwrite the data, and `>>` will append to the file if it already exists. There's also `<` which gives some data to the command.

The really magical thing about the two streams - stdout and stderr of unix is that the stderr is treated differently, and is not the same as stdout. Ex.  if fred.c doesn't exist and we try `ls fred.c > output`, it wont put the error message into `output`, but it will seperately print the error message to the terminal and not put anything in fred.c. 

If you really want, we can send the error messages to files using `2>`, seen in examples.



**ls: ** prints out the files in a directory with stdout if its okay, and stderr if it runs into a problem. It can take command line arguments. `-l` to get the long version of some file, that includes its permissions and stuff, `-a` to get the list of all files, including hidden ones.



**ps:** prints out some info about the processes running in memory including its process IDs.



**strace:** used to see what directories and files a certain process is using. Very helpful when we have some errors with some process and we know its not the code, but something the code is using. This will track everything the file uses and we can look through them.

`strace -efile -p <process ID>`



**cat:** prints out the content of a file to the stdout, and an error to stderr if the file can't be found or something. Takes in the file name as arguments, and it can also open multiple files at once. It comes with some useful features.

Often the whitespace within the text is confusing because we don't know if the text is indented with spaces or tabs or if there is a trailing whitespace after lines or if there is a newline character after lines -- this is the sort of thing that breaks most string-based searches. To avoid this, we use a flag `-A` to see exactly what the characters are in terms of their code. (tabs are \I, newlines are $, spaces are just spaces).



---

## GREP.

Its similar to cat, but it can return all the lines containing some word or something, with grep. It takes in the word to search and the file names as command line args. Grep uses a limited form of POSIX regex (no + ? | or parantheses).

Grep also allows for the full regex with the `-E` (extended grep) or `egrep`, so instead of having to do grep twice, we can have `-E` saying search for either one or the other, and everything else that comes with regex.

There's also `fgrep` or `grep -F` that finds any of several (thousands) fixed strings using an optimised algorithm.

`grep -P` is Perl-like extension for regex.

`grep Dudley hp7.txt`

`grep -E 'Ocean|Sea' course_codes`

Within regualar grep, there are some useful options - 

`-i` to ignore cases from the search, `-w` to get whole word (so if you searched for 'john williams', only john williams would return ignoring something like 'john williamson'), `-n` to get the line number for all matches, `-v` will take the opposite of the search pattern.

Something useful are the `-B or -A or -C` followed by a number to get that number of lines Behind, After or Around (C or context). These flags require an argument, so they need to be seperate from other flags (or comb. of flags.).

To search multiple files, we can just put in `./*` to search all files in that directory, or `./*.txt` to search for it just in the .txt files. `-r` to recursively search through all directories from the one we are currently in. `-l` can be used to know only file the matches were found in, and not the matched word itself. `-c` to get the number of matches in each file. This is the same as doing `grep -E 'pattern' filename | wc -l`.

---



**wc:** stands for word count, it counts the number of lines, words and characters (incl. spaces and what not) in some file, in that order.

`wc hp1.txt`

**head:** This returns the first 10 lines of a file. Useful if we just want to see the structure of the file. Or we can put in `-n` followed by the number of lines we want to see.



**tail:** This returns the last couple lines, similar to head.



**cut:** will for every line, slice the full string from some start to end. `cut -c1-4 course_codes` will cut from 1st to 4th characters of every line of document course_coes. It takes in arguments like `-c` for cut/slicing, `-d` to specify some delimiter, `-f` to specify some field with respect to the delimiter.

```ps
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|M
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|F
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|M
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|F
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|F
COMP2041|874353453|someone else					|4849854|COMPA1|45785|48754|M

cut -d'|' -f8 input.txt | tr '\n' ' '
M F M F F M

Here we're specifying the '|' as the delimiter and cutting everything before the 8th field.
Start the count from 1 which is COMP2041.
```



**tr:** will map one string of characters to another string. This is character based operation. every character in the first string will be mapped to every character of the second string. We can get rid of all delimiters by converting the delimiter to nothing by `tr -d ' '`.



**sort:** will sort numbers or text. Many ways to sort, `-r` to reverse sort (decreasing), `-n` to sort with string numerical value.



**uniq:** will get rid of duplicates, given that they are next to each other. Usually used along with sort, because after we sort, the values will be next to each other and we can run `uniq`.  `-c` will count the unique occurances and this can be very useful. `-d` to print only the lines with duplicates, `-u` to get everthing that doesn't have duplicates, and `-f` to avoid comparing the first N lines (as argument).

If we had some huge data, and wanted to count the number of occurances of some pattern:

```shell
grep -E 'pattern' | sort | uniq -c
/* this will print all the types of data along with the number of times they appear in sorted order */
```



**join:**

There is way to join columns from multiple files. Lets say if we had a file enrollments that had all the program codes and the number of people in those programs, and another file that had the program codes and the name of those programs (sorted). If we sort and uniq the the enrollments data, we'll get the count but we will see that with the prgram codes, and if we wanted to see that list but with program names from the other list, we would need to join those columns like:

```shell
egrep 'COMP(2041|9044)' enrollments | cut -d'|' -f4 | cut -c1-4 | sort | join - program_codes | sort | uniq -c | sort
```

Join usually takes as arguments two filenames, but if we want to give the data to join with standard input like above, we use a hyphen.

When there isn't a oone-to-one correspondence to the 2 files in join, that data is not shown. This can be changed though with the other flags that join offers. Everything on `man join`

But if we come to the point where we need to dive really deep into using join with many many of the flags, it may be easier and make more sense if we used some scripting language like python or perl.



**sed:**

its an interactive edit/filter mode. So once you give the sed command, it will wait for some input where the editing will take place. 

Something to be careful about is that just like grep, sed has a limited set of the regular expressions by default, so just like grep, things like alteration (|), plus (+) and some others don't work in sed by default. To enable these, along with more of the regular expressions, we use the `-r` flag.

`s/RegExp/ReplaceString` will search for some regular expression pattern RegExp, with something else, which is "Replace". This command will just replace the first occurance of the regexp.

`s/RegExp/Replace/g` will search for and replace **all** occurances of the regexp. 



**printf:** Exact same as printf in C, only in shell, just without the parantheses, same formattin, etc. Just of laughs.

## Examples.

```shell
================ PIPING EXAMPLES =================

grep Dudley hp1.txt | wc
>> 85 6226 34349   (lines, words, chars)

grep Herm hp1.txt | wc
>> 233 9646 54451

grep -E 'Ocean|Sea' course_codes
>> This will output lines with either Ocean or Sea in course_codes.

grep -E 'C[aeiou]t' course_codes
>> this will output all lines that have C followed by any of the vowels and ends with t, [] indicates range of values.
>> like 'Cities or citizens etc.'

** very interesting example **
suppose we wanted to search through our git commits and find some specific commit.
history | grep 'git commit' | grep 'uiChanges'

grep "...-...-..." numbers.txt

cat course_codes | head -n 1000 | tail -1
>> The thousandth line in that file.

cat course_codes | grep Comp | wc -l
>> gives the total number of comp courses.

cat course_codes | grep Comp | grep Graphic
>> lists out the comp courses that mention graphics.

cut -c1-8 course_codes
>> ACCT1021
>> ACCT1134 
>> ....

cut -d' ' -f2 course_codes | head
This will say to shell, the delimiter is ' ', take the second field which is the word after the course code, pass these into head.
>> Accounting
>> Accounting
>> Industry
>> ...

tr 'a-z' 'A-Z' < course_codes | grep 'comp'
>> this will remove the case and search for comp.


egrep -i 'computer|computing' course_codes | egrep -v '^(COMP|SENG|BINF|ZEIT)' | tr '\n' ' '
>> This will return all the course codes that are not COMP, SENG, etc in a space seperated form.


grep -E 'pattern' input.txt | sort | uniq -c

sed 's/a/ahhh/g'
the cat is happy.
>> the cahhht is hahhhpy

sed 's/[aeiou]/z/g'
the cat is happy.
>> thz czt zt hzppy.

sed 's/^ *//'
	This will remove all spaces in the beginning of lines.
This will remove all spaces in the beginning of lines.



============== REDIRECTING EXAMPLES ================

date > output
cat output
>> the date

date > output
cat output
>> different date because > will overwrite.

date >> output
cat output
>> 2 dates in the same file because >> appends.

ls fred.c 2> error > output
>> if there are any errors, it will be given to error, and everything else will go to output.

a.out < test_data
>> when we have some data to be analysed by a program we wrote.
```



