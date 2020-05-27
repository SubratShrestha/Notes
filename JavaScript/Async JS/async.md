# Synchronous code.

Everything we have been writing so far has been synchronous JS, which just means that all the lines are executed line by line. This is also how a lot of other languages work.

When a function is called, that function is added to the **execution stack, or the call stack**, that function is then performed, and after its done, the function is popped off the stack.

# Asynchronous code.

JavaScript works in a slightly different way than normal languages when it comes to asynchronous code. Out of the box, JS performs asynchronously, meaning that when some code takes some time - like maybe a request to an API - it waits for that request in the background and continues on with what it can run. When the background function is done, it will be performed.

```js
const second = () => {
    // The setTimeout function simply takes a callback function and a number as arguments.
    // It performs the callback function after the provided number of milliseconds is up.
    setTimeout(() => {
        console.log('async hey there.');
    }, 2000);
}

const first = () => {
    console.log('Hey there.');
    second();
    console.log('the end.');
}

first();
```

The expected output for this is `Hey there.` `async hey there. (after 2s)` and then `the end.`

But this is not how JS works, JS will first print `Hey there.` then `the end` and then `async hey there. (after 2s)`.