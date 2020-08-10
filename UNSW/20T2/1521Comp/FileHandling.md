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

	

Interesting to note that the `EOF` signal we're so used to using is given with the help of the metadata, when we do any of the file handling functions, it looks at the file metadata, and the number of bytes it has, and when the last byte has been processed (reading string, char, etc.), it gives the `EOF` signal.

We could do that ourselves, but not the greatest idea since the file may change, its much better to do this kind of calculation at the exact time we want to read the file (which is done by the stdio file handling functions).



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

All file handling processes have two versions, the `libc` version, which is much closer to the hardware, they use actual syscalls (a wrapper for syscalls), but they only work with unix/linux OS's and are not at all portable (also works with something like WSL).

There are much "better" and more portable verisons of these file handling functions in the `stdio.h` file. These will work anywhere but are abstracted away from the libc versions.

These won't return the file descriptor or anything, they return a pointer to a struct, and we are abstracted away from the contents of this struct.

They can do everything that the libc versions can do, and some more like more friendly operations such as `fscanf()` and `fprintf()`.

The errors in `libc` versions go to the global variable `errno`, and in the stdio versions, which use the libc versions, they have a function `perror` which reads from the global variable and prints it to stderr.

The table of errno can be found with `man errno`, which has all the codes and text explanantions for them.

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

The closing also happens automatically (done by the OS) when the program exits, but its more important to close after writing to a file, especially with the stdio version of this function because the it uses buffers to write and when the program is forced to exit (before it reaches the `close` or before the `return` from main), it will have those pending writes in the RAM and will be lost, So its good practice to close the file as soon as the write function is complete, rather than in the end (though its unlikely that this kind of thing would happen.).

When files are deleted after opening, they live in this kinda half-life within the stream created by open. So this feature/bug was used to make some temp files that can't be accessed. So a file was made and opened, then deleted immediately, so the user had no way of accessing it but the stream was still accessible from within the program.

So the actual writing to the file actually happens at `close` or `fclose`.

When we do a write instruction:

* `fopen("hello.txt", "w")` opens a file for writing -> 0 bytes.
* `fputs("Hello Subrat\n")` doesn't actually write yet -> 0 bytes.
* `fclose()` now the string is written to file -> 14 bytes.
* `fopen("hello.txt", "a")` opens file for appending -> 14 bytes.
* `fflush()` flushes (clears) all buffers, so it writes -> 30 bytes.
* `fopen("hello.txt", "w")` opens file for writing (truncates) -> 0 bytes.
* `fputs("aight im out")` doesn't write yet -> 0 bytes.
* if the program is forced to exit here, the file will be empty, and all changes will be lost.



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

Relies on the string being null-terminated, but we can always use the trusty `fprintf()` function instead.

ex.

```c
char bytes[] = "Hello Subrat\n";

// this only works for null-terminated strings
fputs(bytes, stdout)
```





```c
int fputc(int character, FILE *stream)
```

writes the `character` (byte) into the `stream`, and the stream could be something like `stdout` which is also a file pointer (FILE *).

ex.

```c
char bytes[14] = "Hello Subrat\n";

for (int i = 0; i < 15; i++) {
    fputc(bytes[i], stdout)
}

// or until null terminator '\0'
for (int i = 0; bytes[i] != '\0'; i++) {
    fputc(bytes[i], stdout);
}

// or with pointers
for (char *p = &bytes[0]; *p != '\0'; p++) {
    fputc(*p, stdout);
}
```





```c
int fprintf(FILE *stream, char *string, ...)
```

outputs the formatted (with `%d %lf` and all the good stuff) `string` into the `stream`. Its just like `printf()`, actually `printf()` is just a wrapper for `fprintf()` with the stream being `stdout`.

```c
fprintf(stdout, "Hello Subrat\n");
```





```c
size_t fwrite(void *array, size_t size, size_t num, FILE *stream)
```

writes `num` elements of `size` bytes each from the `array`, into the `stream`.

```c
char bytes[] = "Hello Subrat\n";

// would be fwrite(bytes, 4, 15. stdout) for ints.
fwrite(bytes, 1, 15, stdout);
```





## Seeking into files.



### libc version.

---

```c
off_t lseek(int fileDes, off_t offset, int whence)
```

It offsets the file pointer in file with `fileDes`, by an offset of `offset` bytes from `whence`.

`Whence` is just the start position from where we want to offset from. It can be either or:

* SEEK_SET -> offset from start of file.
* SEEK_CUR -> offset from current position.
* SEEK_END -> offset from end (last byte of file).

The offset can be a negative number to say we wanna go back, going back from SEEK_SET won't move the pointer. We can go forwards from SEEK_END, it will leave "gaps" of 0s, its strange.



