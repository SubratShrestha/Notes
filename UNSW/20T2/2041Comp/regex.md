# Regular Expressions.

Regular expressions specify complex patterns concisely and precisely.



**Default** is just search for a string. `a` in regex matches the character a in the document or input.

**Repetitions** can be searched for with the `*` operator, so `p*` denotes 0 or more repetitions of `p`.

**Alteration** is when we need to search for some string, or something else. Denoted by the pipe `|`. `pattern1 | pattern2`.

**Parantheses** are used to group stuff. `a(,a)*` denotes a comma seperated list of `a`s.

**Escape** is done with the `\`. `\*` matches the star character anywhere in the input.



These 5 characters are sufficient to express regex but there are many more features.



**Dot** matches any single character.

**Square brackets []** provide a set of characters. `[first - last]` like `[a-e] [a-z] [0-9] [a-zA-Z] [A-Za-z] [a-zA-Z0-9]`

**Inverted** matches can be inverted with the `^` operator. `[^a-e]` matches any character other than first 5 letters.







## Examples.

```shell
grep -E 'd.g' course_codes
>> will search for lines with 'd some_letter g' like indigenous or Heidegger.
>> or even something like Applied geomechanics becuase 'd g' with space seperating d and g.
```
