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

