# Bind, Call and Apply methods.

# Call

We use the call method when we need to use a method of an object, for another object.

```
object where method is.methodName.call(object to use in or the new this variable, arguments of method)
```

Ex.

```jsx
log = console.log

var john = {
    name: 'John',
    age: 30,
    job: 'teacher',
    present: function (style, time) {
        if (style === 'formal')
            log(`Formal message, I'm ${this.name} and I'm a ${this.job}, its ${time} o'clock`);
        else if (style === 'informal') {
            log(`Informal message, I'm ${this.name} and I'm a ${this.job}, its ${time} o'clock`);
        }
    }
};

var emily = {
    name: 'Emily',
    age: 35,
    job: 'designer'
};

john.present('formal', 11);
john.present.call(emily, 'informal', 9);     // calling john.present method for emily. 
```

# Apply

This is the same as the `call` method, but for when the arguments of the method you need to use is an array.

# Bind

The bind method makes a copy of a function and returns it, just like a variable, and is usually used when we need to **bind** certain arguments to the function. That just fixes a few arguments.

```
var variableName = object where method is.methodName.bind(new this variable, argumets to set)
// This just fixes the 'informal' argument for the present method.
var johnFriendly = john.present.bind(john, 'informal');
johnFriendly(55);
johnFriendly(90);

// Using with emily object.
var emilyFormal = john.present.bind(emily, 'formal');
emilyFormal(20);
emilyFormal(19);
```