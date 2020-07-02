# Bitwise Operators.

# Bitwise AND (&).

A binary operator that does the logical AND operation on each of the pair of bits in the two numbers.

Ex. 39 & 227

```ps
39 -  00100111
227 - 11100011


Each 0 or 1 in one number is compared with the other number, and the AND operation is done on them.

  00100111
& 11100011
-----------
  00100011
```



Also, note that the result of the AND operation is an int and in C, an `int` is true if it is non-zero and false if it is 0. 

So this means we can actually use the bitwise AND to check if a value is odd or even.

Because when an odd number (number in binary will end in 1) gets bitwise AND'ed with 1 (also ends in 1), the last digit of the AND'ed number will also end with 1 (1 AND 1 = 1). So this will return true.

When an even number (number will end in 0) gets bitwise AND'ed with 1 (ends in 1), the last digit of the AND'ed number will end in 0 (1 AND 0 = 0), and it will return false.

```c
int is_odd(int n) {
    return n % 2 == 1;
}

// OR.
int is_odd(int n) {
    return n & 1;
}
```

But this shouldn't really be done just because of how unreadable it is. The old way is much easily understandable.



# Bitwise NEG (~).

Takes a single value, so its a unary operator. Performs the logical negation (NOT) operation in the bits.

```ps
~ 00100111
-----------
  11011000
```



# Bitwise OR ( | ).

Binary operator. Same as the bitwise AND, but it does the logical OR for every pair of bits in the 2 inputs.

```ps
  00100111
| 11100011
-----------
  11100111
```



# Bitwise XOR ( ^ ).

Binary operator. Performs logical XOR which is Exclusive OR.

This means it will return 1 if one of the operands is a 1 and the other is a 0, or the other way around, but nothing else. If its 1 and 1, 1 XOR 1 = 0.

```ps
  00100111
^ 11100011
-----------
  11000100
```



# Bitwise Shift ( << or >> ).

This shifts the bits to a direction. Then of course, we have the question - what will fill the missing bit?

This is a binary operator, we take in the number and the number of places it should shift by.

when 000001 gets shifted left with 1 (<< 1) 00001? What will be in the question mark?

**For unsigned integers, its guaranteed to be a 0, but with signed values, its not guaranteed. So basically don't use the bitwise shift on signed values.**

```ps
     0000000000001111
>> 1 0000000000000111
<< 1 0000000000011110
```



![image-20200602133641121](C:\Users\subra\Documents\Notes\UNSW\20T2\1521Comp\bitwise.assets\image-20200602133641121.png)

**Its used when we need to multiply or divide. (<< to multiply and >> to divide)**

**It will be multiplied by 2 ^ number of shifts.**

```ps
345 >> 4 => 345 * 2^4
345 * 16
```



## Example.

```c
#define FIRE_TYPE 0x0001
#define WATER_TYPE 0x0002
#define GRASS_TYPE 0x0003 ...

int main(void) {
    // giving pokemon 3 types.
    
    // this OR will make the type fire and water.
    uint16_t pokemon_type = FIRE_TYPE | WATER_TYPE;
    
    //to add another type.
    pokemon_type = pokemon_type | GRASS_TYPE;
    
    //to remove a type, we need to remove every bit of the type code in the pokemon_type variable.
    // we can do this with a negation.
    pokemon_type = pokemon_type & ~ GRASS_TYPE;
}
```

# Possible Exam Qs.

```ps
if a = 0x0159, b = 0x02a6
what is 
~a	a & b 	a | b 	a ^ b 	a >> c 	a << c.
```



## Undefined behaviour sanitisation

This is a way that some compilers will stop actions that are undefined. Many things can trigger it and its a good thing because these actions will result in something that's undefined and this leads to a lot of bugs in the program, bugs which are not immediately apparent.

They also cause many security risks because this kind of program may not be so important but when other more important programs use this buggy code, they can cause a lot of security issues. Common example was the img converter program which had such a bug and was pointed out by other people but the developers thought it was a niche problem and that normal use of the program (what was intended) would not break it. Until this program started being used in many websites for their images and started breaking everything because the security issue was public.

A common thing that happens with compilers is that they try and check for this behaviour earlier on so that they can be avoided as soon as possible.

An example that's relavant here:

``` c
int high_bit = (1 << 31) & i;
if (high_bit) {
    printf("high bit is 1\n");
} else {
    printf("high bit is 0\n");
}
return 0;
```

This code here runs just fine with `gcc` but it breaks with `dcc`, and this program even works with `gcc` as expected.

But the problem is that unlike perl, C does not have "contexts", so evey little expression written in C is its own thing and does not care about what's around it. That `1` on line 1 like every bare number without a decimal point in C is an `int`, and its a `signed int` and the bit operations on signed values is not defined in the C standard (yet).

Since the value of a signed integer bitshifted is undefined, the compiler can basically do anything it wants, and it really just depends on the compiler. This is definitely not something we want when dealing with more important things like banking and what not, but its still something we need to keep in mind remembering the situation with the image converter.

There are plenty of ways to solve this but we can't do something like `uint32_t high_bit = (1 << 31) & i`, this still does not work, again because the expression `(1 << 31)` does not care what's around it, it will be casted as `uint32_t` later but the expression is still undefined and that's all that matters. To solve this we can do:

```c
int high_bit = ((uint32_t)1 << 31) & i;			// or
int high_bit = (1u << 31) & i;				   // and this is just shorthand for the same thing.

// this is just riddiculous but hey, it still works and its just as valid.
uint32_t one = 1;
int high_bit = (one << 31) & i;
```

