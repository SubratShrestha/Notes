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

<img src="D:\Notes\UNSW\3231comp\concurrency.assets\image-20210302144427593.png" alt="image-20210302144427593" style="zoom:67%;" />



## Critical regions solution

For a solution for running code like this needs to have a few properties

* Mutual exlusion:
	* no two processes simulataneously in critical region
* No assumptions made about speeds or number of CPUs
	* We could hard code it for a specific device whose speed and load we know, it could work, but only in that device and for that exact load.
* There should be progress
	* the machine should be making progress and no process running outside its critical region should be blocked
* Bounded
	* no process should wait forever to enter its critical region



## Solution

We can try having some `turn` variable and two processes that wait each others turns. If `turn == 1` process 1 enters the critical region, else process 2 does.

```c
// process #1
while (true) {
    while (turn != 0); // loop until turn = 1
    critical_region();
    turn = 1;
    non_critical_region();
}

// process #2
while (true) {
    while (turn != 1); // loop until turn = 1
    critical_region();
    turn = 0;
    non_critical_region();
}
```

 (37:13)