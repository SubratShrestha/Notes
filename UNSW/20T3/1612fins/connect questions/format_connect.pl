#!/usr/bin/perl -w

$file = "./ch13_connect_questions.md";
system("touch ch13_connect_questions_formatted.md");
$outfile = "./ch13_connect_questions_formatted.md";

open my $f, '<', $file or die "couldn\'t open file, $!\n";
open my $o, '>', $outfile or die "output file could not be created\n";
$ran = 0;

my @lines = <$f>;
my @outlines;
for(my $i = 0; $i < scalar @lines; $i++) {
    if($lines[$i] =~ /\s+Correct/) {
        $lines[$i-1] = $lines[$i -1] . " ✅";
        splice @lines, $i - 1, 1;
    } else {
        push @outlines, $line[$i];
    }
}

foreach $line (@lines) {
    print "$line";
}

print "\n\n\n ran = $ran\n";