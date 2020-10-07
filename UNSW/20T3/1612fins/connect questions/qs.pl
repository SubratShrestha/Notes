#!/usr/bin/perl -w

print "Chapter: ";
chomp ($c = <STDIN>);
print "Number of questions: ";
chomp ($n = <STDIN>);

open my $f, '>', "ch$c\_connect_questions.md";
print $f "## Chapter $c: Connect Questions\n\n";

for($i=1; $i<=$n; $i++) {
	print $f "Q$i. \n\n";
}
