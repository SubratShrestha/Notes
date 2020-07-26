# File Handling.

## OS.

The OS sits between the user and hardware, and it gives us a way for our programs to run on a virtual machine because its way more convenient than real machines.

When we get closer to the hardware, we may not have an OS for our programs and they may need to interact with the hardware directly, but most of our programs run on a virtual machine provided by the OS.

This was world changing because before this, every new hardware produced needed a different OS, and this was the great insight of unix and linux because these were one of the first OS's to be written in a high level language, it was a simple and powerful OS produced for one platform, a version of PDP Minicomputer and soon, it could be used in different PDP Minicomputers and soon, in multiple devices.

Now people could change hardwares, but stay on the same OS, and this was world changing. The OS's they produced (70s in Bell Labs), are still around today in androids and stuff.

OS's can also allow for privileges and more security.

The UNSW electrical engineering department bought a PDP 8 and knew of the new OS that had been written for these devices, and wrote to Dennis Ritchie for a copy in magnetic tape and they got it, and similarly with other universities, who developed different programs and additions to the OS to do more university specific things and these features were sent back to Bell Labs.



## System Call

A system call is a request to the OS. It transfers execution to privileged mode and executes operating code.

Different system calls do different things like: reading writing bytes to a file, requesting more memory, creating a new process for execution (running a program), terminating other programs or itself, sending or receiving info via a network etc.

Linux has over 400 system calls but that's mostly because its able to run on almost any hardware and so it actually needs those.

There is a C interface for this called `syscall`

```c
// syscall_number is spcecifying which syscall number out of the 400.
// stream is where we need to output to, stream 1 would be stdout, these are set up
//        by the shell that launches the program.
// bytes is the memory address of first byte to write.
// number_bytes is the number of bytes to write.

syscall (int syscall_number, int stream, &bytes, int number_bytes)
```





## Files.

Originally they were just file systems in magnetic disks but the creators of UNIX soon realised that a lot more could be done using the file system, so the UNIX philosophy is: Everything is a file.

They can be used to access:

* files of course.
* directories or folders
* storage devices
* peripherals
* system info
* inter process communication, etc.



Files and directories are accessed with pathnames like:

`/home/z5123456/lab08/main.c`

and 2 chars are not allowed as filenames and that would be "/" and "0", 0 because UNIX uses a '\0' to terminate the pathname (same as C), and these pathnames are finite, though they are much more configurable now, but they are finite (4000 chars all together maybe), and that wouldn't be reached through normal use, but with generated files and pathnames, these limits can be reached.

`.` and `..` have special meanings, `.` is for the current directory, `..` for parent directory, and we can't use them as filenames. Some programs use filenames starting with a `.` specially (shell and ls).

<img src="C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\FileHandling.assets\image-20200726161705650.png" alt="image-20200726161705650" style="zoom:80%;" />

That is the linux/unix file system, and its a graph, not a tree, there can be links between them.

Its kinda annoying to be specifying the full absolute pathname every time, so we have a current working directory (cwd) which every program has. The the `.` means current working directory.



Files are arrays of 0 or more bytes and this was a huge revalation with UNIX, because they were trying to simplify it, they wanted something that was small but powerful. Before this the OS had to know about databases, file sizes, line lengths, etc etc. and that's what unix did differently, it only knew about the bytes, it can only store or read bytes, it doesn't care about anything else, its "content agnostic", it only knows how many bytes, not how many lines it is, the contents, nothing. A file is just an array of bytes, and the array length is just the number of bytes (ls -l something.c to get the number of bytes).

The file has some metadata though like access rights (owner name, group owner name), permissions (read write execution), last modified dates, last modified time of the metadata, etc. and these are also configurable, so we don't have to store some of them if we don't want to.

Directories also have these (they are also files, a collection of bytes, they are a set of zero or more files or directories), and these can be changed with something like `chmod`.



## Hardware

The feature of privileges is very difficult to do without the help of the hardware, it needs to provide a privileged mode which:

* allows access to all hardware/memory
* OS running in privileged mode
* allows transfer to running code from a non-privileged mode.

and non-privileged mode which

* prevents access to hardware
* limits access to memory
* provides mechanism to make requests to OS

The OS request is the syscall, and it transfers execution back to kernel code in privileged mode.