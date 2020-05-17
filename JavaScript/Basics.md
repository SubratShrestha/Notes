# Basics.

## Basic Syntax.

- **console.log** - Its like cout. It can print to the console. It is possible to print out multiple values by 

  console.log(x, y); 

 

- **var** - Its used to define a variable. Can be any type, that'll come later. 
  
  ex. var someVariable = Type; 

 

- **Variable Types :**  
  - number : Any kind of number. All stored as floating points. 
  - string : Any kind of word. 
  - boolean : true or false values. 
  - undefined : When you define some variable without assigning it anything. 
  - Null :  NULL.

 

- **prompt** : pops up a window asking a question in the browser. 
  -  ex. First Name :  

 

- **alert** : pops up a window with some sort of message. 

 

- **type coercion** : the combination of different data types into one string. 
  - ex. var age = 20, name = "blah"; 
  - ​    console.log (name + " " + "is " + age + " years old"); 

 

- **variable mutation** : In JS, variable can be changed, including its type. 
  - ex. var age = 18; 
  - ​    age = "eighteen"; 

 

- **operators** : 

  - mathematical : +, -, *, / 

  - logical : <, >, typeof, <=, >= 

    - ex. var johnOlder = ageJohn < ageMark; 

    console.log(johnOlder);	                   this will return true or flase. 

    - typeof operator : returns the type of any variable 

    ex. console.log (typeof(johnOlder));  this will return "boolean". 

 

- **operator precedence** : its simple precedence table with "()" at the top. The "=" or assignment operator also comes under this list, being at the near bottom, as you want assignment to be the last step, after all calculations. 

 

- **operator associativity** 
- is the direction in which assignment will be read. 
- Most are read "left to right", and some including assignment operator, conditional operator ( _?_:_ ) are read from "right to left" 

 

