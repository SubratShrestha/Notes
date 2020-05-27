# Destructuring.

Destructuring is a feature in ES6 that allows us to extract data out of data structures.



## Extracting data.

Ex. when we want to store data in an array in seperate variables.

```js
// ES5
var ages = [12, 1, 3, 4];
var age1 = ages[0];
var age2 = ages[1];

// ES6
// lists.
const ages = [12, 1, 3, 4];
let [age1, age2, age3, age4] = ages;

// objects.
const obj = {
    firstName: 'something',
    lastName: 'else'
};

// if the variables are named after the keys.
const {firstName, lastName} = obj; 

// if we want the name to be something else.
const {firstName: first, lastName: last} = obj;
```



## Returning more data.

Another use case for destructuring data is when we need to get more than value from a function. In that case, we return a data structure with the data we need and destructure it.

```js
// function that takes the year of birth and returns the age and years until retirement.
function calcAgeRetire(retire, year) {
    let age = new Date().getFullYear() - year;
    return [age, retire - age];
};

let [age, yearsLeft] = calcAgeRetire(65, 1998);
console.log(`if he/she was born in 1998, he/she would be ${age} years old and would have ${yearsLeft} years left until retirement if he/she decides to retire at 65.`)
```

