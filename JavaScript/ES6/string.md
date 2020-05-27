# Strings in ES6

strings have had some bid improvements.



## Template literals.

This is a huge improvement from ES5 and its similar to f-strings in python. Instead of having multiple `+` signs, we can just put it into a template literal.

```js
// ES5 syntax.
let firstName = 'john';
let lastName = 'smith';
const yearOfBirth = 1998;

console.log("This is " + firstName + ' ' + lastName ' and I was born in ' + yearOfBirth);

// ES6 syntax.
let firstName = 'john';
let lastName = 'smith';
const yearOfBirth = 1998;

console.log(`This is ${firstName} ${lastName} and I was born in ${yearOfBirth}.`);
```



## New string methods.

*   `startsWith( string )` or `endsWith( string )`

    Returns true or false if some string starts or ends with some other string.

*   `includes( string )`

    Returns true or false if some string has some other string.

*   `repeat( int )`

    Repeats a string a number of times.

```js
const n = `${firstName} ${lastName}`;
console.log(n.startsWith('j'));		// true.
console.log(n.startsWith('J'));		// false.
// same for endsWith.

console.log(n.includes('oh'));		// true.

console.log(` ${firstName}`.repeat(5))   // returns john 5 times with a space in between.
```

