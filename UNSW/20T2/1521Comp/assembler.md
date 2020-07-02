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

Most of the time we'd be using the s0 - s7 (16 - 23) registers which are preserved across function calls, and use the t0 - t7 (8 - 16) for intermediate values. So when there are variables in a C program, something whose value needs to stay the same throughout the computation, until ofc we change it should be kept in s0 - s7, but intermediates whose values we won't need later (because we do need to store them somewhere) can be stored in t0 - t7.



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

There actually is no difference between li and la, the difference is only syntactical and its just that mips, qtspim and assembler just insist we use them for addresses or constants. But constants hold some value in bits and there its the same for addresses, they are also just some values at the lowest level.

`move` will move the value of one register to another. There is no move instruction on the mips so what the assembler does is - we provide two registers to it and the assembler takes the sum of one register and $0 and assigns that value to the register we wanted moved.

```assembly
syntax: move $dest $src
move $8, $9              # assign the value of $9 to $8
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

These are all branch-if-condition statements. If we need to branch on some part of our code no matter what, we say just `b`. This will branch our code if the value in the zero register is 0, and the value of the zero register is always 0.



## MIPS vs. SPIM.

MIPS is the actual machine architecture and SPIM is the emulator for it. SPIM can read text files containing instructions, converts machine code and loads into "memory", but also provides debugging capabilities. They also provide a very simple OS to work on.

But it is quite old and its a command line tool but there are other programs which provide a GUI and more debugging like qtspim and xspim.



## System Calls (syscall) .

The SPIM emulator gives I/O and memory allocation with something called the syscall instruction. They are the specific requests we can make to the OS like write or read a int, float, double, string, char, exit the program, or sbrk which is like malloc but lower level.

These are instructions directly to the OS, and the OS will check the priveleges we have and decide whether to perform them or not.

They have numbers (n in the table below), and some of them have parameters but most of them don't.

![image-20200620153118939](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\assembler.assets\image-20200620153118939.png)

# Memory.

Recall that we can load words, or half words, or just bytes. The thing with half words and bytes is that we need to have a special unsigned version of it because the actual 32 bits of memory may have signs (in the first bits) and so the unsigned variable will have some special convention. We'll mostly be using 32 bit words though.

We use the `lw`, `sw` instructions and the `.data` directive to access the memory. The `.word` directory to specify that the value we want to store needs 32 bits.

Things like global variables need to be stored and initialized to 0 beforehand. The C compiler does this automatically, but that's not true in assembler. We also know why we probably shouldn't use global variables anyway. This is because we need to store them anyway, whether or not we use them. With local variables in functions, they get destroyed when the scope is over, and the memory can be reused.

Since the `lw` and `sw` load and store in the memory from a register, we first need to load or store the values into a register so that the value of the register can be stored in memory. So this will be two instructions. This is where registers like `$t0` would come in handy.

```assembly
# This is how we'd store some value (17) into a global variable.
li $t0, 17
sw $t0, x

.data
x:
	.word 0
```



Arithmetic, like storing values, needs to be done to registers, NOT addresses. So to do some arithmetic with values in memory, we first need to load the values in the addresses into registers, do the arithmetic with those registers, and then maybe store the result in memory.

```assembly
# This is how we store 2 values, add those values and store the sum somewhere.

# storing value 17 into x.
li $t0, 17
sw $t0, x

# storing value 25 into y. Notice how we can reuse the same register, because we
# have already stored the value we need.
li $t0, 25
sw $t0, y

# loading the values of x and y into $t0 and $t1, adding $t0 and $t1 into $t2,
# then storing the value in $t2 into z.
lw $t0, x
lw $t1, y
add $t2, $t0, $t1
sw $t2 z

.data
x:
	.word 0
y:
	.word 0
z:
	.word 0
```



There are many other directives:

```assembly
.data              # this just accesses the memory.
.word              # this will store whatever's on the right as a 32-bit value in memory.
.space             # this will only set aside some memory, won't assign it any value.
.asciiz            # this will just assign the word next to it in memory followed by '\0'.
.align
.byte              # this will set aside 1 byte and assign it the value next to it.
```



## Examples.

Usually what we do is we first code up what we need to do in C and not just any C, a simplified C with gotos instead of loops and what not, and this is definitely not good C code because its way less readable but it will be much easier for translation. We then translate that to assembler. 

Break down every big expression such that there's only one or two operations, and make new variables to do it.

Comment what variables will be in what register, this is source of a lot of bugs because people forget what variables are in what registers, so make that very clear.

With the course, we'll just be doing translation as well because writing assembler directly will just be too much to handle and will most likely have a lot of bugs.



*   **Add 17 and 25 and print result.** 

```assembly
# add 17 and 25 and print result.

