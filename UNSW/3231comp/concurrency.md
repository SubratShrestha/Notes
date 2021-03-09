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



## Solution #1

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



Problems:

* The problem is that the processes are busy-waiting meaning that if its not their turn, it just sits in a loop doing nothing. The system cannot run other processes because its busy making this process wait and do nothing.
* doesn't guarantee progress if a process no longer needs a turn
* poor solution when process requires the critical section at different rates



## Solution #2

The reason why the processes are being switched around at random points in our code is because there are interrupts performed by the scheduler. If we can disable this then we have a critical region where the scheduler can't switch processes.

So before entering a critical region, disable interrupts and after leaving the critical region, enable interrupts.

Very common with single processor kernel programs. The problem with a multiprocessor is that the scheduler is per processor and disabling interrupts in one processor doesn't stop a different processor from accessing the data structures and what not.



Problems:

* Interrupt diabling is only available in the kernel because some malicious software could just disable interrupts and have some random loop running forever.
* blocks everything else like network changes, etc
* does not work with a multiprocessor



## Solution #3

Going back to the lock variable, we can have something that avoids race conditions. Modern microprocessors provide an instruction - test & set instruction - that loads the value of the lock, observe if its 0, and write 1 all in one indivisible instruction.

We avoid race conditions because this instruction can't be interrupted.

Its simple, its available at user-level to any number of processors and we can implement any number of lock variables like having separate lock variables for things like network events and file events and other stuff



Problems:

* still busy waits because its still looping around until the lock variable is 0 and the computer can't do something else instead of wait.
* starvation is possible where some process can be waiting forever as long as its unlucky enough



## Solution #4

To solve the busy wait problem, we can have a sleep/wake cycle.

When a process is waiting for an event, it calls sleep to enter the blocked state. This lets the computer do something productive instead of waiting around.

When some other process is in the critical section, the process waiting calls sleep and enters the blocked state and the system is free to do something else

When the process in the critical section is done, it can call wake and one of the blocked processes can wake up and enter the critical section





# Bounded Buffer Problem

1:13:31