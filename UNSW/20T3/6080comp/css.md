# CSS Notes.

Only including notes for CSS that I didn't already know or want to have on hand.



## Combinators.

Combinators are operators on selectors to select based on some property.

* **Descendant**:

	* ```css
		.A .B {
		    color: red;
		}
		```

	* All .B elements that are within .A will have the style applied to them.

* **Child**:

	* ```css
		.A > .B {
		    color: red;
		}
		```

	* All .B which are direct children of .A will have the style applied to them.

* **Adjacent**:
	* ```css
		.C + .B {
		    color: red;
		}
		```

	* All .B that follows immediately after a .C will have the style applied to them.

* **General**:

	* ```css
		.C ~ .B {
		    color: red;
		}
		```

	* All sibling .B that follows after .C will have the style applied to them.





## Pseudo Classes.

These are special states of elements.

```css
/* Button which is the first and last child of its container will be blue */
button:first-child { background-color: blue; }
button:last-child { background-color: blue; }

/* Button when hovered on, will be blue */
button:hover { background-color: blue; }

/* Input, when focused on (clicked on) will be blue */
input:focus { background-color: blue; }

/* Input, when its in disabled state, will be blue */
input:disabled { background-color: blue; }

/* An anchor link that a user has already visited, will be blue */
a:visited { color: blue; }
```



## Pseudo Elements.

These are used to style specified parts of an element. 

* `::after` something will be inserted after the selected element.

	* ```css
		/* after every .text element, a blue fullstop will be added. */
		.text::after {
		    content: '.';
		    color: blue;
		}
		```

* `::before` same but before.
* `::first-letter` selects the first letter of each element.
* `::first-line` selects the first line of each element.
* `::selection` selects the portion of an element that is selected by user.



## Specificity / Precedence.

When an element has multiple rules with the same property, the cascade will look on the specificity of each selector and choose the highest one.



**Precedence:** from highest to lowest.

* !important
* Inline styles.
* id.
* class.
* type selector / tag selector.



```html
<style>
    div {
        color: blue;
    }
    
    .name {
        color: yellow;
    }
    
    #name {
        color: orange;
    }
</style>

<div class="name" id="name" style="color: red;">
    Subrat
</div>


<!-->
	Here, the name will be in red because:
		inline > id > class > tag selector
<!-->
```



* **!important**: This overrides all specificity/precedence. But if two or more elements both have !important, then the one with the higher precedence, without the !important will take precedence.