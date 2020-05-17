# Objects.

There are **primitives,** like numbers, strings, booleans, undefined and Null.

And there are objects which are everything else.

Arrays, functions, objects, dates, wrappers for numbers, strings, booleans, etc.

Almost everything in JS is an object.

# OOP

Object Oriented Programming is just programming with these objects that interact with each other through methods and properties to help structure and clean our code.

# Constructors

Very similar to a `struct` or `class` in other languages. They are like a blueprint for properties.

So instead of having multiple objects with similar properties, we can have one constructor that we can make many other `instances`. These instances are also objects.

The constructor is a function that basically creates a new object.

![image-20200517162741406](C:\Users\subra\Documents\New folder\Notes\JavaScript\OOP.assets\image-20200517162741406.png)

In practice, a constructor is just a function that takes its properties as arguments and assigns it to a new object. This function uses the `this` keyword to assign values (given by arguments) to new properties of the new object.

Creating new properties is easy because objects are dynamic in JS (ie. when you say `this.newPropertyName = something`, a new property called `newPropertyName` is created and assigned `something`.)

```jsx
// A constructor function that creates a new object.
var Person = function (name, yearOfBirth, job) {
    this.name = name;
    this.yearOfBirth = yearOfBirth;
    this.job = job;
    this.calculateAge = function () {
        return 2020 - this.yearOfBirth;
    }
}
```

Making an instance of this constructor is the next step, but we have an issue.

When the constructor function is called, the `this` keyword in the function is going to point at the global `Object` which is the `window` object in the browser, and the function will add those properties and methods to the window object.

```jsx
// This line will make new properties called name, etc in the window object,
// and since the function doesn't have a return statement, it will return undefined.

// So john = undefined at this point, so if we did console.log(john), this would 
// give an error saying the property does not exist because its trying to do 
// undefined.name.
var jon = Person('Jon', 2001, 'designer.');
```

To fix this, we need the `new` keyword. This keyword does 4 things:

-   create a new object.
-   link the prototype of that new object.
-   point the 'this' to the new object.
-   if there is no return statement in the function, a copy of the object is returned.

```jsx
// This works because the new keyword created a new object whose properties were created 
// by the constructor function.

// Now if we did console.log(john.name), this would print 'john', because even though
// the constructor function doesn't return anything, the new keyword makes it return
// a copy of the new object it created.
var john = new Person('john', 2001, 'designer.');
```

# Inheritance

When we want to have objects that are based on other objects, with similar properties but a little extra, we use **inheritance,** where one object **inherits** properties and functions from another.

So inheritance is when objects get access to another object's properties and methods.

Ex.

If we have an object called Person, that has the properties name, yearOfBirth, job, and calculateAge(), and we also want an object called Athlete that has all the same properties of a person, but also additional properties like olympic medals earned, participation, etc.

The athlete object should **inherit** from the person object.

![image-20200517162829346](C:\Users\subra\Documents\New folder\Notes\JavaScript\OOP.assets\image-20200517162829346.png)

## Prototypes

JavaScript is a prototype-based language, so that means that concepts like inheritance work with the help of prototypes.

**Every single object in JS has a property called the Prototype property**

### In inheritance:

Every object has a prototype property, and every instance that is created with this object will **inherit** everything in that object's prototype.

**So when making an object, we put in all the properties and methods that we want inherited by an instance inside that object's prototype property.**

**Before using inheritance, why inheritance?**

Because the whole constructor function thing works just fine, why inheritance?

When we use those constructor functions to make instances, all the instances get a **copy** of the properties and methods. In above example, each instance of the Person constructor got a **copy** of the `calculateAge` function, but the function was the exact same. This is no big deal with a few instances and a function that is only a couple lines long, but this method becomes very inefficient with more instances and more complicated functions.

So what we can do is add this function to the constructor's prototype, and all instances created from Person would have access to it, but no copy would be made because when the function is called with those instances, JS will look for it in the instance, then its prototype, then its parent's prototype, etc until it was found. So no copies need to be made, JS will just search for it.

