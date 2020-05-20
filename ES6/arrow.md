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





## Lexical this variable.

We know that any function in JS has its own `this` keyword. But with arrow functions, it doesn't actually have its own `this` keyword, but it shares the `this` keyword of whatever the arrow function is in.

Ex. Suppose we have an HTML doc with 3 boxes and we want to add an event listener to one of them.

```js
// ES5.
var box5 = {       
    // this keyword here points at window object.
    color: 'green',
    position: 1,
    click: function () {    
        // now this keyword points at the current object (box5).
        document.querySelector('.green').addEventListener('click', function () {
            // now this keyword points at the h1 element.
            console.log('Color = ' + this.color + ' and position = ' + this.position);
        });
    }
};

box5.click();

// This will return "color is undefined and position is undefined." because the anonymous function inside the event listener makes a new this variable that points at the h1 object in the browser.
// To work around this problem, we need to save the this variable (pointer) outside of the function, and in the object. so...

var box5 = {
    // this keyword will point at the window object.
    color: 'green',
    position: 1,
    click: function () {
        // now this keyword will point at the box5 object.
        var self = this;
        document.querySelector('.green').addEventListener('click', function () {
            console.log('Color = ' + self.color + ' and position = ' + self.position);
        });
    }
};

box5.click();



// ==================================  ES6 ======================================
// here, the this variable in the arrow function will be the same as that of whatever
// was outside of it.

const box6 = {
    // this keyword will point at the window object.
    color: 'green',
    position: 1,
    click: function () {
        // now the this keyword will point at the box6 object.
        document.querySelector('.green').addEventListener('click', () => 
            // this keyword will still point at the box6 object because of arrow function.
            console.log(`color is ${this.color} and position = ${this.position}`);
        );
    }
};

box6.click();
```



Ex. For a function constructor.

```js
// ES5
// This won't work because the function on line 9 changes the this variable.
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends = function (friends) {
    var arr = friends.map(function (curr) {
        return this.name + ' is friends with ' + curr;
    });
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends(friends);

// To fix this in ES5, we could use the BIND method to manually set a this variable.
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends = function (friends) {
    var arr = friends.map(function (curr) {
        return this.name + ' is friends with ' + curr;
    }).bind(this);                   
    // since we're outside the function, the this variable is pointing at the right object.
    console.log(arr);
}

var friends = ['Bob', 'Jane', 'Mark'];

new Person('John').myFriends(friends);


// ==================================  ES6 ======================================
function Person(name) {
    this.name = name;
}

Person.prototype.myFriends = function (friends) {
    // the this keyword now points at the Person object.
    // If we had used an arrow function on 41 instead of function, the this keyword would
    // point at the Window object.
    let arr = friends.map(curr => `${this.name} is friends with ${curr}`);
    console.log(arr);
}

let friends = ['Bob', 'Jane', 'Mark'];
new Person('John').myFriends(friends);

```

