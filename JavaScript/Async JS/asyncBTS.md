# Behind the scenes of Async JS.

Everything runs the same way as synchronous JS, but with a little extra for async functions.

There is something called the **WEB APIS** which contain a bunch of functions that are asynchronous - things like request functions like `XMLGHttpRequest()` or DOM events and event listeners, or the `setTimeout()` function which all take callback functions. These callback functions are the things that are executed asynchronously. Like when event listeners wait for some event to take place, and then perform some callback function. The WEB APIS exists outside of the JS engine, but still within the JS runtime and that's why we have access to them.

These functions, and other async functions that we might create work slightly differently.



First, like any other function, these functions are added to the **execution stack or call stack**. 

But the contents of these functions (instructions that need to be done before callback can be executed) are run within the WEB APIS until they are done.

This allows for the pop of the function from the execution stack and for the program to continue running. Since it moved to the WEB APIS.

When the process inside the WEB APIS (the main function) is done, the callback function moves to something called the **Message Queue**, which is where the **Event Loop** is.

The main function of the event loop is to simply wait for the execution stack to be empty, and when its empty, push the callback from the message queue to the execution stack. When its pushed into the execution stack, it is executed and popped off.



## Example from before running asynchronously.

```javascript
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



The `first()` function is run. Then the console log, then the `second` function is pushed into call stack.

![image-20200527162733880](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527162733880.png)

![image-20200527162824555](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527162824555.png)



Then the `setTimeout` function moves to the execution stack.

![image-20200527163130505](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527163130505.png)



Since this is an async function, it is executed within the WEB APIS and moves away from the execution stack, allowing the program to continue with the `second` function.

![image-20200527163306769](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527163306769.png)

since there is nothing else in the `second` function, its also popped off, along with the `first` function.

![image-20200527163529380](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527163529380.png)



Now the timer finishes, and moves to the Message Queue.

![image-20200527163622456](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527163622456.png)



The event loop sees that the call stack is empty and moves the callback into the call stack, where the code will be executed and then popped off.

![image-20200527163704556](C:\Users\subra\Documents\Notes\JavaScript\Async JS\asyncBTS.assets\image-20200527163704556.png)