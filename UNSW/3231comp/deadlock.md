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



