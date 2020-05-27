# Spread operator.

The spread operator is a new operator in ES6, and it simply **expands** data.

```js
function addAges(a, b, c, d) {
    return a + b + c + d;
}

// ES5.
var ages = [18, 21, 90, 32];
var sum5 = addAges.apply(null, ages);
// * the apply method is similar to the call method, and it can use methods of a certain object on other objects. There are many ways we could do this, but we hadn't used apply much.


// ES6.
let ages = [18, 21, 90, 32];
const sum6 = addAges(...ages);
```





## For joining arrays.

We could also use this to join multiple arrays into a bigger one.

```js
const familySmith = ['John', 'Jane', 'Mark'];
const familyMiller = ['Mary', 'Bob', 'Ann'];
const bigFamily = [...familySmith, ...familyMiller];
```





## Node lists.

This method also works just fine with node lists, and we're not limited to arrays.

```js
// Ex. Lets go back to the boxes example, and lets say we need to change the font color of the header and all the text in the boxes to purple...

const h = document.querySelector('h1');
const boxes = document.querySelectorAll('.box');

console.log(boxes); // this is a nodelist and not an array.


// this will make an array with h and all elements of nodelist boxes.
const all = [h, ...boxes];
console.log(all);   // this is an array and not a nodelist.


```





*   wtf is the difference??

    ![image-20200523184320153](C:\Users\subra\Documents\Notes\ES6\spread.assets\image-20200523184320153.png)

