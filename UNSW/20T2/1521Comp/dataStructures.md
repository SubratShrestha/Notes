# Data Structures in Assembler.

local variables like chars ints or double can be stored in registers as we've seen. But the caveat to this is that we can't have pointers to them because a pointer is a way of accessing the memory, not registers. So things like arrays or structs need things to be in the memory, because they use pointers to the memory and thier entire structure with adjacent memory addresses don't work with registers.

Also because something like a char or int or double can be stored as a byte, 4 bytes and 8 bytes respectively, and this can be done with 32 bit registers. A float though need to be stored in a special type of registers.

In MIPS, when data needs to be stored, it is first initialized with 0. Its a simple system so there is no uninitialized value. So everything in the data segment in the MIPS will have 0 initially.

```assembly
# uninitialized storage (well initialized with 0)
val: .space 8
str: .space 20

# initialized storage
arr: .word 9, 8, 7, 6
msg: .asciiz "Hello\n"
```





## Global / Static variables.

These are usually not stored in registers because global variables need to be accessed from anywhere in the program including being accessible from different functions and chaging from functions can change the values of registers, so we need to store them in the memory / the data segment. To do this we need to specify how much space they will need.

```assembly
val: .space 8              # double val;
str: .space 20             # char str[20];
vec: .space 80             # int vec[20];

arr: .word 9, 8, 7, 6      # int arr[4] = {9, 8, 7, 6};
msg: .asciiz "Hello\n"     # char msg[7] = "Hello\n";
```





## Arrays.

For arrays, we just need to know where the array is and what the type of array is. We need to manually get to the index we want. Ex.

```c
#include <stdio.h>
int x[10];
int main(void) {
    x[3] = 17;
}
```



Now to get the third index of this array, we need the address of the array (first index), then we need to add $$3 * size\ of\ type$$ because the size of one index is unknown to us, could be a million bytes.

Something that's interesting is that pointer arithmetic is discouraged in most beginner programming courses and that's because pointer arithmetic is not defined for anything that's not an array. So even in arrays, after we reach the border of the array, the operation becomes undefined and what "undefined" means is that the compiler can produce anything, it may work sometimes but that may change even in the same system . So even with arrays, you better know the range of the array.

```assembly
main:
	li $t0, 3                  # we know the index we want.
	mul $t1, $t0, 4            # get the size * index value.
	
	la $t1, x                  # load the address of the memory allocated by line 11.
	add $t2, $t1, $t0          # add the value to the address of x.
	li $t3, 17                 # store the value we want the index to have into a register.
	sw $t3, ($t2)              # store that value into the index we wanted.
	
.data
x: .space 40                   # store 40 bytes (sizeof(int) * number of elements (10))
```



### With loops:

```c
#include <stdio.h>

int numbers[5] = {3, 9, 27, 81, 243};

int main(void) {
    int i = 0;
    while (i < 5) {
        printf("%d\n"n numbers[i]);
        i++;
    }
    return 0;
}
```



Here we see that the array must be initialized, this happens in the data segment.

```assembly
# print 5 numbers
# i in $s0
# j in $s1

main:
	li $s0, 0                            # int i = 0;
loop:
	bge $s0, 5, end                      # if (i > 5) goto end;
	
	la $t0, numbers                      # loading base address.
	mul $t1, $s0, 4                      # getting offset value.
	add $t2, $t1, $t0                    # adding offset to base address.
	
	lw $s1, ($t2)                        # storing value at index to $s1. 
	move $a0, $s1                        # moving to $a0 for printing.
	
	li $v0, 1                            # loading instruction to print int.
	syscall                              # printing int.
	
	li $a0, '\n'                         # loading newline to $a0 for printing.
	li $v0, 11                           # loading intruction to print char.
	syscall                              # printing newline.
	
	add $s0, $s0, 1                      # i++;
	b loop                               # goto loop.
end:
	li $v0, 0
	jr $ra

.data
numbers: .word 3, 9, 27, 81, 243         # the .word here means 4 byte quantities like the int (badly named).
```





## 2D Arrays

2D arrays are a little more tricky when it comes to indexing elements.

There is simple expression to get the exact indexes in both directions:

$$int\ arr[row][col]\ =\ BA\ +\ ((row\ * rowSize)\ +\ col)\ * sizeof(datatype)$$, 

where BA = Base Address, row = row number, col = column number, rowSize = total number of rows.





## Structs

Unlike arrays, structs will use different types, they are heterogenous. Now we can sortof guess the space taken by the struct, but the C standard does not guarantee a size inside a struct.

We do know that the values will be stored in the same order, BUT NOT together. They are not arrays, so we cannot assume they will be next to each other in memory.



```c
struct details {
    uint16_t postcode;
    char first_name[7];
    uint32_t zid;
};

struct details student = {2052, "Subrat", 5123456};

int main(void) {
    printf("%d", student.zid);
}
```

```assembly
POSTCODE = 0
FIRST_NAME = 2
ZID = 9

main:
	la $t0, student              # printf("%d", student.zid);
	add $t1, $t0, ZID
	lw $a0, ($t1)
	li $v0, 1
	syscall
	
	la $t0, student              # printf("%d", student.postcode);
	add $t1, $t0, POSTCODE
	lhu $a0, ($t1)               # loading half word unsigned (uint16_t).
	li $v0, 1
	syscall	


.data
student:
	.half 2052
	.asciiz "Subrat"
	.word 5123456
```