Since everything we want inherited should sit in the constructor's prototype, we need to add it there to use inheritance.

```jsx
// This is done by getting rid of the function in the constructor and adding to prototype:
var Person = function (name, yearOfBirth, job) {
		this.name = name;
		this.yearOfBirth = yearOfBirth;
		this.job = job;
}

Person.prototype.calculateAge = function () {
		console.log(2020 - this.yearOfBirth);
}
```

Now all instances created from Person can use that function without making another copy of it.

We can also put in properties instead of methods to the constructor's prototype, but that's not very common to do.

## Object.create for inheritance.

Another way besides the constructor function method for inheritance is the `object.create()` function.

The `object.create()` takes in 2 arguments, or 1 if you want it to.

The 2 arguments — The prototype of the object you want to create, and value object which has the properties of the object you want to create.

Both of these are objects, so you can make them seperately, or pass it inline.

```jsx
var personProto = {
		calculateAge: function() {
				return 2020 - this.birthYear;
		}
};

var john = Object.create(personProto, {
		name: {value: 'John'},
		job: {value: 'dev'},
		birthYear: {value: 2001}
});

console.log(`${john.name} is ${john.calculateAge()} years old.`);
// This will print:
// John is 19 years old.

// Or we can make another object to pass into the Object.create() function.
var johnData = {
    name: { value: 'John' },
    birthYear: { value: 2001 },
    job: { value: 'dev' }
}

var john = Object.create(personProto, johnData);
```

# Object Object

This is a giant object in JS.

**Every object we create is actually an instance of an even bigger object constructor — called the Object object. This is how the prototype chain works.**

This parent Object object also has a bunch of different properties and methods inside its prototype — which is inherited by every object we create, and every instance of that object.

![image-20200517162854139](C:\Users\subra\Documents\New folder\Notes\JavaScript\OOP.assets\image-20200517162854139.png)

# Prototype Chain

This is what makes inheritance possible.

When we try to access a certain property or method, JS will first try and find that property or method in that exact object, if it doesn't find it, it will look at it's prototype - which is the prototype property of its parent, and then it's parent's prototype, and on and on until it reaches the `null` object which is the only object in JS that does not have any protoype. If it doesn't find it — `undefined` is returned.

![image-20200517162918501](C:\Users\subra\Documents\New folder\Notes\JavaScript\OOP.assets\image-20200517162918501.png)

Here, the john instance can actually call the hasOwnProperty() method. JS will look at john object/instance, then its protype - which is the prototype property of its parent, and so on until it finds the hasOwnProperty() in the Object object, and then its run.

# Objects vs. Primitives

Primitives are the basic data types — numbers, strings, undefined, null, and everything else is an object.

Primitives work like normal variables, ie. they make copies of data, and do not reference anything.

Objects are pointers, they reference data and are not copies.

```jsx
var a = 10;
var b = a;
a = 12;
console.log(`a = ${a}, b = ${b}`);
// This will print:
// a = 12, b = 10

obj1 = {
		age: 12
};
obj2 = obj1;
obj1.age = 100;

console.log(`obj1.age = ${obj1.age}, obj2.age = ${obj2.age}`);
// This will print:
// obj1.age = 100, obj2.age = 100
```

Here, only 1 object is created.

obj1 and obj2 are just pointers to the same data.

# Summary.

-   Every JS object has a prototype property, which makes inheritance possible in JS.
-   The prototype property of an object is where we put all the properties and methods of the object that we want **other objects or instances to inherit**.
-   **The Constructor's prototype property is NOT the prototype of the Constructor itself, but the prototype of ALL instances that are created through it.**
-   When a certain property or method is called, the search starts in the object itself, and its not found, moves to its prototype - which is the prototype property of it's parent, and then it's parent and so on, until `null` is reached which has no prototype and `undefined` is returned. This is the **prototype chain.**
