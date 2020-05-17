# Closures.

We already know we can return functions in JS, and we also know that when a function is called, it gets added to the `execution context` and has its own `variable scope`, which are the local variables the function can access, and that in other programming languages, when a function returns something, or it ends some other way, the function is deleted from the execution context, along with its variable scope.

In JS, things work a little different.

In JS, when a function ends or returns something, the function **is** deleted from the `execution context` but its variable scope stays in memory and can be accessed.

Ex.

```jsx
const retireAgeUS = 66;

function retirement(retirementAge) {
		var str = 'I have the high ground.';
		return function(birthYear) {
				console.log(str);
				console.log(`You have ${retirementAge - (2020 - birthYear)} years left.`);
		}
}

var retirementUS = retirement(retireAgeUS);
retirementUS(2001);

// More practically 
function retirement(country, retirementAge) {
    return function (birthYear) {
        console.log(`You'd have ${retirementAge - (2020 - birthYear)} years left in ${country}.`);
    }
}

retirement('US', 66)(2001);
retirement('Iceland', 67)(2001);
retirement('Germany', 65)(2001);
```

In this example, when the `retirement` function was run, it was added to the execution context with its variable scope. The variable scope of the function `retirement()` was `retirementAge` and `str`, but when it `returned` a function, the function would've been deleted from the execution context, along with its variable scope.

This does partly happen in that the function is popped from the execution context, but its variable scope would still be in memory, and can be accessed. So using the variables `str` and `retirementAge` within the anonymous function should not raise any error, and the code should run just fine.

## Summary

The inner function always has access to variables and parameters of its outer function, even after the outer function has returned.