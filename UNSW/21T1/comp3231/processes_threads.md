# Processes and Threads

expect OS to deal with multiple things running at the same time.

wasn't always the case, old computers and now, supercomputers always do one thing at a time.

**process** (linux) is a task (windows term) or a job, its the execution of an individual program. Its an instance, there can be multiple instances of the same binary.

**thread** is a way for a process to divide or split itself into simultaneous running processes. Threads belong to processes, they are containers of the thread(s).



## Some OSes and their model of processes and threads

* Single process. Single thread: MSDOS
* Single process. Multiple threads: OS/161 (not a common thing to do irl)
* Multiple processes. Single thread: traditional UNIX
* Multiple processes. Multiple threads: any modern OS 



## Process/thread states

If we can only run one process/thread at a time, only one program can be "running" at any time, and the others need to be either "ready" (if chosen), or "blocked" (made some request to OS, but something OS can't do immediately like reading from disk, waiting for network package).

![image-20210222214430509](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210222214430509.png)

a process has to be running to be blocked, and the only way that the cpu is idle is when every process is blocked, in which case the cpu just waits.

**When do these transitions happen?**

**Running -> Ready**:

* Process voluntarily "yields" and goes into the ready state
* end of timeslice when the OS decides to do give some other process some time with the cpu.

**Running -> Blocked**:

* Waiting for input, timer, or for some resource to become available





## Scheduler or Dispatcher

It chooses a Ready process to run. How it does this depends on the OS, but a simple example would be using a simple queue (a ready queue).

![image-20210301183430723](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210301183430723.png)



What about blocked processes? We can have another queue (blocked queue), but in this case since the events could be anything and we'd have to search through the whole blocked queue to find the process thats waiting on that specific event. 

![image-20210301183531362](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210301183531362.png)



We can use multiple queues for each queue

<img src="D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210301191440187.png" alt="image-20210301191440187" style="zoom:67%;" />

# Thread Model

Separating execution from the environment.

With the thread keeping track of what the low level state is of the microprocessor for each thread. When the thread was last run, what was the program counter, registers, stack, state, etc. so that when the OS runs the thread again, it can load that info exactly the way it left off. This lets the OS give the illusion of running things simultaneosly while its actually switching between threads rapidly.

The process (container for threads) has all the attributes of what we think of as a application like memory, global vars, open files, signal handling like how much time each thread within the process consumed, and bookkeeping and accounting info.

![image-20210302122331981](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210302122331981.png)



**Analogy:** 

In a **single threaded restaurant** where there is only **a single person working**, the work done by the processor/person would look something like:

wait for customer -> customer arrives -> take order -> start cooking fries -> wait for fries -> fries cook -> start on burger -> wait for burger -> burger finishes -> assemble -> serve customer -> repeat.

It would take ages for a single order to finish.



In a **multithreaded restaurant** where there are **3 people working**, the work might look like: 

Thread #1: wait for customer -> customer arrives -> take order -> assemble order -> serve -> repeat

Thread #2: start fries -> wait for fries -> fries cook -> repeat

Thread #3: start burger -> wait for burger -> burger finishes -> repeat



## Structure

<img src="D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210302132536875.png" alt="image-20210302132536875" style="zoom:67%;" />

In this example, there is a single process that has 3 threads. Say there is a single matrix multiply function somewhere and each thread is running this function. Each instance of a function has its own local variables but since there are three threads using the same function, they would have the same variables.

This is why each thread needs its own stack so that this data corruption doesn't happen.

* Local variables are per thread and allocated on the thread's stack
* Global variables are shared between all threads and are allocated in the data section, this brings up a lot of concurrency issues
* Dynamically allocated memory with something like `malloc()` can be global or local depending on the pointer. If the pointer is local to thread's stack, then the allocated memory is also local, and if the pointer is a global variable, then the allocated memory is also global and will have concurrency issues.

# Fininte-State Machine Model/Event-based Model

There's no reason for a single thread machine to do just one thing at a time, with a finite state machine model, a single threaded processor can do multiple things. 

From the previous analogy, we can have:

![image-20210302125644059](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210302125644059.png)

So **customer arrives**, we take order, start fries, start burger, **another customer arrives**, we take order, start fries ... **fries for customer #1 is done**, still wait, **burger for customer #1 is done**, assemble the order, **burger for customer #2 is done**, still assembling customer #1's order, **assembling done for customer #1**, serve customer #1, etc.

So basically we don't have to sit around and doing nothing, we classify some events as blocking and some as non-blocking which can be done asynchronously. So we don't have to wait for the fries or the burger to finish to take another order.

But we need some extra bookkeeping that identifies the work being done to the customer because everything is happening at once. 

The thread model doesn't need to have explicit bookkeeping.  



# Summary

| **Model**               | Characteristics                                              |
| ----------------------- | ------------------------------------------------------------ |
| Single-threaded process | No parallelism, blocking syscalls                            |
| Multithreaded process   | Parallelism, blocking syscalls                               |
| Finite-state machine    | Parallelism, non-blocking syscalls, interrupts but more work |



**Why threads?**

* Simpler to program than a whole state machine
* Less resources associated with them than a process
	* Since the act of creating a process takes a lot of computing resources like bookkeeping, memory, open files, etc., creating/destroying threads is much cheaper, and threads share resources (especially memory) between each other, processes don't.
* Performance gains
	* Threads waiting for I/O can be overlapped with computing threads (like a wordprocessor where one thread is dedicated to keyboard input, another thread could do the actual processing, another thread could do autosaving)
* They can take advantage of the parallism available on machines with more than one CPU
	* Bad when applications take up only a single processor (like thread_1 can do the logic and thread_2 can do the display stuff), the other processors will be idle and draining power for no reason.