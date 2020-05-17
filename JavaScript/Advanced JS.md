# Advanced JavaScript (OOP).

## Objects.

* Saying : "Everything is an object". 

* In JS, there are 2 types of values : **Objects and Primitives**.

* Primitives are the fundamental datatypes of JS - Numbers, strings, boolean, undefined, null.

* Objects are literally everything else - arrays, functions, objects, dates, wrappers for numbers, strings, boolean.

* That's why almost everything is an object.

  

## Object Oriented Programming.

* OOP heavily uses objects, properties and methods. These objects interact with each other through methods and properties.

* Objects are used to store data, structure applications into modules and keeping the code clean.

* Take the objects we made from the beginning lectures - john, jane, mark, etc. If we wanted to make more people, we'd just add more and more objects. 

* But there is a better way of doing this - by using something like a blueprint for object generation.

* We can just create a blueprint called 'Person' who has a name, birth year, job, etc. This is basically the `class` in other programming languages, but in JS, we call it a `constructor` or a `prototype`.

* We can now create as many instances of this `class` or `constructor`. These might be mark, jane, john, etc.

* All instances are objects.

  

## Inheritance.

* Its when one `instance` or `object` is based on another.

* Its when one `object` gets access to another objects properties and methods.

* Ex.

  * Suppose we have the Person object with a name, yearOfBirth, job, and a calcAge method.

  * Now we have another object called Athlete with a olympics and medals. But the athlete is also a person. To combine the two, we can make the Athlete object inherit from the Person object.

  * This results in the Athlete having all of its properties and the properties of a Person.

    

## Prototypes.

* JS is a `prototype` based language, which means inheritance works by something called `prototypes`.

* In JS, every object has a prototype property which makes inheritance possible in JS.

* The prototype property of an Object is where we put all the methods and properties we want the instances to inherit.

* Suppose we have the object 'Person' which has the `calcAge()` method, and we want the `instance` 'john' to inherit this method.

* To do this, we put the `calcAge()` property in the `prototype` of the Person object.

* Then all the instances like john, mark, etc can now inherit the `calcAge()` method.

* So the prototype of an object is not only a property of that object, but also the property of all instances we create through that object.

  

  

  ### Prototype Chain.

  * Now, we know that the john object is an instance of the Person object.

  * But the Person object is also an instance of an even bigger object called the **Object**.

  * Every object that we ever create is an instance of the Object constructor which has a bunch of methods in its prototype property.

  * So the created object (person) inherits these methods and can call them.

  * Then the instance we create (john) through the created object (person) also inherits these methods and can call them.

  * All of this is called the **Prototype Chain**.

    

    ### How it works.

    * When we try to access a certain method or property on an object, JS will first try to find that method on that exact object and if it can't find it, it will look in that object's prototype, which is the prototype property of its parent.
    * So it moves up the prototype chain, if the method is still not there, it will look up until there are no more prototypes.
    * At the end of the chain, there is `null`. `Null` is the only property that has no prototype and its the final link in the prototype chain, and in this case, undefined is returned.
    * This is the reason why the john object could call the `hasOwnProperty()` method which is stored in the Object prototype property.

## Summary : 

![](C:\Users\subra\Pictures\Screenshots\Screenshot (171).png)





## Implementation.

* To implement this in code : 

* We first make an object a function where the parameters are the properties of the object.

* ```js
  var Person = function (id, name, number, yearOfBirth) {
      this.id = id;
      this.name = name;
      this.number = number;
      
      // This sort of method is NOT inherited (not in Prototype)
      this.calcAge = function() {
          console.log(2020 - this.yearOfBirth);
      }
  }
  ```

* The `this.Parameter = Parameter` line makes sure that the data passed into the function as parameters of the function is stored as a property of the object.

* To make an instance of an object, we use the `new` keyword to create a new object with its own Execution Context.

* We do this so that the `this` keyword points to the new object, and not the global object.

* ```js
  var john = new Person(7, 'John', 84934, 2001);
  var mary = new Person(8, 'Mary', 39384, 2000);
  ```



## Inheritance.

* The method described above where the method is defined in the main object works fine but what really happens is that each instance that we make has a separate method made for it.

* This is very inefficient, especially if the method has hundreds of lines of code in it, and every instance has copies made for it.

* We need to make it so that there is just one method which can be used by any instance of an object.

* We do this by adding the method into the object's prototype. So all the instance made from the object can now use it, without making copies of the method. We learned before that the prototype of the constructor contains all the methods we want the instances to inherit.

* To do this, we know that the `prototype` of an object is simply another property of the object and we know that properties of an object can be accessed with the dot. We use another dot to create the function into the prototype property of the method.

* ```js
  // The regular method way (not using Inheritance)
  var Person = function (id, name, number, yearOfBirth) {
      this.calcAge = function() {
          console.log(2020 - this.yearOfBirth);
      }
  }
  
  // Using Inheritance and adding the method into the prototype property of the object.
  Person.prototype.calcAge = function() {
      console.log(2020 - this.yearOfBirth);
  }
  ```

* This way, actually none of the instances of the Constructor (Person) have the method `calcAge()` attached to them, but they inherit the method from the prototype property of the Constructor.

