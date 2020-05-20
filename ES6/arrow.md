# Arrow Functions.

Its a shorthand for writing small functions. Think of the actual arrow as `return`.

```js
const years = [1990, 1965, 1998, 1972];

// ES5.
// note: map can take in 3 default args -- current, index, actual array.
var ages5 = years.map(function(curr) {
   return 2020 - curr; 
});

// ES6.
let ages6 = years.map(curr => 2020 - curr);

// multiple arguments.
let ages6 = years.map((curr, ind) => `index: ${ind + 1}, value: ${curr}.`);

// for multiline functions, we {} and an actual return statement.
let ages6 = years.map((curr, ind) => {
	const now = new Date().getFullYear();
	let age = now - curr;
    return `index: ${ind + 1}, value: ${age}`;
});
```

