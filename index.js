/*



# Question 8 🟡 → 🟠

Now I want to test whether you can combine the ideas you've learned.

### Find the largest digit in a number

Write:

```js
function maxDigit(n) {
    // your code
}

console.log(maxDigit(58329));
```

Expected:

```text
9
```

Because:

```text
5, 8, 3, 2, 9
```

and the largest digit is `9`.

### Think carefully

This is different from counting.

For each digit, you need to compare:

```text
current digit
        vs
answer returned by smaller recursion
```

For example:

```text
maxDigit(58329)

current digit = 9
remaining = 5832
```

Then:

```text
max(9, maxDigit(5832))
```

### Questions to answer before coding

```text
Base case:
?

Current digit:
?

Smaller problem:
?

How do you combine current digit with recursive result?
?
```

Try it yourself. **Don't use `Math.max()` yet**—I want you to first understand the comparison logic manually.
*/

function maxDigit(n) {
    // your code
    if(n === 0) return 0;
    let lastDigit = Math.floor(n% 10);
    let recursiveDigit = maxDigit(Math.floor(n/10));
    if(lastDigit > recursiveDigit){
        return lastDigit;
    }else{
       return lastDigit = recursiveDigit;
    }
}

console.log(maxDigit(58329));