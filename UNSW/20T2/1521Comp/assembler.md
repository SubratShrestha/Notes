# Assembler.

Very useful to know and understand because this is the lowest of the languages and we learn how these complex programs and languages are understood by the computer. Also because sometimes we are required to use it for device handler and other things.

The programs written in assembler are also usually faster, so if you want to squeeze out the last picosecond of performance time like maybe for weather predictions or trading, we would need to use assembler. Not something we would want to do but something we need to.

But even if we write webapps in js and stuff, understanding how these high level programs actually run in the silicon is incredibly valuable.



## CPU.

Typical moder CPUs have:



### Registers.

These are basically variables. They store some data, maybe some numbers. 15 50 100 registers in a CPU, one of them is the program counter which is a register that tracks execution.



### ALU.

Arithmetic logic unit will do calculations within it, gets 2 values in some voltage signals, produces another voltage signal indicating like the sum or something.



### RAM.

Fast storage for the computer, its kinda like an array of ints. It has 2 purposes, either store a values (1 byte at its lowest), or set some values, instructions for these will be given by the CPU. 

The RAM and the CPU are some distance apart and so when getting or setting values, the signals need to traverse that distance which takes a few picoseconds and CPUs go to great lengths to use values in its own registers rather than asking the RAM for values.

There is no restriction on us putting the RAM IN the CPU, but the size of the CPU would be much bigger and we can't produce CPUs of that size. But for much smaller CPUs, and much smaller RAMs this is actually done. There is a much smaller RAM inside the CPU but this is quite tiny and its used for caching.





## Fetch-Execute Cycle.

Its the cycle in which the execution of some instruction takes place inside the CPU. Executing an instruction involves:

*   determine what the operator is (add for ex.)

*   determine which registers, if any, are involved.

*   determine which memory location, if any are involved.

*   carry out the instruction.

*   store result in any in appropriate register.

*   this is assuming that everything is in 32 bits.

    | Operation       | R1 - operand 1 | R2 - operand 2 | R3 - result |
    | --------------- | -------------- | -------------- | ----------- |
    | ADD  --  8 bits | 8 bits         | 8 bits         | 8 bits      |

These "instructions" are just bit patterns within a 32-bit string. These strings are just impossible to read by a human because it just involves a bunch of hex code and addresses. This is where assembler kicks in, its a symbolic way of specifying machine code.

Its not as nice as higher level code, but its not a bunch of hex numbers. They use write instructions using mnemonics rahter than hex codes, they refer to registers using either numbers or names, and they can associate names to memory addresses.





## MIPS Architecture.

MIPS is a reduced instruction set computer set architecture. So that means that its a lot simpler than the complicated x86 computer chips that we have in our general pupose computers but that also means that the compilers and such for these computers are faster.

Now though, MIPS are not in the general purpose space but in the embedded space for embedded systems like Routers and TV remotes and what not. They exist with other architectures like ARM.

Interesting to note that the first CGI movies were generated on MIPS systems and the system used for the original matrix movie is in the K17 building.

Its not possible to get out the old routers and make programs for them (not impossible) so we use simulators written in C that pretend to be MIPS processors, but also allow for debuggers which is not possible in an actual computer chip.



The MIPS CPU has :

*   32 memory registers, but not all of them can be used to store things.
*   16/32 floating point registers for floats and doubles.
*   PC which is 32-bit register and cannot be changed.
*   HI, LO for storing the results of multiplication and division.

The registers can be refered to by their number, so $0 ..to 31, or they also have symbolic names just like variables.

*   register 0 or $0 is just like `/dev/null`, it always has the value 0 and cannot be changed.
*   register $1 is used specifically by the system to store whatever it needs to and we can't write to it.
*   registers $26 and 27 are also for the system to use for extra external things that come up. It can however be written to and our program may work for a few seconds but as soon as something happens and the system needs to write to these registers, our program will break.



## MIPS Instructions.

Every MIPS instruction is 4 bytes or 32-bits, somewhere encoded in those 4 bytes what kind of instruction it is, and few (3) patterns in which they are stored.

There are several classes of instructions:

*   load and store - which is just transfer of data between registers and memory.
*   computational - perform arithmetic and logical operations.
*   jump and branch - transfer control of program execution.
*   special - miscellaneous tasks like syscall.

There are also several addressing modes for each instruction and they specify what you're loading and storing.

The instructions can have multiple formats - they could be maybe

| OPCODE | R1 - first operand | R2 - second operand | R3 - storage register | unused bits |
| ------ | ------------------ | ------------------- | --------------------- | ----------- |
| 6 bits | 5 bits             | 5 bits              | 5 bits                | 11 bits     |





## Data and Addresses.

