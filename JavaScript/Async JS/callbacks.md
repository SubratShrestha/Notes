# Async with callbacks.

Asynchronous JS using callbacks is an old way to use async. The problem with async using callbacks is the nesting. Because the callback functions need to be inside one another, we get callback after callback after callback. This is what is known as **callback hell.**

To demonstrate a callback hell, we'll simulate an asynchronous call to some API using the `setTimeout` function.

```js
// Ex. If we wanted to get some ids, then get the recipe of that id, and then get another recipe of the same publisher, all from an api.

function getRecipe() {
    setTimer(() => {
        // getting some recipe id.
        const recipeID = [523, 883, 432, 974];
        console.log(recipeID);
        
        // getting the recipe of that id.
        setTimeout(id => {
            const recipe = {title: 'Fresh tomato pasta', publisher: 'someone'};
            console.log(`id: ${id}, recipe: ${recipe}`);
            
            // getting a suggested recipe by same publisher.
            setTimeout(publisher => {
                const suggested = {title: 'Italian pizza', publisher: 'someone'};
                console.log(`you might like ${suggested.title} by ${suggested.publisher}`);
            }, 1500, recipe.publisher);
        }, 1500, recipeID[2]);
    }, 1500);
}

getRecipe();

// ** The setTimeout function can take in arguments after the callback and the time in ms.
// setTimeout((argument_variable) => {  definition  }, time in ms, actual_argument);
```



The code has a lot of nesting, and this can get way out of hand, very quickly and this is why this method for async js is not preferred anymore and this is also where **promises** come in.