main:
    li $t0, 17                   # put 17 in register t0 (this will be 11 in hex).
    li $t1, 25                   # put 25 in register t1.

    add $t2, $t0, $t1            # put the sum of t0 and t1 in t2.

    move $a0, $t2                # move the value in t2 to a0 (syscall will print whats in a0 later).
    li $v0, 1                    # v0 takes the instruction number (1 for printing ints).
    syscall                      # prints the sum.

    li $a0, '\n'                 # puts char \n in a0.
    li $v0, 11                   # puts instruction to print char (11) in v0.
    syscall                      # prints newline char.

    li $v0, 0
    jr $ra

```



*   **Example to write hello MIPS!**

```assembly
# example to write hello MIPS!

main:
	la $a0, msg        # load the string msg into a0 so we can print later.
	li $v0, 4          # load the syscall (4 for print string in table above)
	syscall            # perform syscall (print the string)
	jr $ra             # return to caller (__start)
	
# the lines after the .data means we're editing the data segment, and this bit is executed first.
	.data   				
msg: 
	.asciiz "Hello MIPS!\n"	  
	# msg is the label (like label for goto in C), .asciiz is the directive that will return the ascii
	# of some string.


# so what we're doing is we're setting aside some memory for some string, in our data component.
# we have msg in line 26 which acts like a goto in C, so it will jump to a label (msg).
# The .asciiz returns the ascii bits of a string. .asciiz also puts in the null terminating 0 at the end of
# the string, and this is something that .ascii does not do.
# .ascii would be useful if we're calculating the length of the string later, but we need the null terminator 
# to print things, so we'll use .asciiz.
```



*   **Translate a C program that takes in a number and decides if its odd or even into MIPS assembler.**

```assembly
# Translate a C program that takes in a number and decides if its odd or even into MIPS assembler.
# Only use the bitwise operators to decide odd or even.

### Here its very helpful to add the C code as comments and translate it line by line.
### Its also very helpful to use the first line to comment out the registers we'll be using for each
### C variable.

# number $s0, bottom_bit $s1
main:
	# printf("Enter a number: ");
	la $a0, string0                 # careful here, this is la not li.
	li $v0, 4
	syscall
	
	# scanf("%d");
	li $v0, 5                       # scanf is syscall 5, and leaves scanned var in $v0.
	syscall
	
	# might seem like a waste because we could just continue with the value in v0
	# but the assembler relies on v0 for the number of syscall, so we'd making a lot harder
	# on ourselves by not doing this move.
	move $s0, $v0
	
	# if (x & 1 == 0)
	and $s1, $s0, 1
	beq $s1, 0, even
	
	# printf("Odd.\n");
	la $a0, odd_string             # la not li.
	li $v0, 4
	syscall

# note here that if we don't include b end here, the execution will continue to the even label.
	b end

# note here that we don't need to include b end here, because it will continue to the end label anyway.
even:
	# printf("Even.\n");
	la $a0, even_string            # la not li.
	li $v0, 4
	syscall
	
end:
	li $v0, 0
	jr $ra
    
	.data
string0:
	.asciiz "Enter a number: "
odd_string:
	.asciiz "Odd.\n"
even_string:
	.asciiz "Even.\n"
```



*   **Program to loop through and print the first 10 numbers.**

    for this, it really helps if we convert the C code to a simpler version with gotos and labels instead
    of normal loops.

```c
# the actual C code:
for (int i = 1; i <= 10; i++) {
	printf("%d\n", i);
}

# this can be simplified with gotos and labels, instead of loops.
int i = 1;

loop_start:
	if (i > 10) goto loop_end;
	printf("%d", i);
	printf("\n");
	i++;
	goto loop_start;

loop_end:
	return 0;
```

```assembly
# i in $s0
main:
	li $s0, 1                   # int i = 1
	b loop_start

loop_start:
	bgt $s0, 10, loop_end       # if (i > 10) goto loop_end
	
	move $a0, $s0               # printf("%d", i);
	li $v0, 1
	syscall
	
	li $v0, 11                  # printf("%c", '\n');
	li $a0, '\n'
	syscall
	
	add $s0, $s0, 1             # i++;
	b loop_start                # goto loop_start

loop_end:	
	li $v0, 0                   # return 0;
	jr $ra
	
```

