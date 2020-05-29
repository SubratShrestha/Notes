# Async / Await.

Async / Await is a ES8 or ES2017 feature and may not be supported on some browsers. It was a feature introduced to make the consumption of promises a little bit easier and clearer.

We use the `async` keyword to declare a function to be asynchronous and run in the background, and this function can be called synchronously in the same way as any other function.

The `await` keyword stops a function from running until something has been returned. It awaits a value. But this keyword can only be used within an `async` function. So within an async function, we can wait for some value to be returned with the await keyword.

```js
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

// ================================= WITH ASYNC/AWAIT ======================================
// The production of the promises still work the same way as before, we just use the async/await to make the consumption a little easier and without the .then() or .catch() functions.

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

// using async / await for consumption.
// notice how much cleaner and simpler the code becomes without the then and catch.

async function getRecipeAW() {
    const ids = await getIds;
    console.log(ids);
    
    const recipe = await getRecipe;
    console.log(`id: ${recipe.id} and title: ${recipe.title}`);
    
    const related = await getRelated;
    console.log(`You might also like ${secondRecipe.title} by ${secondRecipe.publisher}`);
}

getRecipeAW();
```





## Return of an async function.

When an async function returns something using the `return` keyword, its actually returning a **promise** with that value. Since its returning a promise of a value and not the value itself, we can use the `then()` function on it.

```js
// Ex. from above, but with a return.

// This will not work.
async function getRecipesAW {
    const ids = await getIds;
    console.log(ids);
    
    const recipe = await getRecipe;
    console.log(`id: ${recipe.id} and title: ${recipe.title}`);
    
    const related = await getRelated;
    console.log(`You might also like ${secondRecipe.title} by ${secondRecipe.publisher}`);
    
    return recipe;
}

const returnedRecipe = getRecipesAW();
console.log(returnedRecipe);

// This will actually print something like "promise pending."
// This is because the code outside the async function runs synchronously and returnedRecipe doesn't really have a value at this point (but it starts to run asynchronously in the background).

// To avoid this, we use the .then on the return of the async function.
async function getRecipesAW {
    const ids = await getIds;
    console.log(ids);
    
    const recipe = await getRecipe;
    console.log(`id: ${recipe.id} and title: ${recipe.title}`);
    
    const related = await getRelated;
    console.log(`You might also like ${secondRecipe.title} by ${secondRecipe.publisher}`);
    
    return recipe;
}

getRecipesAW().then(rec => {
    console.log(`${rec} is just the best!`);
})
```