* We can also add properties to the prototype of the constructor, which is not very common to use but is possible.

* ```js
  Person.prototype.lastName = 'Smith';
  
  console.log(john.lastName);
  console.log(mary.lastName);
  
  // This will output : 
  // Smith
  // Smith
  ```

* This way everyone John and Mary have the last name 'Smith'.



## Console.

* We can see the prototype chain in the console.
* If we take the constructor and instances from the above, we can type in "john" which returns the john object with all the properties and methods.
* We also see something called the `__proto__` which is the prototype of the john object which has all the methods and properties of the prototype of the Person Constructor.
* The prototype of the john object and the Person Constructor should be the same, and we can prove this by ...
  * `john.__proto__ === Person.prototype`
  * This should return `true`.

* Another thing that can be noticed is that the Person Constructor has a proto, and then the john object also has a proto.
* This proto is actually contains the methods and properties of the global Object Constructor.
* This is because all objects are actually instances of the global Object Constructor.
* That is the prototype chain. John object is an instance of the Person constructor which is an instance of the global Object Constructor.
* A useful and commonly used method of the global Object Constructor is the `hasOwnProperty()` which checks if some property is part of some object (this does not check the prototype property).
  * Ex.
  * `john.hasOwnProperty('name')`
    * This should return `true` because the john object has a name property.
  * `john.hasOwnProperty('lastName')`
    * This should return `false` because `lastName` was a property in the prototype of the Person Constructor. So we may use `john.lastName` but its not a direct property of the john object.

* Another useful method is the `instanceOf` property which checks if an object is an instance of some other object 
  * `john instanceOf Person`
    * This should return `true`.



### Something Cool with Arrays.

* Something we can do to really make these concepts click : 
* We can first create an array right in the console with `var x = [2,4,6]`.
* Then when we say `x`, we don't notice much but to see the properties of an array, we can do `console.info(x)` which returns the information of an array.
* We can notice that all the indexes and values are mentioned, but there's another property called the `length`. This was the property we were using this whole time.
* We also notice that the array has a `__proto__` property (`Array(0)`) which contains all sorts of properties like the `push, pop, unshift, shift`. These are the properties that are pre-written in JS for arrays which makes our lives way easier.
* Each of the properties also have prototypes, which also has a prototype, and so on until it reaches the global Object Constructor which has a prototype of `NULL` which marks the end of the chain.



## Object.create to make Objects.

* Another way of creating objects where we define the prototype first.

* Then use `Object.create(prototypeName, data)` to define the object with the data passed in.

* ```js
  // Making the prototype.
  var personProto = {
      calcAge: function() {
          console.log(2020 - this.age);
      }
  };
  
  // Creating the object with the personProto as its prototype.
  var john = Object.create(personProto);
  john.name = "John";
  john.id = 7;
  
  // But this way we need to create the empty object and then fill the data in seperately. There is another way to add the properties into the object directly.
  var john = Object.create(personProto, {
      name: { value: "John" },
      date: { value: 2001 },
      id: { value: 7 }
  });
  ```

* Using the object constructor is still the most popular way of making objects and using inheritance though.

* The advantage of using the `Object.create` method is that we can make really complex inheritance structures more easily as we can define the prototype.

  

## Objects vs Primitives.

* Something unique about objects is that object names do not actually contain the object data, but are just references to memory. 

* Whereas in primitives, they hold the data.

  * Ex.

  * ```js
    var a = 10;
    var b = a;
    a = 26;
    console.log(a, b);
    
    // This will output 26, 10 as expected because the primitive a was 10, then another primitive b was created and the value of a was assigned to it. Then the value of a was changed and logged but b stayed the same.
    
    var object1 = {
        name: 'John',
        age: 23
    }
    
    var object2 = object1;
    
    object1.name = 'Jane';
    
    console.log(object1.name, object2.name);
    
    // This will output Jane, Jane. This is because in objects, when one object is declared, it is assigned some memory and stores the given data. When another object1 is assigned to object2, instead of more memory being created like in Primitives, the same memory is given another reference which is object2. So when we mutate the data of object1, the data changes and since object2 is just another reference to the same memory, object2.name also outputs the same thing.
    ```

  ## Functions.

  * They act the same within functions. 

  * Primitives passed into functions come out unaffected because when they are passed into functions, only a copy is made and affected (unless returned within the function, ofc).

  * Objects names are just references so when they are passed into the function and changed within, the actual data is affected and so the changes stay.

  * ```js
    var prim = 10;
    var obj = {
        name: 'John',
        city: 'melb'
    };
    
    // Function that takes in a Primitive and an Object.
    function change(a, b) {
        a = 32;
        b.city = 'Sydney';
    }
    
    change(prim, obj);
    
    console.log(prim, obj);
    
    // This should output 10 Sydney.
    
    // The primitive passed is unaffected because only a copy of the data was passed into the 	      function and its scope ends at the closing parenthesis.
    
    // The object passed is affected because when its changed in the function, the actual data of    the object is chanaged.
    ```

* These differences are very important because coding without knowing this can lead to very very strange bugs and problems.