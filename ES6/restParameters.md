# Rest Parameters.

Rest parameters are very similar to the spread operator, in that they have the same notation (`...`), but in function, they are the exact opposite. Instead of converting an array to single values, it converts single values to an array.

This is only used in function arguments, so if the symbol is in the function argument, its a **rest parameter** and anywhere else its the **spread operator**. 

**So the spread operator is used in the function call and the rest parameter is used in the function declaration.**

Its used to convert multiple arguments into one array so that we can loop through it.

In ES5, we can use the `arguments` keyword to get the arguments in a single object, but we couldn't loop over them with `forEach` because they were just objects, and not arrays. So we had to convert that into an array using the `Array.prototype.slice.call` method.

In ES6, all that can be done by simply adding `...` to the arguments of the function.

```js
// Ex. We have an unknown number of year as arguments, and we want to log to the console if people born in those years are of full age now.

// ES5.
function isFullAge() {
    var argsArr = Array.prototype.slice.call(arguments);
    var today = new Date();
    argsArr.forEach(function(curr) {
        console.log(today.getFullYear() - curr >= 18);
    });
}

isFullAge(1998, 2001, 2002, 1969);

// ES6.
function isFullAge(...years) {
    let today = new Date();
    years.forEach(curr => console.log(today.getFullYear() - curr >= 18));
}

isFullAge(1998, 2001, 2002, 1969);




// Now suppose we had a limit variable as the first parameter which is the full age (18 or 21 o r something else), followed by the usual lots of years.

// ES5.
// the limit variable will have the first argument anyway but so will the arguments keyword.
// in ES5, we can use the same slice method and start slicing from 1st index of the arguments.
function fullAge(limit) {
    var agesArr = Array.prototype.slice.call(arguments, 1);
    var today = new Date();
    argsArr.forEach(function(curr) {
        console.log(today.getFullYear() - curr >= 18);
    });
}

isFullAge(1998, 2001, 2002, 1969);

// ES6.
// here, everything is the same except we just add another argument.
// it will take the first argument as limit and the rest will be converted to an array with the rest parameter.
function fullAge(limit, ...years) {
    let today = new Date();
    years.forEach(curr => console.log(today.getFullYear() - curr >= limit)); 
}

isFullAge(1998, 2001, 2002, 1969);
```

