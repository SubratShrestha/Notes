# Memory

Typical architecture of a modern machine

<img src="C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\memory.assets\image-20200811175330306.png" alt="image-20200811175330306" style="zoom:67%;" />

The RAM is volatile memory, the cache sits between the CPU and the RAM to give us faster access, and the cache sometimes sits inside the cpu, or they could be in different chips.



## Running processes without OS.

This is the case with many tiny embedded systems. Devices like sensors switches, etc will probably be wired at particular addresses, or maybe the motor speed stored in some address. 

In these systems, the program will access the RAM directly, and have full control over 100% of it.

Widely used for simple micro-controllers, but the development and debugging of programs can get very tricky.



## Running with OS.

OS's need a some hardware support because some resources should not be available to some programs. 

The programs need to access the RAM directly still, but a part of it needs to be reserved for privileged mode (kernel/address space).

Something like a `syscall` should be able to enable this privileged mode, where we put some values/data into the memory and make a syscall, and the OS would decide if we have sufficient permissions to do the thing we wanted.

For most embedded purposes, one process in the RAM at a time might be enough. The downside is of course, everything needs to be removed from RAM and replaced with another program when we switch programs.

This is not the case for modern general purpose computing.



A way to have multiple programs running in the RAM is to maybe have some hardware support that could limit process accesses to some regions of the RAM (segments), so like splitting it.

The OS could also swap execution between them pretty quick.

BUT, we run into the problem of addresses. Some programs need absolute memory addresses (like programs that use a bunch of jump instructions maybe) and this wasn't that big a problem in SPIM because SPIM runs one program at a time, so that means there needs to some modification done to the programs before they are run, it is possible.

Needs restriction on some types of programs, and so these aren't really used for modern computing either.

This is where Virtual Memory kicks in.

# Virtual Memory.

We can disconnect the addresses that programs use from the actual RAM addresses. That means that the OS translates every address a process uses to an actual RAM address.

There may be multiple programs using, say address 27, but the OS is converting all those addresses to real, unique addresses in the RAM, all those 27's would be directed to different locations in the RAM.

So there can be as many programs running at a time as we want, and all those programs would think they have access to all of the RAM, but the OS is directing these requests to the segment of RAM that is actually allotted for them behind the scenes.

Very convenient as well because each process has the same virtual view of the RAM. 

This has a couple different ways to be implemented.



## Implementation #1

We can have multiple processes in the RAM as contigruous sections, much like an array, with each process being allotted a `base` index, and a `limit` index of the RAM.

| 0 - p1_lim |        | p2_b - p2_lim | p4_b - p4_lim |        | p6_b - max-1 |
| ---------- | ------ | ------------- | ------------- | ------ | ------------ |
| **proc1**  | unused | **proc2**     | **proc4**     | unused | **proc6**    |

So when `proc2` asks for the 0 index, the OS translates that to the `p2_b` index, and when `proc1` asks for the same 0 index, the OS translates that to the actual 0 address.

When any process attempts to access memory, we add the `base` to the address and check if that's less than the `limit`.

This is easy to add hardware support to.

There is a big problem though, and that's `fragmentation`, what if there's a big process `proc7` that needs to use more memory than the unused space between `proc1` and `proc2`?

There is more unused space between `proc4` and `proc6`, but those processes need to all be shifted, which is not very efficient use of the RAM.

There is also the idea of splitting the RAM position of this big program into chunks that can fit into these spaces. Maybe the majority of `proc7` is stored in the first unused space and the rest in the other unused space. But this requires our OS to do more checking of each process to see if they are being split somewhere else, and more checks need to be performed every time `proc7` requests RAM access to see if that access should be done in the first chunk or the second one.

Makes it slow, awkward and complicated, and that's the reason it isn't used as often in modern computing, although it is used sometimes. 

Code would look something like:

```c
// translate virtual_address to physical RAM address
uint32_t translate(uint32_t process_id, uint32_t virtual_addr) {
	uint32_t n_segments;
	Segment *segments = get_segments(process_id, &n_segments);
	for (int i = 0; i < n_segments; i++) {
		Segment *c = &segments[i];
		if (virtual_addr >= c->base && virtual_addr < c->base + c->size) {
			uint32_t offset = virtual_addr - c->base;
			return c->mem + offset;
		}
	}
// handle illegal memory access
}

```







## Implementation #2

Address mapping would be simpler if all the chunks of memory were the same size. 

Imagine both the virtual and the physical address spaces were partitioned into chunks of the same size.

We can call these chunks "Pages". All the pages would be the same size, `pageSize`. 

Page `i` would hold the addresses from `i * P` to `(i + 1) * P`, where P is the pageSize.

Now each process has an array called `page_table`. Each element of `page_table` array contains the physical address of that page, this is what we'll use to get the physical address of some virtual address.

For some virtual page V, `page_table[ V / P]` would be the physical address of the page in RAM. The address will be at an offset `V % P` in both pages. 

So the physical address for V is `page_table[V / P] + (V % P)`.

Code would look like (notice there are no loops, its much more efficient):

