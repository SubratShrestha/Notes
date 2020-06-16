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

The useful thing about them is that they have guaranteed ranges. Anywhere and everywhere which is unlike other datatypes.

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
We can interpret hex number 3AF1 as:
3 x 16^3 + 10 x 16^2 + 15 x 16^1 + 1 x 16^0 = 15089 in decimal.

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

In C, the notation for a hex is a `0x` following something. Ex. 15 = 0xF. Its also carried over to many other languages.



## Negative Numbers in Binary.

The simplest way would be set aside a bit for the sign - maybe the first bit (0 or 1) of the binary representation for the sign, but then this doesn't end up being as easy as we'd like with double representations, and we'd also have positive and negative 0s, which is weird.

All of this can be handled, and some processors actually use this representation, but there's a simpler approach which most processors use - 2's complement.

The system we actually use is 2's complement.



# Floating point numbers.

Since there are an infinite number of real numbers, all of them just cannot be represented. Floating point numbers model a tiny subset of reals, so almost all real values have no exact representation (ex. 1/3). But whats interesting is that the numbers closer to 0 need to have more precision because these numbers would be used more often.

C has a few floating point types - float (32-bits), double (64-bits), and long doubles (128-bits). Doubles are the thing we'd be using the most often because it has enough precision and isn't as clunky as long doubles, and floats and doubles are quite standard so unlike ints whose size kinda depends on the system, doubles use a standard (IEEE 754).



## The IEEE 754

The IEEE 754 can represent a floating point number with the scientific notation. The number has a fraction `F` and exponent `E`. Numbers have the representation $$(1 + F) \times 2^{E - bias}$$, where F and E can be negative. The fraction part `F` is normalised with scientific notation $$1.2345 \times 10^2$$ rather than $$123.45$$.

The first bit or the highest bit (31st on 32-bit for ex. because there is a bit 0) is kept for the sign - 0 for positive, and 1 for negative. 

The next two sections are for the exponent and then the fraction. This fraction is what makes the representation more or less precise.

We do 1 + F because if we had zero in the left, we would be wasting memory because we could've just shifted the whole thing left.

The fractional part from binary is calculated by doing $$2 ^ {- (position\ of\ 1)}$$, position of 1 is the bit where 1 comes up in the fractional part, starting the count from 1.

The bias is calculated as $$bias = 2^{nbits - 1} - 1$$



*   Converting binary to decimal.

```pseudocode
0 10000010 01000000000000000000000

sign = 0 (positive)
exp = 10000010 = 130
bias = 2^(8 - 1) - 1 = 127
exp - bias = 130 - 127 = 3
frac = 01000000000000000000000, position of 1 = 2, frac = 2^(-2) = 1/4 = 0.25

number = + (1 + 0.25) x 2^3
number = + 1.25 x 8
= +10
```



*   converting decimal to binary.

    ```pseudocode
    150.75
    
    150 = 10010110
    .75 = 11
    
    = 10010110.11
    
    normalising ...
    = 1.001011011 x 2^(number of places point shifted)
    = 1.001011011 x 2^7
    
    frac = 001011011
    sign = 0 (positive)
    7 = exp - bias
    exp = 7 + bias
    bias = 2^(8 - 1) = 127
    exp = 7 + 127 = 134
    
    = 0 10000110 00101101100000000000000 (fill the fraction with 0s for remaining bits)
    ```

    