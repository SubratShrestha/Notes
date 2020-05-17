# JQuery.

## Uses.

* JQuery is a javascript library that can be included into our websites for various cool effects and applications.
* Its basically JS but then much much more efficient and short than writing vanilla JS. But its also very focused on DOM manipulation like animations, and cannot do most of what JS can do.
* There are thousands of free plug-ins that we can use for different things.
* It helps select and manipulate HTML elements, and edit the CSS when clicked or hovered on, etc.
* It also helps create beautiful animations and develop AJAX applications.
* Examples of different plug-ins: 
  * Magnific Popup: It allows for pop-ups of different media like images, videos or maps even.
  * Tooltipster: It allows for additional bars of additional information to pop up with animations when certain elements are hovered over or clicked on.
  * Maplace: It allows for the integration of maps into the website, and even markings and selections within the maps.
  * Typer: It allows for a cool typing animation where more information is typed live, and can include smooth animations of typos, selection and correction of these typos.
  * OnePageScroll: It allows for smooth animated scrolling of the website to a different section of the website, so that the entire section is always visible and the entire height of the screen is shown.
  * Waypoints: It allows for a function to be carried out when the user has passed a certain scroll point.
* Don't forget to include the JQuery snippet and the js file that you write your code in in the index.html file.

## Code.

* Every JQuery document will start like:

* ```javascript
  $(document).ready(function() {
      // All code in here.
  });
  ```

* Ensures that the JQuery code can only run after the document has been loaded.

* We use the `$` as the selector in JQuery.

### Editing CSS.

* To select the any element: 

* ```javascript
  $('element name').method(function() {
      $(this).css('css-property-name','new value');
  });
  ```

* The `method` here is a javascript term, it could be the function that is detected on the element that was selected.

* The `this` keyword simply takes what has been selected.

* The `css` is a keyword that changes the CSS property of whatever's passed into it.

### addClass and removeClass.

* `.addClass` adds a certain string to the class name of the property, so that we can change the properties pretty quickly.
* `.removeClass` removes a certain string from the class name of the property.
* All we do is make another CSS class (not necessary to edit html) with the added string and change it to whatever, then use the `.addClass` or `.removeClass`in the script to toggle between the two "versions".
* Look at next code example.

### WayPoints.

* Waypoints is a plugin like above where there is a specific function performed when the page is scrolled to some point.

* The most important bit is the `waypoint` method we can use in our script.

* It takes the direction as the parameter of the function inside the method which can be "up" or "down".

* ```javascript
  // This code just adds and removes the "sticky" from the class name.
  // Note that there are seperate CSS classes for "nav" and "nav sticky", which the JQuery just 	    toggles between.
  $('.js--section-features').waypoint(function (direction) {
  	if (direction == "down") {
  		$('nav').addClass('sticky');
       }
       else {
           $('nav').removeClass('sticky');
       }
  	}, { 
      offset: '60px;'
  });
  ```

* The `offset` property just tells the waypoint to perform the function earlier or later.

### slideToggle.

* The `.slideToggle` method opens and closes parts of the site, with some animation whose duration is taken as the parameter, so you control the speed.

* ```javascript
  /* This code just opens and closes the navigation bar with slideToggle */
  
  /* Basically first the hamburger icon is visible and we use the .click method to have a function run when this icon is clicked, the function then performs the .slideToggle method to open it, and then changes the display of the hambirger icon to "none" which makes it invisible and then makes the closing icon visible (it was set to invisible in the beginning) by changing the display property to "block".
  Then we do the same thing for the closing animation, setting the closing icon to be "none" and setting the hamburger icon to be block*/
  
  /* Hamburger */
  $('.js--nav-icon').click(function () {
  	var nav = $('.js--nav');
      nav.slideToggle(200);
      $('.js--nav-icon').css("display", "none");
      $('.js--x').css("display", "block");
   })
  
  /* Closing */
  $('.js--x').click(function () {
  	var x = $('.js--nav');
  	x.slideToggle(200);
      $('.js--x').css("display", "none");
      $('.js--nav-icon').css("display", "block");
  })
  ```

* 