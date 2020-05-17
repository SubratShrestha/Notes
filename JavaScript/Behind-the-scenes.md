# Behind the Scenes.

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (28).png" width = 600px>

## Execution Contexts.

- All JavaScript code must run in some "environment", and this environment is called an execution context. Think of it as a box in which all our code is evaluated and executed. 

- By default, the execution context is the "Global Execution Context" and it includes any and all code, variables, etc that is NOT in any function. We can think of execution context as an Object, and the Global Execution Context is associated with the "global object", and in the browser, the global object is the window object. 

- Ex. Declaring a variable lastName is the exact same as window.lastName. Its like lastName is a property of the window object. 

- Now in some code, everything that's not in a function is in the Global Execution Context, including the function name. 

- BUT when the function is called later, a new execution context with the name of the function is created ON TOP of the global execution context, forming the Execution Stack. 

- After the last line of a function is done, the execution context of that function is popped off the stack, and the active context is now the context below the popped execution context. 

  <img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (29).png" width = 600px>

- The "name" variable is stored in the GEC. 

- The function "first" is also stored in the GEC. 

- The code that is inside the function "first" (variable a) is now stored in the "first" execution context. 

- Remember that a new EC is created ONLY when a function is called and there is code inside the function.  

- So first, "name" is stored in GEC, then line " first(); " is executed and so a new EC called " first " is created on top of GEC, the variable "a" is in the "first" EC, "b" is in "second" EC (new EC created because of the line " second(); "), and "c" is in the "third" EC, then "z" is also in the " third " EC and that was the last line of the function. So the " third " EC is now popped out, and the line " var z = b + name " is executed, z in second EC and that is also popped out until only GEC is left. 

  <img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (30).png" width = 600px>

- The first property of an EC is the Variable Object. 
- Hoisting happens, meaning all the function declarations are scanned for and a property is created in the VO pointing to the function.  
- But in the case of variables, they are scanned for, and for each variable, a property is created in the VO but **set to undefined** at first, and is later set to a value in the execution phase. 
- The last two points / " Hoisting " happens before the code is executed.

## Hoisting.

- It basically means that some parts of the code, namely function DECLARATIONS and variable DECLARATIONS have properties created in the Variable Object ( VO ) BEFORE the code is executed. 

- For functions : 

  * Ex.

  * ````javascript
    function calcAge ( birthYear ) { 
    	console.log ( 2019 - birthYear ); 
    } 
    calcAge( 2001 ); 
    ````

  * This works as expected, but what also works is :

  * ````javascript
    calcAge( 2001 ); 
    function calcAge ( birthYear ) { 
    	console.log ( 2019 - birthYear ); 
    } 
    ````

  * This is because the function declaration is read BEFORE any code is executed, and so the function is ready to use when the first line is read. 

  * This however only works for function DECLARATIONS, and so if we write a function **expression**, it doesn't work and gives an error : 

  * ````javascript
    calcAge ( 2001 ); 
    var calcAge = function ( birthYear ) { 
    	console.log (2019 - birthYear ) ; 
    } 
    ````

* For Variables

  * Ex.

  * ````javascript
    var age = 23 ;  
    console.log ( age );                  // This should give out : 23. 
    ````

  * ````javascript
    console.log ( age ); 
    var age = 23 ;                          //This however, will give out : undefined.  
    ````

  * That's because in the creation phase, the VO of the GEC will contain " age " but it will set to undefined. 

  * Guess the output :  

    * ````javascript
      console.log ( age ) ; 
      var age = 23 ; 
      function foo () { 
      	var age = 65; 
      	console.log ( age ) ; 
      } 
      foo(); 
      console.log ( age ) ; 
      ````

    * So what happens is :  

      * First, there will be " undefined " because age will be present in the VO of the GEC and set to undefined. 
      * Then, value of age in the VO of GEC will be set to 23. 
      * Since foo is a function, it creates another EC. 
      * The age in the second EC is now set to 65 and this variable is different from the variable in the GEC. 
      * Now, 65 will be printed into the console when the function " foo () " is run. 
      * Foo () is run and now 65 is printed and the second EC is popped out of the Execution Stack. 
      * Now the age variable that was in the GEC ( 23 ) is printed into the console.  

## Scope Chain.

* Just like in C++, variables defined have "scope". 
* There is the global scope, which are defined outside of all functions and are accessible to all functions. 
* Then variables defined inside a certain function are available only to that function and its sub-functions. NOT to its parent function. 

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (34).png" width = 600px>

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (35).png" width = 600px>

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (36).png" width = 600px>

- So here, the function " third() " is trying to access the variable " c ", but c is defined in a different function chain. 
- The function " third() " only has access to " d " and " a " as it is NOT a sub-function of " first() " or " second() ". 

## "this"  Keyword. 

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (37).png" width = 600px>

* It seems like the " this " keyword refers to the object, but technically it is only defined when the object calls a method. 
* That’s because the "this" keyword is attached to an Execution Context which is only created when a method is called. 
* In the GEC ( ie outside any function ) is simply the Window Object (default ). 
* Inside a regular function, the " this " keyword still points to the Window Object. That is because a regular function is different from a method. 
* Inside a method ( function within an object ), it points to the current object, and displays all data of the object. 
* Now for a function within a method, the " this " keyword in the function points to the Window Object again. This is because it is still a function, and not a method. (This is still debatable in the community ). 

## Method Borrowing.  

- Common practice in JS, and its when you have 2 Objects but you want the same method for the new Object as the old Object. 

- We simply treat the object as a variable and equate the two : 

  - ````javascript
    var john = {
        name: "John",
        year: 1995, 
        calcAge: function() {
            console.log(2019 - year);
        }
    };
    
    var mike = {
        name: "Mike",
        year: 1984
    };
    
    mike.calcAge = john.calcAge;
    mike.calcAge;
    ````

    - In this case, line 106 prints out the john Object as normal and then at line 115, it prints out the mike Object. 
    - This is amazing and it proves the fact that, the " this " keyword is only assigned a value when the Method is called. 
    - With previous knowledge and thinking that the " this " keyword only points to current object, we would assume that it would print the john Object on line 115. 