### stdio version.

---

```c
int fseek(FILE *stream, long int offset, int whence)
```

The exact same as `lseek()`, but more portable, and should be used most of the time.



## Efficiency.

An efficient algorithm can make a huge difference in the amount of time a program takes, and we can measure these times using the command `time a.out <args>`. This will show us 3 times,

* `real` is the time that elapses for the program to complete. This is the "wallclock" time.
* `user` which is the time taken for the code we (the user) wrote took to execute.
* `sys` is the time taken for the code inside the kernel to execute. This is the time spent executing syscalls.

If we look at the `cp` example below, its using good algorithm, and there isn't much room for improvement because all we're doing is copying the bytes of one file to another, and if we time it, the real time is up to 6s or so for a 128 mb file.

```c
int main (int argc, char *argv[]) {
    int read_file = open(argv[1], O_RDONLY);
    int write_file = open(argv[2], O_WRONLY | O_CREAT, 0644);
    
    while (1) {
        char bytes[16];
        ssize_t bytes_read = read(read_file, bytes, sizeof bytes);
        if (bytes_read <= 0) {
            break;
        }
        write(write_file, bytes, bytes_read);
    }
    
    return 0;
}
```

If we look at the performance of `/bin/cp`, the time is about 0.2s.

and if we look at the `sys` time, then we will see that most of the time is spent on the syscalls, and this is because we are making too many syscalls, and we'll later learn that syscalls are quite expensive processes, and we're making syscalls of 16 bytes each (line 6), so we're making $$\tfrac{128,000,000}{16} = 8,000,000$$ syscalls, and we can run `strace` to see how many syscalls its making.

We can execute this program to see how much of a difference the buffer size (and so the number of syscalls) can make.

```c
int main (int argc, char *argv[]) {
    int read_file = open(argv[1], O_RDONLY);
    int write_file = open(argv[2], O_WRONLY | O_CREAT, 0644);
    
    int bytes_requested = atoi(argv[3]);
    while (1) {
        char bytes[bytes_requested];
        ssize_t bytes_read = read(read_file, bytes, sizeof bytes);
        if (bytes_read <= 0) {
            break;
        }
        write(write_file, bytes, bytes_read);
    }
    
    return 0;
}
```

Running this program with 1 bytes will have us make 128,000,000 syscalls, and it will take longer. Something like 4096 can reduce it down to 31250 syscalls, and powers of 2 will be more efficient for some reason.

This will get us very close to the `cp` version, and we can get even faster if we make just one syscall.



This is with the regular `open` and `read` but when we use the stdio versions like `fgetc`, the time is back to the normal fast time. This is because the stdio versions know that reading one byte at a time will be inefficient, so even when we specifically say `char c = fgetc(stream)`, it will still take in 4096 bytes from the stream because it will assume that there will be more calls in the future, which is a reasonable assumption. This is probably stored as an array in the unknown FILE struct, whose contents we don't know. Its contents change based on the implementation, it also comes with plenty of fun comments above it (in the stdio file), and so its best to just heed their warnings, and also we don't have any use for the internal structure.

Very similar story with the output functions, but not as simple. When we say `fputc(c, stream)`, it just ignores it for the moment and waits for other calls. When it counts 4096 calls, it does it all together with one syscall. When the program exits or the stream closes, the stdio functions will flush any remaining bytes out to the file. The `fflush()` function will flush out the bytes without closing the stream.

But there is some cost to this, if the OS terminates the program or the power goes out or the battery dies, etc, and the function did not reach the close instruction, the unwritten bytes in the buffer are lost, and this is the cost of the higher efficency. If every byte is absolutely crutial and running out of power is a real concern, then the libc versions are probably a better fit for the task.

We can see all this happen with `strace`.





### Convenience functions.

C comes with plenty of convenience functions that are just easy to write and does the more elaborate things in the background, like `printf` is just `fprintf` with `stdout`,`scanf` is just `fscanf`, `getchar` with `stdin`, `putchar`, `puts`, etc.

There is a "convenience" function `gets` which should just not be used, ever, historically, its been responsible for the most security holes, this is mainly because the function takes a buffer string (technically an array), but no buffer size. The user can easily give a string bigger than the unknown buffer size and make it overwrite many things, including the return addresses of functions and what not.



```c
snprintf(char *str, size_t size, const char *format ...);
```

This is a brilliantly useful function, its like `printf` in terms of the formatting with data going into the string, but the output goes to the buffer string we specify. This is just amazing for something like file paths. 

Should not be confused with the `sprintf` which has the same problems as `gets` in that we can overwrite data.



```c
sscanf(char *str, char *format ...);
```

