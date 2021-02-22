# Operating System

## What it does

allocates resources to users and processes. Ensures

* no starvation
* progress
* allocation acc to some desired policy
	* first come, fair share, weighted fair share, limits (quotas), etc
* overall, ensures that system is efficiently used.



## What it is

It is the software that runs in the Privileged mode in the microprocessor.

It IS the software in privileged mode, has access to entire set of instructions.

Everything a user does needs to be allowed by the OS. No files API? No way to store stuff. No network API? No networks, etc.



## Structure

OS has many subsystems that depend on each other (monolithic speghetti)

If the user wants to do something using the kernel mode (service from OS), the application will maybe use some library functions that will use some kind of wrapper that will set up a **syscall**, which is a request to the OS to do something in kernel mode. The OS will return with the data maybe, or deny this request for some reason.

User -> application -> system libraries -> OS (syscall) -> application.

**privilege-less OS** are some systems that don't have this privilege thing, and are systems where the application essentially has access to all of memory and OS functions. They work fine under the assumption that no applications are malicious because one fault can potentially bring down the entire system. ex. PalmOS, Mac OS 9, RTEMS, chips in washing machines, microwaves, fancy toasters, etc.

Essentially speaking, the OS code is the same as any application code, its compiled binary, and if we can write low level code, we can encode some OS sensitive code in an application, but when the application runs and attempts to execute those instructions, the hardware takes an exception and gives control to OS, and that's how the chip protects the OS. Applications can attempt to do anything. 

What if application runs forever and doesn't call the OS at all? OS has timers where the control of the processor is given to the OS, and it can decide what to do with that application.