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
*   HI, LO for storing the results of multiplication and division. Its a weird way of doing 64 bit operations on a 32 bit machine.



## Integer Registers.

The registers can be refered to by their number, so $0 ..to 31, or they also have symbolic names just like variables. But we can't use all of them anytime we want, because some of them have some specific functions and can't be written to.

![image-20200620124632731](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\assembler.assets\image-20200620124632731.png)

8-16 have the convention that nobody expects any set values to them, so we can use them however. 16-23 have the convention that after we're done using them, we put the old values back, all of this is so that things like function calls won't mess things up when lots of them are running.



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



## Setting Register.

`li` stands for "lead immediate" and its used to store a value into a register. Here the "immediate" just means a constant. 

`li` is a pseudo instruction meaning that when we type in li, its not actually an instruction but the assembler does 1 or 2 instructions after we do li.

For example, li `$7, 15` might be translated to `addi $7, $0, 15`. If the numbers are large, the assembler will need to do 2 instructions. Usually any constant that can be expressed in 16 bits can be done in 1, and anything greater needs 2 instructions.

```assembly
li $8, 42 or
li $24, 0x2a or
li $15, '*'
```



`la` is similar to li but instead of a value, we put an address into a register.

`move` will move the value of one register to another. There is no move instruction on the mips so what the assembler does is - we provide two registers to it and the assembler takes the sum of one register and $0 and assigns that value to the register we wanted moved.

```assembly
syntax: move $dest $src
move $8, $9 # assign the value of $9 to $8
```



## Pseudo-instructions.

So when we write our MIPS code, that code will not actually be running in the silicon, because MIPS is the more readable version, so the MIPS actually gets converted into machine code. Of course this is only for pseudo-instructions like li, la, bge, blt, etc.

![image-20200620132052341](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\assembler.assets\image-20200620132052341.png)

The la example above actually has an address (label) that is greater than 16 bits, so the assembler carries out that instruction in two steps - lui (same as la) the top 16 bits, and then OR that register with the lower 16 bits of the address. Note the use of $at register for intermediate results, this is one of the registers we can't use because the machine needs to use it for this kind of thing.

## Accessing Memory.

These instructions move data between memory and CPU. 1, 2 and 4-bytes (8, 16 and 32 bit) quantities can be moved. Firstly there is something called a **word**, and a word is a specific sized chunk of data and the size of it used to be hardcoded into a system. Nowadays though a word has a size of 32 bits or maybe 64 bits.

So a word is basically a chunk of 32 bit data. There are also half words, and bytes.

```assembly
lw addr				load word from addr in memory (32 bits)
sw addr				store word into addr in memory (32 bits)
lh addr				load half word from addr in memory (16 bits)
sh addr				store half word into addr in memory (16 bits)
lb addr				load byte into addr in memory (8 bits)
sb addr				store byte into addr in memory (8 bits)
```



## Arithmetic Instructions.

These are the standard arithmetic operations in assembly.

```assembly
add src num1 num2			src = num1 + num2
sub src num1 num2			src = num1 - num2
mul src num1 num2			src = num1 * num2
div src num1 num2			src = num1 / num2
rem src num1 num2			src = num1 % num2
neg src num1			    src = -num1
```



## Logic Instructions.

These are the standard logic operations.

```assembly
and src num1 num2			src = num1 & num2
or src num1 num2			src = num1 | num2
not src num1				src = !num1
xor src num1 num2			src = num1 ^ num2
```



## Bit Instructions.

```assembly
sll src num1 num2		 	src = num1 << num2
srl src num1 num2			src = num1 >> num2
sra src num1 num2			src = num1 >> num2 but for addresses.
rol src num1 num2			src = rotate_left(num1, num2)
ror	src num1 num2			src = rotate_right(num1, num2)
```



## Jump Instructions.

Jump Instructions just mean go to a particular location in the code, so just jump through the control flow of the program. There are different options that come in handy.

We can simply jump to a location.

```assembly
j location
```

We can also jump to a location and remember where we came from, this will be useful for function calls. This is called jump and link. The location of where we came from will be stored in some register.

```assembly
jal location
```

We can also jump to whatevers in some register. This is how we would return after completing some function.

```assembly
jr register
```





## Branch Instructions.

For things like ifs, for loops, while loops, etc. we can use branch instructions. They are conditional, like do some instruction in some register if the value of two registers are the same.

```assembly
# branch on equal and not equal.
beq reg1 reg2 location			# if reg1 == reg2, go to location.
bne reg1 reg2 location			# if reg1 != reg2, go to location.

# branch on < and <=
blt reg1 reg2 location			# if reg1 < reg2
ble reg1 reg2 location			# if reg1 <= reg2

# branch on > and >=
bgt reg1 reg2 location			# if reg1 > reg2
bge reg1 reg2 location			# if reg1 >= reg2
```





## MIPS vs. SPIM.

MIPS is the actual machine architecture and SPIM is the emulator for it. SPIM can read text files containing instructions, converts machine code and loads into "memory", but also provides debugging capabilities. They also provide a very simple OS to work on.

But it is quite old and its a command line tool but there are other programs which provide a GUI and more debugging like qtspim and xspim.



## System Calls.

The SPIM emulator gives I/O and memory allocation with something called the syscall instruction. They are the specific requests we can make to the OS like write or read a int, float, double, string, char, exit the program, or sbrk which is like malloc but lower level.

They have numbers (n in the table below), and some of them have parameters but most of them don't.

![image-20200620153118939](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\assembler.assets\image-20200620153118939.png)



## Examples.

```assembly
# example to write hello MIPS!

main:
	la $a0, msg					# load the string into register $a0 (string)
	li $v0, 4					# load the syscall (4 for print string in table above)
	syscall						# perform syscall (print the string)
	jr $ra						# return to caller (__start)
	
	.data						# the data segment
msg: .asciiz "Hello MIPS!\n"	  # msg is the label (var), .asciiz is the directive, followed by the string.
```