- **incremental operators** and  all work the same, ++, --, *=, +=, -=, /= 

  (any operator with "=" sign has the same precedence and associativity.  

- **The Assignment operators** :  

  - Strict Assignment (`===`) : This **Does NOT** do type coercion. This means `23 === "23"` is **false**.

    - This should be used most of the time because it can avoid lots of bugs and mistakes. 

  - Not Strict Assignment ( == ) : this **DOES** type coercion. This means 23 == "23" is TRUE. 
  - Strict different operator ( !== ) : **NO** type coercion.  

    Should be used most of the time. 

  - Not Strict Different operator ( != ) : **DOES** type coercion.  

 

## if / else statements.

```javascript
if (condition)
    instruction;
else somethingElse;

else if (otherCondition)
    somethingElse;
```

- condition can also be a lone boolean value  

- Ex.

  ```javascript
  var isMarried = true;
  if(isMarried)
      instruction;
  ```

## Ternary operator/conditional operator. 

```javascript
condition ? instruction -- if true : instruction if false some other instruction;
```

- This can also be put into a variable. 

- Ex. 

  ````javascript
  var drink = age >= 18 ? "beer" : "juice"; 
  ````

## Switch Statement .

- Similar to C++. 

- Ex. 

  ````javascript
  var job = "teacher";
  switch (job) {
      case "teacher" : 
          console.log("he teaches for a living");
          break;
      case "researcher" :
          console.log("he is a scientist");
          break;
      default :
          console.log("he is employed");
  }
  ````

- **Break** is used because we need to stop the compiler from looking and checking all the cases, even when the condition is true. 

- For two cases, as in if you want the same output for two cases then simply add the case. 

- Ex.

  ````javascript
  case "instructor" :
  case "teacher" : 
  {
      console.log("he teaches");
  }
  ````

- For cases with logical operators, you need to say case(true) because when you use logical operators, they return a boolean value.  

- Ex.

- ````javascript
  switch (true) { 
  	case age <= 13 : 
  		console.log("you're a boy"); 
  		break; 
  	case age > 13 && age < 20 : 
  		console.log("you're a teenager"); 
  		break; 
  	case age > 20 : 
  		console.log("you're a man now"); 
  } 
  ````

- **Falsy values** : values that return false when in some if/else conditions. 

  Values : undefined, 0, null, "", NaN.                     NaN : Not a Number ,   "" : empty string

Ex.

````javascript
var height; 
if(height) 
{                                                                                                 
   console.log("defined")   	//This will output "undefined". 
} else { 
  console.log("undefined") 
} 
````

- BUT if say, a variable has value 0, then it will be read as false and undefined (in above program). In this case, we must write the if statement as if (height || height === 0). By doing that, if the variable height is actually undefined, the program will continue but if it has a value of 0, then it will register as 0 and defined. This is because we use the OR operator and only one condition must be met.  

- **Truthy values** : NOT falsy values are truthy values. 

## Functions .

- Same as C++. Think of them as a machine that takes some input, does some stuff with it and returns some output. 
- The syntax is : 

````javascript
function functionName ( argument )               //This is called a function DECLARATION. 
      {  
          return something; 
      } 
````

- We can also make some calculations after the return keyword.


- Ex.

  ````javascript
  function calcAge (birthYear) {
      return 2019 - birthYear;
  }
  ````

- Follow the DRY principle, Don’t Repeat Yourself. Instead put it into a function. 

- The return keyword immediately ends the function, so for example, in a switch statement. In a switch statement that is INSIDE the function body, when return is used, it immediately ends the function and so, the break keyword is not required. 

- Another way of defining functions is :

  ````javascript
  var functionName = function ( argument ) {                    //This is a function EXPRESSION.
      instruction;
  }
  ````

- But functionName here does NOT store what the function returns, instead everything is the exact same as a regular function. 

- In JavaScript, there are **statements** and **expressions**. 

- A Statement is something that does not return anything immediately. 

- For Ex. 

  A if/else statement, a function statement, etc. 

Ex. 

If (true) { some instruction. } 

This statement doesn't necessarily have to return anything, so if you were to write that out in the console, you would get "undefined" because its not returning anything specific. 

An **expression** is something that has to return something immediately. 

For Ex. Function expressions. 



## Arrays.

- An Array is the same as C++, starts off with 0 and so on. 

- Two ways to declare an array.  
  - Square brackets : 
  
    ````javascript
    var names ["John", "Mark" , "Jane"]; 
    ````
  
  - Using new keyword : 
  
    ````javascript
    var years = new Array (1990, 1969, 1948); 
    ````
  
- Using arrays is also same as C++, ArrayName [indexNumber]; 

  or the entire array by only specifying Array name. 

  Ex. Console.log (name[0])            or      console.log (names); 

  

- To get the length of array, you just need to add " .length" after array name. This will return the number of elements in the array, so it will start from one. 

  Ex. Console.log (names.length);          This will return 3. 

  

- Its also possible to mutate the array, same as C++ by writing names[0] = "Ben"; 

- Its also possible to add more elements into the array as its not required to mention the amount of elements while declaring the array by writing names[3] = "Ben". But for example, if there are 3 elements in the array and you write names[5] = "Rob", then the array will display ""John, Mark, Jane, Ben, empty, Rob". 

  Or if names[6] was "Rob ", then it would say "empty x2".  

- Arrays can also have **multiple datatypes** in JavaScript.  

  ​	Ex. var john = ["name", "lastName", "teacher", 1990, false]; 

- The operations that can be performed to an array are called "methods" and they are mentioned after the array name with a '.'.  

  Ex. john.push("blue");    the push() is a method and it puts the "blue" element at the end of the array. 

- Couple of methods :  

  - Push() : adds another element to the end. 
  - Pop() : deletes the element at the end. 
  - Unshift() : adds another element to the beginning. 
  - Shift() : deletes the element in the beginning. 
  - indexOf() : gives the index number of the element in the array. But it needs to be in console.log or something for it to return the index number. 

  When you say indexOf() for something that doesn't exist in the array, it returns -1. So that can be used to see if the array has the element you're searching for. 

  Ex. john.indexOf("designer") === -1 ? Console.log("John is NOT a designer") : console.log("John is a designer"); 

 

## Objects 

- Much like a structure in C/C++.

- Objects are kinda like arrays but we can name each element something. It can contain any datatype including arrays. 

- Ex.

  ````javascript
  var john = { firstName : "John", lastName : "Smith", birthYear : 1990, family : ["Mark", "Bob", "Emily", "Rob"], job : "teacher" };
  ````

- We can also make a new object by… 

  ````javascript
  var jane = new Object(); 
  jane.firstName = "Jane"; 
  jane.lastName = "Swift"; 
  ````

- To see the object, write 

  console.log(john); 

- The names like firstName, birthYear, etc are called **"keys"** and to display a specific key of the object, we use the dot. 

  Ex. Console.log(john.birthYear); 

- Or you can also use the brackets and treat it kinda like an array.  

  Console.log(john["firstName"])            

  but the key name must be a string. The key name can also be represented as a variable. 

  

- Same as arrays, its possible to mutate the data. 

  Ex. John.job = "designer"; 

- It is also possible to have functions in an Object, and that function will be called a "method". 

- Ex.

  `````javascript
  var john = {
   	firstName : "John", 
  	lastName : "Smith", 
  	birthYear : 1990, 
  	calcAge : function (birthYear) { 
  		return 2019 - birthYear; 
  	} 
  } 
  `````

- To call the funtion : 

  console.log ( john.calcAge (1990)); 

- Its also possible to add a function into the object from outside the object.

  - ```js
    john.stop = function() {
        console.log("balls\n");
    }
    
    // This just adds the stop function in the john Object.
    ```

  - 

- Arrays are basically objects, that's why they can have methods as only objects have methods. 

- Its seen in that example, that birthYear is already defined in the john Object. 

- So for the key to access a previously defined variable IN the Object, we use the "this " keyword 

- So the Object now becomes… 

  ````javascript
  var  john = { 
  	firstName : "John", 
  	lastName : "Smith", 
  	birthYear : 1990, 
  	calcAge : function () { 
  		return 2019 - this.birthYear;                        
  	}								                   
  }
  ````

  ## this.

  - Basically, "this " just means the current Object. 

  - As a rule of thumb, if a function is in the object, its called a method.

  - if a function is a method in an object, "this" represents the object itself

  - if a function is a regular function and not a method, "this" represents the window object in the browser, and the global object in node.

  - ex. of when the function is in the object or when the function is a method.

  - ```js
    const video = {
        title: 'a';
        play() {
            console.log(this);
        }
    };
    
    video.play();
    
    // Here, the output will be the object itself :
    // {title: 'a', play: f}
    // This is because the function play() is a method of the object video, and so the "this" keyword is the object itself.
    ```

  - ex. of when the function is in the global object or when the function is not a method, just a regular function.

  - ```js
    function playVideo() {
        console.log(this);
    }
    
    playVideo();
    
    /**
    This will output :
    Window {postMessage: f, blur: f, focus: f, close: f, frames: Window, ...}
    
    This is the window object in the browser, as that is the object that playVideo is in.
    ```


- In order to store the result of the function as another key of the Object, we do.. 

  john.age = john.calcAge; 

- So the Object gets another key "age" which has the value returned by calcAge(). 

- Now to go one step further, instead of "return 2019  -  this.birthYear", we can simply write

- ````javascript 
  calcAge : function () { 
  	this.age = 2019 - this.birthYear; 
  } 
  ````

## Loops.

- For loop. 

  Syntax is the same as in C++. 

  ````javascript
  for (var i = 0; i < 10; i++) {
          instruction;
      }
  ````

  

- While loop. 

  Same as C++. 

  ````javascript
  while (condition) {
      instruction;
  }
  ````

- **Break; and continue**;

- **Continue**; 

  The continue; keyword is used to skip a specific element in a loop. When in a loop, if continue appears, the loop will skip over that element and move on to the next one. 

  It will skip exactly when it sees "continue". So continue must appear before the instruction of the loop. 

  You can basically think of "continue" as "skip".

  - Ex.

    ````javascript
    var john = ["john", "smith", "blue", 1990, "unmarried", false]; 
    for (var i = 0; i < john.length; i++) { 
    	if(typeof john[i] !== "string") 
    		continue; 
    	console.log(john[i]); 
    } 
    ````

- This would print :  

  John 

  Smith 

  Blue 

  Unmarried  




- **Break;** 

  Break; is similar to continue; but, it exits the loop as a whole and does not perform any remaining instructions of the loop. 

  So in the previous example, if "continue; " was replaced by "break; ", it would only print :  

  John 

  Smith 

  Blue  




## JavaScript Versions.  

- There was an initial version of JavaScript, ES1. 

- ES5 was released much later with a whole bunch of new features. Now almost all browsers support ES5, but that took time. 

- Then ES6 was released in 2015, the biggest update, after which the new versions of JavaScript was decided to be released annually. That's why ES6 is also referred to as ES2015. ES6 is still not completely adopted by few older browsers, but modern browsers work just fine with ES6/ES2015. 

- Then ES2016, ES2017 are all released which are all supported by modern browsers, but not all browsers. 

- Even though older browsers do not support modern versions of JavaScript, most features of the newer versions can be converted to ES5 by processes of transpiling and polyfiling. 

- ES2018 and ES2019 are also referred to as ESNext and some browsers support it but most features can be used by transpiling and polyfiling.           AS OF MID 2018. 

   

  