# Promise.

Promise is special feature in es6 that was designed to handle asynchronous tasks.

A promise is an object that keeps track about whether a certain **async event** has happened already or not. It is like a real promise. When we say do something in the background, it promises us some value that we can handle in the future.

A Promise can be **produced** or **consumed.**

When we **produce** a Promise, we create a new promise and send a result using that promise, and when we **consume** it, we can use callback functions for fulfillment or rejection of our promise.



## States of a Promise.

Before the event has happened, the promise is **pending**, and when it returns, the event is **settled / resolved**. This resolved event can either be **fulfilled** or **rejected.**

![image-20200528165354857](C:\Users\subra\Documents\Notes\JavaScript\Async JS\promise.assets\image-20200528165354857.png)



## Usage.

Since a Promise is an object, we need to use the `new` keyword to make the new object.

A Promise has access to two arguments - both of which are functions. They are the `resolve` and the `reject` functions.

When we get the expected value, we use the `resolve` function which marks the promise as a fulfilled promise, and when we get something unexpected, we use the `reject` function which marks the promise as a rejected promise.

Both of these functions act like `return`. When the `resolve` function is called, we pass in the expected value we get. 

If the promise was marked as fulfilled, we can call the `.then()` function which executes a callback function when the promise is fulfilled and `.catch()` function when the `reject` function is called.



```js
const getIds = new Promise((resolve, reject) => {
   setTimeout(() => {
       resolve([1, 2, 3, 4]);
   }, 1500); 
    
    // can add a reject here.
});

getIds
// When the promise is resolved.
.then(ids => {
    console.log(ids);
});
// When the promise is rejected.
.catch(error => {
    console.log('Error')
})
```



We can now do the previous example of the recipe but with promises.

Notice that the code with promises is actually longer but its also seperated in a very clean way which makes it way more managable when dealing with large amounts of calls.

```js
// ================================= WITH CALLBACKS ======================================
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


// ================================= WITH PROMISES ======================================
const getIds = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve([523, 883, 432, 974]);
    }, 1500);
});

const getRecipe = id => {
    return new Promise((resolve, reject) => {
        setTimeout(id => {
            const recipe = { id: 432, title: 'Deep dish pizza', publisher: 'someone' };
            resolve(recipe);
        }, 1500, id);
    });
}

const getRelated = publisher => {
    return new Promise((resolve, reject) => {
        setTimeout(pub => {
            const secondRecipe = { title: 'Speghetti', publisher: 'someone' };
            resolve(secondRecipe);
        }, 1500, publisher);
    });
}

getIds
    .then(ids => {
        console.log(ids);
        return getRecipe(ids[2]);   // returns a promise.
    })
    .then(recipe => {		// .then() for the promise returned by getRecipe().
        console.log(`id: ${recipe.id} and title: ${recipe.title}`);
        return getRelated(recipe.publisher);
    })
    .then(secondRecipe => {		// .then() for the promise returned by getRelated().
        console.log(`You might also like ${secondRecipe.title} by ${secondRecipe.publisher}`);
    })
	.catch(error => {
        console.log('Error!');
    });
```

