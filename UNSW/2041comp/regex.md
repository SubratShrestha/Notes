# Regular Expressions.

Regular expressions specify complex patterns concisely and precisely.



**Default** is just search for a string. `a` in regex matches the character a in the document or input.

**Repetitions** can be searched for with the `*` operator, so `p*` denotes 0 or more repetitions of `p`.

**Alteration** is when we need to search for some string, or something else. Denoted by the pipe `|`. `pattern1 | pattern2`. This is a feature of extended grep or egrep, won't work in regular grep.

**Parantheses** are used to group stuff. `a(,a)*` denotes a comma seperated list of `a`s.

**Escape** is done with the `\`. `\*` matches the star character anywhere in the input.



These 5 characters are sufficient to express regex but there are many more features.



**Dot** matches any single character.



**Square brackets []** provide a set of characters. `[first - last]` like `[a-e] [a-z] [0-9] [a-zA-Z] [A-Za-z] [a-zA-Z0-9]`

**Paranthesis ()** are just normal parenthesis to group stuff together.

**Braces {}** will give us a specific number of repititions. 

*- Most of the special keys like dots, plus, asterisk, question mark, etc are turned off within the brackets -*

**Inverted ^** matches can be inverted with the `^` operator. `[^a-e]` matches any character other than first 5 letters.

**^** at the start means start of the line, and **$** means the end of the line.

**plus +** matches a pattern in parenthesis maybe 1 or more times.

**asterisk *** matches 0 or more times.

**question mark ?** matches 0 or 1 occurances.





## Examples.

```shell
grep -E 'd.g' course_codes
>> will search for lines with 'd some_letter g' like indigenous or Heidegger.
>> or even something like Applied geomechanics becuase 'd g' with space seperating d and g.
```



## Resource.

Use websites like online regex - https://regex101.com/ - and some other stuff to see exactly what matches with regex.

