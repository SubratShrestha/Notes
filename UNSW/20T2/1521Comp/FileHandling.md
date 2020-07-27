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

That is the linux/unix file system, and its a graph, not a tree, there can be links (symbolic links) between them.

Its kinda annoying to be specifying the full absolute pathname every time, so we have a current working directory (cwd) which every program has. The the `.` means current working directory.



Files are arrays of 0 or more bytes and this was a huge revalation with UNIX, because they were trying to simplify it, they wanted something that was small but powerful. Before this the OS had to know about databases, file sizes, line lengths, etc etc. and that's what unix did differently, it only knew about the bytes, it can only store or read bytes, it doesn't care about anything else, its "content agnostic", it only knows how many bytes, not how many lines it is, the contents, nothing. A file is just an array of bytes, and the array length is just the number of bytes (ls -l something.c to get the number of bytes).

The file has some metadata though like access rights (owner name, group owner name), permissions (read write execution), last modified dates, last modified time of the metadata, etc. and these are also configurable, so we don't have to store some of them if we don't want to.

Directories also have these (they are also files, a collection of bytes, they are a set of zero or more files or directories), and these can be changed with something like `chmod`.



### Metadata in inodes  (index node).

To store the metadata of files, we use inodes. They store:

* location of file in the system
* type of file (regular file or directory)
* file size
* ownership and access permissions
* timestamps (create, access, update)

There are many optimizations applied to this, and they get quite complicated like very small files may be stored in the inode itself (because the metadata itself may be larger than or a big percentage of the actual file), or optimizations to access times because files were accessed by magnetic tapes or disks, which were horrendously slow (or what we think of now as slow).

So file systems have an array of inodes. The index in this array is the inodes number (called `i-number`) which is like UNSW zid, so a directory is basically a list of (name, `i-number`) pairs.

The `i-number` we're talking about is different to the process number, and they're unique to all files. 

Note that when we `mv` a file into the same file system, the `i-number` remains the same, that's because `mv` within the same file system is an incredibly fast and efficient process, but as soon as we move away to a different file system, all that glory is lost, and when we `cp` a file, the `i-number` changes, even though it has the same content.

When we search inside a directory, the OS:

* opens dir and scan for name (linear search O(n))
* if not found, "No such file or directory"
* if found as (name, ino) access inode table inodes[ino]
* collect metadata and
	* check file access permissions, if we don't have them "Permission denied"
	* collect info about file location and size
	* update access timestamp
* use data in inode to access file contents.



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



## libc and stdio

All file handling processes have two versions, the `libc` version, which is much closer to the hardware, they use actual syscalls, but they only work with unix/linux OS's and are not at all portable (also works with something like WSL).

There are much "better" and more portable verisons of these file handling functions in the `stdio.h` file. These will work anywhere but are abstracted away from the libc versions.

These won't return the file descriptor or anything, they return a pointer to a struct, and we are abstracted away from the contents of this struct.

They can do everything that the libc versions can do, and some more like more friendly operations such as `fscanf()` and `fprintf()`.

Generally better to use these instead.



## Opening  and closing files

### libc version.

---

```c
int open(char *pathname, int flags)
```

will attempt to open an object at pathname, according to the flags. The flags are actually bit-masks which need to be set to 1. These are defined in the `<fcntl.h>`.

There are flags for reading, writing, appending, reading and writing, creating, and truncating, and these flags can be combined by using the bitwise OR like `O_WRONLY|O_CREAT` which is combining the write only and create flags.

If this is successful, it will return a positive integer representing the file descriptor (number that uniquely identifies an open file or a stream of bytes from the file), or -1 if not successful.

The reason for the unsuccessful open will be stored in a global variable `errno`, and there are some tricks done to be able to run 2 instances of it with global variables (bad, very hacky).



### stdio version.

---

```c
FILE *fopen(path, mode)
```

Opens the file in `path` in one of the modes like "r" for reading, "w" for writing, "a" for appending, etc.

There's no need for bit-masks and all of that stuff, it does all of that for us.





### libc version.

---

```c
int close(int fileDes)
```

`close` will just close the file represented by the file descriptor, and if many files remain open and we don't close them, the OS can run out of file descriptors, used to be a problem but we have thousands of file descriptors in modern systems.

When files are deleted after opening, they live in this kinda half-life within the stream created by open. So this feature/bug was used to make some temp files that can't be accessed. So a file was made and opened, then deleted immediately, so the user had no way of accessing it but the stream was still accessible from within the program.



### stdio version

---

```c
int fclose(FILE *stream)
```

closes the stream of files in `stream`, simple.





## Reading from files.

### libc version.

---

```c
ssize_t read(int fileDes, void *Buffer, size_t count)
```

attempts to read `count` bytes from the `fileDes` into `Buffer`. If you want to be happy in life, the size of `Buffer` better be at least `count`, or greater because it does not check whether the `Buffer` contains enough space, it will just go beyond the array boundaries, and we've seen how much trouble that can cause us.

returns the number of bytes read if successful (`NRead`), 0 if EOF reached, so its quite common to read less bytes than you asked for, and -1 and the error reason in `errno` if unsuccessful.

advances the offset (or the pointer into the stream) by the number of bytes read (`NRead`), this is done by `read() write() and lseek()`.



### stdio version.

---

```c
char *fgets(char *Buffer, int size, FILE *stream)
```

puts `size` bytes from the stream into the `Buffer`.



```c
int fgetc(FILE *stream)
```

returns a character from the `stream` (as ascii value in int), and offsets the file pointer by 1.



## Writing to files.

### libc version.

---

```c
ssize_t write(int fileDes, void *Buffer, size_t count)
```

literally the same as read in terms of the return values, it writes `count` bytes from `Buffer` into the `fileDes`.

In `read()`, it was possible to read in less bytes than asked for, but write is different, its all or nothing.



### stdio version.

```c
char *fputs(char *Buffer, FILE *stream)
```

writes the string in Buffer into the stream, and offsets the value of the file pointer.



```c
int fputc(int character, FILE *stream)
```

writes the `character` into the `stream`.



## Seeking into files.

