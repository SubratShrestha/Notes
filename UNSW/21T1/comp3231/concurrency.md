# Concurrency & Synchronization

Concurrency issues are all over the place in an OS. One of them is a "race condition". Say there are two functions `increment()` and `decrement()` that either increment a global variable or decrement it. The functions are trying to run concurrently, and so any line from either function can run at any time.

Depending on which function's assignment line runs first (race), the global variable will have the value of the other function's `t` because it will overwrite it.

```c
increment() {
    int t = global_var;
    t++;
    global_var = t;
}

decrement() {
    int t = global_var;
    t--;
    global_var = t;
}
```



# Critical Region

Critical regions are regions on code where the start of the critical region is the bit of code that accesses a shared resource (like a global variable), and the end of the critical region is where the code stops using the shared resource.

The point of critical regions is that while a process is in the critical region, another process attempting to use the same shared resource is blocked from using it until the first process is done using it.

<img src="D:\Notes\UNSW\21T1\comp3231\concurrency.assets\image-20210302144427593.png" alt="image-20210302144427593" style="zoom:67%;" />

(19:15)