This will extract information from a formatted string. Takes the string in `str`, and it takes the information and puts them into the variables specified in the format bit.

ex.

```c
int main () {
   int day, year;
   char weekday[20], month[20], dtm[100];

   strcpy( dtm, "Saturday March 25 1989" );
   sscanf( dtm, "%s %s %d  %d", weekday, month, &day, &year );

   printf("%s %d, %d = %s\n", month, day, year, weekday );
    
   return(0);
}
```





```c
int stat(const char *pathname, struct stat *statbuf);
```

stat is kinda like a extra detail version of ls, it gives info about files, more specifically, all the metadata that goes into the files like the inode number, file type, access mode, owner, group, size storage block size, allocated blocks, time of last access, modification, status change.

other versions: `fstat` -> same but gets data via an open file descriptor, `lstat` -> same but doesn't follow symbolic links.





```c
long int ftell(FILE *stream)
```

returns a number representing where we are in a file, how many bytes into the file. More convenient than using `stat` and getting the size from the metadata (we get the size of file by seeking to the end and doing `ftell()`). 





```c
int chdir(const char *path);
```

Changes the working directory of the process, not of the shell. This means if we write chdir and execute the code, and then look at our shell, the directory won't actually change, it only changes the environment variable of the process (the program), and nothing else, we can do something like chdir into a file and write a couple files maybe and make some changes, but not actually change the general working directory.

So then how does cd work? Unlike everything in the shell, cd is not actually a separate program, it uses chdir on the shell itself, so for the process (the shell), the directory changes. 

Its actually using the chdir, we can see this with strace, and this is really cool, you open up two shells, do `ps` on one and get the PID of the shell, then plug that into the `strace` of the other shell we opened. We will be able to see everything the first shell is doing like getting the input, changing directories with chdir, etc. There will be a lot the shell does. We'll also see that the shell does a `stat` of the directory you mention to see if its actually a directory or some sort of file.

We can do `strace -p{PID} -efile` to see only the file operations done by the first shell, where chdir will be.

Yeah, the shell is another program that runs other programs.





```c
char *getcwd(char *buf, size_t size);
```

This will get the current working directory. The buffer size isn't some set value, so the best thing to do is make a pretty big array, and pass the size of that array into the size parameter of the function. Most unix systems have a limit to the size of the pathname which is 256 and stored in `PATH_MAX`, we can use that as well but its not very portable (depends on the file system), but good enough for most uses.

Gets current working directory and puts it into the buffer variable.





```c
int mkdir (char *dirname, mode_t mode)
```

Makes a directory with the permissions in the `mode`, usually we do `0755` which is in octal if we want the file to be executable.





```c
int rename(const char *old_filename, const char *new_filename)
```

Very portable and an atomic process, in that it renames in one indivisible process (no longer a good name for it since subatomic particles were discovered). It doesn't  copy the contents of the file into another file and remove the first or anything, it renames the file in one atomic process. This also guarantees that there is no other processes trying to rename the file, because two renames will not be possible if the renames are atomic. If we used copy and stuff, that might not be strictly true.

It does this by "changing the metadata", which isn't that true because the metadata is actually the exact same just the name bit has changed. We can tell that this is an atomic process because the inode-number of the file will not change.

This is not true with the cp method, it will be a different inode-number, and a different mod time, etc. There is an option to keep the metadata of the original file by doing `cp -p old.txt new.txt` and this will the make the metadata as similar to the original file as possibly, but this will still change the inode number as all files must have a unique inode-number.

There is a way to have two files have the same inode number by doing `ln old.txt new.txt`, but now the two files are literally the same, any changes to one of them will reflect the changes to the other. Kinda like a pointer to some address, multiple pointers can point to the same address. This can be done in C with the link function (`link(oldname, newname);`), we can remove the links, and that won't delete the others. 

These are **hard links**. They have the same inode-number. There are also **soft links** or **symbolic links** (`symlink(new, old)` in C), which just point to a different file, but they have a different inode-number. They are redirects, so anything attempting to access the links will be redirected to the source of the link.

As a crude method to stop people from looping through and making thousands of links pointing to one another, the limit is 40. A file can be soft linked to 40 times.

There can be circular links, and the OS does follow it around 40 times, and then exits, not much fun.



## Examples

* echo with file handling.

	```c
	int main(void) {
	    // c is not a char, and cannot be a char, very common bug.
	    int c;
	    
	    // get byte until that byte is EOF.
	    while ((c = fgetc(stdin)) != EOF) {
	        fputc(c, stdout);
	    }
	    
	    return 0;
	}
	```

	

	same thing but in line by line which is not something we wanna do unless we have to do it line by line, that's mostly because we can't read binary data because the string would end at the zero byte (\0). There's also a max line size and that's not something we want either. Always better to do it character wise.

	```c
	int main(void) {
	    char line[BUFSIZE];
	    while (fgets(line, BUFSIZE, stdin) != NULL) {
	        fputs(line, stdout);
	    }
	    return 0;
	}
	```



