# Functions and Events.

A function, like most things in JS are also objects.

So, a function is also an instance of the global Object object, and behaves like any other object.

We can store functions in variables, we can pass functions in as arguments of another function, and we can also return a function.

These are the reasons as to why functions in JS are called **first class functions.**



## Callback functions.

A **callback** is when we pass the function as a variable and not perform it right away.

Ex. Passing functions as arguments to a general function.

```jsx
var ages = [18, 11, 19, 45, 62, 150, 41];

var arrGen = function (arr, func) {
    res = [];
    for (var i = 0; i < arr.length; i++) {
        res[i] = func(arr[i]);
    }
    return res;
}

var birthYear = function (age) {
    return 2020 - age;
}

console.log(ages);
console.log(arrGen(ages, birthYear));
// Here we're not saying birthYear(), but birthYear
// because we're passing it as a variable, and not performing the function right away, 
// but later -- called callback function.
```



## Returning functions.

Since functions are just objects, we can return one just as we return an object.

Ex. Returning a function inside another function.

```jsx
function ageName(age) {
    if (age <= 18) {
        return function (age, name) {
            console.log(`sorry little ${name}, but you're too young to have fun.\\n
            You'll have to wait another ${18 - age} year/s`);
        }
    }
    else return function (name) {
        console.log(`aye, fuck em up ${name}!`);
    }
}

// We can store the returned function in a variable.
var older = ageName(20);
older('tony');

// Or just use it inline.
ageName(11)(11, 'timmy');
```

# Immediately Invoked Function Expression (IIFE)

If we wanted to hide some data, we would put that data into a variable and then into a function, so that the outside scope would not be able to access it. But sometimes, making another function can be quite unnecessary. This is when an IIFE comes in.

An IIFE is an anonymous function that is immediately called (invoked), normally used to hide some data.

But the problem is that if just defined some anonymous function, it wouldn't be possible to call it, and so we'd be forced to name the function which wasn't necessary.

To use an anonymous function, we would need to call that function right after its defined but since that's not possible, we trick the interpreter in thinking we're giving it an **expression** rather than a definition.

To do this, we wrap the anonymous function in `()` and call it right after.

`(function() { definition }) ();` We can ofcourse give it arguments as well.

Ex. Suppose we wanted to make a game where if we get a number greater than or equal to 5, we win and if we get anything lower, we lose, and we want to hide this number.

```jsx
// Normally, we'd need to hide it using a function, but it needs to be named because 
// otherwise we wouldn't be able to call it.

function temp() {
		var score = Math.random() * 10;
		console.log(score >= 5);
}
temp();

console.log(score) // so that this would result in an error.

// If we wanted to use an anonymous function, we'd need to use an IIFE.
(function() {
		score = Math.random() * 10;
		console.log(score >= 5);
})();

// With some arguments.
(function(luck) {
		score = Math.random() * 10;
		console.log(score >= 5 - luck);
})(5)    // with luck=5, we'd never lose.
```

# Events

## Event bubbling

When some event occurs on a DOM element (so html element), that same event is also fired on all of its parent elements. This happens all the way up to the root or the HTML element. So we say the event **bubbles** up in the DOM tree.

![image-20200517163411431](C:\Users\subra\Documents\New folder\Notes\JavaScript\functions-and-events.assets\image-20200517163411431.png)

## Target element.

The element in which the actual event fired is called the **target element** (the button 👆). This target element is stored as a property in the **event** object. That means that all the parent elements will be able to know where the event was fired.

## Event delegation.

This is a specific event that we can use where:

we attach the parent element with an event handler, and wait for the event in the target element to bubble up. So instead of putting the event handler in the target, we can put it in the parent element and wait for the event to bubble up (main element 👆).

## Use case for event delegation.

There are basically 2 use cases for event delegation:

1.  When we have a lot of child elements for a single parent element. Instead of having as many event handlers as children, we can have one single event handler on the root element.
2.  When we need to setup an event handler for an element that isn't loaded into the DOM yet. Some things need to only be rendered when something specific happens, and we can't set an event handler for elements that are not in the DOM, so we use event delegation.