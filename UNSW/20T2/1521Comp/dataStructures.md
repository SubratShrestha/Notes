# Data Structures in Assembler.

local variables like chars ints or double can be stored in registers as we've seen. But the caveat to this is that we can't have pointers to them because a pointer is a way of accessing the memory, not registers. So things like arrays or structs need things to be in the memory, because they use pointers to the memory and thier entire structure with adjacent memory addresses don't work with registers.

Also because something like a char or int or double can be stored as a byte, 4 bytes and 8 bytes respectively, and this can be done with 32 bit registers. A float though need to be stored in a special type of registers.



## Global / Static variables.

These need some number of bytes in the data part. Because they won't be used immediately and they need to be available at any time during the execution, they just need to be stored in memory. To do this we need to specify how much space they will need.

```assembly
val: .space 8				# double val;
str: .space 20				# char str[20];
vec: .space 80				# int vec[20];

arr: .word 9, 8, 7, 6		# int arr[4] = {9, 8, 7, 6};
msg: .asciiz "Hello\n"		# char msg[7] = "Hello\n";
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

```assembly
main:
	li $t0, 3			    # we know the index we want.
	mul $t1, $t0, 4		    # get the size * index value.
	
	la $t1, x			    # load the address of the memory allocated by line 11.
	add $t2, $t1, $t0		# add the value to the address of x.
	li $t3, 17				# store the value we want the index to have into a register.
	sw $t3, ($t2)			# store that value into the index we wanted.
	
.data
x: .space 40			   # store 40 bytes (sizeof(int) * number of elements (10))
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



```assembly

```

