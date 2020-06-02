# Data Types.

C is not too safe in terms of getting errors when data overflows.

```c
int main(void) {
    int money = 0;
    printf("I have %d\n", money);
    money += 2000000000;
    printf("I have %d\n", money);
    money += 2000000000;
    printf("I have %d\n", money);
}
```

This will actually not work and will also not give you any sort of error to let you know something hasn't gone right.

This is because the value of money overflows from the `int` datatype.

We have implementations to check this kind of thing and at least produce an error when data overflows. Something like this is included in the `dcc` implementation.





## Other datatypes.

There are also many other datatypes, other than the ones we've been using including - `char`, `signed char`, `unsigned char`, `short`, `unsigned short`, `int`, `unsigned int`, `long`, `unsigned long`, `long long`, `unsigned long long`.

These are a little special with the range of numbers they can express.

**When should we use these in modern computers?** 

Not very often. 



There are more datatypes with specific header files, that are even more precise than these

Ex. With `stdint.h`, we get `int8_t`, `uint8_t`, `int16_t`, etc.

These are even more precise with the number of bytes, and the range with 8, 16, 32, 64.

We only use these with low-level code like the assembly we'll be writing. They are more helpful with writing Operating Systems, emulators, networks, compilers, small computers where the bits and bytes need to be specific.

Ex. For the low-level calculations a $2 processor needs to make inside a wash machine, which maybe can't understand values over 16-bits.





# Data Representation.

We're used to base-10 numbers, its a great choice, but its not the only one. In this course, we have other 2 bases we'll be dealing with - 2, 16.



## Base 10.

```ps
4705 can be represented as:

(4 x 10^3) + (7 x 10^2) + (0 x 10^1) + (5 x 10^0)

The place values are: 
1000 - 10^3
100 - 10^2 ...
```



## Base 2.

```ps
In a similar way, the binary number 1011 is:

(1 x 2^3) + (0 x 2^2) + (1 x 2^1) + (1 x 2^0)
8 + 0 + 2 + 1 = 11
```



## Base 16.

Why base 16? The trouble with binary is that it takes up too much space, one digit for every bit, so for a 128-bit number we'll need 128 spaces - which is a lot and tedious. A hex number is 4x more compact.

And the trouble with base 10 is that with computers which are binary, 10 is not a power of 2, so its very hard to see what the bits are. With hex, every digit or character corresponds to 4 binary digits, its just more convenient.

```ps
Convert 1011111000101001 to Hex.
1001 - 9
0010 - 2
1110 - E
1011 - B

hex - BE29
(This translation without any calculation just comes with prac.).

Convert AD5 to binary.

A - 1010
D - 1101
5 - 0101

binary - 101011010101
```





## Negative Numbers in Binary.

The simplest way would be set aside a bit for the sign - maybe the first bit (0 or 1) of the binary representation for the sign, but then this doesn't end up being as easy as we'd like with double representations, and we'd also have positive and negative 0s, which is weird.

All of this can be handled, and some processors actually use this representation, but there's a simpler approach which most processors use - 2's complement.