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