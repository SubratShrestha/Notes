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





## Thread Model

Separating execution from the environment.

With the thread keeping track of what the low level state is of the microprocessor for each thread. When the thread was last run, what was the program counter, registers, stack, state, etc. so that when the OS runs the thread again, it can load that info exactly the way it left off. This lets the OS give the illusion of running things simultaneosly while its actually switching between threads rapidly.

The process (container for threads) has all the attributes of what we think of as a application like memory, global vars, open files, signal handling like how much time each thread within the process consumed, and bookkeeping and accounting info.

![image-20210302122331981](D:\Notes\UNSW\21T1\comp3231\processes_threads.assets\image-20210302122331981.png)