```c
// translate virtual_address to physical RAM address
uint32_t translate(uint32_t process_id, uint32_t virtual_addr) {
	uint32_t pt_size;
	PageInfo *page_table = get_page_table(process_id, &pt_size);
	page_number = virtual_addr / PAGE_SIZE;
	if (page_number < pt_size) {
		uint32_t offset = virtual_addr % PAGE_SIZE;
		return PAGE_SIZE * page_table[page_number].frame + offset;
        // where we keep pages in physical memory often gets called a frame
	}
// handle illegal memory access
}
```



So if the process asked for address 27 and the pagesize was 3, the OS wouldn't actually give it access to the real 27th address of physical memory, it would give `page_table[3] + 0`

then 28 would be on `page_table[3] + 1`

If some other process was asking for address 27, the `page_table` array would be different to the one the previous process was using (it would be a different page).

Also notice there are divisions and moduli (lines 5,7), and when it comes to embedded systems that aren't too powerful, we would want to make as easy to run as possible, and divisions are slow operations, so we would want to use powers of 2 as pagesize, and we can do those lines with bit operations, which are much easier for the computer to do (x / 4096 will just be x >> 12 with bitwise, and the remainder part can be masked with a mask = 0xFFF).

4096 is a good choice because its a power of two, and if the page size is too small, we increase our overhead, if the page size is really large, we reduce our overhead, but then the page might be be unused for a lot of processes, and we get fragmentation.

![image-20200811230227717](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\memory.assets\image-20200811230227717.png)





## Lazy loading pages.

As a side-effect of having virtual pages is lazy loading, where we don't actually need to load the pages, or the load the physical memory when the program starts. We can just start with a small memory "footprint" like main and the top of the stack, and load more memory as needed.

Many people think of this pages thing and lazy loading and the possibility that a program might have more virtual memory as physical memory as being "virtual memory", but historically, having the disconnect from physical memory and the whole mapping is virtual memory, but the exact definition doesn't matter.

Pages/frames go from 4KB to 256KB maybe, higher range in modern systems. So with 4GB of physical memory, we would have a million x 4KB frames, and each frame can hold one page of process address space.

Each entry in the page table, which was the array that each process has can have more things than the page number, it can also have the page status - not_loaded, loaded, or modified, it can have the frame number of page (if loaded), and maybe more things like last accessed time (useful).



```c
typedef struct {int status, int frame, ...} PageInfo;
uint32_t translate(uint32_t process_id, uint32_t virtual_addr) {
    uint32_t pt_size;
    PageInfo *page_table = get_page_table(process_id, &pt_size);
    page_number = virtual_addr / PAGE_SIZE;
    if (page_number < pt_size) {
        if (page_table[page_number].status != LOADED) {
            // page fault - need to load page into free frame, req to OS
            page_table[page_number].frame = ???
            page_table[page_number].status = LOADED;
        }
        uint32_t offset = virtual_addr % PAGE_SIZE;
        return PAGE_SIZE * page_table[page_number].frame + offset;
    }
}
// handle illegal memory access
```





## Loading pages.

We keep saying loading pages:

* code is loaded from the executatble binary file into read-only pages, they're read-only to make it shareable, and to prevent the code from modifying itself. 
	* There are some self modifying code that do very clever things like JS interpreters and any sort of graphical transforms but still a rare thing to come by.
* some data like C string are also loaded into read-only pages, again for shareability through programs, and prevents from accidental changes.
* initialised data (gloabal vars, static variables) also loaded from executable file - these can be changed, but they are initialised, so the a.out may have megabytes worth of initialised data, but these can be changed.
* pages of uninitialised data (heap, stack) are replaced with 0 and this prevents info leakage
	* on linux systems, its guaranteed that the first time a variable is used (uninitialised), the value in it will be 0, doesn't apply if the programs gone up and down the stack a couple times.



* Consider when a process's address space (virtual memory) exceeds the physical memory.
* say we have 1 GB of physical memory, and the process needs 3GB of memory, with a clever OS, it puts the data the process currently needs in the 1GB, and stores the rest in the disk, loading to and from the disk as needed.
* of course this depends on the process not needing too many pages at one time.
* This is possible from 1 to 3 times the physical memory, but totally depends on the process, because transferring pages between disk and memory is very expensive, this is a key part of a good OS.
* When a page is requested but it doesn't exist in the RAM yet, we get a **page fault**, and we need to load it into the RAM from disk, and so we need to hope that there is a free frame available, and so we need a fast way to identify free frames, and this handled with a **free list**.
* If there are no free pages available, the OS can suspend the requesting process until a page is freed and for this the OS needs to mark the process as unable to run until new free pages are available, and switch to running another process, when page is available, this process needs to run, or we can replace one of the currently loaded pages with the new one.



* How do we choose which page to evict?
	* prefer pages that won't be used again by its process
	* prefer pages that are read-only (no need to write to disk)
	* unmodified pages (same reason)
	* pages that are used by only one process
* This all relies on the OS predicting the future, which is cant do, so we need some heuristic - a rule for guessing.
* A good heuristic - replace Least Recently Used (LRU) page because a page that hasn't been used recently probably won't be needed again very soon.