​	A better way of going about reading multiple bytes at a time would be

```c
int main (void) {
    while (1) {
        char bytes[4096];
        
        ssize_t bytes_read = fread(bytes, 1, 4096, stdin);
        
        if (bytes_read <= 0) {
            break;
        }
        
        fwrite(bytes, 1, bytes_read, stdout);
    }
}
```



* `cp` with (byte wise) file handling functions (quite efficient way of copying files)

	```c
	int main(int argc, char *argv[]) {
	    if (argc != 3) {
	        fprintf(stderr, "Usage: %s <source> <dest>", argv[0])
	    }
	    
	    // we can write (rb or wb) here to specify that its a binary file,
	    // but its not strictly needed.
	    FILE *input_stream = fopen(argv[1], "r");
	    // we had -1 appearing in the libc versions, if that happens, then our
	    // file pointer just points to nothing (NULL pointer).
	    if (input_stream == NULL) {
	        perror(argv[1]);         // this is where the errno is (in libc).
	        return 1;
	    }
	    
	    FILE *output_stream = fopen(argv[2], "w") {
	        if (output_stream == NULL) {
	            perror(argv[2]);
	            return 1;
	        }
	    }
	    
	    int c;                       // again, not a char.
	    while ((c = fgetc(input_stream)) != EOF) {
	        fputc(c, output_stream);
	    }
	    
	    fclose(input_stream);
	    fclose(output_stream);
	}
	```

	

* cp line-wise, slightly faster than byte wise, but uses max length of line, etc.

	```c
	int main(int argc, char *argv[]) {
	    FILE *read = fopen(argv[1], "r");
	    FILE *write = fopen(argv[2], "w");
	    
	    while (1) {
	        char bytes[BUFSIZ];
	        size_t bytes_read = fread(bytes, 1, 4096, read);
	        
	        if (bytes_read <= 0) {
	            break;
	        }
	        
	        fwrite(bytes, 1, bytes_read, write);
	    }
	    
	    return 0;
	}
	```

	

* get the first byte, 42nd byte, 100th byte and last byte of a file.

	```c
	int main(int argc, char *argv[]) {
	    if (argc != 2) {
	        fprintf(stderr, "Usage: %s <source>\n", argv[0]);
	        return 1;
	    }
	    
	    FILE *input = fopen(argv[1], "r");
	    
	    if (input == NULL) {
	        fprintf(stderr, "file %s could not be opened", argv[1]);
	        return 1;
	    }
	    
	    // seeking 1 byte before the end of file (last byte).
	    fseek(input, -1, SEEK_END);
	    printf("last byte is 0x%02x\n", fgetc(input));
	    
	    fseek(input, 0, SEEK_SET);
	    printf("first byte is 0x%02x\n", fgetc(input));
	    
	    fseek(input, 41, SEEK_SET);
	    printf("42nd byte is 0x%02x\n", fgetc(input));
	    
	    // 58 from 41 is 58 + 41 = 99, and read byte (100th byte).
	    fseek(input, 58, SEEK_CUR);
	    printf("100th byte is 0x%02x\n", fgetc(input));
	}
	```




* Go to the parent directory at the top.

	```c
	char pathname[PATH_MAX];
	while (1) {
	    if (getcwd(pathname, sizeof pathname) == NULL) {
	        perror("getcwd");			// if file removed or no permission.
	        return 1;
	    }
	    
	    printf("getcwd() returned %s\n", pathname);
	    
	    // / is the top of the unix file system, nothing above /
	    if (strcmp(pathname, "/") == 0)
	      	return 0;
	    
	    if (chdir("..") != 0) {
	        perror("chdir");
	        return 1;
	    }
	}
	```

	

* get the inode_number - filename pairs of a directory in arguments

	```c
	#include <dirent.h>
	
	int main(int argc, char *argv[]) {
	    for (int argc = 1; arg < argc; arg++) {
	        // some unknown struct like FILE
	        DIR *dirp = opendir(argv[arg]);
	        
	        if (dirp == NULL) {
	            perror(argv[arg]);
	            return 1;
	        }
	        
	        struct dirent *de;
	        
	        while ((de = readdir(dirp)) != NULL) {
	            printf("%ld %s\n", de->d_ino, de->d_name);
	        }
	        closedir(dirp);
	    }
	    return 0;
	}
	```

	