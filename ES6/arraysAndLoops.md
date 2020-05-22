# Arrays

## NodeList / LinkedList to Array.

In ES5, when we needed to convert a `nodeList` to an array (like when we use the `querySelectorAll` method), we had to use a hacky way which was to `call` the `slice` method inside `Array` object's prototype with the `this` variable pointing to the nodeList.

In ES6, there is a simple `from` method which takes the nodeList as an argument and converts it to an array. 	** pretty sure it does more than that, go ahead and check.

```js
// Ex. when we need to get everything with className 'box' and change its background color to blue.

// ES5.
var boxes5 = document.querySelectorAll('.box');
var boxArr = Array.prototype.slice.call(boxes5);
boxArr.forEach(function (curr) {
    curr.style.backgroundColor = 'blue';
});


// ES6.
const boxes6 = document.querySelectorAll('.box');
boxArr = Array.from(boxes6)
boxArr.forEach(curr => curr.style.backgroundColor = 'blue');

// making it a little shorter still.
const boxes6 = document.querySelectorAll('.box');
Array.from(boxes6).forEach(curr => curr.style.backgroundColor = 'blue');
```





## For Loops.

In ES5, if we needed to use `break` or `continue` with a loop, we couldn't with the `forEach` function, instead we had to use the full for loop with `i` and everything.

In ES6, there is a keyword `of` which is very similar to the `in` in Python, and we can use this to avoid making an iterator variable and what not.

```js
// Suppose we had 3 boxes and we wanted to change text of all of them unless their class name was 'box blue'

// ES5.
for (var i = 0; i < boxesArr5.length; i++) {
    if (boxesArr5[i].className === 'box blue')
        continue;
    boxesArr5[i].textContent = 'changed';
}

// ES6.
for (cur of boxesArr6) {
    if (cur.className === 'box blue')
        continue;
    cur.textContent = 'changed';
}

// or we could use the includes method.
for (cur of boxesArr6) {
    if (cur.className.includes('blue'))
        continue;
    cur.textContent = 'changed'
}
```

