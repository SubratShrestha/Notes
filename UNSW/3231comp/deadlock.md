# Deadlock

When there are limited resources and the threads/processes are structured in a way where one process is waiting on a resource that's with another process and that process is waiting on a resource that's with the first process, then we have a deadlock.

Basically neither of the processes can continue because they're both waiting on something that's with the other process.

Ex. The same example but more concretely,

Say process A has resource 1 but is wating on resource 2. At the same time, say process B has resource 2 but is waiting on resource 1. Well A can't progress unless it has resource 2, and B can't progress unless it has resource 1. They're just waiting on each other. No progress is made and the system has deadlocked.



# Conditions for Deadlock

1. Mutual Exclusion condition
	1. The resources must be unshareable. If it was shareable then processes wouldn't have to wait for the resource
2. Hold and Wait condition
	1. When a process gets a resource it needs, it holds it. If it didn't then another process that needed that resource would just take it and make progress
	2. When a process gets a resource, it must need another and it must "wait" for that resource. If it didn't need another resource, it would just make progress and deadlock wouldn't occur.
3. No preemption
	1. a preemptive resource is one which can be taken away from a process and put back without the process realizing or caring.
	2. most resource are non-preemptive like physical memory, cpu time, etc. Some resources are preemptive like virtual memory.
	3. If the resource is preemptive, then the process wouldn't care if the resource is taken away and wouldn't deadlock.
4. Circular wait condition
	1. Must be a circular chain of 2 or more processes
	2. Each is waiting for a resource held by the next member of the chain
	3. If its not circular, processes don't need to wait and if there's less than 2 processes (so 1), it doesn't need to wait.



# Dealing with Deadlocks

## Ignore the problem - Ostrich Algorithm

* just ignore the problem - Ostrich Algorithm
	* if the cost of fixing the deadlock is really high and the probability and consequences of having that deadlock is really small, then its not worth fixing the problem. We can just stick our heads in the sand and pretend the problem doesn't exist
	* obviously not ideal but more realistic



## Prevention

*  We can structure our system in a way where it violates one of the conditions for deadlock so it can never occur.

	

### mutual exclusion condition

* generally not feasible to avoid
* technically if there's a way to not need mutual exclusion, take it



### Hold and Wait condition

* Require resource before starting
	* To violate this condition, we can try and require the resource before starting, that way the process never has to wait for what it needs, it can just be called when the thing it wants is free.
	* Issues:
		* For a tiny embedded system, it would be fine because the system only needs to do one thing over and over again like a washmachine or a microwave. But for a real OS where the user can make processes that can require any number of things, its not feasible
* Don't wait
	* We can try and make a system that gives up all resources if something is being used
	* Instead of requiring resources 1, 2 and 3 - getting 1 & 2 and waiting for 3, hogging and not even using 1 & 2, the process could get 1 and 2, and if it needs to wait for 3, just give up all resources and wait
	* do this until it can get all 3 resources 
	* Issues:
		* sounds pretty good but prone to **livelock**
		* basically the process could be unlucky and never find all resources free.
		* different to a deadlock because the process are not blocked, they change state regularly, but never get to make progress
		* kinda like when you walk in a direction and another person is walking the other direction, and you both start swaying from one direction to the other but never end up passing each other.
		* <img src="D:\Notes\UNSW\3231comp\deadlock.assets\image-20210316132657963.png" alt="image-20210316132657963" style="zoom: 67%;" /> 



### No preemption condition

Not viable because most resources are not preemptive and the resource cannot be taken away, if we force this then we get stupid behaviour like when printing something, the resource is taken away halfway, maybe another doc is being printed and its given to that. Now the printer would be printing a weaving pattern of 2 docs.



### Circular Wait condition

If we develop a precedence of resources that all processes follow or have a system where processes can only aquire resources in order of their precedence, then we won't have a deadlock.

Ex. say resources have numbers 1, 2, 3 ... and processes A and B need resources 1 and 2 like the example in the beginning. If A or B get the chance, they will only aquire 1 and then 2, they should never try to get 2 without first having 1.

If A gets to run, it gets 1, and then B gets to run, it will wait for 1 instead of grabbing 2. This works for any number of resources/processes.

If we remember the example in the beginning, A had 1 and was waiting on 2, B had 2 and was waiting on 1.

With the precedence in place, B couldn't have had 2 without first having 1. Deadlock wouldn't occur.



## Detection & Recovery

Lets make it the computer's problem. Let the system detect deadlocks and let the system fix it itself.

If we represent all resources and processes as a directed graph, we can detect cycles in that graph and there may be deadlocks there.

<img src="D:\Notes\UNSW\3231comp\deadlock.assets\image-20210320135057538.png" alt="image-20210320135057538" style="zoom:80%;" />

This works with resources that have just 1 unit. As in a process needs a resource to make progress. But what about a process that needs 10 units of RAM to make progress competing with another process that needs 5 units of RAM to make progress. How do we represent this?

Multi-unit resources can be:

* RAM
* blocks on a disk drive
* slots in a buffer



We can use Matrices.

We can have a "Current Allocation matrix" and a "Resources Available matrix".

For the Current Allocation matrix, the rows represent processes and columns represent the number of resources the process currently has.

For the Resources Available matrix, the rows still represent the processes and the columns represent what each process needs to make progress.

![image-20210320140637786](D:\Notes\UNSW\3231comp\deadlock.assets\image-20210320140637786.png)



We can notice that
$$
\sum_{i=1}^{n}C_{ij} + A_j = E_j
$$
(where C is the current allocation, A is the resources available, and E is the resources in existence)

Basically, the sum of the current resource allocation (what all the processes currently have) + number of resources available (how much of each resource is left) = the number of resources in total (no shit) (conservation of resources if you will)

Ex.

<img src="D:\Notes\UNSW\3231comp\deadlock.assets\image-20210320160757231.png" alt="image-20210320160757231" style="zoom:67%;" />

So there are 4 tape drives, 2 plotters, 3 scanners and 1 CD Rom in existence, since (in matrix C), process 1 is using 1 scanner, process 2 is using 2 tape drives and a CD Rom, and process 3 is using a plotter and 2 scanners, there are 2 tape drives and 1 plotter left available.

(From matrix R) Process 1 is looking for +2 tape drives and a CD Rom, process 2 is looking for +1 tape drive and +1 scanner, and process 3 is looking for +2 tape drives and +1 plotter.

note: in the request matrix, if an entry is lesser than in the C matrix, it doesn't mean the process done using the difference, it means the process is looking for $$R_{ij}$$ extra resources.

Does this system Deadlock?



### Detection Algorithm

1. Look for an unmarked process $$P_i$$ for which, every resource in the $$i^{th}$$ row of R is less than or equal to every resource in A (basically look for a process who's Request can be fulfilled by whats Available)
2. If found, add the values of the $$i^{th}$$ row of C to A, mark $$P_i$$. Repeat step 1 (basically if the request can be fulfilled, then the process will get the resources, complete and give those resources back for other processes to use)
3. If no such process exists, terminate
4. The remaining unmarked processes are deadlocked.



### Recovery from Deadlock

* Recovery through preemption
	* take a resource from some other process
	* depends on nature of the resource
* Recovery through rollback
	* checkpoint a process periodically
	* use the saved state, hoping for no deadlocks
	* no guarantee that the process won't deadlock again
* Recovery through 
	* crudest but simplest solution
	* kill one of the processes in the circular dependency
	* the other process gets the resource it wants and the system continues
	* choose a process that can be rerun from the beginning before killing it



## Avoidance

Not the same as prevention.