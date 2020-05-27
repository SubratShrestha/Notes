# Classes.

ES6 introduces classes into JS, but OOP still works the exact same way as before and the classes are just some syntactical sugar -- it just looks better.

Instead of writing `function constructors` like in ES5, we write a `class` which must have a `constructor`.

Something different with classes than function constructors are:

*   classes are **not hoisted** like functions. That means that we can't use classes before its declaration, which was something we could do with function constructors and functions in general.
*   Unlike function constructors, we can **only** add methods to classes, and not properties, but adding properties to prototype for inheritance isn't best-practice anyway, so classes just enforce that rule.

```js
// Ex. making the same person constructor.

// ES5.
function Person(name, job, yearOfBirth) {
    this.name = name;
    this.job = job;
    this.yearOfBirth = yearOfBirth;
}

Person.prototype.calcAge = function () {
    var age = new Date().getFullYear() - this.yearOfBirth;
    console.log(age);
}

var john = new Person('john', 'teacher', 1998);

// ES6.
class Person {
    constructor(name, job, yearOfBirth) {
        this.name = name;
        this.job = job;
        this.yearOfBirth = yearOfBirth;
    }
    
    // there is no seperating punctuation, no function keyword, just the definition.
    // this method is added to the object's prototype.
    calcAge() {
        console.log(new Date().getFullYear() - this.yearOfBirth);
    }
}

let john = new Person('john', 'teacher', 1998);
```





## Static Methods.

Static methods are methods in the class that are only defined for the class itself, and is not automatically added to the object's prototype. So its not inherited by any of its instances either. 

This makes it not very useful since we don't even have a this variable because a new object won't be made, which would be done when an instace would be created for normal methods.

```js
class Person {
    constructor (name, job) {
        this.name = name;
        this.job = job;
    }
    
    static sayHello() {
        console.log('hello');
    }
}

let john = new Person('john', 'teacher');

Person.sayHello();    // works.
john.sayHello();      // will raise an error.
```





# Subclasses and Inheritance.

We can also make classes inherit from other classes, so we have a super class that has the most basic methods and properties, and we can have other subclasses that inherit these and add some more properties and methods.

The example we saw from the start was of a `Person` superclass and subclasses of `Athlete` which is also a person, but with some extra properties.

This is possible in both ES5 and ES6+, but a lot easier with ES6.

```js
// ES5.
var Person = function (fname, lname, year) {
    this.fname = fname;
    this.lname = lname;
    this.year = year;
}

Person.prototype.calcAge = function () {
    console.log(new Date().getFullYear() - this.year);
}

var Athlete = function (fname, lname, year, sport, games, medals) {
// we need to use the call method because if we just use the Person function, it will create a new execution context which has its own this variable, and set that object's fname, lname, etc.
    Person.call(this, fname, lname, year);
    this.games = games;
    this.sport = sport;
    this.medals = medals;
}

Athlete.prototype = Object.create(Person.prototype);

// To set a method only for an athlete and not for a person, we simply add to the athlete's prototype.
Athlete.prototype.won = function () {
    this.medals++;
    console.log('yay.');
}


// ES6.
class Person {
    constructor(fname, lname, year) {
        this.fname = fname;
        this.lname = lname;
        this.year = year;
    }
	// function for all Persons.
    calcAge() {
        console.log(new Date().getFullYear() - this.year);
    }
}

class Athlete extends Person {
    constructor(fname, lname, year, games, sport, medals) {
        // calls the super class with the correct this variable automatically.
        super(fname, lname, year);
        this.games = games;
        this.sport = sport;
        this.medals = medals;
    }
	// functions for all Athletes, not just Persons.
    won() {
        this.medals++;
        console.log(`now medals = ${this.medals}.`);
    }
}
```

