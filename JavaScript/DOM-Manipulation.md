# DOM Manipulation.

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (42).png" width = 600px>

## Math Object.

* The Math Object has some handy functions. 

* math.random() : gives a random number from 0 to 1. 

* math.floor() : gets rid of all decimal values after a number.      ( Math.floor(6.9) = 6 ) 

  * For getting a random value from 1 to 6 ( for the dice in the Pig Game ) , we simply do … 	math.floor ( Math.random() * 6 ) + 1; 

    

## Document Object.

* The Object that gives a JS script access to the DOM ( box in the HTML script ). 

* **querySelector ()** 

  * To select something from the DOM, we can use many methods but the easiest one is the **.querySelector()** method, which takes a string as the parameter which for now, will be the " id " of the HTML part, with a " # " infront of it.  

  * \# is the "id selector" from CSS and it simply selects the element with id number following the symbol. 

  * . Is the "class selector" and it  simply selects the element with class number following the symbol. 

    * ````javascript
      document.querySelector (" #current-0 ");
      ````

* **.style** to add CSS code

  * We can also use querySelector to select and change a CSS property. 

  * So if we wanted to hide the dice image in the beginning of the game, we select the "dice" element from the HTML code, and then use the .style feature to edit the CSS code, and then .display to set the display value to something ("none" in this case ) 

  * ````javascript
    document.querySelector(".dice").style.display = "none";
    //none- To hide button, block- To display 
    //So the syntax is : style method . CSS property = CSS value. 
    ````

    

* **.textContent**
  * Now to actually edit the value of it, we use the **.textContent** feature, which doesn't take any parameters as its not really a method/function. 

    * To set the random value of the dice to the id " current-0 ", we write…      (called "setter") 

    * ````javascript
      var dice = Math.floor( Math.random * 6 ) + 1; 
      document.querySelector (" #current-0 ").textContent = dice; 
      ````

  * We can also use this to read a value from the HTML script…                                   (called "getter") 

    * ````javascript
      var x = document.querySelector("#score-0").textContent; 
      //This value in score-0 will be stored in x.
      ````

  * Now the querySelector () takes a string as parameter.  

    So in the PigGame, if we have score-0, current-0, etc as data for player 1, and score-1, current-1, etc for player 2… 

    Then we can define a variable called activePlayer and assign it a 0, and then edit the values of the HTML part of any each player by simply adding the activePlayer value to the string " #current-" + activePlayer in the querySelector method. 

    * ````javascript
      document.querySelector( "#current-" + activePlayer).textContent = dice; 
      ````

      

   

* **.innerHTML** to add HTML code

  * There is a way to even add some HTML code from the JS script whenever we need, and for that, we use the **.innerHTML** feature. 

  * The HTML code must be a string, and the HTML code will be added to the .html script. 

    To emphasize (write in italics) the current-0/current-1 value, we write … 

    Ex. 

    ````javascript
    document.querySelector("#current-" + activePlayer).innerHTML = "<em>" + dice + "</em>"; 
    ````

    * If you were to write this using the .textContent feature, it would edit the value of the current-0 to "<em>2</em>" because it would interpret it as plain text and not HTML code.

* **.getElementById()**

  * There is a way to select from the DOM only by ID, and its faster than querySelector. 

  * Ex.

    * ````javascript
      document.getElementById("ID").textContent = "something"; 
      ````

## Events and Event Listeners.

<img src = "C:\Users\subra\Pictures\Screenshots\Screenshot (44).png" width = 600px>

* The rule is that Events can only processed or listened when an Execution Stack is empty which means all the functions have returned. 
* All Events are put in something called the "Message Queue", where they wait until they are processed, which is after the Execution Stack has become empty. 
* Now as Event Listeners are functions, they have their own Execution Context. When the Event happens (ex. Mouse click), the Listener function is complete and thus, the stack will be empty and the Event is processed. 

**.addEventListener ()**

* The .addEventListener feature adds a listener which listens for one of the many events in JavaScript found here: https://developer.mozilla.org/en-US/docs/Web/Events 
* Syntax :  

* ````javascript
  document.querySelector( "btn-roll ").addEventListener ("event", "function name" ); 
  ````

- Callback Function :  

  So when "event" happens, "function name" function is called but we only write the function name without parenthesis because we are not actually calling the function ourselves, it is the Event Listener that calls the function. This is called a **callback function.** Where a function is called by another. Or a function that we pass into another function as an argument. 

 

- Anonymous Function :  

  A function without a name, and so cannot be reused. 

  In the .addEventListener() function, if we don’t want to use a defined function, we can create an anonymous function… 

  ````javascript
  document.querySelector("btn-roll").addEventListener("click", function () { something; }); 
  ````

  

 

- Src :  

  - To change the source of any file of the HTML script, we use the src keyword… 

  - ````javascript
    document.querySelector(".dice").src = "somethingElse.png"; 
    ````

  - But for the dice program, all the files are named in order as "dice-1/2/3… .png". And the variable dice gives the randomly generated dice roll, so we can write it as… 

  - ````javascript
    document.querySelector(".dice").src = "dice-" + dice + ".png"; 
    ````

* **.classList.remove ()**

  * The .classList.remove feature removes something from the HTML class. 

  * Syntax :  

  - To remove the "active" word from the HTML class "player-0-panel active" of the Pig Game. 

  - ````javascript
    document.querySelector(".player-0-panel").classList.remove ("active"); 
    
    //Here, even though the class name is actually "player-0-panel active", we don't include the bit that we want to remove. 
    ````

    

* **.classList.add () **
  * The .classList.add adds something in the HTML class. 
  * The syntax is the same as .classList.remove (). 

* **.classList.toggle ()**
  * It adds to the class if its not there, and removes it if its already there. 

## State Variables. 

* Variables that tell the state of the program usually as true or false, in games that would be ...

  gamePlaying = true. 