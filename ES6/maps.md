# Maps.

Maps are a completely new data structure in JS, and they are just hashmaps. In ES5, if we needed a hashmap, we needed to use a JS object, but there are lots of limitations to that.

### Disadvantages of using objects as hashmaps.

*   We can only use strings as keys, and no other datatypes. Maps can use anything as keys, even other datastructures.
*   Objects are not iterable, so they cannot be looped over with `forEach`.
*   We can't directly get the size of the map.
*   We can't easily add/remove data from object.
*   We can't easily clear the object.

Maps gets rid of these limitations, and also have some cool methods for it.

```js
// To declare a map.
const hash = new Map();

// setting new pair.
hash.set('key1', 'first value.');
hash.set(2, 'second value.');
hash.set(3, 3);

// getting values from keys.
console.log(hash.get('key1'));
console.log(hash.get(2));

// deleting key from map.
hash.delete(3);

// checking if map has some key.
if (hash.has(3)) { 
	hash.delete(3);
}

// clearing entire map.
hash.clear();

// looping with forEach.
// ** the order is important. The forEach will take in the args value, then key, then the whole map and not in any other order.
hash.forEach((value, key) => console.log(`key = ${key}, value = ${value}`));

// looping with for-of and map.entries.
// ** the entries function will return a mapIterator object, which can be deconstructed into key, values -- in that order.
for (let [key, value] of hash.entries()) {
    if (typeof(key) === 'number') {
        console.log('found a number.');
    }
}
```



