# Variables in ES6.

## const.

When we need to declare variables that are constant or immutable, we use `cosnt`. If we attempt to change the value of these variables, we get a `TypeError`. 

Unlike `var` which is function scoped, const and let are **block scoped**.

Another thing about `const` is that although they can be declared without a value, we shouldn't do that because we can't give it a value later on.

```js
// This will not work.
const yearOfBirth;
yearOfBirth = 1990;

// Must be.
const yearOfBirth = 1990;
```





## let.

`let` is very similar to the `var` in that the values are immutable. Like `const`, variables declared with `let` are **block scoped**.



## Scope.

`var` was function scoped, meaning that when a variable is declared, it is defined and can be used within that function.

```js
// This will work just fine.
function license(passed) {
    var name = 'john';
    var yearOfBirth = 1990;
    
    if (passed) {
        console.log(name + ", born in " + yearOfBirth + 'can drive.');
    }
}
```

but `let` and `const` are block scoped, meaning that it is defined and can be used within the curly braces `{ }`.

```js
// This will give an error.
function license(passed) {
    let name = 'john';
    const yearOfBirth = 1990;
    
    if (passed) {
        console.log(name + ", born in " + yearOfBirth + 'can drive.');
    }
}

// To make it work, the variables must be declared within the if statement.

// Also note that const variables need to be declared with the value because we can't assign the value to it later.
```



Another good example for scope is that if two variables in different blocks are assigned with `let`, they are actually two different variables that just happen to have the same name.

```js
let i = 420;

for (let i = 0; i < 5; i++) {
    console.log(i);
}

console.log(i);

/*
This would return 1 2 3 4 420.
This is because the i in line 1 is completely different from the i in line 3.
The i in line 3 is only defined between 3 and 5.
The i in line 1 is defined throughout the file.
*/
```



## Hoisting.

Hoisting with `const` and `let` work slightly differently. Before, with `var`, when a variable was used before a value was assigned to it, no error would be raised, instead the variable would return `undefined`. 

This was because the variable was hoisted already, but no value was assigned to it.

It doesn't work like that in ES6 in that the variables declared with `const` and `let` are still hoisted, but they sit in something called the **temporal dead zone**.

If a variable inside this **dead zone** is used, an error is raised, instead of the variable returning undefined.

The variables come out of this zone when they are assigned a value, when we can use them normally.